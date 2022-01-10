import "src/styles.css";
// Search Engine
function displayWeather(response) {
  console.log(response);
  //City
  let weatherCity = document.querySelector("h1");
  weatherCity.innerHTML = response.data.name;
  //Temperature
  let searchTemp = Math.round(response.data.main.temp);
  let weatherTemp = document.querySelector("#temperature");
  weatherTemp.innerHTML = searchTemp;
  //Skies
  let weatherSkies = document.querySelector("#skies");
  weatherSkies.innerHTML = response.data.weather[0].description;
  //Humidity
  let weatherHumidity = document.querySelector("#humidity");
  weatherHumidity.innerHTML = response.data.main.humidity + "%";
  //Wind
  let speed = Math.round(response.data.wind.speed);
  let weatherWind = document.querySelector("#wind");
  weatherWind.innerHTML = speed + " km/h";
}

function newCity(city) {
  let apiKey = "f728d19e1fc892c0781bbcbebd6e5511";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(url).then(displayWeather);
}

function processCity(event) {
  event.preventDefault();
  let city = document.querySelector("#enterCity").value;
  newCity(city);
}
let form = document.querySelector("#search-button");
form.addEventListener("submit", processCity);

// Geolocation Button
function retrievePosition(position) {
  let apiKey = "f728d19e1fc892c0781bbcbebd6e5511";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(displayWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let button = document.querySelector("#geoLocate");
button.addEventListener("click", getCurrentPosition);

//day&time
function formatDate(date) {
  let now = new Date();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[now.getDay()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let timeToday = document.querySelector(`#today`);

  timeToday.innerHTML = `${day}, ${hours}:${minutes}`;
}
formatDate();

//celcius to Farenheit
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 31;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = -1;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);
