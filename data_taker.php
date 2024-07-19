<?php
require_once("Connection.php");
$connection = new Connection();
$action = (int) $_GET["action"];
$data_queries = [["SELECT * FROM obra", true],["SELECT * FROM genre", true],["SELECT * FROM rating", true],["INSERT INTO obra VALUES (default, :name, :image, :sinopsis, :type, :genre_id, :watched)", false],["INSERT INTO VALUES", false],["INSERT INTO VALUES", false],["", false],["", false],["", false],["", false]];
$return;
$query = $data_queries[$action][0];
$type = $data_queries[$action][1];
$binds = $_GET["binds"] ?? [];
$return = $connection->execute($query, $type, $binds);
print_r(json_encode($return));
