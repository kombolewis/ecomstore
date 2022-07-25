<?php

namespace App\Models\Products;

use Core\Validators\NumericValidator;
use Core\Validators\RequiredValidator;
use App\Models\Abstracts\AbstractProduct;

class FurnitureProduct extends AbstractProduct
{
    protected $length;
    protected $width;
    protected $height;
    private const type = 'Furniture';

    public function __construct()
    {
        parent::__construct();
    }

    public static function all(): array
    {
        $product = new FurnitureProduct();
        return $product->find([
            'conditions' => 'productType = ?',
            'bind' => [self::type]
        ]);
    }

    public function validator()
    {
        $this->baseValidation();
        $this->runValidation(new RequiredValidator($this, ['field' => 'length', 'msg' => "length is required"]));
        $this->runValidation(new NumericValidator($this, ['field' => 'length', 'msg' => "length must be an integer"]));

        $this->runValidation(new RequiredValidator($this, ['field' => 'width', 'msg' => "width is required"]));
        $this->runValidation(new NumericValidator($this, ['field' => 'width', 'msg' => "width must be an integer"]));

        $this->runValidation(new RequiredValidator($this, ['field' => 'height', 'msg' => "height is required"]));
        $this->runValidation(new NumericValidator($this, ['field' => 'height', 'msg' => "height must be an integer"]));
    }
}
