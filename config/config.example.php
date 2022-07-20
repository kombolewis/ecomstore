<?php
define('DEBUG', false);

define('DB_NAME', ''); //database name
define('DB_USER', ''); //database user
define('DB_PASSWORD', ''); //database password
define('DB_HOST', ''); //database host

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
