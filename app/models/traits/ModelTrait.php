<?php

namespace App\Models\Traits;

use Exception;

trait ModelTrait
{
    /**
     * Return @property mixed $name
     *
     * @param [type] $name
     * @return mixed
     */
    public function __get($name): mixed
    {
        if (property_exists($this, $name)) {
            return $this->$name;
        }
        return null;
    }

    /**
     * Sets @property mixed $name
     *
     * @param [type] $name
     * @param [type] $value
     * @throws Exception
     * @return void
     */
    public function __set($name, $value): void
    {
        if (property_exists($this, $name)) {
            $this->$name = $value;
        }
    }
}
