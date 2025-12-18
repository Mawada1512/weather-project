function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let city = document.querySelector("#current-city");
  city.innerHTML = searchInput.Value;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);
