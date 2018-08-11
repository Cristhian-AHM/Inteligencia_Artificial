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
  //Creo los botones.
	leftUp = createButton("Arriba Izquierda");
  rightUp = createButton("Arriba Derecha");
  leftDown = createButton("Abajo Izquierda");
  rightDown = createButton("Abajo Derecha");
  train = createButton("Train");

  //Cuando el botón 'Train' se presione se procederá a re-entrenar a la Red Neuronal
	train.mousePressed(function(){
		classifier.train(training);
	});

  //Cuando el botón Cat ó Dog sea presionado se agregara la imagen que tome del video
  //y lo manejara como un ejemplo de lo que es un gato.


  rightUp.mousePressed(function(){
    //Pasa la imagen que la obtiene del video y la etiqueta como 'Cat'
		classifier.addImage('RUp');
	});

	rightDown.mousePressed(function(){
    //Pasa la imagen que la obtiene del video y la etiqueta como 'Dog'
		classifier.addImage('RDown');
	});
}

function ShowButtons(){

}

function Classifier(){
  //Creo el objeto ml5 para extraer los elementos.
  featureExtractor = ml5.featureExtractor('MobileNet', modelLoaded);
  //Creo el objeto para re-entrenar al modelo
  classifier = featureExtractor.classification(video, videoReady);
}

function Pong() {
  ding = loadSound("music/ding.mp3");
  puck = new Puck();
  left = new Paddle(true);
  right = new Paddle(false);
}

function draw() {
  background(0);

  if (play) {
    puck.checkPaddleRight(right);
    puck.checkPaddleLeft(left);

    left.show();
    right.show();
    left.update();
    right.update();

    puck.update();
    puck.edges();
    puck.show();

    fill(255);
    textSize(32);
    text(leftscore, 32, 40);
    text(rightscore, width - 64, 40);
  }else{
    image(video, 0, 0);
  }
}

function keyReleased() {
  left.move(0);
  right.move(0);
}

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

function training(loss){
	if(loss === null){
		console.log("Training Complete!");
    play = true;
    HideElements();
    classifier.classify(gotResults);
	}else{
    //Cuando se realiza el entrenamiento, se obtiene la perdida 'Loss' que
    //es cuanto va mejorando la red en reconocer el ejemplo.
		console.log("Loss: " + loss);
	}
}

function HideElements(){
  video.show();
  leftUp.hide();
  rightUp.hide();
  leftDown.hide();
  rightDown.hide();
  train.hide();
}

function gotResults(error, results){
	//Si hay error lo muestro.
		if(error){
			console.error(error);
		}else{
			//Cambio el mensaje a lo que haya en el primer objeto de la clasificación.
			if(results === 'RUp'){
        right.move(-10);
      }else if(results === 'RDown'){
        right.move(10);
      }
      console.log(results);
			//Vuelvo a llamar al mismo método para que constantemente este haciendo la clasificación.
			classifier.classify(gotResults);
		}
}

function videoReady(){
	console.log("Video Ready!");
}

function modelLoaded() {
  //Mensaje que indica cuando ya se cargo el modelo (Es necesario tener conexión a Internet)
  console.log('Model Loaded!');
}
