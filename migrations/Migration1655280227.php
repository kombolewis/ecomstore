<?php

namespace Migrations;

use Core\Migration;

class Migration1655280227 extends Migration
{
    public function up()
    {

        $uniqueConstraint = "ALTER TABLE `product` ADD UNIQUE(`sku`)";
        $fkConstraint = "ALTER TABLE `product_description` ADD CONSTRAINT 
        `product_description_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);
        ";
        $this->query($uniqueConstraint);
        $this->query($fkConstraint);
    }
}
