let training_data = [{
    inputs: [0, 1],
    targets: [1]
  },
  {
    inputs: [1, 0],
    targets: [1]
  },
  {
    inputs: [0, 0],
    targets: [0]
  },
  {
    inputs: [1, 1],
    targets: [0]
  }
];
let nn;

function setup() {
  createCanvas(400, 400);
  nn = new NeuralNetwork(2, 4, 1);
}

function draw() {
  background(0);
	//Entreno a la red 100 cada vez que re-dibuja la pantalla.
  for (let i = 0; i < 100; i++) {
    let data = random(training_data);
    nn.train(data.inputs, data.targets);
  }
	//Se crea una maya.
	let resolution = 10;
	let columns = width / resolution;
	let rows = height / resolution;

	for (var i = 0; i < columns; i++) {
		for (var j = 0; j < rows; j++) {
			//Genera que la esquina superior izqueirda sea 0,0 y la esquina inferior derecha sea 1,1
			let x1 = i / columns;
			let x2 = j / rows;
			let inputs = [x1, x2];
			let y = nn.predict(inputs);
			fill(y * 255);
			rect(i * resolution, j * resolution, resolution, resolution);
		}
	}
}
