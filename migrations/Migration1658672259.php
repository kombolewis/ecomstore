<?php

namespace Migrations;

use Core\Migration;

class Migration1658672259 extends Migration
{
    public $table = "product";

    public function up()
    {
        $this->createTable($this->table);
        $this->addColumn($this->table, 'sku', 'varchar', ['size'=>200]);
        $this->addColumn($this->table, 'name', 'varchar', ['size'=>200]);
        $this->addColumn($this->table, 'price', 'decimal', ['size' => '10,2']);
        $this->addColumn($this->table, 'productType', 'varchar', ['size'=>50]);
        $this->addColumn($this->table, 'size', 'integer', ['size'=> 11]);
        $this->addColumn($this->table, 'weight', 'integer', ['size'=> 11]);
        $this->addColumn($this->table, 'height', 'integer', ['size'=> 11]);
        $this->addColumn($this->table, 'width', 'integer', ['size'=> 11]);
        $this->addColumn($this->table, 'length', 'integer', ['size'=> 11]);
    }

    public function down()
    {
        $this->dropTable($this->table);
    }
}
