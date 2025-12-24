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
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${kay}`;
  axios.get(apiUrl).then(displayForcast);
}

function displayForcast(response) {
  let forcast = document.querySelector("#forcast");
  let forcastHtml = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forcastHtml =
        forcastHtml +
        `<div class="weather-forcast-day">
            <div class="weather-forcast-date">${formatDay(day.time)}</div>
            <div><img src = "${
              day.condition.icon_url
            }" class="weather-forcast-icon"/></div>
            <div class="weather-forcast-temp">
              <div class="degree"><strong>${Math.round(
                day.temperature.maximum
              )}°</strong></div>
              <div class="degree">${Math.round(day.temperature.minimum)}°</div>
            </div>
          </div>`;
    }
  });
  forcast.innerHTML = forcastHtml;
}

function formatDay(stampDay) {
  let date = new Date(stampDay * 1000);
  let days = ["Sun", "Mon", "Tus", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", Search);
searchCity("paris");
getForcast("paris");
