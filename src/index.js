//Current date and time

function dateTime(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${day} ${hour}:${minute}`;
}
let today = document.querySelector("h5");
today.innerHTML = dateTime(new Date());

function currentTemperature(response) {
  //Celcius temp display
  document.querySelector("#cityDisplay").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML =
    Math.round(response.data.main.temp) + "˚C";
}

function search(city) {
  let apiKey = "6000bf93e246aa260b6c47805cd04cb3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(currentTemperature);
}
//Searched city name display
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#searchInput").value;
  search(city);
}

//Current location
function searchLocation(position) {
  let apiKey = "6000bf93e246aa260b6c47805cd04cb3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
// submit button
let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", handleSubmit);

//Current location button
let currentLocationButton = document.querySelector("#location-btn");
currentLocationButton.addEventListener("click", getCurrentLocation);
search("London");
