// Functions


//Display day and time
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
  return `Last updated: ${day} ${hour}:${minute}`;
  
}

function currentTemperature(response) {
  //Celcius temp display
  document.querySelector("#cityDisplay").innerHTML = response.data.name;
  document.querySelector(".forecast-descrip").innerHTML = response.data.weather[0].description;
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp) + "˚C";
  document.querySelector("#humidity").innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `Wind: ${3.6 * Math.round(response.data.wind.speed)}km/h`;
  document.querySelector(".forecast-icon").setAttribute("src",`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
   let currentLon = response.data.coord.lon;
  let currentLat = response.data.coord.lat;
  fiveDayForecast (response.data.coord);

  function fiveDayForecast (position) {
  let lon = position.lon;
  let lat = position.lat;
  let apiKey = "6000bf93e246aa260b6c47805cd04cb3"
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,alerts&appid=${apiKey}&units=metric`
  axios.get(apiUrl).then(getForecast);

}

}

function getForecast (response){
console.log(response);
document.querySelector(".today-hi").innerHTML = Math.round(response.data.daily[0].temp.max) + "˚C";
document.querySelector(".today-lo").innerHTML = Math.round(response.data.daily[0].temp.min) + "˚C";
document.querySelector(".plus1-hi").innerHTML = Math.round(response.data.daily[1].temp.max) + "˚C";
document.querySelector(".plus1-lo").innerHTML = Math.round(response.data.daily[1].temp.min) + "˚C";
document.querySelector(".plus2-hi").innerHTML = Math.round(response.data.daily[2].temp.max) + "˚C";
document.querySelector(".plus2-lo").innerHTML = Math.round(response.data.daily[2].temp.min) + "˚C";
document.querySelector(".plus3-hi").innerHTML = Math.round(response.data.daily[3].temp.max) + "˚C";
document.querySelector(".plus3-lo").innerHTML = Math.round(response.data.daily[3].temp.min) + "˚C";
document.querySelector(".plus4-hi").innerHTML = Math.round(response.data.daily[4].temp.max) + "˚C";
document.querySelector(".plus4-lo").innerHTML = Math.round(response.data.daily[4].temp.min) + "˚C";
document.querySelector(".plus5-hi").innerHTML = Math.round(response.data.daily[5].temp.max) + "˚C";
document.querySelector(".plus5-lo").innerHTML = Math.round(response.data.daily[5].temp.min) + "˚C";
document.querySelector("#iconTomorrow").setAttribute("src",`https://openweathermap.org/img/wn/${response.data.daily[1].weather[0].icon}@2x.png`);
document.querySelector("#iconPlus1").setAttribute("src",`https://openweathermap.org/img/wn/${response.data.daily[2].weather[0].icon}@2x.png`);
document.querySelector("#iconPlus2").setAttribute("src",`https://openweathermap.org/img/wn/${response.data.daily[3].weather[0].icon}@2x.png`);
document.querySelector("#iconPlus3").setAttribute("src",`https://openweathermap.org/img/wn/${response.data.daily[4].weather[0].icon}@2x.png`);
document.querySelector("#iconPlus4").setAttribute("src",`https://openweathermap.org/img/wn/${response.data.daily[5].weather[0].icon}@2x.png`);

document.querySelector("#forecastDay1").innerHTML = forecastDate(response.data.daily[2].dt);
document.querySelector("#forecastDay2").innerHTML = forecastDate(response.data.daily[3].dt);
document.querySelector("#forecastDay3").innerHTML = forecastDate(response.data.daily[4].dt);
document.querySelector("#forecastDay4").innerHTML = forecastDate(response.data.daily[5].dt);

function forecastDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

let dayName = new Date(date*1000);
dayName = dayName.getDay();
let day = days[dayName];

 return day;

  
}

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
  today.innerHTML = dateTime(new Date());
}

//Current location
function searchLocation(position) {
  let apiKey = "6000bf93e246aa260b6c47805cd04cb3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentTemperature);

  console.log(apiUrl);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
  today.innerHTML = dateTime(new Date());
}

let today = document.querySelector("#today");
today.innerHTML = dateTime(new Date());

// submit button
let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", handleSubmit);

//Current location button
let currentLocationButton = document.querySelector("#location-btn");
currentLocationButton.addEventListener("click", getCurrentLocation);

search("London");
