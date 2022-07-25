<?php

namespace Seed\Categories;

use Seed\Traits\SeederTrait;
use App\Models\Products\DvdProduct;

class DvdSeeder extends DvdProduct
{
    use SeederTrait;

    private string $type;

    public function __construct(string $type)
    {
        parent::__construct();
        $this->type = $type;
    }

    public function seed()
    {
        $this->store($this->generateColumnsData());
    }

    public function afterSave()
    {
        $error = $this->error();
        $ok = $error ? false : true;
        if ($ok) {
            $this->response($ok, "{$this->name} saved successfully", true);
        } else {
            $this->response($ok, "{$this->name} was not saved", true);
        }
    }

    private function generateColumnsData(): array
    {
        return [
            'sku' => $this->generateRandomSku(),
            'name' => $this->generateRandomName(),
            'price' => $this->generateRandomInt(),
            'productType' => $this->type,
            'size' => $this->generateRandomInt()
        ];
    }
}
