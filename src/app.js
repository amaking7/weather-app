function displayTemperature(response) {
  let currentCityTemperature = document.querySelector("#current-temperature");
  let currentCityName = document.querySelector("#current-city");
  let currentCityWeatherDescription = document.querySelector(
    "#weather-description"
  );
  let currentCityHumidity = document.querySelector("#current-city-humidity");
  let currentCityWind = document.querySelector("#current-city-wind");
  currentCityTemperature.innerHTML = Math.round(response.data.main.temp);
  currentCityName.innerHTML = response.data.name;
  currentCityWeatherDescription.innerHTML =
    response.data.weather[0].description;
  currentCityHumidity.innerHTML = response.data.main.humidity;
  currentCityWind.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "4d85cd59016d6a2d49846056378f35f1";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
