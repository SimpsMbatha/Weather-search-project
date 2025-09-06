function submitCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let cityHeading = document.querySelector("#city-heading");
  cityHeading.innerHTML = searchInput.value;
}
let formButton = document.querySelector("#search-form");
formButton.addEventListener("submit", submitCity);
