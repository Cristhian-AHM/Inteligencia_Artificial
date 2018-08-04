let number = 37555;

function setup() {
  noCanvas();

  //Creo un bot con la librería RiveScript.
  let bot = new RiveScript();

  //Cargo la locación del "Cerebro" del bot.
  bot.loadFile("brain/brain.rive").then(brainReady).catch(brainError);

  //Funcón que indica que el cerebro del bot se cargo correctamente.
  function brainReady() {
    console.log("Chatbot Ready");
    bot.sortReplies();
  }

  //Funcón que indica que el cerebro del bot tuvo problema al cargarse.
  function brainError() {
    console.log("Error loading Chatbot's brain");
  }
  let boton = select('#submit');
  let user_input = select('#user_input');
  let bot_output = select('#bot_output');

  boton.mousePressed(chat);

  function chat() {
    let entrada = user_input.value();
    var respuesta;
    bot.reply("local-user", "Hello, bot!").then(function(reply) {
	    bot_output.html(reply);
    });

  }
}
