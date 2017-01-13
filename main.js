$(document).ready(function() {

  //Call getLocation() when the document is ready - to get the user location
  //getLocation will also call the getWeather function to retrieve the actual weather
  getLocation();

});

//Fetches the weather data from the OpenWeather api
//This function will be called by the getLocation() function
function getWeather(city, country_code) {

  //OpenWeather api requires an APPID for all api calls.
  var app_id = 'b295c087f2f1be435ff5341d0c5868de';

  $.ajax({
    url: 'http://api.openweathermap.org/data/2.5/weather',
    data: {
      q: city + ',' + country_code,
      APPID: app_id
    }
  })

  .done(function (data){
    var fullResult = JSON.stringify(data);
    var userCity = data.name;
    var icon = data.weather[0].icon;
    console.log(icon);
    console.log(typeof(icon));
    var temp_kelvin = data.main.temp;
    var temp_celcius = temp_kelvin - 273;
    var temp_fahrenheit = 9 / 5 * temp_celcius + 32;
    $("#user-location").html(userCity);
    $("#temperature").html(temp_fahrenheit + " &#8451");
    $("#weather-icon").attr('src', 'http://openweathermap.org/img/w/' +icon +'.png');
    $("#apiCall").html(fullResult);

  })
  .fail(function (err) {
    alert("It failed");
  });
};


function getLocation() {

  /*
  - We will use the ipinfo api, which returns json in the form:
  - Assuming the call was http://ipinfo.io?dataType=jsonp, will return:
  {
  "ip": "8.8.8.8",
  "hostname": "google-public-dns-a.google.com",
  "city": "Mountain View",
  "region": "California",
  "country": "US",
  "loc": "37.3860,-122.0838",
  "org": "AS15169 Google Inc.",
  "postal": "94035"
  }
  */
  $.ajax({
    url: 'http://ipinfo.io',
    dataType: 'jsonp',
  })

  .done(function (data) { //I should probably use "success" here rather than ".done"
                          // Need to look into this!
    var currentUserLocation = JSON.stringify(data);
    $("#userLocation").html(currentUserLocation);

    var city = data.city;
    // var city = "Dallas"; //Testing Line
    var country_code = data.country;

    //When done, call the getWeather() function
    getWeather(city, country_code);
  })

  .fail(function(err) {
    $("#userLocation").html("The request to get the user location failed! Bleah!");
  })

};
