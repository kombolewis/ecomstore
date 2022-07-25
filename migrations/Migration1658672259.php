<?php

namespace Migrations;

use Core\Migration;

class Migration1658672259 extends Migration
{
    public function up()
    {
        $table = "product";
        $this->createTable($table);
        $this->addColumn($table, 'sku', 'varchar', ['size'=>200]);
        $this->addColumn($table, 'name', 'varchar', ['size'=>200]);
        $this->addColumn($table, 'price', 'decimal', ['size' => '10,2']);
        $this->addColumn($table, 'productType', 'varchar', ['size'=>50]);
        $this->addColumn($table, 'size', 'integer', ['size'=> 11]);
        $this->addColumn($table, 'weight', 'integer', ['size'=> 11]);
        $this->addColumn($table, 'height', 'integer', ['size'=> 11]);
        $this->addColumn($table, 'width', 'integer', ['size'=> 11]);
        $this->addColumn($table, 'length', 'integer', ['size'=> 11]);
    }
}
