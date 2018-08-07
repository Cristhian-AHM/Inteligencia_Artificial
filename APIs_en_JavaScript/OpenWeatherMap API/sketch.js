var api = "http://api.openweathermap.org/data/2.5/weather?q=";
var apikey = "&appid=9fa1eee4078ea1bee8d6c5ac215be129";
var units = "&units=metric";

function setup() {
	noCanvas();
	createElement('h1', "Consultar Clima").parent('#Weather');
	createDiv("Ciudad").parent('#Weather');
	let input = createInput("Ciudad Juarez");
	let button = createButton("Submit");
	input.parent('#Weather');
	button.parent('#Weather');


	button.mousePressed(function(){
		var city = input.value();
		var url = api + city + apikey + units;
		loadJSON(url, gotData);
	});
}

function gotData(data){
	let message = select('#W');
	message.html("La temperatura en "+ data.name +" es de aproximadamente de " + data.main.temp + " grados centigrados.");
}
