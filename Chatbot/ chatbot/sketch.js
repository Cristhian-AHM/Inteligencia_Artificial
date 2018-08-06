//Nota: Este ejemplo solo funciona en Google Chrome.

//Variable para crear el objeto p5.Speech.
let speech;

function setup() {
  noCanvas();

	//Creo el objeto p5.Speech.
  speech = new p5.Speech();
	//Método que realizará al cargar las voces del buscador.
  speech.onLoad = voiceReady;

	//Se crea la interfaz de usuario.

	//Un input donde el usuario escribirá lo que quiera que se transforme a voz.
  var TextoEntrada = createInput();
	//El botón que desencadenará el evento.
  var Boton = createButton('Habla!');
	//Elemento para mostrar mensaje.
  var textoVoces = createElement('p', 'Voces Disponibles:');
	//Creo un Select que almacenará todas las voces.
  var Voces = createSelect('');
	//Elemento para mostrar mensaje.
  var textoRate = createElement('p', 'Rate:');
	//Creo un Slider, el Slider tiene 4 parametros, los primeros dos indican el rango
	//El primero es donde Inicia y el Segundo donde termina, el segundo es el valor donde iniciará
	//por defecto el Slider y el cuarto parametro indica los pasos que avanzará cuando muevas el Slider.
  var rateSlider = createSlider(0, 2, 1, 0.1);
	//Elemento para mostrar mensaje.
	var textoVolume = createElement('p', 'Volumen:');
  var volumeSlider = createSlider(0, 1, 0.5, 0.1);
	//Elemento para mostrar mensaje.
	var textoPitch = createElement('p', 'Pitch:');
  var pitchSlider = createSlider(0.01, 2, 1, 0.01);

	//Función que se ejecuta al cargar las voces.
  function voiceReady() {
		//Almacená todas las voces disponibles por el
    let voices = speech.voices;
		//Mediante un arreglo pasos todas las voces disponibles a las opciones del Select.
    for (var i = 0; i < voices.length; i++) {
      Voces.option(voices[i].name);
    }
  }

	//Solo le indico en que parte ira cada elemento en el HTML.
  TextoEntrada.parent("#text");
  Boton.parent("#text");

  textoVoces.parent("#voces");
  Voces.parent("#voces");

  textoRate.parent("#ajustes");
  rateSlider.parent("#ajustes");
	textoVolume.parent("#ajustes");
  volumeSlider.parent("#ajustes");
	textoPitch.parent("#ajustes");
  pitchSlider.parent("#ajustes");

	//Cuando se presiona el botón 'Habla'.
	Boton.mousePressed(function(){
		//Obtiene la voz seleccionada.
		let voice = Voces.value();
		//Obtiene el 'Rate' seleccionado.
		let rate = rateSlider.value();
		//Obtiene el 'Pitch' seleccionado.
		let pitch = pitchSlider.value();
		//Obtiene el 'Volumen' seleccionado.
		let volume = volumeSlider.value();
		//Obtiene el texto a reproducir.
		let text = TextoEntrada.value();
		//Asigná el rate por el seleccionado.
		speech.setRate(rate);
		//Asigná el pitch por el seleccionado.
		speech.setPitch(pitch);
		//Asigná el Volume por el seleccionado.
		speech.setVolume(volume);
		//Asigná la voz por la seleccionada.
		speech.setVoice(voice);
		//El mensaje a hablar.
		speech.speak(text);
	});
}
