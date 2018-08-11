//Programa que genera música mediante el algoritmo k-nn.

//MIDI note numbers - http://www.inspiredacoustics.com/en/MIDI_note_numbers_and_center_frequencies.
var cmajor = {
  'C': 60, // Frecuencia de 261.63
  'D': 62, // Frecuencia de 293.66
  'E': 64, // Frecuencia de 329.63
  'F': 65, // Frecuencia de 349.23
  'G': 67, // Frecuencia de 392
  'A': 69, // Frecuencia de 440
  'B': 71, // Frecuencia de 493.88
}

//Puntos en la pantalla.
var training = [{
    note: 'C',
    x: 100,
    y: 100
  },
  {
    note: 'D',
    x: 400,
    y: 100
  },
  {
    note: 'E',
    x: 500,
    y: 200
  }, {
    note: 'F',
    x: 400,
    y: 400
  }, {
    note: 'G',
    x: 100,
    y: 400
  }
]

//Este ejemplo funciona con k = 1
var k = 1;

//Aquí se alamcenrá la informacion.
var data;
//Objeto Oscilador.
var osc;

function setup() {
  createCanvas(600, 600);
  osc = new p5.Oscillator();
  osc.setType('sine');
  osc.start();
  osc.amp(0.5);
}


function draw() {
  background(0);
  //Obtengo la posición del cursor.
  var x = mouseX;
  var y = mouseY;

    //k es todo el peso deacuerdo a la distancia.
    var sumWeights = 0;
    for (var i = 0; i < training.length; i++) {
      //Obtengo el primer punto.
      var point = training[i];
      //Saco la distancia que existe entre el punto actual del cursor y del punto (Distancia Eucladiana).
      var d = dist(x, y, point.x, point.y);
      //Obtengo esa distancia y la convierto en un valor entre 0 y 1.
      //Entre más grande el número significa que esta más cerca del punto.
      point.weight = 1 / (d * d);
      //Los sumo.
      sumWeights += point.weight;
    }

    var sum = 0;
    for (var i = 0; i < training.length; i++) {
      //Obtengo el primer punto.
      var point = training[i];
      //Obtengo la frecuencia del punto.
      var note = cmajor[point.note];
      //Convierto ese valor en una frecuencia.
      var freq = translateMIDI(note);
      //Multiplico la frecuencia por la similitud y lo sumo.
      sum += freq * point.weight;
    }

    //Obtengo la frecuencia.
    var freq = sum / sumWeights;
    //Le paso la frecuencia al oscilador.
    osc.freq(freq);
    console.log(freq);


  //Dibujo todos losp puntos
  for (var i = 0; i < training.length; i++) {
    var point = training[i];
    stroke(0);
    fill(255);
    ellipse(point.x, point.y, 24, 24);
    noStroke();
    fill(0);
    textAlign(CENTER);
    textSize(12);
    text(point.note, point.x, point.y + 6);
  }

}

//Funcion para transformar en notas - https://en.wikipedia.org/wiki/MIDI_tuning_standard.
function translateMIDI(note) {
  return pow(2, ((note - 69) / 12.0)) * 440;
}
