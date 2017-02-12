// options for geolocation
const geoOptions = {
    enableHighAccuracy: true, // prevents use of ip or wifi location
    timeout: 10000, // limits request to 10 seconds
    maximumAge: 0 // prevents the use of cached data
};

// global variables 
weatherData = "";

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
    weatherData = JSON.parse(data);
    console.log(weatherData);
    // access HTML elements to be updated
    const data1 = document.getElementById('data1');
    const city = document.getElementById("city");
    const temp_max = document.getElementById("temp_max");
    const temp_min = document.getElementById("temp_min");
    const currentTemp = document.getElementById("currentTemp");
    const day2name    = document.getElementById("day2name");
    const day3name    = document.getElementById("day3name");
    const day4name    = document.getElementById("day4name");
    const day5name    = document.getElementById("day5name");
    const day2date = weatherData.list[0].dt_txt;
    const day3date = weatherData.list[8].dt_txt;
    const day4date = weatherData.list[16].dt_txt;
    const day5date = weatherData.list[24].dt_txt;
    const day2high = document.getElementById("day2high");
    const day3high = document.getElementById("day3high");
    const day4high = document.getElementById("day4high");
    const day5high = document.getElementById("day5high");
    const day2low = document.getElementById("day2low");
    const day3low = document.getElementById("day3low");
    const day4low = document.getElementById("day4low");
    const day5low = document.getElementById("day5low");
console.log(weatherData.list[8].dt_txt);
    // add content to HTML elements
    data1.innerHTML = weatherData.list[0].main.temp;
    city.innerHTML = weatherData.city.name;
    temp_max.innerHTML = weatherData.list[0].main.temp_max;
    temp_min.innerHTML = weatherData.list[0].main.temp_min;
    currentTemp.innerHTML = weatherData.list[0].main.temp;
    day2high.innerHTML = weatherData.list[0].main.temp_max;
    day3high.innerHTML = weatherData.list[8].main.temp_max;
    day4high.innerHTML = weatherData.list[16].main.temp_max;
    day5high.innerHTML = weatherData.list[24].main.temp_max;
    day2low.innerHTML = weatherData.list[4].main.temp_min;
    day3low.innerHTML = weatherData.list[12].main.temp_min;
    day4low.innerHTML = weatherData.list[20].main.temp_min;    
    day5low.innerHTML = weatherData.list[28].main.temp_min;

    // temporary for determining daily high/low
    dailyHigh();

    // convert date to day of week, add to HTML
    getWeekDay(day2date, day2name);
    getWeekDay(day3date, day3name);
    getWeekDay(day4date, day4name);
    getWeekDay(day5date, day5name);
    // Import weather icons from external stylesheet
    getWeatherIcons();
    return;
}
// Get the day of week from timestamp
// Javascript getDay was frustrating me
function getWeekDay(date, element){
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
  const r = parseInt(modulus(z,7));
  //console.log(a,dayOfMonth,c,century,monthOfYear,yearOfCentury,w,x,y, z,r);

  switch(r){
      case 0:
          element.innerHTML = 'Sunday';
          break;
      case 1:
          element.innerHTML = 'Monday';
          break;
      case 2:
          element.innerHTML = 'Tuesday';
          break;
      case 3:
          element.innerHTML = 'Wednesday';
          break;
      case 4:
          element.innerHTML = 'Thursday';
          break;
      case 5:
          element.innerHTML = 'Friday';
          break;
      case 6:
          element.innerHTML = 'Saturday';
          break;
      default:
          console.log('bar', r, typeof r);
          break;
  }
  return;
}
function modulus(x,m){
    return (x%m + m)%m;
}

// find the 24 hour temperature high
function dailyHigh(){
    var tempArray = [];
    for(var i = 0; i < 8; i++){
        tempArray.append(weatherData.list[0].main.temp_max)
    }
    console.log(tempArray);
}

function getWeatherIcons(){
    const weatherIcon = document.getElementById("weatherIcon");
    weatherIcon.className += "owf owf-803 owf-5x";
  return;  
};

