//Variable para almacenar el objeto que hará la predicción.
let MobileNet;
//Variable para almacenar la foto que el usuario arrastrará.
let img;

function setup() {
	//Se crea el Canvas.
  var canvas = createCanvas(700, 500);
	//Se crea el objeto ml5.imageClassifier pasandole el Modelo Pre-Entrenado (Por ahora ml5 solo soporta MobileNet)
	// y una función de callback.
  MobileNet = ml5.imageClassifier('MobileNet', modelLoaded);
	//Creo un trigger para el canvas y le paso el método que lo manejará.
  canvas.drop(dropFile);
}

function modelLoaded() {
	//Mensaje que indica cuando ya se cargo el modelo (Es necesario tener conexión a Internet)
  console.log('Model Loaded!');
}

function dropFile(file) {
	//Verifico que el archivo arrastrado sea una imagen.
  if (file.type === 'image') {
		//Creo una imagen y la escondo. también llamo a una función callback.
    img = createImg(file.data, imgReady).hide();
  }else{
		console.log("No es una Imagen.");
	}
}

function imgReady() {
	//Una vez cargada la imagen y la muestro en pantalla.
  image(img, 0, 0, width, height);
	//Varifico que el modelo MobileNet se haya cargado ya.
  if (MobileNet) {
		//Hago la predicción.
    MobileNet.predict(img, function(err, results) {
			//Si el resultado de la predicción fue un error lo manejo.
      if(err){
				createP("Error loading file!");
			}else{
				//El modelo entrega tres posibles resultados, tomo el nombre y la probabilidad de Exactitud del
				//primer resultado ya que es el mas exacto y los muestro en pantalla.
				var name = results[0].className;
				var probability = results[0].probability;
				createP("Especie: " + name);
				createP("Exactitud: " + nf(probability * 100,2,4) + "%");
			}
    });
  }
}

//Cosas de la interfaz gráfica.
function draw() {
  fill(0);
  noStroke();
  textSize(24);
  textAlign(CENTER);
  text("Arrastra una imagen.", width / 2, height / 2);
  noLoop();
}
