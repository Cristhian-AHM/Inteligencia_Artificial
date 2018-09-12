var seed;
var seedInput;
var constante;
var constInput;
var iterations;
var iterationInput;

function setup() {
  noCanvas(); //No crea Canvas.
  seed = createDiv("Semilla: ");
  seed.style('padding', '4px 0px');
  seedInput = createInput();

  constante = createDiv("Constante: ");
  constante.style('padding', '4px 0px');
  constInput = createInput();

  iterations = createDiv("Iteraciones: ");
  iterations.style('padding', '4px 0px');
  iterationInput = createInput();

  var submit = createButton("Calcular Algoritmo");
  submit.style('padding', '4px 0px');

  seed.parent("#interface");
  seedInput.parent(seed);

  constante.parent("#interface");
  constInput.parent(constante);

  iterations.parent("#interface");
  iterationInput.parent(iterations);

  submit.parent("#interface");

  submit.mousePressed(MultiplicadorConstante);
}

function MultiplicadorConstante() {
  select("#results").html('');
  let Seed = parseInt(seedInput.value()); // Semilla
  let Constante = parseInt(constInput.value()); // Constante
  let Iteraciones = parseInt(iterationInput.value()); // Numero de Iteraciones
  let SeedSize =  Seed.toString().length;

  for (let i = 0; i < Iteraciones; i++) {

    let mult = Seed * Constante;
    let MultSize = mult.toString().length;

    if (MultSize % 2 == 0) {
      let d1 = (MultSize - SeedSize) / 2;
      let d2 = d1 + SeedSize;

      nn = mult.toString();
      let sub = nn.substring(d1, d2);
      var rec = createP("Iteración: " + (i+1) + ": (" + Constante +") * (" + Seed + ") = " + nn + "<br>    x" + i + ": " + sub + "    r" + i + ": 0." + (sub));
      Seed = parseInt(sub);
      rec.parent('#results');
    } else {
      nc = "0" + mult.toString();
      MultSize = nc.length;
      let d1 = (MultSize - SeedSize) / 2;
      let d2 = d1 + SeedSize;
      let nn = nc;
      var sub = nn.substring(d1, d2);
      var rec = createP("Iteración: " + (i+1) + ": (" + Constante +") * (" + Seed + ") = " + nn + " <br>   x" + i + ": " + sub + "    r" + i + ": 0." + (sub));
      rec.parent('#results');
      Seed = parseInt(sub);
      console.log(sub);
    }
  }
}
