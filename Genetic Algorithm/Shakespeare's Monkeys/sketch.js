//Genetic Algorithm - Shakespeare's Monkey

//Demostración del uso de una algoritmo genetico para realizar una busqueda.

//El algoritmo funciona de la siguiente manera:
//1.- Genera la población.
//2.- Selección.
//    - Crea una mating pool.
//    - Por cada miembro de la población evlua su fitness basado en cierto criterio, y usando
//      ese criterio también los agrega a la mating pool para crear un nuevo elemento.
//
//3.- Reproducción
//    - Se crea una nueva población teniendo en cuenta lo siguiente:
//       1. Elige dos 'padres' del mating pool.
//       2. Crea un 'hijo' usando las caracteristicas de sus padres.
//       3. El 'hijo' sufrirá una mutación en base a la tasa de mutación.
//       4. Se agregá el 'hijo' a la nueva población.
//    #-Se reemplaza la vieja población con la nueva.
//
//4.- Repetir.


let target;
let popmax;
let mutationRate;
let population;

let mejorFrase;
let allPhrases;
let stats;
let time;

function setup() {
  mejorFrase = createP("Mejor Frase:");
  mejorFrase.class("Mejor");

  allPhrases = createP("Todas las frases:");
  allPhrases.position(600, 10);
  allPhrases.class("all");

  stats = createP("Stats");
  stats.class("stats");

  target = "Ser o no ser esa es la cuestion";
  popmax = 300;
  mutationRate = 0.01;

  //Se crea una población con la frase que se espera, la tasa de mutación y una población maxima.
  population = new Population(target, mutationRate, popmax);
}

function draw() {

  //Genera una mating pool.
  population.naturalSelection();
  //Crea la siguiente generación.
  population.generate();
  //Calcula su fitness.
  population.calcFitness();


  population.evaluate();

  //Si se consiguió la frase deseada termina.
  if (population.isFinished()) {
    noLoop();
  }

  displayInfo();
}

function displayInfo() {
  //Muestra los datos.
  let answer = population.getBest();

  mejorFrase.html("Mejor Frase:<br>" + answer);

  let statstext = "Número de generaciones:     " + population.getGenerations() + "<br>";
  statstext += "Fitness promedio:       " + nf(population.getAverageFitness()) + "<br>";
  statstext += "Total de la población:      " + popmax + "<br>";
  statstext += "Tiempo transcurrido:       "+ millis()/1000.0 + "<br>";
  statstext += "Tasa de mutación:         " + floor(mutationRate * 100) + "%";

  stats.html(statstext);

  allPhrases.html("Todas las frases:<br>" + population.allPhrases())
}
