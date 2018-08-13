//Ejemplo de Regresión lineal con Gradient gradientDescent
//También es un ejemplo de 'Supervised Learning'

//Variable que almacenará los puntos en el canvas.
var data = [];
//Variables para la ecuación de la recta, en este caso se podría decir que son el analogo
//de los pesos en una red neuronal.
var m = 1;
var b = 0;

//Se crea un canvas y se pinta de negro.
function setup() {
  createCanvas(400, 400);
  background(0);
}

//Cada que se presione un botón se generará un punto (Se mapea a valores entre 0 y 1 por facilidad para los calculos)
//y se guardan en el arreglo data.
function mousePressed() {
  var x = map(mouseX, 0, width, 0, 1);
  var y = map(mouseY, 0, height, 1, 0);

  var point = createVector(x, y);
  data.push(point);
}

//Dibuja una recta en la pantalla.
function drawLine() {
  var x1 = 0;
  var x2 = 1;
  var y1 = m * x1 + b;
  var y2 = m * x2 + b;
	//Se mapean las coordenadas devuelta a pixeles en la pantalla.
  x1 = map(x1, 0, 1, 0, width);
  y1 = map(y1, 0, 1, height, 0);
  x2 = map(x2, 0, 1, 0, width);
  y2 = map(y2, 0, 1, height, 0);

  stroke(255, 0, 255);
  line(x1, y1, x2, y2);
}

//Función que calcula y dibuja la mejor recta.
function gradientDescent() {
  //Tasa a la que ira 'aprendiendo'.
	var learning_rate = 0.01;
  //Este método consiste en base a los puntos encontrar el valor minimo de la función
  //y que se vaya auto ajustando poco a poco, para ello lo hace punto tras punto.
	for (var i = 0; i < data.length; i++) {
		var y = data[i].y;
		var x = data[i].x;
    //'guess' es el primer intento que tiene el programa para ver si la recta es la correcta
    //Y es el valor al que guess debe llegar, por lo que el error del que aprenderá el sistema es:
    // y - guess.
		var guess = m * x + b;
		var error = y - guess;
    //La formula para calcular el error en general es (guess - y)², se deriva eso con respecto a
    //m y el resultado es (error * x) * learning_rate y si lo derivas con respecto a b se obtiene
    //error * learning_rate.
		m = m + (error * x) * learning_rate;
		b = b + error * learning_rate;
	}
}

function draw() {
	//Dibuja todos los puntos en el mapa.
	background(0);
  for (var i = 0; i < data.length; i++) {
    var x = map(data[i].x, 0, 1, 0, width);
    var y = map(data[i].y, 0, 1, height, 0);

    fill(255);
    stroke(255);
    ellipse(x, y, 8, 8);
  }

  if (data.length > 1) {
    gradientDescent();
    drawLine();
  }

}
