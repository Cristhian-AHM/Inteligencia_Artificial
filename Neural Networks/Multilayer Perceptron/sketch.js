
let training_data = [
	{
		inputs: [0,1],
		targets: [1]
	},
	{
		inputs: [1,0],
		targets: [1]
	},
	{
		inputs: [0,0],
		targets: [0]
	},
	{
		inputs: [1,1],
		targets: [0]
	}
];
function setup() {
	let nn = new NeuralNetwork(2,2,1);

	for (var i = 0; i < 100000; i++) {
		let data = random(training_data);
			nn.train(data.inputs, data.targets);

	}

	console.log("XOR");
	console.log("1 0: " + nn.predict([1,0]));
	console.log("0 1: " +nn.predict([0,1]));
	console.log("0 0: " +nn.predict([0,0]));
	console.log("1 1: " +nn.predict([1,1]));

	console.log(nn.serialize());

	//console.log(nn.train(input, targets));
	//console.log(output);
}
