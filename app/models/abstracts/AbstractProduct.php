<?php

namespace App\Models\Abstracts;

use Core\Model;
use App\Models\Traits\ModelTrait;
use App\Models\ProductDescription;
use Core\Validators\UniqueValidator;
use Core\Validators\NumericValidator;
use Core\Validators\RequiredValidator;

abstract class AbstractProduct extends Model
{
    use ModelTrait;

    protected $id;
    protected $sku; 
    protected $name; 
    protected $price; 
    protected $productType;
    protected $description;
    protected array $descriptionErrors = [];

    public function __construct(string $table)
    {
        parent::__construct($table);
    }

    protected function saveProduct(array $item) : bool
    {
        $d = new ProductDescription();
        $this->assign($item);

        if ($productOk = $this->save() && $descriptionOk = $d->saveDescription($item, $this->_db->lastId())) {
            return true;
        } elseif ($descriptionOk == false ) {
            $this->descriptionErrors = $d->getErrorMessages();
        }
        return false;
    }

    protected function remove(array $productIds) :bool
    {
        $d = new ProductDescription();

        foreach($productIds as $sku => $id) {
            $product = $this->findById($id);
            if ($ok = $d->removeProductDescription($id)) {
                if(!$ok = $product->delete()) break;
            } else {
                break;
            }
        }

        return $ok;
    }

    public function getDescriptionErrors() :array
    {
        return $this->descriptionErrors;

    }
    public function findProducts() :array
    {
        $productDescription = new ProductDescription();

        return array_map(function ($rec) use ($productDescription) {
            $items = $productDescription->find([
                'conditions' => 'product_id = ?', 
                'bind' => [$rec->id]
            ]);
            $rec->description = $items;
            return $rec;
        }, $this->find());

    }

    public function validator() 
    {
        $this->runValidation(new RequiredValidator($this,['field' => 'sku', 'msg' => 'SKU field is required']));
        $this->runValidation(new UniqueValidator($this,['field' => 'sku', 'msg' => 'SKU already exists please choose another']));


        $this->runValidation(new RequiredValidator($this,['field' => 'name', 'msg' => 'Last Name is required']));

        $this->runValidation(new RequiredValidator($this,['field' => 'price', 'msg' => 'Last Name is required']));
        $this->runValidation(new NumericValidator($this,['field' => 'price', 'msg' => 'Price Must be a number']));

        $this->runValidation(new RequiredValidator($this,['field' => 'productType', 'msg' => 'Product Type is required']));
    
    }
}