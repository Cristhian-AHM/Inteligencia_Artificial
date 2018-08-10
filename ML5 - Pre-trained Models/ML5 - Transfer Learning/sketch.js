//Variable para almacenar el video.
let video;
//Variable para almacenar el objeto que hará la clasificación.
let featureExtractor;
//Variable que alamcenará el mensaje que se mostrará en pantalla.
let message = "";
//Objeto para entrenar a la red neuronal.
let classifier;
//Botones para interfáz gráfica.
let LinkButton, TrainButton, MeButton, OtherButton;

function setup() {
  //Creo el canvas.
  createCanvas(640, 550);
  //Creo un objeto de video.
  video = createCapture(VIDEO);
  //Oculto el video.
  video.hide();
  //Pongo el fondo en negro.
  background(0);
  //Creo el objeto ml5 para extraer los elementos.
  featureExtractor = ml5.featureExtractor('MobileNet', modelLoaded);
  //Creo el objeto para re-entrenar al modelo
  classifier = featureExtractor.classification(video, videoReady);

  //Creo los botones.
	dogButton = createButton("Dog");
  catButton = createButton("Cat");
	TrainButton = createButton("Train");

  //Cuando el botón 'Train' se presione se procederá a re-entrenar a la Red Neuronal
	TrainButton.mousePressed(function(){
		classifier.train(training);
	});

  //Cuando el botón Cat ó Dog sea presionado se agregara la imagen que tome del video
  //y lo manejara como un ejemplo de lo que es un gato.
  catButton.mousePressed(function(){
    //Pasa la imagen que la obtiene del video y la etiqueta como 'Cat'
		classifier.addImage('Cat');
	});

	dogButton.mousePressed(function(){
    //Pasa la imagen que la obtiene del video y la etiqueta como 'Dog'
		classifier.addImage('Dog');
	});

}

function imageReady(){
	console.log("Ready");
}

//Esta función realiza el entrenamiento.
function training(loss){
	if(loss === null){
		console.log("Training Complete!");
    classifier.classify(gotResults);
	}else{
    //Cuando se realiza el entrenamiento, se obtiene la perdida 'Loss' que
    //es cuanto va mejorando la red en reconocer el ejemplo.
		console.log("Loss: " + loss);
	}
}
function classifyImage(){
	classifier.classify(gotResults);
}

function gotResults(error, results){
	//Si hay error lo muestro.
		if(error){
			console.error(error);
		}else{
			//Cambio el mensaje a lo que haya en el primer objeto de la clasificación.
			message = results;
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

//Dibujo el texto en la pantalla.
function draw() {
  background(0);
  image(video, 0, 0);

  fill(255);
	textSize(22);
	text(message, 10 ,height - 20);
}
