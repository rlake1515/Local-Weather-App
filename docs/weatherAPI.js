
APILocationRequest();

// uses ip-api.com to retrieve location data
function APILocationRequest(){
  let request = "";
  if (window.XMLHttpRequest){
    request = new XMLHttpRequest();
  }
  request.open('GET','http://ip-api.com/json',true);
  request.onload = function (){
    var requestResponse = JSON.parse(request.responseText);
    const latitude = requestResponse.lat;
    const longitude = requestResponse.lon;
    console.log(requestResponse.lat);
    console.log(requestResponse.lon);
    getWeather(latitude, longitude);
  };
  request.send();
};

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
    const city = document.getElementById("city");
    const temp_max = document.getElementById("temp_max");
    const temp_min = document.getElementById("temp_min");
    const currentTemp = document.getElementById("currentTemp");
    const weatherIcon = document.getElementById("weatherIcon");
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
    const day2icon = document.getElementById("day2icon");
    const day3icon = document.getElementById("day3icon");
    const day4icon = document.getElementById("day4icon");
    const day5icon = document.getElementById("day5icon");
    // add content to HTML elements
    city.innerHTML = weatherData.city.name;
    temp_max.innerHTML = weatherData.list[0].main.temp_max;
    temp_min.innerHTML = weatherData.list[0].main.temp_min;
    currentTemp.innerHTML = weatherData.list[0].main.temp;
    // report daily high and low temperatures
    day2high.innerHTML = dailyHigh(0);
    day3high.innerHTML = dailyHigh(8);
    day4high.innerHTML = dailyHigh(16);
    day5high.innerHTML = dailyHigh(24);
    day2low.innerHTML = dailyLow(0);
    day3low.innerHTML = dailyLow(8);
    day4low.innerHTML = dailyLow(16);    
    day5low.innerHTML = dailyLow(24);
    // populate daily weather icons
    weatherIcon.className = getWeatherIcons(weatherData.list[0].weather[0].id) + " owf-5x";
    day2icon.className = getWeatherIcons(weatherData.list[0].weather[0].id) + " owf-2x";
    day3icon.className = getWeatherIcons(weatherData.list[8].weather[0].id) + " owf-2x";
    day4icon.className = getWeatherIcons(weatherData.list[16].weather[0].id) + " owf-2x";
    day5icon.className = getWeatherIcons(weatherData.list[24].weather[0].id) + " owf-2x";

    // temporary for determining daily high/low
    dailyHigh(0);

    // convert date to day of week, add to HTML
    getWeekDay(day2date, day2name);
    getWeekDay(day3date, day3name);
    getWeekDay(day4date, day4name);
    getWeekDay(day5date, day5name);
    // Import weather icons from external stylesheet
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
function dailyHigh(start){
    var tempArray = [];
    for(var i = 0; i < 8; i++){
        tempArray.push(weatherData.list[start+ i].main.temp_max);
    }
    tempArray.sort(function(a,b){
        return b-a;
    });
    return tempArray[0];
}

// find the 24 hour temperature low
function dailyLow(start){
    var tempArray = [];
    for(var i = 0; i < 8; i++){
        tempArray.push(weatherData.list[start+ i].main.temp_min);
    }
    tempArray.sort(function(a,b){
        return a-b;
    });
    return tempArray[0];
}

function getWeatherIcons(input){
    console.log(input);
    var weatherIcon = "owf owf-212";
    switch(true){
    case input >= 200 && input <= 232:
        weatherIcon = "owf owf-212";
        break;
    case input >= 300 && input <= 600:
        weatherIcon = "owf owf-502";
        break;
    case input >= 600 && input <= 700:
        weatherIcon = "owf owf-602";
        break;
    case input === 800:
        weatherIcon = "owf owf-950";
        break;
    case input >= 801 && input <= 804:
        weatherIcon = "owf owf-803";
        break;
    }
  console.log(weatherIcon);
  return weatherIcon;  
};

