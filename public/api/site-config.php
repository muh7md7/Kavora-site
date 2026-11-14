<?php
// Default enquiry settings shipped with the site — contains no secrets.
// A server-only api/config.php (or /home/USER/keelbiz-config.php) overrides this file completely.
return [
  'notify_to' => 'hello@keelbiz.com',
  'allowed_origins' => ['https://keelbiz.com', 'https://www.keelbiz.com'],
  'allow_same_host' => true,
  'data_dir' => '',
  'rate_window' => 3600, 'rate_max' => 5, 'rate_salt' => '98d6d5f129e08cc1722073c1',
  'smtp_from' => 'hello@keelbiz.com',
  'mail_envelope_from' => 'hello@keelbiz.com',
];
