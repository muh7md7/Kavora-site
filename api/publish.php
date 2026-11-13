<?php
/**
 * Keelbiz publish hook — pulls the latest build from the public GitHub `deploy` branch into public_html.
 * Called by the "Publish website" GitHub Action after every build (also safe to call by hand).
 * It only ever installs the official repo/branch below, skips if nothing changed, and is rate-limited.
 * Server-only files (api/config.php, api/_data) are never touched.
 */
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
@set_time_limit(120);

const REPO = 'muh7md7/Kavora-site';
const BRANCH = 'deploy';
function out(int $code, array $body): never { http_response_code($code); echo json_encode($body); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') out(405, ['ok' => false, 'error' => 'method']);
if (!class_exists('ZipArchive')) out(500, ['ok' => false, 'error' => 'zip_unavailable']);

$root = dirname(__DIR__);                         // public_html
$data = __DIR__ . '/_data';
if (!is_dir($data)) { @mkdir($data, 0700, true); @file_put_contents("$data/.htaccess", "Require all denied\n"); @file_put_contents("$data/index.html", ''); }

// Rate limit + single run
$lock = fopen("$data/publish.lock", 'c');
if (!$lock || !flock($lock, LOCK_EX | LOCK_NB)) out(429, ['ok' => false, 'error' => 'busy']);
$last = (int)@file_get_contents("$data/publish.last");
if (time() - $last < 20) out(429, ['ok' => false, 'error' => 'too_soon']);
file_put_contents("$data/publish.last", (string)time());

function http_get(string $url): string|false {
  $ch = curl_init($url);
  curl_setopt_array($ch, [CURLOPT_RETURNTRANSFER => true, CURLOPT_FOLLOWLOCATION => true, CURLOPT_TIMEOUT => 60,
    CURLOPT_USERAGENT => 'keelbiz-publisher', CURLOPT_HTTPHEADER => ['Accept: application/vnd.github+json']]);
  $r = curl_exec($ch); $code = curl_getinfo($ch, CURLINFO_RESPONSE_CODE); curl_close($ch);
  return ($r !== false && $code === 200) ? $r : false;
}

$meta = http_get('https://api.github.com/repos/' . REPO . '/commits/' . BRANCH);
$sha = $meta ? (json_decode($meta, true)['sha'] ?? '') : '';
if (!preg_match('/^[0-9a-f]{40}$/', $sha)) out(502, ['ok' => false, 'error' => 'github_lookup']);
$current = trim((string)@file_get_contents("$data/publish.sha"));
if ($sha === $current) out(200, ['ok' => true, 'status' => 'up_to_date', 'sha' => $sha]);

$zipBody = http_get('https://codeload.github.com/' . REPO . '/zip/' . $sha);
if ($zipBody === false) out(502, ['ok' => false, 'error' => 'download']);
$tmp = "$data/publish-" . substr($sha, 0, 12) . '.zip';
file_put_contents($tmp, $zipBody);
$zip = new ZipArchive();
if ($zip->open($tmp) !== true) { @unlink($tmp); out(500, ['ok' => false, 'error' => 'zip_open']); }

// Collect files under the archive's top folder, rejecting anything unsafe.
$files = [];
for ($i = 0; $i < $zip->numFiles; $i++) {
  $name = $zip->getNameIndex($i);
  $rel = substr($name, strpos($name, '/') + 1);
  if ($rel === '' || str_ends_with($rel, '/')) continue;
  if (str_contains($rel, '..') || str_starts_with($rel, '/') || str_starts_with($rel, '.git/')) continue;
  if (preg_match('#^api/(config\.php|_data/)#', $rel)) continue; // never overwrite server-only files
  $files[$rel] = $i;
}
if (!isset($files['index.html'])) { $zip->close(); @unlink($tmp); out(500, ['ok' => false, 'error' => 'not_a_build']); }

// First run: clear the old hashed asset folder so stale chunks don't pile up.
$prev = is_file("$data/publish.manifest") ? (json_decode((string)file_get_contents("$data/publish.manifest"), true) ?: []) : null;
if ($prev === null && is_dir("$root/_next")) {
  $it = new RecursiveIteratorIterator(new RecursiveDirectoryIterator("$root/_next", FilesystemIterator::SKIP_DOTS), RecursiveIteratorIterator::CHILD_FIRST);
  foreach ($it as $f) { $f->isDir() ? @rmdir($f->getPathname()) : @unlink($f->getPathname()); }
}

$written = 0; $failed = [];
foreach ($files as $rel => $idx) {
  $dest = "$root/$rel";
  if (!is_dir(dirname($dest))) @mkdir(dirname($dest), 0755, true);
  $body = $zip->getFromIndex($idx);
  if ($body === false || @file_put_contents("$dest.tmp-publish", $body) === false || !@rename("$dest.tmp-publish", $dest)) { $failed[] = $rel; continue; }
  $written++;
}
$zip->close(); @unlink($tmp);

// Remove files that were published before but are gone from this build.
$removed = 0;
if (is_array($prev)) {
  foreach (array_diff($prev, array_keys($files)) as $rel) {
    if (str_contains($rel, '..')) continue;
    if (is_file("$root/$rel") && @unlink("$root/$rel")) $removed++;
  }
}
if (!$failed) {
  file_put_contents("$data/publish.manifest", json_encode(array_keys($files)));
  file_put_contents("$data/publish.sha", $sha);
}
out($failed ? 500 : 200, ['ok' => !$failed, 'status' => 'published', 'sha' => $sha, 'written' => $written, 'removed' => $removed, 'failed' => array_slice($failed, 0, 10)]);
