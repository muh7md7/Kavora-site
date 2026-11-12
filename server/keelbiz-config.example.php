<?php
// Copy to /home/USER/keelbiz-config.php (OUTSIDE public_html). Never commit the real file.
return [
  'allowed_origins' => ['https://[YOUR-DOMAIN]', 'https://www.[YOUR-DOMAIN]'],
  'rate_dir' => '/home/USER/keelbiz-rate', 'rate_window' => 3600, 'rate_max' => 5, 'rate_salt' => 'change-me-random',
  'db_dsn' => 'mysql:host=localhost;dbname=DB;charset=utf8mb4', 'db_user' => 'DBUSER', 'db_pass' => 'DBPASS',
  'phpmailer_autoload' => '/home/USER/vendor/autoload.php',
  'smtp_host' => 'smtp.hostinger.com', 'smtp_port' => 587, 'smtp_user' => 'hello@[YOUR-DOMAIN]', 'smtp_pass' => 'SMTPPASS',
  'smtp_from' => 'hello@[YOUR-DOMAIN]', 'notify_to' => 'hello@[YOUR-DOMAIN]',
  'turnstile_secret' => '', // optional
  'n8n_webhook' => '', 'n8n_secret' => '', // optional Option B
];
