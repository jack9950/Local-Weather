var fullResult;
var userCity;
var icon;
var temp_kelvin;
var temp_celcius;
var temp_fahrenheit;
var fahrenheit = true;

$(document).ready(function() {

  /******************************************************************************
  Fetches the weather data from the OpenWeather api
  This function will be called by the getLocation() function
  *******************************************************************************/
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
      fahrenheit = true;
      //fullResult = JSON.stringify(data);
      userCity = data.name;
      icon = data.weather[0].icon;
      temp_kelvin = data.main.temp;
      temp_celcius = temp_kelvin - 273;
      temp_fahrenheit = 9 / 5 * temp_celcius + 32;

      $("#user-location").html(userCity);
      $("#temperature").html( parseInt(temp_fahrenheit) );
      $("#tempUnits").html(" &#8457");
      $("#weather-icon").attr('src', 'http://openweathermap.org/img/w/' +icon +'.png');
      //$("#apiCall").html(fullResult);

    })
    .fail(function (err) {
      alert("It failed");
    });
  };

  /******************************************************************************
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
  ******************************************************************************/
  function getLocation() {


    $.ajax({
      url: 'http://ipinfo.io',
      dataType: 'jsonp',
    })

    .done(function (data) { //I should probably use "success" here rather than ".done"
      // Need to look into this!
      var currentUserLocation = JSON.stringify(data);
      //$("#userLocation").html(currentUserLocation);

      var city = data.city;
      // var city = "Dallas"; //Testing Line
      var country_code = data.country;

      //When done, call the getWeather() function
      getWeather(city, country_code);
    })

    .fail(function(err) {
      //$("#userLocation").html("The request to get the user location failed! Bleah!");
    })

  };
  /*****************************************************************************
  changeUnits will be called when the user wants to change the units
  *****************************************************************************/
  function changeUnits (tempF) {
    if (fahrenheit) {
      $("#temperature").html( parseInt(temp_celcius) );
      $("#tempUnits").html(" &#8451");
      $("#changeUnits").html("&#8457");
      fahrenheit = false;
    }else {
      $("#temperature").html( parseInt(temp_fahrenheit) );
      $("#tempUnits").html(" &#8457");
      $("#changeUnits").html("&#8451");
      fahrenheit = true;
    }
  }

  //Call getLocation() when the document is ready - to get the user location
  //getLocation will also call the getWeather function to retrieve the actual weather
  getLocation();

  //this is called if the user clicks the change units button
  $("#changeUnits").on("click", changeUnits);

});
