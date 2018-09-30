//Variable de la Pelota.
var puck;
//Variable de sonido.
var ding;
//Variables de las paletas.
var left;
var right;
//Variable para empezar a jugar.
var play = false;
//Variable para las puntuaciones.
var leftscore = 0;
var rightscore = 0;
//Variable de video
var video;
//Variable para almacenar el objeto que hará la clasificación.
var featureExtractor;
//Objeto para entrenar a la red neuronal.
var classifier;
//Botones para el entrenamiento.
var leftUp, leftDown, rightUp, rightDown, train;

function setup() {
  createCanvas(600, 400);
  video = createCapture(VIDEO);
  video.hide();
  Pong();
  Classifier();
  ShowButtons();
}

function ShowButtons() {
  //Creo los botones.
  rightUp = createButton("Arriba Derecha");
  rightDown = createButton("Abajo Derecha");
  train = createButton("Train");

  //Cuando el botón 'Train' se presione se procederá a re-entrenar a la Red Neuronal
  train.mousePressed(function() {
    classifier.train(training);
  });

  rightUp.mousePressed(function() {
    //Pasa la imagen que la obtiene del video y la etiqueta como 'RUp'
    classifier.addImage('RUp');
  });

  rightDown.mousePressed(function() {
    //Pasa la imagen que la obtiene del video y la etiqueta como 'RDown'
    classifier.addImage('RDown');
  });
}

function Classifier() {
  //Creo el objeto ml5 para extraer los elementos.
  featureExtractor = ml5.featureExtractor('MobileNet', modelLoaded);
  //Creo el objeto para re-entrenar al modelo
  classifier = featureExtractor.classification(video, videoReady);
}

function Pong() {
  //Creo los elementos del Pong.
  ding = loadSound("music/ding.mp3");
  puck = new Puck();
  left = new Paddle(true);
  right = new Paddle(false);
}

function draw() {
  background(0);

  //Si es verdadero el juego inicia.
  if (play) {
    //Verifico la posición de las paletas.
    puck.checkPaddleRight(right);
    puck.checkPaddleLeft(left);
    //Muestro las paletas.
    left.show();
    right.show();
    left.update();
    right.update();
    //Actualizo la posición de la pelota.
    puck.update();
    puck.edges();
    puck.show();
    //Escribo el marcador.
    fill(255);
    textSize(32);
    text(leftscore, 32, 40);
    text(rightscore, width - 64, 40);
  } else {
    //Si apenas se esta realizando el entrenamiento se muestra el video.
    image(video, 0, 0);
  }
}

function keyReleased() {
  left.move(0);
  right.move(0);
}

//Controles
function keyPressed() {
  if (key == 'A') {
    left.move(-10);
  } else if (key == 'Z') {
    left.move(10);
  }

  if (key == 'J') {
    right.move(-10);
  } else if (key == 'M') {
    right.move(10);
  }
}

//función que se ejecuta al entrenar la red neuronal.
function training(loss) {
  //Si ya termino de entrenar.
  if (loss === null) {
    //Muestra que termino.
    console.log("Training Complete!");
    //Activa el juego.
    play = true;
    //Esconde los elementos.
    HideElements();
    //Llama al calsificador de imagenes.
    classifier.classify(gotResults);
  } else {
    //Cuando se realiza el entrenamiento, se obtiene la perdida 'Loss' que
    //es cuanto va mejorando la red en reconocer el ejemplo.
    console.log("Loss: " + loss);
  }
}

//Esconde los elementos.
function HideElements() {
  //svideo.show();
  //leftUp.hide();
  rightUp.hide();
  //leftDown.hide();
  rightDown.hide();
  train.hide();
}

function gotResults(error, results) {
  //Si hay error lo muestro.
  if (error) {
    console.error(error);
  } else {
    //Cambio el mensaje a lo que haya en el primer objeto de la clasificación.
    if (results === 'RUp') {
      right.move(-10);
    } else if (results === 'RDown') {
      right.move(10);
    }
    //Vuelvo a llamar al mismo método para que constantemente este haciendo la clasificación.
    classifier.classify(gotResults);
  }
}

function videoReady() {
  console.log("Video Ready!");
}

function modelLoaded() {
  //Mensaje que indica cuando ya se cargo el modelo (Es necesario tener conexión a Internet)
  console.log('Model Loaded!');
}
