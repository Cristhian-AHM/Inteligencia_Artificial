//Nota: Este ejemplo solo funciona en Google Chrome.

//Variable para almacenar el objeto.
var speechRec;
//Variables para dibujar
var x, y;
var dx, dy;
var Scale = 1;

function setup() {
  //Se crea el canvas del tamaño de la ventana.
  createCanvas(windowWidth, windowHeight);
  //Se establece el fondo en blanco.
  background(255, 255, 255);
  //Se establece el color de la figura en negro.
  fill(0, 0, 0, 255);
  //Se declarán los puntos iniciales a la mitad de la ventana.
  x = width / 2;
  y = height / 2;
  dx = 0;
  dy = 0;

  var lang = 'es-ES' || navigator.language;
  speechRec = new p5.SpeechRec(lang); // new P5.SpeechRec object
  speechRec.continuous = true; // do continuous recognition
  speechRec.interimResults = false; // allow partial recognition (faster, less accurate)

  showInstructions();

  speechRec.onResult = parseResult; // recognition callback
  speechRec.start(); // start engine
}

function showInstructions() {
  // instructions:
  fill(0, 0, 0, 255);
  textSize(20);
  textAlign(LEFT);
  text("Instrucciones: Arriba, Abajo, Izquierda, Derecha, Limpia, Crece, Disminuye", 20, 20);
}

function draw() {
  ellipse(x, y, 5 * Scale, 5 * Scale);
  x += dx;
  y += dy;
  if (x < 0) x = width;
  if (y < 0) y = height;
  if (x > width) x = 0;
  if (y > height) y = 0;
}

function parseResult() {
  // recognition system will often append words into phrases.
  // so hack here is to only use the last word:
  var instruccion = speechRec.resultString.split(' ').pop();
  console.log(instruccion);
  if (instruccion.indexOf("izquierda") !== -1) {
    dx = -1;
    dy = 0;
  } else if (instruccion.indexOf("derecha") !== -1) {
    dx = 1;
    dy = 0;
  } else if (instruccion.indexOf("arriba") !== -1) {
    dx = 0;
    dy = -1;
  } else if (instruccion.indexOf("abajo") !== -1) {
    dx = 0;
    dy = 1;
  } else if (instruccion.indexOf("disminuye") !== -1) {
    if (Scale > 0) {
      Scale -= 1;
    }
  } else if (instruccion.indexOf("alto") !== -1) {
    dx = 0;
    dy = 0;
  } else if (instruccion.indexOf("crece") !== -1) {
    Scale += 1;
  } else if (instruccion.indexOf("limpia") !== -1) {
    background(255);
    showInstructions();
  }
}
