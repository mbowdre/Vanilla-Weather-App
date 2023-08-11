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

function displayForecast() {
  console.log(displayForecast);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `  <div class="col-2">
                  <div class="forecast-date">${day}</div>
                  <img
                    src="http://openweathermap.org/img/wn/03d@2x.png"
                    alt=""
                    width="36"
                  />
                  <div class="forecast-temperatures">
                    <span class="forecast-temp-max"> 18&deg </span>
                    | <span class="forecast-temp-min">12&deg</span>
                  </div>
                  </div>
                `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showCelcius(event) {
  event.preventDefault();
  celciusLink.classList.add("active");
  farenheitLink.classList.remove("active");
  document.querySelector("span.temp").innerHTML =
    Math.round(celciusTemperature);
}

function showFahrenheit(event) {
  event.preventDefault();
  farenheitLink.classList.add("active");
  celciusLink.classList.remove("active");
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  document.querySelector("span.temp").innerHTML = Math.round(
    fahrenheitTemperature
  );
}

function showTemperature(response) {
  console.log(response.data.name);
  let city = response.data.name;
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${city}`;
  document.querySelector("span.temp").innerHTML = `${Math.round(
    response.data.main.temp
  )}`;
  celciusTemperature = response.data.main.temp;
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
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
}

function searchCity(city) {
  let apiKey = "60e9b8e93f7104c20384f8e74ed8be82";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-city");
  searchCity(cityInput.value);
}

let form = document.querySelector("#search-button");
form.addEventListener("click", search);

function changeFahrenheit(event) {
  event.preventDefault();
  let temp = document.querySelector("span.temp");
  temp.innerHTML = `66`;
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", changeFahrenheit);

function changeCelcius(event) {
  event.preventDefault();
  let celTemp = document.querySelector("span.temp");
  celTemp.innerHTML = `19`;
}
let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", changeCelcius);

function currentTemperature(response) {
  console.log(response.data.main.temp);
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("span.temp");
  currentTemp.innerHTML = `${temperature}`;
}

// function getForecast(coordinates) {
//   console.log(coordinates);
//   let key = "60e9b8e93f7104c20384f8e74ed8be82";
//   let url = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${key}&units=metric`;
//   axios.get(url).then(displayForecast);
// }

// getForecast(response.data.coord);
let farenheitLink = document.querySelector("#fahrenheit");
farenheitLink.addEventListener("click", showFahrenheit);

// let celciusTemperature = null;

let celciusLink = document.querySelector("#celcius");
celciusLink.addEventListener("click", showCelcius);

displayForecast();
