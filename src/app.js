let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Sunday",
];
let dates = document.querySelector("#date");
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let day = days[now.getDay()];

dates.innerHTML = `${day} ${hours}:${minutes}`;

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-city");
  searchCity(cityInput.value);
}

let form = document.querySelector("#search-button");
form.addEventListener("click", search);

function searchCity(city) {
  let apiKey = "60e9b8e93f7104c20384f8e74ed8be82";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
function changeFarenheit(event) {
  event.preventDefault();
  let temp = document.querySelector("span.temp");
  temp.innerHTML = `66`;
}
let farenheit = document.querySelector("#farenheit");
farenheit.addEventListener("click", changeFarenheit);

function changeCelcius(event) {
  event.preventDefault();
  let celTemp = document.querySelector("span.temp");
  celTemp.innerHTML = `19`;
}
let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", changeCelcius);

function showTemperature(response) {
  console.log(response.data);
  let city = response.data.name;
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${city}`;

  document.querySelector("span.temp").innerHTML = `${Math.round(
    response.data.main.temp
  )}`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )}km/h`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document
    .querySelector("#weather-icon")
    .setAttribute("src", `http://openweathermap.org/img/wn/04d@2x.png`);
}
function currentTemperature(response) {
  console.log(response.data.main.temp);
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("span.temp");
  currentTemp.innerHTML = `${temperature}`;
}
