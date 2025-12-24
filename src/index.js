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
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = Math.round(response.data.temperature.current);
  let city = document.querySelector("#current-city");
  city.innerHTML = response.data.city;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.condition.description;
  let humidity = document.querySelector("#humedity");
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `${response.data.wind.speed}km/h`;
  let time = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  time.innerHTML = formatDate(date);
  let icon = document.querySelector("#current-degree-icon");
  icon.innerHTML = `<img
      src="${response.data.condition.icon_url}"
      class="current-degree-icon"
    />`;
  getForcast(response.data.city);
}
function formatDate(dota) {
  let minutes = dota.getMinutes();
  let hours = dota.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuseday",
    "Wednsday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dota.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function getForcast(city) {
  let kay = "6fftdd01472a035eo394f08abdd05bea";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${key}`;
  axios.get(apiUrl).then(displayForcast);
}

function displayForcast(response) {
  let forcast = document.querySelector("#forcast");
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon"];
  let forcastHtml = "";
  days.forEach(function (day) {
    forcastHtml =
      forcastHtml +
      `<div class="weather-forcast-day">
            <div class="weather-forcast-date">${day}</div>
            <div class="weather-forcast-icon">⛅</div>
            <div class="weather-forcast-temp">
              <div class="degree"><strong>18°</strong></div>
              <div class="degree">12°</div>
            </div>
          </div>`;
  });
  forcast.innerHTML = forcastHtml;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", Search);
searchCity("paris");
getForcast("paris");
