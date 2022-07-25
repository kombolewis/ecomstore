<?php

namespace Seed\Traits;

use Core\DB;
use App\Models\Abstracts\AbstractProduct;

trait SeederTrait
{
    protected function generateRandomName(): string
    {
        return 'product' . rand(0, 100);
    }

    protected function generateRandomSku(): string
    {
        $length = 8;
        return substr(str_shuffle(str_repeat($x='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', ceil($length/strlen($x)))), 1, $length);
    }

    public function generateRandomInt(): int
    {
        return rand(100, 800);
    }

    public function generateRandomProductType(): string
    {
        $types = ['DVD', 'Furniture','Book'];
        $int = rand(0, sizeof($types)-1);
        return $types[$int];
    }

    public function truncate()
    {
        $table = AbstractProduct::table;
        $productTruncationError = DB::getInstance()->query("DELETE FROM {$table}")->error();
        return !$productTruncationError;
    }

    public function response($res, $msg, $cli)
    {
        $title = ($res) ? "SUCCESS: " : "FAIL: ";

        if ($cli) {
            $for = ($res) ? "\e[0;37;" : "\e[0;37;";
            $back = ($res) ? "42m" : "41m";
            echo $for.$back."\n\n"."    ".$title.$msg."\n\e[0m\n";
        } else {
            $color = ($res) ? "#006600" : "#CC0000";
            echo '<p style="color:'.$color.'">'.$title.$msg.'</p>';
        }
    }
}
