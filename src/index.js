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
 //Celcius temp info display
function currentTemperature(response) {
  document.querySelector("#cityDisplay").innerHTML = response.data.name;
  document.querySelector(".forecast-descrip").innerHTML = response.data.weather[0].description;
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp) + "˚C";
  document.querySelector("#humidity").innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `Wind: ${3.6 * Math.round(response.data.wind.speed)}km/h`;
  document.querySelector(".forecast-icon").setAttribute("src",`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  temperature = response.data.main.temp;
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
let forecastElementHours = document.querySelector(".upcoming-temps");
forecastElementHours.innerHTML = null;
let forecastHours = null;
let forecastElementDays = document.querySelector(".upcoming-days");
forecastElementDays.innerHTML = null;
let forecastDays = null;

for (let i = 1; i < 7; i++) {
  forecastHours = response.data.hourly[i];
  forecastElementHours.innerHTML += ` <div class="col" id="hourly-${i}"><h4>${Math.round(forecastHours.temp)}˚C</h4>
            ${forecastHour(forecastHours.dt)}</div>`;
}

for (let i = 1; i < 6; i++) {
  forecastDays = response.data.daily[i];
  forecastElementDays.innerHTML += ` <div class="col">
            <h4>${forecastDate(forecastDays.dt)}</h4>
            <img src="https://openweathermap.org/img/wn/${forecastDays.weather[0].icon}@2x.png" class="icons" />
            <h4 class="hi-lo"><span class="plus-hi" id="high-${i}">${Math.round(forecastDays.temp.max)}˚C</span> |
            <span class="plus-lo" id="lo-${i}">${Math.round(forecastDays.temp.min)}˚C</span></h4> 
          </div>`;
}
document.querySelector(".today-hi").innerHTML = Math.round(response.data.daily[0].temp.max) + "˚C";
document.querySelector(".today-lo").innerHTML = Math.round(response.data.daily[0].temp.min) + "˚C";
highTemp = response.data.daily[0].temp.max;
lowTemp = response.data.daily[0].temp.min;
high1 = response.data.daily[1].temp.max;
low1 = response.data.daily[1].temp.min;
high2 = response.data.daily[2].temp.max;
low2 = response.data.daily[2].temp.min;
high3 = response.data.daily[3].temp.max;
low3 = response.data.daily[3].temp.min;
high4 = response.data.daily[4].temp.max;
low4 = response.data.daily[4].temp.min;
high5 = response.data.daily[4].temp.max;
low5 = response.data.daily[4].temp.min;

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

function forecastHour(date) {
  let dateHours = new Date(date*1000);
let hour = dateHours.getHours();
if (hour < 10) {
    hour = `0${hour}`;
  }

  return `${hour}:00`;
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
  toCelcius();
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
  toCelcius();
  navigator.geolocation.getCurrentPosition(searchLocation);
  today.innerHTML = dateTime(new Date());
}

function toFahrenheit(event){
let fahrenheit = (temperature * 9/5) + 32;
document.querySelector("#temperature").innerHTML = `${Math.round(fahrenheit)}˚F`;

let highTempConvert = (highTemp * 9/5) + 32;
document.querySelector(".today-hi").innerHTML = `${Math.round(highTempConvert)}˚F`
let lowTempConvert = (lowTemp * 9/5) + 32;
document.querySelector(".today-lo").innerHTML = `${Math.round(lowTempConvert)}˚F`
let day1HighTemp = (high1 * 9/5) + 32;
document.querySelector("#high-1").innerHTML = `${Math.round(day1HighTemp)}˚F`
let day1LowTemp = (low1 * 9/5) + 32;
document.querySelector("#lo-1").innerHTML = `${Math.round(day1LowTemp)}˚F`
let day2HighTemp = (high2 * 9/5) + 32;
document.querySelector("#high-2").innerHTML = `${Math.round(day2HighTemp)}˚F`
let day2LowTemp = (low2 * 9/5) + 32;
document.querySelector("#lo-2").innerHTML = `${Math.round(day2LowTemp)}˚F`
let day3HighTemp = (high3 * 9/5) + 32;
document.querySelector("#high-3").innerHTML = `${Math.round(day3HighTemp)}˚F`
let day3LowTemp = (low3 * 9/5) + 32;
document.querySelector("#lo-3").innerHTML = `${Math.round(day3LowTemp)}˚F`
let day4HighTemp = (high4 * 9/5) + 32;
document.querySelector("#high-4").innerHTML = `${Math.round(day4HighTemp)}˚F`
let day4LowTemp = (low4 * 9/5) + 32;
document.querySelector("#lo-4").innerHTML = `${Math.round(day4LowTemp)}˚F`

convertToFahrenheit.classList.add("active");
convertToCelcius.classList.remove("active");

}

function toCelcius(event){
let celcius = temperature;
document.querySelector("#temperature").innerHTML = `${Math.round(celcius)}˚C`;
convertToCelcius.classList.add("active");
convertToFahrenheit.classList.remove("active");
}

let temperature = null;
let highTemp = null;
let lowTemp = null;
let high1 = null;
let low1 = null;
let high2 = null;
let low2 = null;
let high3 = null;
let low3 = null;
let high4 = null;
let low4 = null;
let high5 = null;
let low5 = null;


let today = document.querySelector("#today");
today.innerHTML = dateTime(new Date());

// submit button
let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", handleSubmit);

//Current location button
let currentLocationButton = document.querySelector("#location-btn");
currentLocationButton.addEventListener("click", getCurrentLocation);

//Fahrenheit button
let convertToFahrenheit = document.querySelector("#fah-btn");
convertToFahrenheit.addEventListener("click", toFahrenheit);

//Celcius button
let convertToCelcius = document.querySelector("#cel-btn");
convertToCelcius.addEventListener("click", toCelcius);

search("London");
