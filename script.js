var curCond;
var curTemp;
var tempUn;

// weather conditions - icons, backgrounds and photographers

var imagePath = "https://pictures-weather.s3-ap-southeast-2.amazonaws.com/";

var weather = {
  tornado: ["wi wi-tornado", "tornado.jpg", "Nikolas Noonan"],

  thunderstorm: ["wi wi-thunderstorm", "thunderstorm.jpg", "Josep Castells"],

  drizzle: ["wi wi-sprinkle", "drizzle.jpg", "Scott Higdon"],

  rain: ["wi wi-rain", "rain.jpg", "Rhendi Rukmana"],

  snow: ["wi wi-snow", "snow.jpg", "Daniele Franchi"],

  clouds: ["wi wi-cloudy", "clouds.jpg", "Dimitri Svetsikas"],

  clear: ["wi wi-day-sunny", "clear.jpg", "Unsplash"],

  mist: ["wi wi-fog", "mist.jpg", "Tobias Keller"],

  smoke: ["wi wi-smoke", "smoke.jpg", "Holger Link"],

  haze: ["wi wi-day-haze", "haze.jpg", "Dylan Skinner"],

  dust: ["wi wi-dust", "dust,jpg", "Claes Pettersson"],

  fog: ["wi wi-fog", "fog.jpg", "Ricardo Gomez Angel"],

  sand: ["wi wi-sandstorm", "sand.jpg", "Matthieu Joannon"],

  ash: ["wi wi-dust", "ash.jpg", "Purnomo Capunk"],

  squall: ["wi wi-strong-wing", "wind.jpg", "Jessica Knowlden"],

  "not available": [
    "wi wi-alien",
    "jeremy-bishop-346059-unsplash.jpg",
    "Jeremy Bishop"
  ]
};

function locationString(location) {
  return location.city + ", " + location.state + ", " + location.country;
}

var x = document.getElementById("city");

// get weather conditions

function getWeather(location) {
  fetch(
    "https://community-open-weather-map.p.rapidapi.com/weather?id=2172797&units=metric&q=" +
      locationString(location),
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
        "x-rapidapi-key": "0XJn7oZpV5mshfuqDJuoSE9q8uxjp1rvAGbjsn8Do4CUK5CyGF"
      }
    }
  )
    .then(response => response.json())
    .then(data => {
      tempUn = "C";
      curTemp = Math.round(data.main.temp);

      $("#temp").html(curTemp + " &deg" + tempUn);
      curCond = data.weather[0].main.toLowerCase();
      console.log(curCond);

      $("#humidity").html(data.main.humidity + " %");

      $("#wind-speed").html(data.wind.speed + " m/s");

      $("#pressure").html(data.main.pressure + " mbar");

      $("#weather-icon").addClass(weather[curCond][0]);

      document.body.style.backgroundImage =
        "url(" + imagePath + weather[curCond][1] + ")";
      $("#photoBy").html(
        "Weather Fonts by Erik Flowers - Image by " + weather[curCond][2]
      );
    })
    .catch(error => {
      console.log(error);
      $("#country").hide();
      switch (error.code) {
        case error.PERMISSION_DENIED:
          x.innerHTML = "User denied the request for Geolocation";
          break;
        case error.POSITION_UNAVAILABLE:
          x.innerHTML = "Location information is unavailable";
          break;
        case error.TIMEOUT:
          x.innerHTML = "The request to get user location timed out";
          break;
        case error.UNKNOWN_ERROR:
          x.innerHTML = "An unknown error occurred";
          break;
      }
    });
}

//get current location

function getCurrentLocation() {
  fetch("https://geoip-db.com/json/")
    .then(response => response.json())
    .then(location => {
      $("#country").html(location.country_name);
      $("#state").html(location.state);
      $("#city").html(location.city);
      $("#latitude").html(location.latitude);
      $("#longitude").html(location.longitude);
      getWeather(location);
      console.log(location);
    })
    .catch(error => {
      console.error("Error:", error);
    });
}

getCurrentLocation();

// convert to Celsius or Fahrenheit

$("#cels").click(function convertToC() {
  if (tempUn === undefined) {
    return;
  }
  if (tempUn === "F") {
    curTemp = ((curTemp - 32) * 5) / 9;
    tempUn = "C";
  }
  $("#temp").html(Math.round(curTemp) + " &deg" + tempUn);
});

$("#faren").click(function convertToF() {
  if (tempUn === undefined) {
    return;
  }
  if (tempUn === "C") {
    curTemp = (curTemp * 9) / 5 + 32;
    tempUn = "F";
  }
  $("#temp").html(Math.round(curTemp) + " &deg" + tempUn);
});
