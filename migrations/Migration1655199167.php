<?php

namespace Migrations;

use Core\Migration;

class Migration1655199167 extends Migration
{
    public function up() 
    {
        $table = "product";
        $this->createTable($table);
        $this->addColumn($table,'sku','varchar',['size'=>200]);
        $this->addColumn($table,'name','varchar',['size'=>200]);
        $this->addColumn($table,'price','decimal',['size' => '10,2']);
        $this->addColumn($table,'productType','varchar',['size'=>50]);

        $table = "product_description";
        $this->createTable($table);
        $this->addColumn($table,'attribute','varchar',['size'=>255]);
        $this->addColumn($table,'value','varchar',['size'=>255]);
        $this->addColumn($table,'product_id','int');
    }
}
