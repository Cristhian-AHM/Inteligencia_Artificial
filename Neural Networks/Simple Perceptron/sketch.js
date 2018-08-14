//Variable que almacenara al perceptron.
let perc;
//Puntos al azar para entrenar al perceptron.
let trainingPoints = new Array(500);

// Coordenadas en el espacio.
let xmin = -1;
let ymin = -1;
let xmax = 1;
let ymax = 1;

function setup() {
  //Crea el canvas.
  createCanvas(windowWidth, windowHeight);
  //Declaro al perceptron que contará con tres pesos y una tasa de aprendizaje de 0.01.
  perc = new perceptron(3, 0.01);
  //Se generan todos los puntos al azar.
  for (var i = 0; i < trainingPoints.length; i++) {
    //Se generan puntos aleatorios entre -1 y 1.
    let x = random(xmin, xmax);
    let y = random(ymin, ymax);
    // El valor deseado se establece como 0.
    let answer = 1;
    //f es una función que genera una recta, evalua si el punto se genero arriba o abajo
    //de la recta y en base a eso asigna la respuesta correcta que es 1 o -1.
    if (y < f(x)) answer = -1;
    //Genera un objeto que almacena las entradas que recibira el perceptron que son
    //X, Y y el umbral.
    //Tambien almacena la respuesta correcta en ese objeto.
    trainingPoints[i] = {
      input: [x, y, 1],
      output: answer
    };
  }


}

function draw() {
  //Pone la pantalla en blanco.
  background(255);
  //Dibuja la linea.
  let x1 = map(xmin, xmin, xmax, 0, width);
  let y1 = map(f(xmin), ymin, ymax, height, 0);
  let x2 = map(xmax, xmin, xmax, 0, width);
  let y2 = map(f(xmax), ymin, ymax, height, 0);

  line(x1, y1, x2, y2);

  //Dibuja la linea que el perceptron cree es la correcta con los pesos que tiene.
  //La formula para eso es: weight[0]*x + weight[1]*y + weight[2] = 0.
  //Haciendo los despejes corrrespondientes la formula queda como:
  //	y = - weight[0] * x - weights[2] / weights[1].
  stroke(0, 0, 255);
  strokeWeight(2);
  let weights = perc.getWeights();
  x1 = xmin;
  y1 = (-weights[2] - weights[0] * x1) / weights[1];
  x2 = xmax;
  y2 = (-weights[2] - weights[0] * x2) / weights[1];

  x1 = map(x1, xmin, xmax, 0, width);
  y1 = map(y1, ymin, ymax, height, 0);
  x2 = map(x2, xmin, xmax, 0, width);
  y2 = map(y2, ymin, ymax, height, 0);
  line(x1, y1, x2, y2);

  //Dibuja todos los puntos.
  stroke(0);
  for (var i = 0; i < trainingPoints.length; i++) {
    let guess = perc.guess(trainingPoints[i].input);
    fill(255, 0, 0);
    if (trainingPoints[i].output == guess) {
      fill(0, 255, 0);
    }
    let x = map(trainingPoints[i].input[0], -1, 1, 0, windowWidth);
    let y = map(trainingPoints[i].input[1], -1, 1, windowHeight, 0);
    ellipse(x, y, 8, 8);
  }


}

//Cada que se presiona el mouse, se entrena el perceptron.
function mousePressed() {
  for (var i = 0; i < trainingPoints.length; i++) {
    perc.train(trainingPoints[i].input, trainingPoints[i].output);
  }
}

//Función que genera una recta.
function f(x) {
  let y = 0.8 * x + 0.8;
  return y;
}
