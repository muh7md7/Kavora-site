<?php
// Real-time, honest social proof: people on the site right now + waitlist counts.
// Each open tab pings every 30s with a random id; nothing personal is stored.
header('Content-Type: application/json');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
$dir = __DIR__ . '/data';
if (!is_dir($dir)) { mkdir($dir, 0750, true); }
$now = time();

// live visitors (active in the last 75 seconds)
$liveFile = $dir . '/live.json';
$fh = fopen($liveFile, 'c+');
$live = 0;
if ($fh && flock($fh, LOCK_EX)) {
  $raw = stream_get_contents($fh);
  $map = json_decode($raw ?: '{}', true) ?: [];
  $sid = preg_replace('/[^a-z0-9]/', '', strtolower($_GET['sid'] ?? ''));
  if (strlen($sid) >= 8 && strlen($sid) <= 40) { $map[$sid] = $now; }
  foreach ($map as $k => $t) { if ($t < $now - 75) unset($map[$k]); }
  if (count($map) > 5000) { $map = array_slice($map, -5000, null, true); }
  $live = count($map);
  ftruncate($fh, 0); rewind($fh); fwrite($fh, json_encode($map));
  fflush($fh); flock($fh, LOCK_UN); fclose($fh);
}

// waitlist totals
$week = 0; $total = 0;
$csv = $dir . '/waitlist.csv';
if (is_file($csv) && ($w = fopen($csv, 'r'))) {
  fgetcsv($w);
  while (($row = fgetcsv($w)) !== false) {
    $total++;
    $t = strtotime($row[2] ?? '');
    if ($t && $t > $now - 7 * 86400) $week++;
  }
  fclose($w);
}
echo json_encode(['ok' => true, 'live' => $live, 'week' => $week, 'total' => $total]);
