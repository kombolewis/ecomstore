<?php

namespace Seed;

use Core\DB;
use App\Models\Product;
use App\Models\ProductDescription;
use Seed\Traits\SeederTrait;

class ProductDescriptionSeeder extends ProductDescription
{
    use SeederTrait;
    
    public function seedColumns() :bool
    {
        $product = $this->getProduct();

        switch ($product->productType) {
            case 'DVDs':
                $attributes = ['size'];
                break;
            case 'Furniture':
                $attributes = ['height','length','width'];
                break;
            case 'Books':
                $attributes = ['weight'];
                break;
        }

        return $this->populateDescriptionFields($attributes, $product);
    }

    private function populateDescriptionFields(array $attributes, Product $product) :bool
    {

        foreach ($attributes as $attribute) {
            $this->attribute = $attribute;
            $this->value = $this->generateRandomInt();
            $this->product_id = $product->id;
            if (!$ok = $this->save()) {
                break;
            }
        }
        return $ok;
    }

    private function getProduct() :Product
    {
        $product_id = DB::getInstance()->lastId();
        return (new Product())->findById($product_id);
    }

    public function afterSave()
    {
        $error = $this->error();
        $ok = $error ? false : true;
        if ($ok) {
            $this->response($ok,"{$this->attribute} saved successfully", true);
        } else {
            $this->response($ok,"{$this->attribute} was not saved", true);
        }
    }
  
}