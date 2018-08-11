//Programa para hacer clasificación de imagenes mediante video usando el un
//modelo pre-entrenado conocido como MobileNet

//Instrucciones:

//Solo abrelo en el navegador y autoriza el uso de la camara.


//Variable para almacenar el video.
let video;
//Variable para almacenar el objeto que hará la clasificación.
let MobileNet;
//Variable que alamcenará el mensaje que se mostrará en pantalla.
let message = "";

function setup() {
	//Creo el canvas.
  createCanvas(640, 550);
	//Creo un objeto de video.
  video = createCapture(VIDEO);
	//Oculto el video.
  video.hide();
	//Pongo el fondo en negro.
  background(0);
	//Creo el objeto ml5 para hacer la clasificación.
	MobileNet = ml5.imageClassifier('MobileNet', video, modelLoaded);
}

function modelLoaded() {
	//Mensaje que indica cuando ya se cargo el modelo (Es necesario tener conexión a Internet)
  console.log('Model Loaded!');
	//Llamo al método que hará la clasificación.
	MobileNet.predict(gotResults);
}

function gotResults(error, results){
	//Si hay error lo muestro.
		if(error){
			console.error(error);
		}else{
			//Cambio el mensaje a lo que haya en el primer objeto de la clasificación.
			message = results[0].className;
			//Vuelvo a llamar al mismo método para que constantemente este haciendo la clasificación.
			MobileNet.predict(gotResults);
		}
}

//Dibujo el texto en la pantalla.
function draw() {
	background(0);
  image(video, 0, 0);
	fill(255);
	textSize(22);
	text(message, 10 ,height - 20);
}
