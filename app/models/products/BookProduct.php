<?php

namespace App\Models\Products;

use Core\Validators\NumericValidator;
use Core\Validators\RequiredValidator;
use App\Models\Abstracts\AbstractProduct;

class BookProduct extends AbstractProduct
{
    protected $weight;

    private const type = 'Book';

    public function __construct()
    {
        parent::__construct();
    }

    public static function all(): array
    {
        $product = new BookProduct();
        return $product->find([
            'conditions' => 'productType = ?',
            'bind' => [self::type]
        ]);
    }

    public function validator()
    {
        $this->baseValidation();
        $this->runValidation(new RequiredValidator($this, ['field' => 'weight', 'msg' => "weight is required"]));
        $this->runValidation(new NumericValidator($this, ['field' => 'weight', 'msg' => "weigth must be an integer"]));
    }
}
