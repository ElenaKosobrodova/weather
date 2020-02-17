var curCond;
var curTemp;
var tempUn;

// weather conditions - icons, backgrounds and photographers

var imagePath =
  "https://s3-ap-southeast-2.amazonaws.com/elena.kosobrodova.codepen/weather/local-weather/css/pictures/";

var weather = {
  tornado: ["wi wi-tornado", "tornado.jpg", "NASA"],
  breez: [
    "wi wi-strong-wind",
    "jason-blackeye-107478-unsplash.jpg",
    "Jason Blackeye"
  ],
  "tropical storm": [
    "wi wi-thunderstorm",
    "bethany-laird-311256-unsplash.jpg",
    "Bethany Laird"
  ],
  hurricane: ["wi wi-hurricane", "tornado.jpg", "NASA"],
  "severe thunderstorms": [
    "wi wi-lightning",
    "josep-castells-523198-unsplash.jpg",
    "Josep Castells"
  ],
  thunderstorm: [
    "wi wi-thunderstorm",
    "johannes-plenio-356764-unsplash.jpg",
    "Johannes Plenio"
  ],
  "mixed rain and snow": [
    "wi wi-rain-mix",
    "takahiro-taguchi-548316-unsplash.jpg",
    "Takahiro Taguchi"
  ],
  "mixed rain and sleet": [
    "wi wi-sleet",
    "nathan-anderson-112380-unsplash.jpg",
    "Nathan Anderson"
  ],
  "mixed snow and sleet": [
    "wi wi-snow",
    "joy-real-535919-unsplash.jpg",
    "Joy Real"
  ],
  drizzle: ["wi wi-sprinkle", "todd-diemer-110882-unsplash.jpg", "Todd Diemer"],
  "freezing rain": ["wi wi-rain", "joy-stamp-21279-unsplash.jpg", "Joy Stamp"],
  showers: [
    "wi wi-showers",
    "rhendi-rukmana-193672-unsplash.jpg",
    "Rhendi Rukmana"
  ],
  rain: [
    "wi wi-showers",
    "rhendi-rukmana-193672-unsplash.jpg",
    "Rhendi Rukmana"
  ],
  "snow flurries": [
    "wi wi-snow-wind",
    "les-anderson-212656-unsplash.jpg",
    "Les Anderson"
  ],
  "light snow showers": [
    "wi wi-snow",
    "emanuel-hahn-223442-unsplash.jpg",
    "Emanuel Hahn"
  ],
  "blowing snow": [
    "wi wi-snow-wind",
    "charl-van-rooy-629247-unsplash.jpg",
    "Charl van Rooy"
  ],
  snow: [
    "wi wi-snow",
    "kalle-kortelainen-242406-unsplash.jpg",
    "Kalle Kortelainen"
  ],
  hail: ["wi wi-hail", "hail-379268_1920.jpg", "Pixabay"],
  sleet: ["wi wi-sleet", "ice-591137_1920.jpg", "Pixabay"],
  dust: ["wi wi-dust", "blowing-desert-hot-60703.jpg", "Pexels"],
  fog: ["wi wi-fog", "chris-lawton-475897-unsplash.jpg", "Chris Lawton"],
  haze: ["wi wi-day-haze", "linh-pham-215843-unsplash.jpg", "Linh Pham"],
  smoke: ["wi wi-smoke", "alex-gindin-344-unsplash.jpg", "Alex Gindin"],
  blustery: [
    "wi wi-strong-wind",
    "cristobal-baeza-578197-unsplash.jpg",
    "Cristobal Baeza"
  ],
  wind: ["wi wi-windy", "jason-blackeye-107478-unsplash.jpg", "Jason Blackeye"],
  cold: ["wi wi-snowflake-cold", "galina-n-189483-unsplash.jpg", "Galina N"],
  clouds: ["wi wi-cloudy", "rocky-coast-3350230_1920.jpg", "Pixabay"],
  "partly cloudy": ["wi wi-cloudy", "rocky-coast-3350230_1920.jpg", "Pixabay"],
  "mostly cloudy": [
    "wi wi-day-cloudy",
    "cloudiness-clouds-cloudy-417045.jpg",
    "Pixabay"
  ],
  sunny: ["wi wi-day-sunny", "beautiful-bee-bloom-878560.jpg", "Pexels"],
  "mostly sunny": ["wi wi-day-sunny", "pexels-photo-539719.jpeg", "Pexels"],
  clear: ["wi wi-day-sunny", "beautiful-bee-bloom-878560.jpg", "Pexels"],
  "mostly clear": ["wi wi-day-sunny", "pexels-photo-539719.jpeg", "Pexels"],
  fair: ["wi wi-day-sunny", "pexels-photo-539719.jpeg", "Pexels"],
  "mixed rain and hail": ["wi wi-hail", "hail-379268_1920.jpg", "Pixabay"],
  hot: ["wi wi-hot", "ben-ostrower-564575-unsplash.jpg", "Ben Ostrower"],
  "isolated thunderstorms": [
    "wi wi-thunderstorm",
    "vidar-nordli-mathisen-544510-unsplash.jpg",
    "Vidar Nordli"
  ],
  "scattered thunderstorms": [
    "wi wi-thunderstorm",
    "ian-froome-362138-unsplash.jpg",
    "Ian Froome"
  ],
  "scattered showers": [
    "wi wi-showers",
    "pop-zebra-333443-unsplash.jpg",
    "Unsplash"
  ],
  "heavy snow": ["wi wi-snow", "joy-real-535919-unsplash.jpg", "Joy Real"],
  "scattered snow showers": [
    "wi wi-snow",
    "bench-cold-empty-209839.jpg",
    "Pexels"
  ],
  "partly cloudy": [
    "wi wi-cloud",
    "daniil-silantev-354828-unsplash.jpg",
    "Daniil Silantev"
  ],
  thundershowers: ["wi wi-storm-showers", "tiger-3389015_1920.jpg", "Pixabay"],
  "snow showers": [
    "wi wi-snow",
    "jeffrey-blum-399705-unsplash.jpg",
    "Jeffrey Blum"
  ],
  "isolated thundershowers": [
    "wi wi-storm-showers",
    "pop-zebra-333443-unsplash.jpg",
    "Unsplash"
  ],
  "not available": [
    "wi wi-alien",
    "jeremy-bishop-346059-unsplash.jpg",
    "Jeremy Bishop"
  ]
};

function locationString(location) {
  return location.city + ", " + location.state + ", " + location.country;
}

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
    .catch(err => {
      console.log(err);
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
      $("#country").html("Unknown Location");
      document.body.style.backgroundImage =
        "url(" + imagePath + weather["not available"][1] + ")";
      $("#weather-icon").addClass(weather["not available"][0]);
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
