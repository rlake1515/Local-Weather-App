// options for geolocation
const geoOptions = {
    enableHighAccuracy: true, // prevents use of ip or wifi location
    timeout: 10000, // limits request to 10 seconds
    maximumAge: 0 // prevents the use of cached data
};

getGeolocation(geoOptions);

function getGeolocation(options){
    navigator.geolocation.getCurrentPosition(
            geoSuccess,
            geoError,
            options
                   );
    if(!navigator.geolocation){
            console.log("Geolocation is not supported");
            return;
    } 
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
    // access HTML elements to be updated
    const data1 = document.getElementById('data1');
    const city = document.getElementById("city");
    const temp_max = document.getElementById("temp_max");
    const temp_min = document.getElementById("temp_min");
    const currentTemp = document.getElementById("currentTemp");
    const day2name    = document.getElementById("day2name");

    // add content to HTML elements
    data1.innerHTML = weatherData.list[0].main.temp;
    city.innerHTML = weatherData.city.name;
    temp_max.innerHTML = weatherData.list[0].main.temp_max;
    temp_min.innerHTML = weatherData.list[0].main.temp_min;
    currentTemp.innerHTML = weatherData.list[0].main.temp;
    day2name.innerHTML = weatherData.list[0].dt_txt;

    // convert date to day of week
    getWeekDay(weatherData.list[0].dt_txt);
    // Import weather icons from external stylesheet
    getWeatherIcons();
    return;
}
// Get the day of week from timestamp
// Javascript getDay was frustrating me
function getWeekDay(date){
  const a = parseInt(date.substring(5,7)); // get month of year
  const dayOfMonth = parseInt(date.substring(8,10)); // get day of month
  const c = parseInt(date.substring(2,4)); // get year of century
  const century = parseInt(date.substring(0,2)); // get century as 2 digits
  const monthOfYear = parseInt(a < 3 ? `${parseInt(a) +10}` : `${parseInt(a) - 2}`); // convert to march = 1, apr = 2 ... jan = 11, feb = 12
  const yearOfCentury = parseInt(a < 3 ? `${parseInt(c) -1}` : `${parseInt(c)}`); // if Jan or Feb, subtract 1 from year
  const w = (13*monthOfYear -1) / 5;
  const x = yearOfCentury/4;
  const y = century/4;
  const z = Math.floor((w + x + y + dayOfMonth + yearOfCentury )- (2*century));
  const r = modulus(z,7);
  console.log(a,dayOfMonth,c,century,monthOfYear,yearOfCentury,w,x,y, z,r);
  return;
}
function modulus(x,m){
    return (x%m + m)%m;
}
function getWeatherIcons(){
    const weatherIcon = document.getElementById("weatherIcon");
    weatherIcon.className += "owf owf-803 owf-5x";
  return;  
};

/*
var dat2 = [1,3,2,4];
var data2 = dat2[0];
console.log(dat2[0]);
var data1 = document.getElementById('data1');
console.log(data1);
data1.innerHTML = data2;
*/