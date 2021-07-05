function formatDateTime(timestamp) {
  let date = new Date(timestamp);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let day = days[date.getDay()];
  return `${day}, ${hours}:${minutes}`;
}

function displayTemperature(response) {
  let currentCityTemperature = document.querySelector("#current-temperature");
  let currentCityName = document.querySelector("#current-city");
  let currentCityWeatherDescription = document.querySelector(
    "#weather-description"
  );
  let currentCityHumidity = document.querySelector("#current-city-humidity");
  let currentCityWind = document.querySelector("#current-city-wind");
  let currentCityDateTime = document.querySelector("#date-time");
  currentCityTemperature.innerHTML = Math.round(response.data.main.temp);
  currentCityName.innerHTML = response.data.name;
  currentCityWeatherDescription.innerHTML =
    response.data.weather[0].description;
  currentCityHumidity.innerHTML = response.data.main.humidity;
  currentCityWind.innerHTML = Math.round(response.data.wind.speed);
  currentCityDateTime.innerHTML = formatDateTime(response.data.dt * 1000);
}

let apiKey = "4d85cd59016d6a2d49846056378f35f1";
let city = "New York";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
