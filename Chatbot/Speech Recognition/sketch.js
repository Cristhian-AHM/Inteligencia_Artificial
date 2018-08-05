//Nota: Este ejemplo solo funciona en Google Chrome.

//Variable para almacenar el objeto SpeechRecognition.
let speechRec;

function setup() {
  noCanvas();
	//Variable para almacenar el lenguaje del reconocedor, en este caso le digo que sea el español
	//por defecto pero si no lo encuentrá ó falla tomará el lenguaje del navegador.
  let lang = 'es-Es' || navigator.language;
	let continuous = true;
  let interim = true;
	//Creo el objeto p5.SpeechRec y le paso el lenguaje.
  speechRec = new p5.SpeechRec(lang);

	//Este parametro le indica al objeto que siga escuchando, de no ponerlo solo escucha una vez.
  speechRec.continuous = continuous;
	//Este parametro le indica si las respuestas te las dará rapido o esperara a que la actividad
	//del micrófono haya terminado.
  speechRec.interimResults = interim;
	//Manda a llamar a la función gotSpeech cuando detecta algo.
  speechRec.onResult = gotSpeech;
	//Activa el micrófono (Saldrá el mensaje que actives el micrófono).
	speechRec.start();

  function gotSpeech() {
		//Si lo que escucho el objeto fue reconocido entonces lo muestra en pantalla.
    if (speechRec.resultValue) {
      createP(speechRec.resultString);
      console.log(speechRec);
    }
  }

}
