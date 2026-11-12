<?php
/**
 * Keelbiz enquiry endpoint — Option A (Hostinger shared PHP).
 * Deploy to: public_html/api/enquiry.php  (config lives OUTSIDE web root — see ../config.example.php)
 * Security: origin check, honeypot, time-trap, per-IP rate limit (file-backed), body-size limit,
 * server-side validation, prepared statements (MySQL), SMTP via PHPMailer, generic errors, no PII in logs.
 */
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

$cfg = @include dirname(__DIR__, 2) . '/keelbiz-config.php'; // e.g. /home/USER/keelbiz-config.php (outside public_html)
if (!$cfg) { http_response_code(503); echo json_encode(['ok' => false, 'error' => 'unavailable']); exit; }

function fail(int $code, string $msg = 'invalid'): never { http_response_code($code); echo json_encode(['ok' => false, 'error' => $msg]); exit; }

if ($_SERVER['REQUEST_METHOD'] !== 'POST') fail(405, 'method');
if ((int)($_SERVER['CONTENT_LENGTH'] ?? 0) > 20000) fail(413, 'too_large');

// Origin / CSRF
$origin = $_SERVER['HTTP_ORIGIN'] ?? ($_SERVER['HTTP_REFERER'] ?? '');
$allowed = false;
foreach ($cfg['allowed_origins'] as $o) { if ($o !== '' && str_starts_with($origin, $o)) { $allowed = true; break; } }
if (!$allowed) fail(403, 'origin');

// Honeypot + time-trap
if (!empty($_POST['website_url'])) { echo json_encode(['ok' => true]); exit; } // silently accept bots
$elapsed = (int)($_POST['elapsed'] ?? 0);
if ($elapsed < 3000) fail(400, 'too_fast');

// Rate limit: max N per window per IP (file-backed, hashed IP)
$ipHash = hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? '') . $cfg['rate_salt']);
$dir = $cfg['rate_dir']; if (!is_dir($dir)) @mkdir($dir, 0700, true);
$f = "$dir/$ipHash"; $now = time(); $hits = is_file($f) ? array_filter(array_map('intval', file($f, FILE_IGNORE_NEW_LINES)), fn($t) => $t > $now - $cfg['rate_window']) : [];
if (count($hits) >= $cfg['rate_max']) fail(429, 'rate');
$hits[] = $now; file_put_contents($f, implode("\n", $hits), LOCK_EX);

// Validation
$v = fn(string $k, int $max) => mb_substr(trim((string)($_POST[$k] ?? '')), 0, $max);
$name = $v('name', 120); $email = $v('email', 200); $company = $v('company', 160); $website = $v('website', 300);
$budget = $v('budget', 40); $desc = $v('description', 4000); $consent = !empty($_POST['consent']);
$allowedServices = ['websites', 'social', 'ads', 'automation', 'dashboards', 'unsure'];
$allowedTypes = ['', 'single', 'multiple', 'solution', 'ai-ready', 'ai-custom', 'automation', 'unsure'];
$picked = array_values(array_unique(array_filter((array)($_POST['services'] ?? []), fn($x) => is_string($x) && in_array($x, $allowedServices, true))));
$type = $v('type', 20); $topic = $v('topic', 120);
$adPlatforms = in_array($v('ad_platforms', 10), ['', 'meta', 'google', 'both', 'unsure'], true) ? $v('ad_platforms', 10) : '';
$service = implode(',', $picked);
if (mb_strlen($name) < 2 || !filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($company) < 2 || count($picked) === 0 || !in_array($type, $allowedTypes, true) || mb_strlen($desc) < 20 || !$consent) fail(400);
if ($website !== '' && !filter_var($website, FILTER_VALIDATE_URL)) fail(400);
if (preg_match('/[\r\n]/', $name . $email . $company . $topic . $type)) fail(400); // header injection

// Optional Cloudflare Turnstile
if (!empty($cfg['turnstile_secret'])) {
  $token = (string)($_POST['cf-turnstile-response'] ?? '');
  $ch = curl_init('https://challenges.cloudflare.com/turnstile/v0/siteverify');
  curl_setopt_array($ch, [CURLOPT_POST => true, CURLOPT_RETURNTRANSFER => true, CURLOPT_TIMEOUT => 5,
    CURLOPT_POSTFIELDS => http_build_query(['secret' => $cfg['turnstile_secret'], 'response' => $token, 'remoteip' => $_SERVER['REMOTE_ADDR'] ?? ''])]);
  $r = json_decode((string)curl_exec($ch), true); curl_close($ch);
  if (empty($r['success'])) fail(400, 'captcha');
}

// Store (MySQL, prepared statement)
try {
  $pdo = new PDO($cfg['db_dsn'], $cfg['db_user'], $cfg['db_pass'], [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
  $pdo->exec('CREATE TABLE IF NOT EXISTS enquiries (id INT AUTO_INCREMENT PRIMARY KEY, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, name VARCHAR(120), email VARCHAR(200), company VARCHAR(160), website VARCHAR(300), service VARCHAR(120), enquiry_type VARCHAR(20), ad_platforms VARCHAR(10), topic VARCHAR(120), budget VARCHAR(40), description TEXT, consent TINYINT(1)) CHARACTER SET utf8mb4');
  $st = $pdo->prepare('INSERT INTO enquiries (name,email,company,website,service,enquiry_type,ad_platforms,topic,budget,description,consent) VALUES (?,?,?,?,?,?,?,?,?,?,1)');
  $st->execute([$name, $email, $company, $website, $service, $type, $adPlatforms, $topic, $budget, $desc]);
} catch (Throwable $e) { error_log('enquiry db error'); fail(500, 'server'); }

// Notify (PHPMailer via Composer: composer require phpmailer/phpmailer — vendor/ outside web root)
try {
  require $cfg['phpmailer_autoload'];
  $m = new PHPMailer\PHPMailer\PHPMailer(true);
  $m->isSMTP(); $m->Host = $cfg['smtp_host']; $m->SMTPAuth = true; $m->Username = $cfg['smtp_user']; $m->Password = $cfg['smtp_pass'];
  $m->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS; $m->Port = $cfg['smtp_port'];
  $m->setFrom($cfg['smtp_from'], 'Keelbiz website'); $m->addAddress($cfg['notify_to']); $m->addReplyTo($email, $name);
  $m->Subject = "New enquiry ($type): $service — $company";
  $m->Body = "Name: $name\nEmail: $email\nCompany: $company\nWebsite: $website\nType: $type\nServices: $service\nAd platforms: $adPlatforms\nTopic: $topic\nBudget: $budget\n\n$desc";
  $m->send();
} catch (Throwable $e) { error_log('enquiry mail error'); /* stored already; still ok */ }

// Optional: forward to n8n (Option B) for CRM + follow-up automation
if (!empty($cfg['n8n_webhook'])) {
  $ch = curl_init($cfg['n8n_webhook']);
  curl_setopt_array($ch, [CURLOPT_POST => true, CURLOPT_RETURNTRANSFER => true, CURLOPT_TIMEOUT => 5,
    CURLOPT_HTTPHEADER => ['Content-Type: application/json', 'X-Keelbiz-Secret: ' . $cfg['n8n_secret']],
    CURLOPT_POSTFIELDS => json_encode(compact('name', 'email', 'company', 'website', 'service', 'type', 'adPlatforms', 'topic', 'budget', 'desc'))]);
  curl_exec($ch); curl_close($ch);
}

echo json_encode(['ok' => true]);
