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

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
                  <div class="future-forecast-day">${day}</div>
                  <img
                    src="http://openweathermap.org/img/wn/02d@2x.png"
                    alt=""
                    width="56px"
                  />
                  <div class="future-forecast-temperatures">
                    <span class="future-forecast-temp-max">18°</span>
                    <span class="future-forecast-temp-min">12°</span>
                  </div>
                </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "4d85cd59016d6a2d49846056378f35f1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
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
  let currentWeatherIcon = document.querySelector("#current-weather-icon");

  celsiusTemperature = response.data.main.temp;

  currentCityTemperature.innerHTML = Math.round(response.data.main.temp);
  currentCityName.innerHTML = response.data.name;
  currentCityWeatherDescription.innerHTML =
    response.data.weather[0].description;
  currentCityHumidity.innerHTML = response.data.main.humidity;
  currentCityWind.innerHTML = Math.round(response.data.wind.speed);
  currentCityDateTime.innerHTML = formatDateTime(response.data.dt * 1000);
  currentWeatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  currentWeatherIcon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "4d85cd59016d6a2d49846056378f35f1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let currentCityTemperature = document.querySelector("#current-temperature");
  currentCityTemperature.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let currentCityTemperature = document.querySelector("#current-temperature");
  currentCityTemperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-bar");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("New York");
