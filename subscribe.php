<?php
// Waitlist signup. Saves to data/waitlist.csv (blocked from the web). Rate-limited per IP.
header('Content-Type: application/json');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); exit('{"ok":false}'); }

// Only accept posts from our own pages
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$host = $_SERVER['HTTP_HOST'] ?? '';
if ($origin !== '' && parse_url($origin, PHP_URL_HOST) !== $host) { http_response_code(403); exit('{"ok":false}'); }

if (!empty($_POST['website'])) { exit('{"ok":true}'); }   // bot trap

$dir = __DIR__ . '/data';
if (!is_dir($dir)) { mkdir($dir, 0750, true); }

// Rate limit: 5 signups per IP per 10 minutes (IP stored only as a hash)
$ipHash = hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? '') . 'kavora-salt');
$rlFile = $dir . '/ratelimit.json';
$now = time();
$rl = is_file($rlFile) ? (json_decode(@file_get_contents($rlFile), true) ?: []) : [];
foreach ($rl as $k => $times) { $rl[$k] = array_values(array_filter($times, fn($t) => $t > $now - 600)); if (!$rl[$k]) unset($rl[$k]); }
if (count($rl[$ipHash] ?? []) >= 5) { http_response_code(429); exit('{"ok":false,"error":"rate"}'); }
$rl[$ipHash][] = $now;
@file_put_contents($rlFile, json_encode($rl), LOCK_EX);

$email = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
if (!$email || strlen($email) > 200) { http_response_code(422); exit('{"ok":false,"error":"invalid"}'); }
$source = substr(preg_replace('/[^a-zA-Z0-9\/\-_.]/', '', $_POST['source'] ?? ''), 0, 60);

$file = $dir . '/waitlist.csv';
// skip duplicates
if (is_file($file) && stripos(file_get_contents($file), $email . ',') !== false) { exit('{"ok":true}'); }
$new = !is_file($file);
$fh = fopen($file, 'a');
if (!$fh) { http_response_code(500); exit('{"ok":false}'); }
flock($fh, LOCK_EX);
if ($new) { fputcsv($fh, ['email', 'source', 'joined_utc']); }
fputcsv($fh, [$email, $source, gmdate('c')]);
flock($fh, LOCK_UN);
fclose($fh);
echo '{"ok":true}';
