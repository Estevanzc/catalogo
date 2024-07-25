<?php
require_once("Connection.php");
$connection = new Connection();
$action = (int) $_GET["action"];
$data_queries = [["SELECT * FROM obra", true],["SELECT * FROM genre", true],["SELECT * FROM rating", true],["INSERT INTO obra VALUES (default, :name, :image, :sinopsis, :type, :genre_id, :watched)", false],["INSERT INTO genre VALUES (default, :id, :name)", false],["INSERT INTO rating VALUES (default, :note, :obra_id, :observations)", false],["UPDATE obra SET name=:name, image=:image, sinopsis=:sinopsis, type=:type, genre_id=:genre_id, watched=:watched WHERE id=:id", false],["DELETE FROM obra WHERE id=:id", false],["DELETE FROM genre WHERE id=:id", false],["DELETE FROM rating WHERE id=:id", false]];
$return;
$query = $data_queries[$action][0];
$type = $data_queries[$action][1];
$binds = $_GET["binds"] ?? [];
if ($binds != null) {
    $binds = urldecode($binds);
    $binds = json_decode($binds);
}
$return = $connection->execute($query, $type, $binds);
print_r(json_encode($return));
