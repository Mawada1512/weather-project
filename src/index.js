function Search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}
function searchCity(cityValue) {
  let key = "6fftdd01472a035eo394f08abdd05bea";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityValue}&key=${key}`;
  axios.get(apiUrl).then(engineData);
}
function engineData(response) {
  let temp = document.querySelector("#temp");
  let city = document.querySelector("#current-city");
  city.innerHTML = response.data.city;
  temp.innerHTML = Math.round(response.data.temperature.current);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", Search);
searchCity("paris");
