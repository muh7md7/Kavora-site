<?php
// Keelbiz enquiry config. Copy to public_html/api/config.php (blocked from the web by api/.htaccess)
// or, preferably, to /home/USER/keelbiz-config.php (outside public_html). Never commit the real file.
return [
  'notify_to' => 'you@example.com',          // REQUIRED — where enquiries are delivered
  'allowed_origins' => [],                    // e.g. ['https://keelbiz.example', 'https://www.keelbiz.example']
  'allow_same_host' => true,                  // accept posts from the same host the endpoint is served on (temp domains)
  'data_dir' => __DIR__ . '/keelbiz-data',      // private folder for the JSONL log + rate files (outside public_html); '' = api/_data
  'rate_window' => 3600, 'rate_max' => 5, 'rate_salt' => 'change-me-random',
  'smtp_from' => '',                          // sender address; default no-reply@HOST
  'mail_envelope_from' => '',                 // optional -f for mail()
  // Optional SMTP via PHPMailer (composer require phpmailer/phpmailer outside web root); otherwise PHP mail() is used
  'phpmailer_autoload' => '', 'smtp_host' => '', 'smtp_port' => 587, 'smtp_user' => '', 'smtp_pass' => '',
  // Optional MySQL store (JSONL log is always written)
  'db_dsn' => '', 'db_user' => '', 'db_pass' => '',
  'turnstile_secret' => '',                   // optional Cloudflare Turnstile
  'n8n_webhook' => '', 'n8n_secret' => '',    // optional CRM / automation forward
];
