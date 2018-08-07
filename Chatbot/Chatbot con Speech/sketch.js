let speech;
let speechRec;

function setup() {
  noCanvas();
  let lang = 'es-ES';
  let continuous = true;
  //Se crea objeto de p5.Speech.
  speech = new p5.Speech();
  //Se crea objeto de p5.SpeechRec.
  speechRec = new p5.SpeechRec(lang);
  //Creo un bot con la librería RiveScript.
  let bot = new RiveScript();

  //Cargo la locación del "Cerebro" del bot.
  bot.loadFile("brain/brain.rive").then(brainReady).catch(brainError);
  //Se le indica la funcion que deberá realizar al cargar el objeto.
  speech.onLoad = voiceReady;
  //Se indica a la función que ira cuando se obtengan datos.
  speechRec.onResult = EntradaDatos;
  //Se indica que siga escuchando siempre.
  speechRec.continuous = continuous;
  //Se inicia la toma de sonido.
  speechRec.start();
  //Funcón que indica que el cerebro del bot se cargo correctamente.
  function brainReady() {
    //Indico que el bot esta listo.
    console.log("Chatbot Ready");
    //Ordena las respuestas en la memoria para una mejor eficiencia (Es Obligatorio hacerlo).
    bot.sortReplies();
    //Creo un número al azar entre 1 y 100.
    let randomNum = floor(random(100)) + 1;
    //Le mando el número al cerebro del Chatbot.
    bot.setVariable("num" , randomNum);
  }

  //Funcón que indica que el cerebro del bot tuvo problema al cargarse.
  function brainError() {
    console.log("Error loading Chatbot's brain");
  }
  //Acceso a los componentes de la interfaz gráfica.
  let bot_output = select('#bot_output');


  function EntradaDatos(){
    //Evalua si se logro reconocer algo o no.
    if(speechRec.resultValue){
      //Guardo lo que se reconocio en una variable.
      let entrada = speechRec.resultString;
      //Muestra lo que se reconocio en la ventana.
      bot_output.html(entrada);
      //Llamo al bot.
      bot.reply("local-user", entrada).then(function(reply) {
        speech.speak(reply);
      });
    }
  }
  function voiceReady(){
    //Aqui cambia el idioma del speech.
    //speech.setVoice("Google 日本語");
  }
}
