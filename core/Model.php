<?php

namespace Core;

use stdClass;

class Model
{
    protected $_db;
    protected $_table;
    protected $_modelName;
    protected $_softDelete = false;
    protected $_validationErrors = [];
    protected $_validates=true;
    protected $id;

    public function __construct($table)
    {
        $this->_db = DB::getInstance();
        $this->_table = $table;
        $this->_modelName = str_replace(' ', '', ucwords(str_replace('_', ' ', $this->_table)));
    }


    protected function _softDeleteParams($params)
    {
        if ($this->_softDelete) {
            if (array_key_exists('conditions', $params)) {
                if (is_array($params['conditions'])) {
                    $params['conditions'][] = 'deleted != 1';
                } else {
                    $params['conditions'] .= 'AND deleted != 1';
                }
            } else {
                $params['conditions'] = 'deleted != 1';
            }
        }
        return $params;
    }

    public function find($params = [])
    {
        $params = $this->_softDeleteParams($params);
        $resultsQuery = $this->_db->find($this->_table, $params, get_class($this));
        if (!$resultsQuery) {
            return [];
        }
        return $resultsQuery;
    }

    public function findFirst($params = [])
    {
        $params = $this->_softDeleteParams($params);
        return $this->_db->findFirst($this->_table, $params, get_class($this));
    }

    public function findById($id)
    {
        return $this->findFirst(['conditions' => 'id = ?', 'bind' => [$id]]);
    }

    public function save(): bool
    {
        $this->validator();
        if ($this->_validates) {
            $this->beforeSave();
            $fields = $this->fields();

            //determine whether to update or insert

            if (property_exists($this, 'id') && $this->id  != '') {
                $save = $this->update($this->id, $fields);
                $this->afterSave();
                return $save;
            } else {
                $save = $this->insert($fields);
                $this->afterSave();
                return $save;
            }
        }
        return false;
    }

    public function insert($fields)
    {
        if (empty($fields)) {
            return false;
        }
        return $this->_db->insert($this->_table, $fields);
    }


    public function update($id, $fields)
    {
        if (empty($fields) || $id == '') {
            return false;
        }
        return $this->_db->update($this->_table, $id, $fields);
    }


    public function delete($id = '')
    {
        if ($id == '' && $this->id == '') {
            return false;
        }
        $id = ($id == '') ? $this->id : $id;
        if ($this->_softDelete) {
            return $this->update($id, ['deleted' => 1]);
        }
        return $this->_db->delete($this->_table, $id);
    }

    public function query($sql, $bind=[])
    {
        return $this->_db->query($sql, $bind);
    }


    public function data()
    {
        $data = new stdClass();
        foreach ($this->fields() as $column => $value) {
            $data->$column = $value;
        }
        return $data;
    }

    public function assign($params)
    {
        if (!empty($params)) {
            foreach ($params as $key => $val) {
                if (property_exists($this, $key)) {
                    $this->$key = $val;
                }
            }
            return true;
        }
        return false;
    }

    protected function populateObjData($result)
    {
        foreach ($result as $key => $val) {
            $this->$key = $val;
        }
    }

    public function get_columns()
    {
        return $this->_db->get_columns($this->_table);
    }

    private function fields()
    {
        $columns = array_column(array_map(fn ($item) => (array) $item, $this->get_columns()), 'Field');

        $item = [];
        foreach ($columns as $column) {
            if (property_exists($this, $column)) {
                $item[$column] = $this->$column;
            }
        }
        return $item;
    }

    public function runValidation($validator)
    {
        $key = $validator->field;
        if (!$validator->success) {
            $this->_validates = false;
            $this->_validationErrors[$key] = $validator->msg;
        }
    }

    public function getErrorMessages()
    {
        return $this->_validationErrors;
    }

    public function validationPassed()
    {
        return $this->_validates;
    }


    public function addErrorMessage($field, $msg)
    {
        $this->_validates = false;
        $this->_validationErrors[$field] = $msg;
    }

    public function isNew()
    {
        return (property_exists($this, 'id') && !empty($this->id)) ? true : false;
    }

    public function error(): bool
    {
        return $this->_db->error();
    }

    public function validator()
    {
    }

    public function beforeSave()
    {
    }

    public function afterSave()
    {
    }
}
