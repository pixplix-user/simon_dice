<?php require_once(__DIR__."/core.php"); ?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Simón dice</title>
</head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
  <link rel="stylesheet" type="text/css" href="main.css">
</head>

<body>
    <div class="container">
      <input type="hidden" id="unicaSesion" value="<?= session_id() ?>">
      <div class="row justify-content-center">
        <div class="col-4 row">
          <div class="col-12">
            <h1 id="level" class="level" >Nivel: 0</h1>
          </div>
          <div class="col-12">
            <p>Puntuaciones anteriores:</p>
            <ul id="historicoPuntua"></ul>
          </div>
        </div>
        <div class="col-4">
          <h1 id="score" class="score" >Puntuación: 0</h1>
        </div>
        <div class="col-4">
          <h1 id="top-score" class="top-score" >Puntuación Máxima: 0</h1>
        </div>
        <div class="col-12">
          <div class="gameboard">
            <div id="celeste" class="color celeste left" data-color="celeste">
              <div class="borde borde-celeste"></div>
            </div>
            <div id="violeta" class="color violeta right" data-color="violeta">
              <div class="borde borde-violeta"></div>
            </div>
            <div id="naranja" class="color naranja left" data-color="naranja">
              <div class="borde borde-naranja"></div>
            </div>
            <div id="verde" class="color verde right" data-color="verde">
              <div class="borde borde-verde"></div>
            </div>
            <button id="btnStartGame" class="btn-start animation show" onclick="startGame()">Comenzar juego</button>
          </div>
        </div>
      </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js" integrity="sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js" integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossorigin="anonymous"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="main.js"></script>
</body>
</html>
