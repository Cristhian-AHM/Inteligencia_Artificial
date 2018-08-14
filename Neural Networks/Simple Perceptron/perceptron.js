//Clase perceptron

class perceptron {

  // El perceptron solo necesita dos componentes para funcionar, los pesos, la cantidad de
  // pesos son dados por el usuario, que se almacenan en un arreglo y una tasa de aprendizaje.
  constructor(n, c) {
    this.weights = [];
    this.weightsLength = n;
    // Los pesos se generan aleatoriamente con un valor de entre -1 y 1.
    for (var i = 0; i < this.weightsLength; i++) {
      this.weights[i] = random(-1, 1);
    }
    this.learning_rate = c;
  }

  // Función que entrena al perceptron.
  // Los pesos se ajustan según la salida deseada.
  train(inputs, desired){
    //El perceptron 'adivina' el resultado.
    let guess = this.guess(inputs);
    //Para ajustar los pesos es necesario obtener el error, el cual se calcula con la formula:
    let error = desired - guess;
    //Se ajustan los pesos usando el error y la tasa de aprendizaje (Gradient Descent).
    for (var i = 0; i < this.weights.length; i++) {
      this.weights[i] += this.learning_rate * error * inputs[i];
    }
  }

  //Usando los valores de los pesos, esta función genera una salida.
  guess(inputs) {
    let sum = 0;
    for (var i = 0; i < this.weights.length; i++) {
      sum += inputs[i] * this.weights[i];

    }
    return this.activate(sum);
  }

  //Función de activación, interpreta el resultado de los pesos y los inputs.
  activate(sum) {
    if (sum > 0) return 1;
    else return -1;
  }

  getWeights(){
    return this.weights;
  }


}
