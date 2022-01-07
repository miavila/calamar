const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let posPlayer1 = 515;
let posPlayer2 = 515;
let colorSemaforo = "green";
let colorPlayer1 = "green";
let colorPlayer2 = "green";

function draw() {
  ctx.beginPath();
  ctx.rect(75, posPlayer1, 25, 25);
  ctx.fillStyle = colorPlayer1;
  ctx.fill();

  ctx.beginPath();
  ctx.rect(150, posPlayer2, 25, 25);
  ctx.fillStyle = colorPlayer2;
  ctx.fill();

  ctx.beginPath();
  ctx.rect(0, 0, 250, 25);
  ctx.fillStyle = colorSemaforo;
  ctx.fill();
}

const sound = new Audio();
  
function instrucciones() {
  sound.src = "instrucciones.mp3";
  sound.play();
}

function luzVerde() {
  sound.src = "luzverde.mp3";
  sound.play();
}

function luzVerde1() {
  sound.src = "luzverde1.mp3";
  sound.play();
}

function luzVerde2() {
  sound.src = "luzverde2.mp3";
  sound.play();
}

function disparoSound() {
  sound.src = "disparo.mp3";
  sound.play();
}

let onSemaforo = 0;
function semaforo() {
  let min = 3;
  let max = 8;
  var rand = Math.floor(Math.random() * (max - min + 1) + min);
  console.log("Wait for " + rand + " seconds");
  onSemaforo = setTimeout(semaforo, rand * 1000);
  if (colorSemaforo == "red") {
    colorSemaforo = "green";
    console.log(rand);
    if (rand > 6) {
      luzVerde();
    } else if (rand <= 6 && rand > 4) {
      luzVerde1();
    } else {
      luzVerde2();
    }
  } else {
    colorSemaforo = "red";
  }
  draw();
}

draw();
semaforo();

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    if (colorSemaforo == "red") {
      disparoSound();
      colorPlayer1 = "red";
      clearTimeout(onSemaforo);
    } else {
      ctx.clearRect(0, 0, 250, 600);
      posPlayer1 -= 3;
      if (posPlayer1 < 0) {
        posPlayer1 = 0;
        alert("Has ganado player 1");
      }
    }
    draw();
  }
  if (e.key === ' ') {
    if (colorSemaforo == "red") {
      disparoSound();
      colorPlayer2 = "red";
      clearTimeout(onSemaforo);
    } else {
      ctx.clearRect(0, 0, 250, 600);
      posPlayer2 -= 3;
      if (posPlayer2 < 0) {
        posPlayer2 = 0;
        alert("Has ganado player 2");
      }
    }
    draw();
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key === 's') {
    posPlayer1 = 515;
    posPlayer2 = 515;
    colorPlayer1 = "green";
    colorPlayer2 = "green";
    ctx.clearRect(0, 0, 250, 600);
    clearTimeout(onSemaforo);
    semaforo();
    draw();
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key === 'i') {
    clearTimeout(onSemaforo);
    instrucciones();
    setTimeout(semaforo, 10000);
  }
});
