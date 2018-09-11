let alum;

class Alumno {

  constructor() {
    this.alumn = {};
  }

  CaptureNames(total) {
    this.alumn.Nombres = [];
    this.alumn.Edades = []
    for (var i = 0; i < 5; i++) {
      this.alumn.Nombres[i] = prompt("Introduce un Nombre: ");
      this.alumn.Edades[i] = prompt("Introduce la edad: ");
    }
  }

  ShowAlumns(){
    for (var i = 0; i < 5; i++) {
      console.log("El nombre del alumno " + (i+1) +" es: " +this.alumn.Nombres[i]);
      console.log("La edad del alumno " + (i+1) +" es: " +this.alumn.Edades[i]);
    }
  }

}

function setup() {
  alum = new Alumno();
  alum.CaptureNames(5);
  alum.ShowAlumns();
}
