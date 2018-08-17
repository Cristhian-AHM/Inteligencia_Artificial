//Basado en: https://brain.js.org/

//Variables que almacena los colores.
let r, g, b;
//Variable que almacena la red neuronal.
var brain;
//Variable que almacena el resultado.
let best = "Negro";

//Genera un color al azar.
function randomColor() {
  r = random(255);
  g = random(255);
  b = random(255);

  redraw();
}

//Función que predice que color es mejor.
function colorPredictor(r, g, b) {
  //Las entradas para la red neuronales deben ser valores entre 0 y 1.
  let inputs = [r / 255, g / 255, b / 255];
  let outputs = brain.predict(inputs);

  if (outputs[0] > outputs[1]) {
    return "Negro";
  } else {
    return "Blanco";
  }
}

//Función que entrena a la red neuronal.
function trainingColors(r, g, b) {
  if (r + g + b > 300) {
    return [1, 0];
  } else {
    return [0, 1];
  }
}

function setup() {
  //Se crea el canvas.
  createCanvas(600, 400);
  //Se crea la red neuronal.
  brain = new NeuralNetwork(3, 3, 2);

  //Se entrena a la red neuronal.
  for (var i = 0; i < 100000; i++) {
    r = random(255);
    g = random(255);
    b = random(255);
    let inputs = [r / 255, g / 255, b / 255];
    let targets = trainingColors(r, g, b);

    brain.train(inputs, targets);
  }
  randomColor();
  noLoop();
}

//Cada que se presiona el mouse se cambia el color.
function mousePressed() {
  //Entrenar a la red neuronal a mano.
  /*let targets;
  if(mouseX > width/2){
  	targets = [0,1];
  }else{
  	targets = [1,0];
  }

  let inputs = [r / 255, g / 255, b / 255];

  brain.train(inputs, targets);*/
  randomColor();
}

function draw() {
  //Se pone el color del fondo con el que se genero al azar.
  background(r, g, b);

  //Dibuja las lineas que rodean al canvas.
  strokeWeight(5);
  stroke(0);
  line(width / 2, 0, width / 2, height);
  line(width - 2, 0, width - 2, height);
  line(width, 0, 0, 0);
  line(2, 0, 0, height);
  line(width, height - 2, 0, height - 2);

  //Dibuja los puntos y las palabras.
  textSize(64);
  noStroke();
  fill(0);
  textAlign(CENTER, CENTER);
  text("Negro", 170, 200);
  fill(255);
  text("Blanco", 440, 200);

  best = colorPredictor(r, g, b);
  if (best === "Negro") {
    fill(0);
    ellipse(170, 300, 60);
  } else {
    fill(255);
    ellipse(420, 300, 60);
  }
}
