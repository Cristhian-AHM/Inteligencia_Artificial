var mapimg;

var clon = 0;
var clat = 0;

var lon = -0.1257400;
var lat = 51.5085300;

var zoom = 1;
var earthquakes;

function preload() {
  mapimg = loadImage("https://api.mapbox.com/v4/mapbox.light/0,0,2/1100x850.png?access_token=pk.eyJ1IjoicXVpcWFzIiwiYSI6ImNqa2o3dzVoZzA3NjgzcnRqMHhjbmZobWQifQ.d7o-rEOBKG8On0nhBNAjoA");
	//significant_month , 2.5_days, all_month
	earthquakes = loadStrings("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv");
}

function setup() {
  createCanvas(1100, 850);
  translate(width / 2, height / 2);
  imageMode(CENTER);
  image(mapimg, 0, 0);

	cx = WebMercX(clon);
	cy = WebMercY(clat);

	console.log(earthquakes.length);
	for(var i = 0; i < earthquakes.length; i++){
		var data = earthquakes[i].split(/,/);
		var long = data[2];
		var lati = data[1];

		var mag = data[4];

		drawEarthquakes(long, lati, mag);
	}

}

function drawEarthquakes(lon,lat, mag){
	x = WebMercX(lon) - cx;
	y = WebMercY(lat) - cy;

	mag = pow(10, mag);
	mag = sqrt(mag);
	var magmax = sqrt(pow(10, 10));
	var d = map(mag, 0, magmax, 0, 200);
	stroke(255, 0, 255);
	fill(255, 0, 255, 200);
	ellipse(x, y, d, d);
}


function WebMercY(lat) {
	lat = radians(lat);
  var a = (256 / PI) * pow(2, zoom);
  var b = tan(PI / 4 + lat / 2);
  var c = PI - log(b);

  return a * c;
}


function WebMercX(lon) {
	lon = radians(lon);
  var a = (256 / PI) * pow(2, zoom);
  var b = lon + PI;

  return a * b;
}
