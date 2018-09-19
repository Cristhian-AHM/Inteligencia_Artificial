let trbains_data;
let rainbows_data;
let cats_data;

let predict_result;
let percent_ele;
let percent_correct;

const imageSize = 784;
const totalData = 1000;

const umbral = 0.0141108;
const thresh = 0.9224;

const CAT = 0;
const RAINBOW = 1;
const TRAIN = 2;

let cats = {};
let rainbows = {};
let trains = {};

let nn;

let training = [];
let read;
let inTraining = false;
let train_image;
let train_index;

function preload() {
  trains_data = loadBytes("data/trains.bin");
  rainbows_data = loadBytes("data/rainbows.bin");
  cats_data = loadBytes("data/cat.bin");

  predict_result = select('#predict');
  percent_ele = select('#percent');
  percent_correct = select('#correct');
}

function setup() {
  createCanvas(280, 280).parent('container');
  background(255);

  prepareData(cats, cats_data, CAT);
  prepareData(rainbows, rainbows_data, RAINBOW);
  prepareData(trains, trains_data, TRAIN);

  nn = new NeuralNetwork(784, 64, 3);

  train_image = createImage(28, 28);
  train_index = 0;

  training = training.concat(cats.training);
  training = training.concat(rainbows.training);
  training = training.concat(trains.training);

  let testing = [];
  testing = testing.concat(cats.testing);
  testing = testing.concat(rainbows.testing);
  testing = testing.concat(trains.testing);

  let trainButton = select('#train');
  trainButton.mousePressed(function() {
    inTraining = true;
  });

  let testButton = select('#test');
  testButton.mousePressed(function() {
    let percent = testAll(testing);
    percent_correct.html(nf(percent, 2, 2) + "%");
  });

  let guessButton = select('#guess');
  guessButton.mousePressed(function() {

    let inputs = [];
    let img = get();
    img.resize(28, 28);
    img.loadPixels();

    for (let i = 0; i < imageSize; i++) {
      let bright = img.pixels[i * 4];
      inputs[i] = (255 - bright) / 255.0;
    }

    let guess = nn.predict(inputs);
    console.log(guess);
    let m = max(guess);
    let mN = m - umbral;
    if (thresh > mN) {
      let drawName = prompt("No pude identificar tu dibujo, ¿Qué dibujaste?");
      //newDraw(drawName);
    } else {
      let classification = guess.indexOf(m);
      if (classification === CAT) {
        predict_result.html("Gato");
      } else if (classification === RAINBOW) {
        predict_result.html("Arcoiris");
      } else if (classification === TRAIN) {
        predict_result.html("Tren");
      }
    }
  });

  let clearButton = select('#clear1');
  clearButton.mousePressed(function() {
    background(255);
  });
  /*let total = 100;
  for (var i = 0; i < total; i++) {
  	let img = createImage(28,28);
  	img.loadPixels();
  	let offset = i * 784;
  	for (var j = 0; j < 784; j++) {
  		let val = 255 - rainbows.bytes[j + offset];
  		img.pixels[j * 4 + 0] = val;
  		img.pixels[j * 4 + 1] = val;
  		img.pixels[j * 4 + 2] = val;
  		img.pixels[j * 4 + 3] = 255;
  	}
  	img.updatePixels();
  	let x = (i% 10) * 28;
  	let y = floor(i / 10) * 28;
  	image(img, x, y);
  }*/
}

function trainingD(show) {
  shuffle(training, true);
  if (show) {
    train_image.loadPixels();
  }
  for (let i = 0; i < 784; i++) {
    let bright = training[train_index][i];
    if (show) {
      let index = i * 4;
      train_image.pixels[index + 0] = 255 - bright;
      train_image.pixels[index + 1] = 255 - bright;
      train_image.pixels[index + 2] = 255 - bright;
      train_image.pixels[index + 3] = 255;
    }
  }
  let data = training[train_index];
  let inputs = Array.from(data).map(x => x / 255);
  let label = training[train_index].label;
  let targets = [0, 0, 0];
  targets[label] = 1;
  nn.train(inputs, targets);
  if (show) {
    train_image.updatePixels();
    image(train_image,0, 0, 280, 280);
    percent_ele.html(nf(((train_index / training.length) * 100),2,2) + '%');
    train_index++;
  }

  if(train_index === training.length){
    train_index = 0;
    inTraining = false;
    console.log("Se terminó de entrenar.");
      background(255);
  }
}

function testAll(testing) {
  let correct = 0;
  for (let i = 0; i < testing.length; i++) {
    let data = testing[i];
    let inputs = Array.from(data).map(x => x / 255);
    let label = testing[i].label;
    let guess = nn.predict(inputs);

    let m = max(guess);
    let classification = guess.indexOf(m);

    if (classification === label) {
      correct++;
    }
  }
  let percent = 100 * correct / testing.length;
  return percent;
}

function prepareData(category, data, label) {
  category.training = [];
  category.testing = [];
  for (let i = 0; i < totalData; i++) {
    let offset = i * imageSize;
    let threshold = floor(0.8 * totalData);
    if (i < threshold) {
      category.training[i] = data.bytes.subarray(offset, offset + imageSize);
      category.training[i].label = label;
    } else {
      category.testing[i - threshold] = data.bytes.subarray(offset, offset + imageSize);
      category.testing[i - threshold].label = label;
    }
  }
}

function newDraw(drawName) {
  let newName = drawName + ".json";
  let objeto = {};
  let data = [];
  objeto.data = [];
  let img = get();
  img.resize(28, 28);
  img.loadPixels();

  data = img.pixels;

  for (var i = 0; i < data.length; i++) {
    objeto.data[i] = data[i];
  }
  saveJSON(objeto, newName);
  readJSON("labels", drawName);
}

function readJSON(fileName, drawName) {
  fileName = fileName + ".json";
  let file = loadJSON(fileName, callback(drawName));
}

function callback(drawName) {
  console.log(drawName);
}


function draw() {
  if (inTraining) {
    let total1 = 10;
    for (let i = 0; i < total1; i++) {
      if (i == total1 - 1) {
        trainingD(true);
      } else {
        trainingD(false);
      }
    }
  }
  strokeWeight(8);
  stroke(0);
  if (mouseIsPressed) {
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}
