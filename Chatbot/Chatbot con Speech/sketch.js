let speech;
let speechRec;

function setup() {
  noCanvas();
  let lang = 'es-ES';
  let continuous = true;
  speech = new p5.Speech();
  speech.onLoad = voiceReady;
  speechRec = new p5.SpeechRec(lang);
  //Creo un bot con la librería RiveScript.
  let bot = new RiveScript();

  //Cargo la locación del "Cerebro" del bot.
  bot.loadFile("brain/brain.rive").then(brainReady).catch(brainError);

  speechRec.onResult = EntradaDatos;
  speechRec.continuous = continuous;
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
    bot.reply("local-user", "set " + randomNum);
  }

  //Funcón que indica que el cerebro del bot tuvo problema al cargarse.
  function brainError() {
    console.log("Error loading Chatbot's brain");
  }
  //Acceso a los componentes de la interfaz gráfica.
  let bot_output = select('#bot_output');


  function EntradaDatos(){
    if(speechRec.resultValue){
      let entrada = speechRec.resultString;
      bot_output.html(entrada);
      bot.reply("local-user", entrada).then(function(reply) {
        speech.speak(reply);
        console.log(reply);
      });
    }
  }
  function voiceReady(){
    speech.setVoice("Google 日本語");
  }
}
