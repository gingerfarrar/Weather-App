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
  "Saturday"
];
let day = days[now.getDay()];

p1.innerHTML = `${day}, ${hours}:${minutes}`;

function fahrenheit(event) {
  event.preventDefault();
  let temp = document.querySelector("#today-temp");

  temp.innerHTML = "80°f";
}

function celcius(event) {
  event.preventDefault();
  let temp = document.querySelector("#today-temp");

  temp.innerHTML = "27°c";
}

let fBtn = document.querySelector("#f-btn");
fBtn.addEventListener("click", fahrenheit);
let cBtn = document.querySelector("#c-btn");
cBtn.addEventListener("click", celcius);

function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#today-temp").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
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

search("Seattle");
