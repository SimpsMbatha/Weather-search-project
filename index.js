//search engine functionality
function submitCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let cityHeading = document.querySelector("#city-heading");
  cityHeading.innerHTML = searchInput.value;
}
let formButton = document.querySelector("#search-form");
formButton.addEventListener("submit", submitCity);

//time display
let now = new Date();
let currentTime = document.querySelector("#time");
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
currentTime.innerHTML = `${day}, ${hours}:${minutes}`;
