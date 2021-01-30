//Functions
//Display day and time
function dateTime(date) {

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
  let localTimeUnix = ((new Date().getTime()/1000) + response.data.timezone)*1000;
 let localTime = new Date(localTimeUnix);
 let localHour = localTime.toLocaleString("en-US", {weekday: "long", hour: "numeric", minute: "numeric",   hourCycle: "h23" })
 let dayHour = localTime.toLocaleString("en-US", {hour: "numeric", hourCycle: "h23"});
document.querySelector("#local-time").innerHTML = `Local Time: ${localHour}`;

if (dayHour > 5 && dayHour < 12) {
  document.querySelector(".weather-app").setAttribute("id", "morning");
    document.querySelector(".today-hi").style.color = "white";
  document.querySelector(".today-lo").style.color = "white";
  document.querySelector("#humidity").style.color = "white";
  document.querySelector("#wind").style.color = "white";
} else if (dayHour >= 12 && dayHour < 18) {
  document.querySelector(".weather-app").setAttribute("id", "afternoon");
  document.querySelector(".today-hi").style.color = "white";
  document.querySelector(".today-lo").style.color = "white";
  document.querySelector("#humidity").style.color = "white";
  document.querySelector("#wind").style.color = "white";
} else if (dayHour >= 18 && dayHour < 21) {
  document.querySelector(".weather-app").setAttribute("id", "evening");
  document.querySelector(".today-hi").style.color = "white";
  document.querySelector(".today-lo").style.color = "white";
  document.querySelector("#humidity").style.color = "white";
  document.querySelector("#wind").style.color = "white";
} else if (dayHour >= 21 || dayHour < 5) {
  document.querySelector(".weather-app").setAttribute("id", "night");
  document.querySelector(".today-hi").style.color = "white";
  document.querySelector(".today-lo").style.color = "white";
  document.querySelector("#humidity").style.color = "white";
  document.querySelector("#wind").style.color = "white";
}

console.log(dayHour);

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
  forecastElementHours.innerHTML += ` <div class="col"><h4 id="hourly-${i}">${Math.round(forecastHours.temp)}˚C</h4>
            <h4>${forecastHour((forecastHours.dt+response.data.timezone_offset))}</h4></div>`;
}

for (let i = 1; i < 6; i++) {
  forecastDays = response.data.daily[i];
  forecastElementDays.innerHTML += ` <div class="col">
            <h4 id="daysname${[i]}">${forecastDate(forecastDays.dt)}</h4>
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
hourly1 = response.data.hourly[1].temp;
hourly2 = response.data.hourly[2].temp;
hourly3 = response.data.hourly[3].temp;
hourly4 = response.data.hourly[4].temp;
hourly5 = response.data.hourly[5].temp;
hourly6 = response.data.hourly[6].temp;
document.querySelector("#daysname1").innerHTML = "Tomorrow";
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
}

function getCurrentLocation(event) {
  event.preventDefault();
  toCelcius();
  navigator.geolocation.getCurrentPosition(searchLocation);
  today.innerHTML = dateTime(new Date());
}

function toFahrenheit(event){
let fahrenheit = (temperature * 9/5) + 32;
let highTempConvert = (highTemp * 9/5) + 32;
let lowTempConvert = (lowTemp * 9/5) + 32;
let day1HighTemp = (high1 * 9/5) + 32;
let day1LowTemp = (low1 * 9/5) + 32;
let day2HighTemp = (high2 * 9/5) + 32;
let day2LowTemp = (low2 * 9/5) + 32;
let day3HighTemp = (high3 * 9/5) + 32;
let day3LowTemp = (low3 * 9/5) + 32;
let day4HighTemp = (high4 * 9/5) + 32;
let day4LowTemp = (low4 * 9/5) + 32;
let day5HighTemp = (high5 * 9/5) + 32;
let day5LowTemp = (low5 * 9/5) + 32;

let hour1Temp = (hourly1*9/5) + 32;
let hour2Temp = (hourly2*9/5) + 32;
let hour3Temp = (hourly3*9/5) + 32;
let hour4Temp = (hourly4*9/5) + 32;
let hour5Temp = (hourly5*9/5) + 32;
let hour6Temp = (hourly6*9/5) + 32;

let deets = [fahrenheit, highTempConvert, lowTempConvert, day1HighTemp, day1LowTemp, day2HighTemp, day2LowTemp, day3HighTemp, day3LowTemp, day4HighTemp, day4LowTemp, day5HighTemp, day5LowTemp, hour1Temp, hour2Temp, hour3Temp, hour4Temp, hour5Temp, hour6Temp];
let deets2 = ["#temperature", ".today-hi", ".today-lo", "#high-1", "#lo-1", "#high-2", "#lo-2", "#high-3", "#lo-3", "#high-4", "#lo-4", "#high-5", "#lo-5", "#hourly-1", "#hourly-2", "#hourly-3", "#hourly-4", "#hourly-5", "#hourly-6"];

for (let i = 0; i < deets.length; i++) {
  document.querySelector(deets2[i]).innerHTML = `${Math.round(deets[i])}˚F`;
}
convertToFahrenheit.classList.add("active");
convertToCelcius.classList.remove("active");
}

function toCelcius(event){
let celcius = temperature;
let deets = [celcius, highTemp, lowTemp, high1, low1, high2, low2, high3, low3, high4, low4, high5,low5,hourly1,hourly2,hourly3, hourly4,hourly5,hourly6]
let deets2 = ["#temperature", ".today-hi", ".today-lo", "#high-1", "#lo-1", "#high-2", "#lo-2", "#high-3", "#lo-3", "#high-4", "#lo-4", "#high-5", "#lo-5", "#hourly-1", "#hourly-2", "#hourly-3", "#hourly-4", "#hourly-5", "#hourly-6"];
for (let i = 0; i < deets.length; i++) {
  document.querySelector(deets2[i]).innerHTML = `${Math.round(deets[i])}˚C`;
}
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
let hourly1 = null;
let hourly2 = null;
let hourly3 = null;
let hourly4 = null;
let hourly5 = null;
let hourly6 = null;
let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

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

window.onload = function () {
    search("london");};

