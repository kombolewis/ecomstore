<?php

namespace App\Models;

use Core\H;
use Core\Model;
use Core\Validators\NumericValidator;
use Core\Validators\UniqueValidator;
use Core\Validators\RequiredValidator;


class Product extends Model {
  public $id, $sku, $name, $price, $productType;

  function __construct() {
    parent::__construct('product');
  }

  public function findWithDescription() {
    $productDescription = new ProductDescription;
    $products = $this->find();
    $descriptions = [];

    foreach($products as $rec) {
      $items = $productDescription->find([
        'conditions' => 'product_id = ?', 
        'bind' => [$rec->id]
      ]);
      $descriptions[$rec->id] = $items;
    }

    return [$products, $descriptions];
  }

  public function validator() {
    $this->runValidation(new RequiredValidator($this,['field' => 'sku', 'msg' => 'SKU field is required']));
    $this->runValidation(new UniqueValidator($this,['field' => 'sku', 'msg' => 'SKU already exists please choose another']));


    $this->runValidation(new RequiredValidator($this,['field' => 'name', 'msg' => 'Last Name is required']));

    $this->runValidation(new RequiredValidator($this,['field' => 'price', 'msg' => 'Last Name is required']));
    $this->runValidation(new NumericValidator($this,['field' => 'price', 'msg' => 'Price Must be a number']));

    $this->runValidation(new RequiredValidator($this,['field' => 'productType', 'msg' => 'Product Type is required']));

  
  }


}