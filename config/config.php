<?php
define('DEBUG', $_ENV['DEBUG']);

define('DB_NAME', $_ENV['DB_NAME']); //database name
define('DB_USER', $_ENV['DB_USER']); //database user
define('DB_PASSWORD', $_ENV['DB_PASSWORD']); //database password
define('DB_HOST', $_ENV['DB_HOST']); //database host

define('DEFAULT_LAYOUT', 'default'); // if no layout is defined in layout

define('SITE_TITLE', 'EcomStore'); //used if no site title is defined
define('PROOT', '/');
define('MENU_BRAND', 'EcomStore');

define('CURRENT_USER_SESSION_NAME', 'fwvorewwefohwearflmdsfgv'); //session name for logged in user
define('REMEMBER_ME_COOKIE_NAME', 'eolwiejfqmvrfergkdfgickds'); //cookie name for logged in user
define('REMEMBER_ME_COOKIE_EXPIRY', 2592000); 

define('ACCESS_RESTRICTED', 'Restricted'); //controller name for restricted redirect

