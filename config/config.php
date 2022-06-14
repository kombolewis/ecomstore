<?php
define('DEBUG', true);

define('DB_NAME', 'ecomstore'); //database name
define('DB_USER', 'kombo'); //database user
define('DB_PASSWORD', '123456'); //database password
define('DB_HOST', '127.0.0.1'); //database host

define('DEFAULT_LAYOUT', 'default'); // if no layout is defined in layout

define('SITE_TITLE', 'EcomStore'); //used if no site title is defined
define('PROOT', '/');
define('MENU_BRAND', 'EcomStore');

define('CURRENT_USER_SESSION_NAME', 'fwvorewwefohwearflmdsfgv'); //session name for logged in user
define('REMEMBER_ME_COOKIE_NAME', 'eolwiejfqmvrfergkdfgickds'); //cookie name for logged in user
define('REMEMBER_ME_COOKIE_EXPIRY', 2592000); 

define('ACCESS_RESTRICTED', 'Restricted'); //controller name for restricted redirect


//headers

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-Requested-With");