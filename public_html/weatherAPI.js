/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
// global variables
longitude = "yes";
latitude = "no";
//geolocation api call 
 $(function(){ $.ajax({ url :"http://ip-api.com/json",
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
    $("#data").append("appending data");
    }
  });                            });
$(function(){
console.log(latitude, longitude);
});      
  
// openweather api call
/*
$.ajax({
  url: 'http://api.openweathermap.org/data/2.5/forecast/city?id=524901&APPID={78f918f0fb37a83f72d8d516ea938fa5}',
  })
  */

