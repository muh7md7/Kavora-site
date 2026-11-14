<?php
/**
 * Keelbiz enquiry endpoint — shared PHP hosting (Hostinger), no Composer, no database required.
 * Deploy to: public_html/api/enquiry.php  +  public_html/api/config.php (copy of ../config.example.php; blocked by .htaccess).
 * A config file at /home/USER/keelbiz-config.php (outside web root) takes precedence if present.
 *
 * Pipeline: origin check → honeypot → time-trap → per-IP rate limit → server-side validation
 *           → append to private JSONL log (never lost) → notify by email (PHPMailer SMTP if configured, else PHP mail())
 *           → optional webhook forward (n8n). Generic errors; no PII in error_log.
 */
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

$cfg = @include dirname(__DIR__, 2) . '/keelbiz-config.php';
if (!$cfg) $cfg = @include __DIR__ . '/config.php';
if (!$cfg) $cfg = @include __DIR__ . '/site-config.php'; // public defaults shipped with the site (no secrets)
function fail(int $code, string $msg = 'invalid'): never { http_response_code($code); echo json_encode(['ok' => false, 'error' => $msg]); exit; }
if (!$cfg || empty($cfg['notify_to'])) fail(503, 'unavailable');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') fail(405, 'method');
if ((int)($_SERVER['CONTENT_LENGTH'] ?? 0) > 20000) fail(413, 'too_large');

// Origin / CSRF — same-origin posts carry Origin; allow configured hosts only.
$origin = $_SERVER['HTTP_ORIGIN'] ?? ($_SERVER['HTTP_REFERER'] ?? '');
$allowed = false;
foreach ((array)($cfg['allowed_origins'] ?? []) as $o) { if ($o !== '' && str_starts_with($origin, $o)) { $allowed = true; break; } }
if (!$allowed && !empty($cfg['allow_same_host'])) { $host = $_SERVER['HTTP_HOST'] ?? ''; $allowed = $host !== '' && (bool)preg_match('#^https?://' . preg_quote($host, '#') . '(/|$)#', $origin); }
if (!$allowed) fail(403, 'origin');

// Honeypot + time-trap
if (!empty($_POST['website_url'])) { echo json_encode(['ok' => true]); exit; } // silently accept bots
if ((int)($_POST['elapsed'] ?? 0) < 3000) fail(400, 'too_fast');

// Rate limit (file-backed, hashed IP)
$dir = rtrim((string)(($cfg['data_dir'] ?? '') ?: (__DIR__ . '/_data')), '/'); // empty string = default
if (!is_dir($dir)) { @mkdir($dir, 0700, true); @file_put_contents("$dir/.htaccess", "Require all denied\n"); @file_put_contents("$dir/index.html", ''); }
$ipHash = hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? '') . ($cfg['rate_salt'] ?? 'keelbiz'));
$rf = "$dir/rate-$ipHash"; $now = time(); $win = (int)($cfg['rate_window'] ?? 3600); $max = (int)($cfg['rate_max'] ?? 5);
$hits = is_file($rf) ? array_values(array_filter(array_map('intval', file($rf, FILE_IGNORE_NEW_LINES) ?: []), fn($t) => $t > $now - $win)) : [];
if (count($hits) >= $max) fail(429, 'rate');
$hits[] = $now; @file_put_contents($rf, implode("\n", $hits), LOCK_EX);

// Validation (mirrors the client; the server is the authority)
$v = fn(string $k, int $max) => mb_substr(trim((string)($_POST[$k] ?? '')), 0, $max);
$name = $v('name', 120); $email = $v('email', 200); $company = $v('company', 160); $website = $v('website', 300);
$desc = $v('description', 4000); $consent = !empty($_POST['consent']); $contactMethod = $v('contact_method', 40);
$allowedServices = ['websites', 'social', 'ads', 'automation', 'dashboards', 'unsure'];
$allowedTypes = ['', 'single', 'multiple', 'solution', 'ai-ready', 'ai-custom', 'automation', 'unsure'];
$picked = array_values(array_unique(array_filter((array)($_POST['services'] ?? []), fn($x) => is_string($x) && in_array($x, $allowedServices, true))));
$type = $v('type', 20); $topic = $v('topic', 120);
$adPlatforms = in_array($v('ad_platforms', 10), ['', 'meta', 'google', 'both', 'unsure'], true) ? $v('ad_platforms', 10) : '';
$service = implode(', ', $picked);
if (mb_strlen($name) < 2 || !filter_var($email, FILTER_VALIDATE_EMAIL) || count($picked) === 0 || !in_array($type, $allowedTypes, true) || mb_strlen($desc) < 10 || !$consent) fail(400);
if ($website !== '' && !filter_var($website, FILTER_VALIDATE_URL)) fail(400);
if (preg_match('/[\r\n]/', $name . $email . $company . $topic . $type . $contactMethod)) fail(400); // header injection

// Optional Cloudflare Turnstile
if (!empty($cfg['turnstile_secret'])) {
  $token = (string)($_POST['cf-turnstile-response'] ?? '');
  $ch = curl_init('https://challenges.cloudflare.com/turnstile/v0/siteverify');
  curl_setopt_array($ch, [CURLOPT_POST => true, CURLOPT_RETURNTRANSFER => true, CURLOPT_TIMEOUT => 5,
    CURLOPT_POSTFIELDS => http_build_query(['secret' => $cfg['turnstile_secret'], 'response' => $token, 'remoteip' => $_SERVER['REMOTE_ADDR'] ?? ''])]);
  $r = json_decode((string)curl_exec($ch), true); curl_close($ch);
  if (empty($r['success'])) fail(400, 'captcha');
}

$record = ['at' => gmdate('c'), 'name' => $name, 'email' => $email, 'company' => $company, 'website' => $website, 'type' => $type,
  'services' => $picked, 'ad_platforms' => $adPlatforms, 'topic' => $topic, 'contact_method' => $contactMethod, 'description' => $desc];

// 1) Durable store: private JSONL (always) + MySQL (only if configured)
$stored = (bool)@file_put_contents("$dir/enquiries.jsonl", json_encode($record, JSON_UNESCAPED_UNICODE) . "\n", FILE_APPEND | LOCK_EX);
if (!empty($cfg['db_dsn'])) {
  try {
    $pdo = new PDO($cfg['db_dsn'], $cfg['db_user'] ?? '', $cfg['db_pass'] ?? '', [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
    $pdo->exec('CREATE TABLE IF NOT EXISTS enquiries (id INT AUTO_INCREMENT PRIMARY KEY, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, name VARCHAR(120), email VARCHAR(200), company VARCHAR(160), website VARCHAR(300), service VARCHAR(120), enquiry_type VARCHAR(20), ad_platforms VARCHAR(10), topic VARCHAR(120), contact_method VARCHAR(40), description TEXT, consent TINYINT(1)) CHARACTER SET utf8mb4');
    $pdo->prepare('INSERT INTO enquiries (name,email,company,website,service,enquiry_type,ad_platforms,topic,contact_method,description,consent) VALUES (?,?,?,?,?,?,?,?,?,?,1)')
        ->execute([$name, $email, $company, $website, $service, $type, $adPlatforms, $topic, $contactMethod, $desc]);
    $stored = true;
  } catch (Throwable $e) { error_log('enquiry db error'); }
}

// 2) Notify
$subject = "New enquiry: " . ($company ?: $name) . " — " . ($service ?: 'unspecified');
$body = "Name: $name\nEmail: $email\nBusiness: $company\nWebsite: $website\nType: $type\nServices: $service\nAd platforms: $adPlatforms\nTopic: $topic\nPreferred contact: $contactMethod\nReceived: {$record['at']}\n\n$desc\n";
$from = (string)($cfg['smtp_from'] ?? ('no-reply@' . preg_replace('/^www\./', '', $_SERVER['HTTP_HOST'] ?? 'localhost')));
$sent = false;
if (!empty($cfg['smtp_host']) && !empty($cfg['phpmailer_autoload']) && is_file($cfg['phpmailer_autoload'])) {
  try {
    require_once $cfg['phpmailer_autoload'];
    $m = new PHPMailer\PHPMailer\PHPMailer(true);
    $m->isSMTP(); $m->Host = $cfg['smtp_host']; $m->SMTPAuth = true; $m->Username = $cfg['smtp_user']; $m->Password = $cfg['smtp_pass'];
    $m->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS; $m->Port = (int)($cfg['smtp_port'] ?? 587);
    $m->setFrom($from, 'Keelbiz website'); $m->addAddress($cfg['notify_to']); $m->addReplyTo($email, $name);
    $m->Subject = $subject; $m->Body = $body; $m->CharSet = 'UTF-8';
    $sent = $m->send();
  } catch (Throwable $e) { error_log('enquiry smtp error'); }
}
if (!$sent) {
  // Direct SMTP over SSL (no dependencies). Password lives only in a server file: api/_data/smtp-pass.txt (web-blocked).
  $smtpUser = (string)($cfg['smtp_user'] ?? $cfg['notify_to']);
  $smtpPass = !empty($cfg['smtp_pass']) ? (string)$cfg['smtp_pass'] : trim((string)@file_get_contents("$dir/smtp-pass.txt"));
  if ($smtpPass !== '') {
    try {
      $host = (string)($cfg['smtp_host'] ?? 'smtp.hostinger.com'); $port = (int)($cfg['smtp_port'] ?? 465);
      $fp = @stream_socket_client("ssl://$host:$port", $en, $es, 10);
      if ($fp) {
        stream_set_timeout($fp, 10);
        $rd = function () use ($fp) { $r = ''; while (($l = fgets($fp, 515)) !== false) { $r .= $l; if (strlen($l) < 4 || $l[3] === ' ') break; } return $r; };
        $cmd = function (string $c, string $ok) use ($fp, $rd) { fwrite($fp, $c . "\r\n"); return str_starts_with($rd(), $ok); };
        $rd();
        $d = preg_replace('/^www\./', '', $_SERVER['HTTP_HOST'] ?? 'keelbiz.com');
        $msg = "Date: " . date('r') . "\r\nFrom: Keelbiz website <$from>\r\nTo: {$cfg['notify_to']}\r\nReply-To: $name <$email>\r\nSubject: =?UTF-8?B?" . base64_encode($subject) . "?=\r\nMIME-Version: 1.0\r\nContent-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\nMessage-ID: <" . bin2hex(random_bytes(8)) . "@$d>\r\n\r\n" . chunk_split(base64_encode($body));
        if ($cmd("EHLO $d", '250') && $cmd('AUTH LOGIN', '334') && $cmd(base64_encode($smtpUser), '334') && $cmd(base64_encode($smtpPass), '235')
            && $cmd("MAIL FROM:<$smtpUser>", '250') && $cmd("RCPT TO:<{$cfg['notify_to']}>", '250') && $cmd('DATA', '354')) {
          fwrite($fp, $msg . "\r\n.\r\n"); $sent = str_starts_with($rd(), '250');
        }
        @fwrite($fp, "QUIT\r\n"); fclose($fp);
      }
    } catch (Throwable $e) { error_log('enquiry direct smtp error'); }
  }
}
if (!$sent) {
  $headers = "From: Keelbiz website <$from>\r\nReply-To: " . $name . " <$email>\r\nContent-Type: text/plain; charset=UTF-8\r\nX-Mailer: keelbiz-enquiry";
  $sent = @mail((string)$cfg['notify_to'], '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, $headers, !empty($cfg['mail_envelope_from']) ? '-f' . $cfg['mail_envelope_from'] : '');
  if (!$sent) error_log('enquiry mail() returned false');
}

// 3) Optional webhook (n8n / CRM)
if (!empty($cfg['n8n_webhook'])) {
  $ch = curl_init($cfg['n8n_webhook']);
  curl_setopt_array($ch, [CURLOPT_POST => true, CURLOPT_RETURNTRANSFER => true, CURLOPT_TIMEOUT => 5,
    CURLOPT_HTTPHEADER => ['Content-Type: application/json', 'X-Keelbiz-Secret: ' . ($cfg['n8n_secret'] ?? '')],
    CURLOPT_POSTFIELDS => json_encode($record, JSON_UNESCAPED_UNICODE)]);
  curl_exec($ch); curl_close($ch);
}

if (!$stored && !$sent) fail(500, 'server'); // nothing was kept — tell the client honestly
echo json_encode(['ok' => true]);
