<?php

namespace Migrations;

use Core\Migration;

class Migration1655198940 extends Migration
{
    public function up()
    {
        $table = "migrations";
        $this->createTable($table);
        $this->addColumn($table, 'migration', 'varchar', ['size'=>35]);
        $this->addIndex($table, 'migration');
    }
}
