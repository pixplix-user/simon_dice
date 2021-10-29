<?php

require_once(__DIR__."/core.php");

if(!file_get_contents('php://input') || strlen(file_get_contents('php://input')) <= 0){
  exit("Solicitud incorrecta.");
}

$data = json_decode(file_get_contents('php://input'));

if(!$data || !$data->metodoReq){
  exit("Solicitud incorrecta.");
}

$metodo = (string) trim($data->metodoReq);

switch ($metodo) {
  case 'guardarRecord':
    $nombre = $data->nombre;
    $nivel = $data->nivel;
    $score = $data->score;
    $session = $data->session;

    $accion = new simondice();
    $result = $accion->saveRecord($nombre, $nivel, $score, $session);
    echo json_encode($result);
  break;
  case 'checkRecords':
    $accion = new simondice();
    $result = $accion->checkRecords($data->session);
    echo json_encode($result, true);
  break;
  default:
    exit("Método ingresado incorrecto.");
  break;
}

class simondice
{
  private $db;
  public function __construct()
  {
    $this->setDatabase();
  }

  public function setDatabase(){
    global $dbGeneral;
    $this->db = $dbGeneral;
  }

  public function saveRecord($nombre, $nivel, $score, $sessionid){
    $nombre = base64_decode($nombre);

    if(!$score || $score == null || !isset($score) || is_null($score)){
      $score = 0;
    }
    if(!$nivel || $nivel == null || !isset($nivel) || is_null($nivel)){
      $nivel = 0;
    }
    if(!$nombre || $nombre == null || !isset($nombre) || is_null($nombre)){
      $nombre = 'Simón Dice';
    }

    $records = $this->checkRecords($sessionid);

    if(count($records) <= 0){
      $data = Array("sessionid" => $sessionid, "nombres" => $nombre);
      $id = $this->db->insert('users', $data);

      if(!$id){
        return false;
      }
    }else{
      $id = $records[0]["id"];

      if(!$id){
        return false;
      }
    }

    $this->setDatabase();

    $dataGame = Array("userid" => $id, "record" => $score, "nivel" => $nivel);

    if($this->db->insert('games', $dataGame)){
      return true;
    }else{
      return false;
    }
  }

  public function checkRecords($sessionid){
    $this->db->join("games AS gm", "gm.userid = us.id", "LEFT");
    $this->db->where("us.sessionid", $sessionid);
    $this->db->orderBy("gm.id","DESC");
    $user = $this->db->get("users AS us", null, "us.id AS id, us.sessionid, us.nombres, gm.userid, gm.record, gm.nivel, DATE(gm.fecha) AS fecha");

    return $user;
  }
}

?>
