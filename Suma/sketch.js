let arreglo = {};


function setup() {
  arreglo.Nombres = [];
  arreglo.Edades = []
  for (var i = 0; i < 5; i++) {
    arreglo.Nombres[i] = prompt("Introduce un Nombre: ");
    arreglo.Edades[i] = prompt("Introduce la edad: ");
  }

  for (var i = 0; i < 5; i++) {
    console.log("El nombre del alumno " + (i+1) +" es: " +arreglo.Nombres[i]);
    console.log("La edad del alumno " + (i+1) +" es: " +arreglo.Edades[i]);
  }

}
