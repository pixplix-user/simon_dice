<?php
require_once(__DIR__."/vendor/autoload.php");

if(phpversion() < 7){
  exit("Versión de php no soportada");
}


if (session_status() === PHP_SESSION_NONE) {
  session_start();
}

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$GLOBALS["dbGeneral"] = new MysqliDb (Array(
                'host' => $_ENV["DB_HOST"],
                'username' => $_ENV["DB_USER"],
                'password' => $_ENV["DB_PASS"],
                'db'=> $_ENV["DB_NAME"],
                'port' => $_ENV["DB_PORT"],
                'prefix' => '',
                'charset' => 'utf8'
              ));
?>
