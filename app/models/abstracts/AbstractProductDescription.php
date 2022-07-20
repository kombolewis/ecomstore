<?php

namespace App\Models\Abstracts;

use Core\Model;
use App\Models\Traits\ModelTrait;
use Core\Validators\NumericValidator;
use Core\Validators\RequiredValidator;

abstract class AbstractProductDescription extends Model
{
    use ModelTrait;

    protected $id;
    protected $attribute;
    protected $value;
    protected $product_id;
    protected $errors;

    public function __construct($table)
    {
        parent::__construct($table);
    }

    public function removeProductDescription(int $id) : bool
    {
        $items = $this->find([
            'conditions' => 'product_id = ?',
            'bind' => [$id]
        ]);
        
        foreach($items as $item) {
            if(!$status  = $item->delete()) break;
        }
        return $status;
    }

    public function saveDescription(array $data, int $product_id) :bool
    {
        $records = $this->fields($data, $product_id);

        foreach ($records as $record) {
            $this->assign($record);
            if(!$save = $this->save()) break;
        }
    
        return $save;
    }
  
    private function fields(array $data, int $product_id) :array 
    {
        $attributes = ['size', 'weight','height','length','width'];
        $sorted = [];
  
        foreach ($data as $name => $value) {
            if(in_array($name,$attributes)) {
                $items = [];
                $items['attribute'] = $name;
                $items['value'] = $value;
                $items['product_id'] = $product_id;
                $sorted[] = $items;
            }
        }
        return $sorted;
    }

    public function validator() 
    {
        $attribute = $this->attribute;
        $this->runValidation(new RequiredValidator($this,['field' => 'attribute', 'msg' => 'SKU field is required']));
        $this->runValidation(new RequiredValidator($this,['field' => 'value', 'msg' => "{$attribute} is required"]));
        $this->runValidation(new NumericValidator($this,['field' => 'value', 'msg' => "{$attribute} Must be a number"]));

    }   
}