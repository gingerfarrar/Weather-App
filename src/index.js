let now = new Date();
let p1 = document.querySelector("#date");

let hours = now.getHours();
let minutes = now.getMinutes();

if (hours < 10) {
  hours = `0${hours}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}

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

p1.innerHTML = `${day}, ${hours}:${minutes}`;

let celciusTemp = null;
let maxCelciusTemp = null;
let minCelciusTemp = null;

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row"> `;
  let days = ["Sun", "Mon", "Tues"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` <div class="col">
              <strong class="forcast-date"> ${day} </strong>
              <br />              
                <img
                  src="http://openweathermap.org/img/wn/03d@2x.png"
                  alt=""
                  width="50"
                /> </br>            
              <span class="forcast-max"> 80</span>°
              /
              <span class="forcast-min"> 65</span>°
          </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayWeather(response) {
  celciusTemp = Math.round(response.data.main.temp);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#today-temp").innerHTML = celciusTemp;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);
  maxCelciusTemp = Math.round(response.data.main.temp_max);
  minCelciusTemp = Math.round(response.data.main.temp_min);
  document.querySelector("#current-max").innerHTML = maxCelciusTemp;
  document.querySelector("#current-min").innerHTML = minCelciusTemp;
  document.querySelector(".units").innerHTML = "°C";
}

function search(city) {
  let apiKey = "fca2b72719fce9e42d08d29dfc88f436";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function submit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-bar").value;
  search(city);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", submit);

function getPos(position) {
  let apiKey = "fca2b72719fce9e42d08d29dfc88f436";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
function currentPos(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPos);
}
let currentbtn = document.querySelector("#current-btn");
currentbtn.addEventListener("click", currentPos);

function fahrenheit(event) {
  event.preventDefault();
  let temp = document.querySelector("#today-temp");
  let temperature = (celciusTemp * 9) / 5 + 32;
  temp.innerHTML = Math.round(temperature);
  let units = document.querySelector(".units");
  units.innerHTML = "°F";
  let maxTemp = document.querySelector("#current-max");
  let maxTemperature = (maxCelciusTemp * 9) / 5 + 32;
  maxTemp.innerHTML = Math.round(maxTemperature);
  let minTemp = document.querySelector("#current-min");
  let minTemperature = (minCelciusTemp * 9) / 5 + 32;
  minTemp.innerHTML = Math.round(minTemperature);
}

function celcius(event) {
  event.preventDefault();
  let temp = document.querySelector("#today-temp");
  temp.innerHTML = celciusTemp;
  let units = document.querySelector(".units");
  units.innerHTML = "°C";
  let maxTemp = document.querySelector("#current-max");
  maxTemp.innerHTML = maxCelciusTemp;
  let minTemp = document.querySelector("#current-min");
  minTemp.innerHTML = minCelciusTemp;
}

let fBtn = document.querySelector("#f-btn");
fBtn.addEventListener("click", fahrenheit);
let cBtn = document.querySelector("#c-btn");
cBtn.addEventListener("click", celcius);

search("Seattle");
displayForecast();
