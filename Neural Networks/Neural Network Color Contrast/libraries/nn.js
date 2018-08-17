// Clase que maneja las diferentes funciiones de activación de la Red Neuronal.

//https://theclevermachine.wordpress.com/tag/tanh-function/

class ActivationFunction {
  constructor(func, dfunc) {
    this.func = func;
    this.dfunc = dfunc;
  }
}

//Función de activación Sigmoid: y = 1 / (1 + e^(-x)), se usa para calcular las salidas de los nodos.
//Derivada de la Función sigmoid: y * (1 - y), se usa para el backpropagation algorithm.
let sigmoid = new ActivationFunction(
  x => 1 / (1 + Math.exp(-x)),
  y => y * (1 - y)
);

//Función de activación tangente hiperbolica, se usa para calcular las salidas de los nodos.
//Derivada de la Función tangente hiperbolica, se usa para el backpropagation algorithm.
let tanh = new ActivationFunction(
  x => Math.tanh(x),
  y => 1 - (y * y)
);


class NeuralNetwork {

  //El constructor recibe el número de entradas, el número de nodos internos que tendrá y cuantas salidas
  //se desean.
  constructor(in_nodes, hid_nodes, out_nodes) {

    this.input_nodes = in_nodes;
    this.hidden_nodes = hid_nodes;
    this.output_nodes = out_nodes;

    //Los pesos que existen entre las entredas y la Hidden Layer se alamcenán en una matriz.
    this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes);
    //Los pesos que existen entre la Hidden Layer y la salida se alamcenán en una matriz.
    this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes);
    //Se inicializan con un valor al azar.
    this.weights_ih.randomize();
    this.weights_ho.randomize();

    //El bias o umbral también se almacená en una matriz.
    this.bias_h = new Matrix(this.hidden_nodes, 1);
    this.bias_o = new Matrix(this.output_nodes, 1);
    //Se inicializan con un valor al azar.
    this.bias_h.randomize();
    this.bias_o.randomize();

    //Se establece la tasa de aprendizaje y la función de activación que usara.
    this.setLearningRate();
    this.setActivationFunction();


  }

  ///Función que realiza la predicción en base a valores.
  //Recibe un Array.
  predict(input_array) {
    //Hidden Layer.
    //-------------------------------------------------------------------------------------------
    //#Genera las salidas para la capa oculta (Hidden Layer).
    //-Convierte el arreglo en una matriz.
    let inputs = Matrix.fromArray(input_array);
    //-Multiplica los pesos por las entradas (Multiplicación de matrices.).
    let hidden = Matrix.multiply(this.weights_ih, inputs);
    //-Se agrega el bias (Umbral).
    hidden.add(this.bias_h);
    //-Se llama a la función de activación para interpretar ese resultado, en este caso se
    //usa la función sigma (Se aplica la función sigma a todos los valores de la matriz).
    hidden.map(this.activation_function.func);
    //-------------------------------------------------------------------------------------------
    //Salidas.
    //-------------------------------------------------------------------------------------------
    //#Genera las salidas.

    //-Multiplica los pesos por el resultado de la capa oculta.
    let output = Matrix.multiply(this.weights_ho, hidden);
    //-Agrega el bias (Umbral).
    output.add(this.bias_o);
    //-Se llama a la función de activación para interpretar ese resultado, en este caso se
    //usa la función sigma (Se aplica la función sigma a todos los valores de la matriz).
    output.map(this.activation_function.func);

    //Devuelve el resultado como un arreglo.
    return output.toArray();
  }

  setLearningRate(learning_rate = 0.1) {
    this.learning_rate = learning_rate;
  }

  setActivationFunction(func = sigmoid) {
    this.activation_function = func;
  }

  //Función que entrena a la red neuronal, recibe entradas y el resultado esperado.
  train(input_array, target_array) {
    //Hidden Layer.
    //-------------------------------------------------------------------------------------------
    //#Genera las salidas para la capa oculta (Hidden Layer).

    //-Convierte el arreglo en una matriz.
    let inputs = Matrix.fromArray(input_array);
    //-Multiplica los pesos por las entradas (Multiplicación de matrices.).
    let hidden = Matrix.multiply(this.weights_ih, inputs);
    //-Se agrega el bias (Umbral).
    hidden.add(this.bias_h);
    //-Se aplica la función de activación.
    hidden.map(this.activation_function.func);
    //-------------------------------------------------------------------------------------------
    //Salidas.
    //-------------------------------------------------------------------------------------------
    //#Genera las salidas.

    //-Multiplica los pesos por el resultado de la capa oculta.
    let outputs = Matrix.multiply(this.weights_ho, hidden);
    //-Se agrega el bias (Umbral).
    outputs.add(this.bias_o);
      //-Se aplica la función de activación.
    outputs.map(this.activation_function.func);
    //-------------------------------------------------------------------------------------------
    //Error.
    //-------------------------------------------------------------------------------------------
    //#Se calcula el error.

    //-Se convierten los valores esperados en una matriz.
    let targets = Matrix.fromArray(target_array);

    // El error se calcula: ERROR = TARGETS - OUTPUTS
    let output_errors = Matrix.subtract(targets, outputs);

    //--------------------------------------------------------------------------------------------
    //Backpropagation Algorithm.
    //--------------------------------------------------------------------------------------------
    //-Para aplicar el algoritmo de propagación hacia atrás es necesario calcular la derivada de la
    //función sigmoid que es:
    //-outputs * (1 - outputs).
    //-La formula para ajustar los pesos es:
    // learning_rate * Error * (outputs * (1 - outputs)) * H(Transvensa).
    //-Calculamos el gradiente.
    let gradients = Matrix.map(outputs, this.activation_function.dfunc);
    //-Lo multiplicamos por el error.
    gradients.multiply(output_errors);
    //-Lo multiplicamos por la tasa de aprendizaje.
    gradients.multiply(this.learning_rate);

    //-Se calculan los deltas (Cuanto se ajustaran los pesos.).
    let hidden_T = Matrix.transpose(hidden);
    let weight_ho_deltas = Matrix.multiply(gradients, hidden_T);

    //-Se ajustan los pesos en base a los cambios.
    this.weights_ho.add(weight_ho_deltas);
    //-Se ajusta el umbral en base a los cambios.
    this.bias_o.add(gradients);

    //-Se calculan los errores de la capa oculta.
    let who_t = Matrix.transpose(this.weights_ho);
    let hidden_errors = Matrix.multiply(who_t, output_errors);

    //-Se calcula el gradiente de la capa oculta.
    let hidden_gradient = Matrix.map(hidden, this.activation_function.dfunc);
    hidden_gradient.multiply(hidden_errors);
    hidden_gradient.multiply(this.learning_rate);

    //-Se calculan los deltas.
    let inputs_T = Matrix.transpose(inputs);
    let weight_ih_deltas = Matrix.multiply(hidden_gradient, inputs_T);

    this.weights_ih.add(weight_ih_deltas);
    this.bias_h.add(hidden_gradient);


  }

}
