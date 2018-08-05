//Nota: Este ejemplo solo funciona en el navegador Google Chrome.

//Variable que almacena el objeto que crea la voz.
let voice;

function setup() {
	//Creo un Canvas del tamaño de la ventana.
  createCanvas(windowWidth, windowHeight);
	//Pongo la ventana en negro.
	background(0);

	//Creo el objeto Voice usando la librería p5.Speech
  voice = new p5.Speech();
	//Una vez cargue las voces del navegador llamara a la función 'voiceReady'.
	voice.onLoad = voiceReady;

	//Le digo al navegador que mientras este hablando llame a la función 'startSpeaking'
	voice.started(startSpeaking);
	//Le digo al navegador que cuando deje de hablar llame a la función 'endSpeaking'
	voice.ended(endSpeaking);

	//La función 'startSpeaking' cambia el color de la ventana a uno al azar mientras esta hablando.
	function startSpeaking(){
		background(floor(random(256)),floor(random(256)),floor(random(256)));
	}

	//La función 'endSpeaking' devuelve el color de la ventana a negro.
	function endSpeaking(){
		background(0);
	}

	//Solo le digo al objeto que cuando cargue las voces me muestre en consola todas las voces disponibles.
	function voiceReady(){
		console.log(voice.voices);
	}

}

//Cada que presiono el Mouse se ejecuta esta función.
function mousePressed(){
	//Almaceno todas las voces disponibles.
	let voices = voice.voices;
	//Con un Random eligo una voz.
	let randomVoice = random(voices);

	//setRate altera la velocidad con la que habla.
	voice.setRate(1);
	//setPitch altera el tono de la voz.
	voice.setPitch(0.5);
	//Le indico que me muestre en consola la voz que obtuvo al azar.
	console.log(randomVoice.name);
	//Le asigno al objeto voice la voz que usara.
	voice.setVoice(randomVoice.name);
	//El mensaje a hablar.
	voice.speak("Capitulo de Inteligencia Artificial!");
}
