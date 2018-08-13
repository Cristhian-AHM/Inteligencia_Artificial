//Clase que describe cada miembro de la población.

//Función para generar letras al azar.
function newChar() {
  let c = floor(random(63, 122));
  if (c === 63) c = 32;
  if (c === 64) c = 46;

  return String.fromCharCode(c);
}

//Constructor, crea un objeto DNA con letras al azar.
class DNA {
  constructor(num) {
    this.genes = [];
    this.fitness = 0;
    for (let i = 0; i < num; i++) {
      //Crea letras al azar.
      this.genes[i] = newChar();
    }
  }

  //Convierte los caracteres en un array en un String.
  getPhrase() {
    return this.genes.join("");
  }

  //Calcula el fitness y regresa un valor entre 0 y 1.
  calcFitness(target) {
    //El fitness se calcula con una puntuación.
    let score = 0;
    for (let i = 0; i < this.genes.length; i++) {
      //Se compara caracter por caracter al miembro de la población con la frase deseada.
      //Si un carácter en la posición i del miembro de la población concuerda con el
      //carácter en la posición i de la frase deseada el Score aumenta.
      if (this.genes[i] == target.charAt(i)) {
        score++;
      }
    }
    //Una vez revisado toda la cadena obtiene el porcentaje del fitness que obtuvo ese miembro
    //de la población.
    this.fitness = score / target.length;
  }

  //Crossover
  crossover(partner) {
    //Nuevo 'hijo'.
    let child = new DNA(this.genes.length);

    //Escoge un punto medio.
    let midpoint = floor(random(this.genes.length));

    //Usa ese punto medio para determinar cuantos genes tomará de sus padres.
    for (let i = 0; i < this.genes.length; i++) {
      if (i > midpoint) child.genes[i] = this.genes[i];
      else child.genes[i] = partner.genes[i];
    }
    return child;
  }

  //Muta en base a la tasa de mutación.
  mutate(mutationRate) {
    for (let i = 0; i < this.genes.length; i++) {
      if (random(1) < mutationRate) {
        this.genes[i] = newChar();
      }
    }
  }
}
