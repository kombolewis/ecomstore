<?php

namespace App\Models\Products;

use Core\Validators\NumericValidator;
use Core\Validators\RequiredValidator;
use App\Models\Abstracts\AbstractProduct;

class DvdProduct extends AbstractProduct
{
    protected $size;
    private const type = 'DVD';

    public function __construct()
    {
        parent::__construct();
    }

    public static function all(): array
    {
        $product = new DvdProduct();
        return $product->find([
            'conditions' => 'productType = ?',
            'bind' => [self::type]
        ]);
    }

    public function validator()
    {
        $this->baseValidation();
        $this->runValidation(new RequiredValidator($this, ['field' => 'size', 'msg' => "size is required"]));
        $this->runValidation(new NumericValidator($this, ['field' => 'size', 'msg' => "size must be an integer"]));
    }
}
