//search engine functionality
function displayWeather(response) {
  let temperatureNumber = document.querySelector("#temp-number");
  let temperature = response.data.temperature.current;
  let cityHeading = document.querySelector("#city-heading");
  let cityCondition = document.querySelector("#city-condition");
  let cityHumidity = document.querySelector("#city-humidity");
  let cityWind = document.querySelector("#city-wind");
  let currentTime = document.querySelector("#time");
  let now = new Date(response.data.time * 1000);
  let cityImage = document.querySelector("#city-image");

  cityImage.innerHTML = `<img src="${response.data.condition.icon_url}" class="temp-emoji"/>`;
  currentTime.innerHTML = formatDate(now);
  cityWind.innerHTML = response.data.wind.speed;
  cityHumidity.innerHTML = response.data.temperature.humidity;
  cityCondition.innerHTML = response.data.condition.description;
  cityHeading.innerHTML = response.data.city;
  temperatureNumber.innerHTML = Math.round(temperature);

  getForecast(response.data.city);
}

function searchCity(city) {
  let apiKey = "a9ob0c158e1219c4tfb120a3faf56baf";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function submitCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  searchCity(searchInput.value);
}
let formButton = document.querySelector("#search-form");
formButton.addEventListener("submit", submitCity);

searchCity("London");

//time display
function formatDate(now) {
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
  let minutes = now.getMinutes();

  if (hours < 10) hours = `0${hours}`;
  if (minutes < 10) minutes = `0${minutes}`;

  return `${day}, ${hours}:${minutes}`;
}
//fetching days from timestamp
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}
//getting forecast info
function getForecast(city) {
  let apiKey = "a9ob0c158e1219c4tfb120a3faf56baf";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  console.log(apiUrl);

  axios.get(apiUrl).then(forecastDisplay);
}
// injecting html
function forecastDisplay(response) {
  console.log(response.data);

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="forecast-day">
      <div class="forecast-date">${formatDay(day.time)}</div>
    
      <img src="${day.condition.icon_url}" class="forecast-icon" />
    
      <div class="forecast-temperatures">
      <div class="forecast-temp">${Math.round(day.temperature.maximum)}°</div>
      <div class="forecast-temp">${Math.round(day.temperature.minimum)}°</div>
      </div>
      </div>`;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}
