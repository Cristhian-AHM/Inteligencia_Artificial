var data;
var users;
var similarityScores = {};
var Movies;

function setup() {
  noCanvas(); //No crea Canvas.

  //Obtengo los titulos de las peliculas.
  Movies = data.titles;
  //Obtengo los usuarios.
  users = data.users;
  //Un arreglo de Dropdowns para generar una interfaz de usuario.
  var dropdowns = [];

  //Se crea una interfáz gráfica.
  for (var i = 0; i < Movies.length; i++) {
    //Creó un Div con Estilos.
    var div = createDiv(Movies[i] + " ");
    div.style('padding', '4px 0px');
    div.parent('#interface');
    //Crea un dropdown por pelicula.
    var dropdown = createSelect('');
    //La primera opción del Droopdown es 'No Visto'
    dropdown.option("No Visto");
    //Las podrá clasificar de 1 a 5 estrellas.
    for (var star = 1; star < 6; star++) {
      dropdown.option(star);
    }
    dropdown.parent(div);
    dropdown.Movies = Movies[i];
    dropdowns.push(dropdown);
  }

  //Se crea un botón con estilo.
  var submit = createButton('submit');
  submit.parent('#interface');
  submit.style('margin', '4px 0px');
  submit.style('padding', '4px');

  //Llamo a un evento cuando se presiona el Ratón sobre el botón y creo una función.
  submit.mousePressed(function predictRating() {
    //Se crea un objeto para almacenar las nuevas calificaciones de las películas.
    var newUser = {};
    //Basandose en la cantidad de Droopdowns se obtienen las películas y el valor seleccionado.
    for (var i = 0; i < dropdowns.length; i++) {
      var title = dropdowns[i].Movies;
      var rating = dropdowns[i].value();
      //Si la calificación(rating) es 'No Visto' lo pone como null el valor.
      if (rating == 'No Visto') {
        rating = null;
      }
      //Se asigna al nuevo usuario las calificaciones de las películas.
      newUser[title] = rating;
    }
    //Llamamos al metodo findNearestNeigbhors.
    findNearestNeigbhors(newUser, euclideanDistance);
  });
}

function findNearestNeigbhors(user, similarity) {

  // Se limpia el Div
  select("#results").html('');
  // Se crea un objeto donde se almacenarán las recomendaciones.
  var Recommendations = {};
  // Se almacena el contenido de Movies en titles.
  var titles = Movies;

  // Guarda la similitud que existe entre como tu calificaste una película y alguien más.
  for (var i = 0; i < users.length; i++) {
    var other = users[i];
    // Verifica que no lo compares contigo mismo.
    if (other != user) {
      var sim = similarity(user, other);
      similarityScores[other.name] = sim;
    }
  }

  // Ordena el arreglo, la forma de ordenar el arreglo se la doy en el metodo compareSimilarity.
  data.users.sort(compareSimilarity);
  var Results = 0;
  //Recorro através de todas las películas.
  for (var i = 0; i < Movies.length; i++) {
    // Almaceno el titulo de cada pelicula por separado.
    var title = titles[i];
    // Siempre y cuando el usuario le haya dado una calificación a esa pelicula continua.
    if (user[title] == null) {
      //k es la cantidad de usuarios con los que lo comparare.
      var k = 3;
      var weightedSum = 0;
      var similaritySum = 0;
      for (var j = 0; j < k; j++) {
        Recommendations[title] = {
          total: 0,
          simSum: 0,
          ranking: 0
        }
        var name = users[j].name;
        var sim = similarityScores[name];
        var ratings = users[j];
        var rating = ratings[title];

        weightedSum += rating * sim;
				Recommendations[title].total = weightedSum;

        similaritySum += sim;
				Recommendations[title].simSum = similaritySum;
        
        Results = weightedSum / similaritySum;
				Recommendations[title].ranking = Results;
      }
    }
  }

  // Aquí le digo a JavaScript que me almacene todos los elementos de Recommendations que se guardaron como title.
	var movies = Object.keys(Recommendations);
  //Las ordeno.
  movies.sort(byRanking);
  function byRanking(a, b) {
    return Recommendations[b].ranking - Recommendations[a].ranking;
  }

  // Muestra todo ordenado.
  for (var i = 0; i < movies.length; i++) {
    var movie = movies[i];
    var stars = Recommendations[movie].ranking;
    var rec = createP(movie + ' ' + nf(stars, 1, 1) + '⭐');
    rec.parent('#results');
  }
}

// Esta función es la que le dice a la función sort como ordenar el arreglo.
function compareSimilarity(a, b) {
  var score1 = similarityScores[a.name];
  var score2 = similarityScores[b.name];

  return score2 - score1;
}

function euclideanDistance(ratings1, ratings2) {
  var movies = Movies;
  var sumSquares = 0;

  for (var i = 0; i < movies.length; i++) {
    var movie = movies[i];
    var rating1 = ratings1[movie];
    var rating2 = ratings2[movie];
    if (rating1 != null && rating2 != null) {
      var diff = rating1 - rating2;
      sumSquares += diff * diff;
    }
  }

  var Distance = sqrt(sumSquares);
  var similarity = 1 / (1 + Distance);
  return similarity;
}

// Con esta función cargo el Jason con la información.
function preload() {
  data = loadJSON('ratings.js');
}

function draw() {
  //background(255);

}
