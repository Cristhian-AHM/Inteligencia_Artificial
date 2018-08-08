//Variable que almacená la imagen del mundo.
var mapimg;

//Variables que guardan las coordenadas del centro del mundo.
var clon = 0;
var clat = 0;

//El zoom que se aplica al mapa.
var zoom = 1;
//Variable que almacená
var earthquakes;

//Función de JavaScript que cargá todo antes de ejecutar la función setup.
function preload() {
  //Carga la imagen de un api.
  mapimg = loadImage("https://api.mapbox.com/v4/mapbox.light/0,0,2/1100x850.png?access_token=pk.eyJ1IjoicXVpcWFzIiwiYSI6ImNqa2o3dzVoZzA3NjgzcnRqMHhjbmZobWQifQ.d7o-rEOBKG8On0nhBNAjoA");
  //Carga los datos de los terremotos, la parte final del link se puede modificar por:
  //significant_month , 2.5_days, all_month entre otros.
	earthquakes = loadStrings("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv");
}

function setup() {
  //Se crea un canvas.
  createCanvas(1100, 850);
  //Muevo el origen de la imagen en el centro de la pantalla.
  translate(width / 2, height / 2);
  imageMode(CENTER);
  //Muestra la imagen en la pantalla.
  image(mapimg, 0, 0);

  //Transforma las coordenadas del centro del mundo de coordenadas a pixeles.
	cx = WebMercX(clon);
	cy = WebMercY(clat);

  //Recorro todos los datos de los terremotos.
	for(var i = 0; i < earthquakes.length; i++){
    //La información es obtenida en formato en cvs, que vendría a ser parecido a Excel, almacena la información como tablas
    //un ejemplo sería: dato1,dato2,dato3,...,daton
    //Lo que hago es separar cada dato de una linea cuando encuentre una coma.
		var data = earthquakes[i].split(/,/);
    //Obtengo la longitud.
		var long = data[2];
    //Obtengo la latitud.
		var lati = data[1];
    //Obtengo la magnitud.
		var mag = data[4];

    //Dibujo el terremoto.
		drawEarthquakes(long, lati, mag);
	}

}

//Función que dibuja el terremoto
function drawEarthquakes(lon,lat, mag){
  //Obtengo la posición en pixeles de las coordenadas del terremoto.
	x = WebMercX(lon) - cx;
	y = WebMercY(lat) - cy;

  //La magnitud aumenta ya que los terremotos se miden de manera logaritmica
  //ejemplo
  //Un terremoto de magnitud 5 es 10 veces más fuerte que uno de magnitud 4.
	 mag = pow( 10, mag / 2 );
   //Asumo que la magnitud maxima de la escala de Richter es 10.
	var magmax = sqrt(pow(10, 10));
  //map(1,2,3,4,5) El valor 2: Es el valor minimo del rango. El valor 3: Es el valor maximo del rango.
  //El valor 4: Es el valor minimo del nuevo rango. El valor 5: Es el valor maximo del nuevo rango.
  //El valor 1: Es el valor que se convertira al nuevo rango.
  //Convierto el valor de la escala de Richter a uno en pixeles, entre más grande la magnitud mas grande
  //será el circulo.
	var d = map(mag, 0, magmax, 0, 200);
  //Dibujo el circulo.
	stroke(255, 0, 255);
	fill(255, 0, 255, 200);
	ellipse(x, y, d*2, d*2);
}

//Buscar Web Mercator, da una mejor explicación de lo que yo podría.
function WebMercY(lat) {
	lat = radians(lat);
  var a = (256 / PI) * pow(2, zoom);
  var b = tan(PI / 4 + lat / 2);
  var c = PI - log(b);

  return a * c;
}

//Buscar Web Mercator, da una mejor explicación de lo que yo podría.
function WebMercX(lon) {
	lon = radians(lon);
  var a = (256 / PI) * pow(2, zoom);
  var b = lon + PI;

  return a * b;
}
