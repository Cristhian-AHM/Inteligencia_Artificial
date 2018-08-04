let number = 37555;

function setup() {
	noCanvas();

	//Creo un bot con la librería RiveScript.
	let bot = new RiveScript();
 	//Cargo la locación del "Cerebro" del bot.
	bot.loadFile("brain/brain.rive").then(brainReady).catch(brainError);


	function brainReady(){
		console.log("Chatbot Ready");
	}

	function brainError(){
		console.log("Error loading Chatbot's brain");
	}
	let boton = select('#submit');
	let user_input = select('#user_input');
	let bot_output = select('#bot_output');

	boton.mousePressed(chat);

	function chat(){
		let entrada = user_input.value();
		bot_output.html(entrada);
	}
}
