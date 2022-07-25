<?php

namespace Core;

use PDO;
use PDOException;

class DB
{
    private $_pdo;
    private $_query;
    private $_result;
    private $_count = 0;
    private $_error = false;
    private $_lastInsertID = null;
    private static $_instance = null;

    private function __construct()
    {
        try {
            $this->_pdo = new PDO('mysql:host='.DB_HOST.';dbname='.DB_NAME, DB_USER, DB_PASSWORD);
            $this->_pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
            $this->_pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->_pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
        } catch (PDOException $e) {
            die($e->getMessage());
        }
    }

    public static function getInstance()
    {
        if (!isset(self::$_instance)) {
            self::$_instance = new self(); // the instance is an object of the entire class
        }
        return self::$_instance;
    }

    public function query($sql, $params = [], $class=false)
    {
        $this->_error = false;
        if ($this->_query = $this->_pdo->prepare($sql)) {
            $x = 1;
            if (count($params)) {
                foreach ($params as $param) {
                    $this->_query->bindValue($x, $param);
                    $x++;
                }
            }

            if ($this->_query->execute()) {
                if ($class) {
                    $this->_result = $this->_query->fetchALL(PDO::FETCH_CLASS, $class);
                } else {
                    $this->_result = $this->_query->fetchALL(PDO::FETCH_OBJ);
                }
                $this->_count = $this->_query->rowCount();
                $this->_lastInsertID = $this->_pdo->lastInsertId();
            } else {
                $this->_error = true;
            }
        }
        return $this;
    }

    public function insert($table, $fields=[])
    {
        $fieldString = '';
        $valueString = '';
        $values = [];

        foreach ($fields as $field => $value) {
            $fieldString .= '`' . $field . '`,';
            $valueString .= '?,';
            $values[] = $value;
        }

        $fieldString = rtrim($fieldString, ',');
        $valueString = rtrim($valueString, ',');

        $sql = "INSERT INTO {$table} ({$fieldString}) VALUES ({$valueString})";
        if (!$this->query($sql, $values)->error()) {
            return true;
        }
        return false;
    }

    public function update($table, $id, $fields = [])
    {
        $fieldString = '';
        $values = [];

        foreach ($fields as $field => $value) {
            $fieldString .= ' ' . $field . ' = ?,';
            $values[] = $value;
        }

        $fieldString = trim($fieldString);
        $fieldString = rtrim($fieldString, ',');
        $sql = "UPDATE {$table} SET {$fieldString} where id={$id}";
        if (!$this->query($sql, $values)->error()) {
            return true;
        }
        return false;
    }

    public function delete($table, $id)
    {
        $sql = "DELETE FROM {$table} where id = {$id}";
        if (!$this->query($sql)->error()) {
            return true;
        }
        return false;
    }

    protected function _read($table, $params, $class)
    {
        $conditionString = '';
        $bind = [];
        $order = '';
        $limit = '';

        //condition
        if (isset($params['conditions'])) {
            if (is_array($params['conditions'])) {
                foreach ($params['conditions'] as $condition) {
                    $conditionString .= ' ' . $condition . ' AND';
                }
                $conditionString = trim($conditionString);
                $conditionString = rtrim($conditionString, ' AND');
            } else {
                $conditionString = $params['conditions'];
            }

            if ($conditionString != '') {
                $conditionString = ' Where ' . $conditionString;
            }
        }

        //bind
        if (array_key_exists('bind', $params)) {
            $bind = $params['bind'];
        }

        //order
        if (array_key_exists('order', $params)) {
            $order = ' ORDER BY ' . $params['order'];
        }

        if (array_key_exists('limit', $params)) {
            $limit = ' LIMIT ' . $params['limit'];
        }

        $sql = "SELECT * FROM {$table}{$conditionString}{$order}{$limit}";

        if ($this->query($sql, $bind, $class)) {
            if (!count($this->_result)) {
                return false;
            }
            return true;
        }
        return false;
    }

    public function find($table, $params=[], $class=false)
    {
        if ($this->_read($table, $params, $class)) {
            return $this->results();
        }
        return false;
    }

    public function findFirst($table, $params, $class=false)
    {
        if ($this->_read($table, $params, $class)) {
            return $this->first();
        }
        return false;
    }

    public function results()
    {
        return $this->_result;
    }

    public function first()
    {
        return (!empty($this->_result)) ? $this->_result[0] : [] ;
    }

    public function count()
    {
        return $this->_count;
    }

    public function lastId()
    {
        return $this->_lastInsertID;
    }

    public function get_columns($table)
    {
        return $this->query("SHOW COLUMNS FROM {$table}")->results();
    }

    public function error()
    {
        return $this->_error;
    }
}
