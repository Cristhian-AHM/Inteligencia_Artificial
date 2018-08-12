//Programa que muestra un ejemplo del funcionamiento de la regresión lineal (Dos dimensiones).

//Regresión Lineal: La regresion lineal investiga la relación estadística que existe entre
//una variable dependiente (Y) y una o más variables independientes (X1,X2,X3,...).

//Instrucciones:

//Solo presionar el canvas para generar puntos aleatorios.

//Otro ejemplo de regresión lineal:
// https://kwichmann.github.io/ml_sandbox/linear_regression_diagnostics/

//Variable que almacenará los puntos en el canvas.
var data = [];
//Variables para la ecuación de la recta.
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
//Función que realiza la regresión lineal.
function linearRegression() {
	//Variables que almacenarán el promedio de los puntos X y Y.
  var xAverage = 0;
  var yAverage = 0;
	//Calcula el promedio de X y Y.
  for (var i = 0; i < data.length; i++) {
    xAverage += data[i].x;
    yAverage += data[i].y;
  }

  xAverage /= data.length
  yAverage /= data.length;
	//Realiza la formula de la regresión lineal que es:

	//	 Σ(x - xAverage)(y - yAverage)
	//	--------------------------------
	//				Σ(x - xAverage)²

  var mUp = 0;
  var mDown = 0;
  for (var i = 0; i < data.length; i++) {
    var x = data[i].x;
    var y = data[i].y;

    mUp += (x - xAverage) * (y - yAverage);
    mDown += pow((x - xAverage), 2);
  }
  m = mUp / mDown;

  b = yAverage - (m * xAverage);
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
    linearRegression();
    drawLine();
  }

}
