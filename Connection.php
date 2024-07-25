<?php
require_once("Connection_cfg.php");
final class Connection {
    private $connection;
    public function __construct() {
        $this->connection = new PDO("mysql:host=".HOST.";dbname=". BASE, USER, PASS);
        $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    public function execute($query, $type = false, $binds = []) {
        $statement = $this->connection->prepare($query);
        foreach ($binds as $bind_name => $bind) {   
            $statement->bindValue(":$bind_name", $bind);
        }
        $return = $statement->execute();
        if ($type) {
            $return = $statement->fetchAll();
        }
        return $return;
    }
    public function getLastInsertId() {
        return $this->connection->lastInsertId();
    }
    public function __destruct() {
        $this->connection = null;
    }
}