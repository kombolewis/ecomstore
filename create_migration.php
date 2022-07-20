<?php


if (php_sapi_name() != 'cli') die('Restricted');

define('DS', DIRECTORY_SEPARATOR);
define('ROOT', dirname(__FILE__));

$fileName = "Migration".time();
$ext = ".php";
$fullPath = ROOT.DS.'migrations'.DS.$fileName.$ext;

$content = "<?php \r\n
namespace Migrations; \r\n
use Core\Migration; \r

class {$fileName} extends Migration \r
{
\tpublic function up() {

\t}
}
";
file_put_contents($fullPath,$content);