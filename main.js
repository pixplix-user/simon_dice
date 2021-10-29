var tid = setInterval( function () {
    if ( document.readyState !== 'complete' ) return;
    clearInterval( tid );

    checkRecords();
}, 100 );

const celeste = document.getElementById('celeste'),
      violeta = document.getElementById('violeta'),
      naranja = document.getElementById('naranja'),
      verde = document.getElementById('verde'),
      titleLevel = document.getElementById('level'),
      scoreLevel = document.getElementById('score'),
      topScoreLevel = document.getElementById('top-score'),
      btnStartGame = document.getElementById('btnStartGame'),
      LAST_LEVEL = 10;

window.dataUsr = null;

var topScore = 0, topLevel = 0, scoreLevelF = 0, scoreLevelM = 0;

class Juego{
    constructor(){
      this.inicialize = this.inicialize.bind(this)
      this.inicialize()
      this.generateSecuence()
      setTimeout(() => this.nextLevel(), 500);
    }

    inicialize(){
      this.selectColor = this.selectColor.bind(this)
      this.toggleBtnEmpezar()
      this.level = 1
      this.score = 0

      this.setLevelTitle()
      this.setScore()
      this.setTopScore()

      this.colores = {
        celeste,
        violeta,
        naranja,
        verde,
      }
    }
    toggleBtnEmpezar(){
      btnStartGame.classList.toggle('hide')
      btnStartGame.classList.toggle('show')
      btnStartGame.classList.toggle('wait')
    }

    generateSecuence(){
      this.secuence = new Array(LAST_LEVEL).fill(0).map( n => Math.floor(Math.random() * 4) )
    }

    nextLevel(){
      this.subLevel = 0
      this.iluminateSecuence()
      this.addClickEvents()
    }

    transformNumberToColor(num){
      switch (num) {
        case 0:
          return 'celeste'
        case 1:
          return 'violeta'
        case 2:
          return 'naranja'
        case 3:
          return 'verde'
      }
    }
    transformColorToNumber(color) {
      switch (color) {
        case 'celeste':
          return 0
        case 'violeta':
          return 1
        case 'naranja':
          return 2
        case 'verde':
          return 3
      }
    }

    iluminateSecuence(){
      for (let i = 0; i < this.level; i++) {
        const color = this.transformNumberToColor(this.secuence[i])
        setTimeout(() => this.enlightColor(color), 1000*i);
      }
    }

    enlightColor(color){
      this.colores[color].classList.add('light')
      setTimeout(() => this.apagarColor(color), 350);
    }

    apagarColor(color){
      this.colores[color].classList.remove('light')
    }

    addClickEvents(){
      this.colores.celeste.addEventListener('click', this.selectColor)
      this.colores.violeta.addEventListener('click', this.selectColor)
      this.colores.verde.addEventListener('click', this.selectColor)
      this.colores.naranja.addEventListener('click', this.selectColor)
    }

    removeClickEvents(){
      this.colores.celeste.removeEventListener('click', this.selectColor)
      this.colores.violeta.removeEventListener('click', this.selectColor)
      this.colores.verde.removeEventListener('click', this.selectColor)
      this.colores.naranja.removeEventListener('click', this.selectColor)
    }

    selectColor(ev){
      const nombreColor = ev.target.dataset.color
      const numberColor = this.transformColorToNumber(nombreColor)
      this.enlightColor(nombreColor)

      if (numberColor === this.secuence[this.subLevel]) {
        this.subLevel++
        this.score += 100
        this.setScore()
        if (this.level === this.subLevel) {
          this.level++
          if (this.level === (LAST_LEVEL + 1)) {
            this.wonGame()
          }else{
            this.finishedLevel()
          }
          this.removeClickEvents()
        }
      } else {
        this.lostGame()
      }
    }

    finishedLevel(){
      Swal.fire({
        icon: "success",
        title: `Nivel ${(this.level - 1)} Completado`,
        button: {
          text: `Seguir: Nivel ${(this.level)}`,
        },
      }).then(() => {
        this.score += 500
        this.setLevelTitle()
        this.setScore()
        this.nextLevel()
      })
    }

    wonGame(){
      Swal.fire({
        icon: "success",
        title: "Ganaste el juego",
        text: 'Ganaste',
      }).then(this.inicialize)
    }

    lostGame() {
      scoreLevelM = scoreLevelF;

      Swal.fire({
        icon: "error",
        title: "Game Over",
        text: 'Perdiste',
      }).then(() => {
        this.saveRecords();
        this.removeClickEvents()
        this.inicialize()
      })
    }

    setLevelTitle(){
      topLevel = this.level;
      titleLevel.innerHTML = `Nivel: ${topLevel}`
    }
    setScore() {
      if(this.score > scoreLevelF){
        scoreLevelF = this.score;
      }
      scoreLevel.innerHTML = `Puntuación: ${this.score}`
      if (this.score > topScore) {
        topScore = this.score
        this.setTopScore()
      }
    }
    setTopScore() {
      topScoreLevel.innerHTML = `Puntuación máxima: ${topScore}`
    }
    saveRecords() {
      if(window.dataUsr && (window.dataUsr).length > 0){
        saveDataRecords(window.dataUsr[0]["nombres"]);
      }else{
        Swal.fire({
          title: "Ingresa tu nombre para guardar el puntaje",
          input: "text",
          showCancelButton: true,
          confirmButtonText: "Guardar",
          cancelButtonText: "Cancelar",
          inputValidator: nombre => {
            if (!nombre) {
              return "Por favor escribe tu nombre";
            } else {
              return undefined;
            }
          }
        })
        .then(resultado => {
          if (resultado.value) {
            saveDataRecords(resultado.value);
          }
        });
      }
      scoreLevelF = 0;
    }
}

var startGame = () => {
  window.juego = new Juego()
}

var checkRecords = () => {
  var data = JSON.stringify({
    "session": document.getElementById('unicaSesion').value,
    "metodoReq": "checkRecords"
  });

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
      if(this.responseText && JSON.parse(this.responseText) && (this.responseText).length > 0){
        var data = JSON.parse(this.responseText);
        window.dataUsr = data;
        document.getElementById("historicoPuntua").innerHTML = '';
        var html = '';
        for(llave in data){
          html += `
            <li>Puntaje: ${data[llave]["record"]} - Nivel: ${data[llave]["nivel"]} - Fecha: ${data[llave]["fecha"]}</li>
          `;
        }
        document.getElementById("historicoPuntua").innerHTML = html;
      }
    }
  });

  xhr.open("POST", "./Controller.php", true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.send(data);
}

var saveDataRecords = (nombre) => {
  var data = JSON.stringify({
    nombre: btoa(nombre),
    nivel: topLevel,
    score: scoreLevelM,
    session: document.getElementById('unicaSesion').value,
    metodoReq: "guardarRecord"
  });

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
      checkRecords();
    }
  });

  xhr.open("POST", "./Controller.php", true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.send(data);
}
