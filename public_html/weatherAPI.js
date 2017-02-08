// options for geolocation
const geoOptions = {
    enableHighAccuracy: true, // prevents use of ip or wifi location
    timeout: 10000, // limits request to 10 seconds
    maximumAge: 0 // prevents the use of cached data
};

init();

function init() {
    getGeolocation(geoOptions); //function defined below
        if(!navigator.geolocation){
            console.log("Geolocation is not supported");
            return;
        }   
}

function getGeolocation(options){
    navigator.geolocation.getCurrentPosition(
            geoSuccess,
            geoError,
            options
                   );
           
}

// if successful
function geoSuccess(pos){
    getWeather(
            pos.coords.latitude,
            pos.coords.longitude
                    );
    console.log(pos.coords.longitude);
    console.log(pos.coords.latitude);
                    
}

// if error is returned
function geoError(err){
    console.log(err);
}

function getWeather(latitude, longitude){
    let request = new XMLHttpRequest(); // initialize XML request
    let units = "metric";
    var ourURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=78f918f0fb37a83f72d8d516ea938fa5&units=${units}`;
    request.open('GET',ourURL, true );
    request.onload = function() {
        if(request.status >= 200 && request.status < 400){
            renderWeatherData(request.response);
        }
      console.log(request.response);  
    };
    request.send();
}
// how to format returned JSON
function renderWeatherData(data){
    const weatherData = JSON.parse(data);
    console.log(weatherData);
    const data1 = document.getElementById('data1');
    data1.innerHTML = weatherData.list[0].main.temp;
    return;
}