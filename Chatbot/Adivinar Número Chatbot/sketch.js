let number = 37555;

function setup() {
	noCanvas();


	let boton = select('#submit');
	let user_input = select('#user_input');
	let bot_output = select('#bot_output');

	boton.mousePressed(chat);

	function chat(){
		let entrada = user_input.value();
		bot_output.html(entrada);
	}
}
