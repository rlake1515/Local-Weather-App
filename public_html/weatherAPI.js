
// global variables
$(document).ready(function(){

longitude = "yes";
latitude = "no";
var data1 = document.getElementById('data');
console.log(data1);
data1.innerHTML = "inserted JS text";


//geolocation api call 
 $.ajax({ url :"http://ip-api.com/json",
    dataType: 'jsonp',
    success: function(data){
    country = data.country,
    city = data.city,
    zip = data.zip,
    lat = data.lat,
    lon = data.lon,
    latitude = (data.lat);
    longitude = (data.lon);
    $("#data").append(data.lat);
    }
  });                          
$(function(){
console.log(latitude, longitude);
});      
  

// openweather api call
/*
$.ajax({
  url: 'http://api.openweathermap.org/data/2.5/forecast/city?id=524901&APPID={78f918f0fb37a83f72d8d516ea938fa5}',
  })
  */

});