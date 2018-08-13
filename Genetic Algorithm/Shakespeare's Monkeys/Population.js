//Clase que describe la población.

//En este caso, cada miembro de esta población es una instancea de un objeto DNA.

class Population {
  constructor(p, m, num) {

    //Arreglo que almacena la población actual.
    this.population;
    //Arreglo para almacenar la mating pool.
    this.matingPool;
    //Número de generacions.
    this.generations = 0;
    this.finished = false;
    //Frase deseada.
    this.target = p;
    //Tasa de mutación.
    this.mutationRate = m;
    this.perfectScore = 1;
    //La mejor frase.
    this.best = "";

    //Se declara el arreglo población.
    this.population = [];
    //Crea una población en base a la población maxima.
    //Los miembros de la población se crean apartir de letras al azar
    //y tienen el mismo tamaño que la frase deseada.
    for (let i = 0; i < num; i++) {
      this.population[i] = new DNA(this.target.length);
    }
    //Se declara el arreglo mating pool.
    this.matingPool = [];
    //Se calcula el Fitness de cada miembro de la población.
    this.calcFitness();
  }

  //Le asigna un fitness a cada miembro de la población.
  calcFitness() {
    for (let i = 0; i < this.population.length; i++) {
      this.population[i].calcFitness(target);
    }
  }

  //Genera un mating pool
  naturalSelection() {
    //Limpia el arreglo.
    this.matingPool = [];

    let maxFitness = 0;
    //Obtiene cual es el fitness mas alto.
    for (let i = 0; i < this.population.length; i++) {
      if (this.population[i].fitness > maxFitness) {
        maxFitness = this.population[i].fitness;
      }
    }

    //Basado en el fitness, cada miembro sera agregado cierto número de veces al mating pool.
    //Entre más alto el fitness, será agregado más veces al mating pool y es más probable
    //que sea elegido como 'padre'.
    //Entre más bajo el fitness, será agregado menos veces al mating pool y es menos probable
    //que sea elegido como 'padre'.
    for (let i = 0; i < this.population.length; i++) {
      //Convierte el valor de fitness en una escala del 0 al 1.
      let fitness = map(this.population[i].fitness, 0, maxFitness, 0, 1);
      let n = floor(fitness * 100);
      for (let j = 0; j < n; j++) {
        this.matingPool.push(this.population[i]);
      }
    }
  }

  //Crea una nueva generación.
  generate() {
    //Reemplaza a los elementos de la anterior generación con la nueva.
    for (let i = 0; i < this.population.length; i++) {
      //Elige al azar dos elementos de la mating pool.
      let a = floor(random(this.matingPool.length));
      let b = floor(random(this.matingPool.length));

      let partnerA = this.matingPool[a];
      let partnerB = this.matingPool[b];
      //Creo un elemento 'hijo' usando los elementos seleccionados al azar.
      let child = partnerA.crossover(partnerB);
      //Veo si muta.
      child.mutate(this.mutationRate);
      //Se agrega a la población.
      this.population[i] = child;
    }
    //Aumenta la generación.
    this.generations++;
  }


  getBest() {
    return this.best;
  }

  //Evalua al miembro con el fitness más alto.
  evaluate() {
    let worldrecord = 0.0;
    let index = 0;
    for (let i = 0; i < this.population.length; i++) {
      if (this.population[i].fitness > worldrecord) {
        index = i;
        worldrecord = this.population[i].fitness;
      }
    }

    this.best = this.population[index].getPhrase();
    if (worldrecord === this.perfectScore) {
      this.finished = true;
    }
  }

  isFinished() {
    return this.finished;
  }

  getGenerations() {
    return this.generations;
  }

  //Obtiene un promedio del fitness de la población.
  getAverageFitness() {
    let total = 0;
    for (let i = 0; i < this.population.length; i++) {
      total += this.population[i].fitness;
    }
    return total / (this.population.length);
  }

  allPhrases() {
    let everything = "";

    let displayLimit = min(this.population.length, 50);


    for (let i = 0; i < displayLimit; i++) {
      everything += this.population[i].getPhrase() + "<br>";
    }
    return everything;
  }
}
