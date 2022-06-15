<?php

namespace App\Models;

use Core\Model;
use Core\Validators\NumericValidator;
use Core\Validators\RequiredValidator;


class ProductDescription extends Model {
  public $id, $attribute, $value, $product_id;

  function __construct() {
    parent::__construct('product_description');
  }


  public function validator() {
    $attribute = $this->attribute;
    $this->runValidation(new RequiredValidator($this,['field' => 'attribute', 'msg' => 'SKU field is required']));
    $this->runValidation(new RequiredValidator($this,['field' => 'value', 'msg' => "{$attribute} is required"]));
    $this->runValidation(new NumericValidator($this,['field' => 'value', 'msg' => "{$attribute} Must be a number"]));
  
  }


}