<?php

namespace App\Models\Abstracts;

use Core\Model;
use App\Models\Traits\ModelTrait;
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
    public const table = 'product';

    public function __construct()
    {
        parent::__construct(self::table);
    }

    protected function baseValidation()
    {
        $this->runValidation(new RequiredValidator($this, ['field' => 'sku', 'msg' => 'SKU field is required']));
        $this->runValidation(new UniqueValidator($this, ['field' => 'sku', 'msg' => 'SKU already exists please choose another']));


        $this->runValidation(new RequiredValidator($this, ['field' => 'name', 'msg' => 'Last Name is required']));

        $this->runValidation(new RequiredValidator($this, ['field' => 'price', 'msg' => 'Last Name is required']));
        $this->runValidation(new NumericValidator($this, ['field' => 'price', 'msg' => 'Price Must be a number']));

        $this->runValidation(new RequiredValidator($this, ['field' => 'productType', 'msg' => 'Product Type is required']));
    }

    public function remove(array $ids): bool
    {
        foreach ($ids as $id) {
            $ok = $this->findById($id)->delete();
            if (!$ok) {
                break;
            }
        }

        return $ok;
    }

    public function store(array $item): bool
    {
        $this->assign($item);
        return $this->save();
    }
    abstract public static function all(): array ;
}
