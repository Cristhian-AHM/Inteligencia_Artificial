function setup() {
  noCanvas();

  //Creo un bot con la librería RiveScript.
  let bot = new RiveScript();

  //Cargo la locación del "Cerebro" del bot.
  bot.loadFile("brain/brain.rive").then(brainReady).catch(brainError);

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
  let boton = select('#submit');
  let user_input = select('#user_input');
  let bot_output = select('#bot_output');

  //Cuando el botón sea presionado llama al bot.
  boton.mousePressed(function chat() {
    //Obtengo el valor de entrada del usuario.
    let entrada = user_input.value();
    //La función reply devuelve una 'Promesa' y acceso a esa promesa.
    bot.reply("local-user", entrada).then(function(reply) {
      bot_output.html(reply);
    });
  });
}
