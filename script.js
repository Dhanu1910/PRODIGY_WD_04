const API_KEY = "13a6e08b57d2e59cad43c2beb9283f2a";

const weatherInfo = document.getElementById("weatherInfo");
const dateEl = document.getElementById("date");

dateEl.textContent = new Date().toDateString();

function getWeatherByCity() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    alert("Please enter a city name");
    return;
  }

  fetchWeather(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
  );
}

function getWeatherByLocation() {
  if (!navigator.geolocation) {
    alert("Geolocation not supported");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    position => {
      const { latitude, longitude } = position.coords;
      fetchWeather(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
      );
    },
    () => alert("Location permission denied")
  );
}

function fetchWeather(url) {
  weatherInfo.innerHTML = "<p>Loading...</p>";

  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error("Fetch failed");
      return res.json();
    })
    .then(data => displayWeather(data))
    .catch(err => {
      console.error(err);
      weatherInfo.innerHTML = "<p>Unable to fetch weather data</p>";
    });
}

function displayWeather(data) {
  weatherInfo.innerHTML = `
    <h2>${data.name}</h2>
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
    <p><strong>${data.main.temp}°C</strong> (Feels like ${data.main.feels_like}°C)</p>
    <p>${data.weather[0].description}</p>
    <p>⬆️ ${data.main.temp_max}°C | ⬇️ ${data.main.temp_min}°C</p>
    <p>💧 Humidity: ${data.main.humidity}%</p>
    <p>💨 Wind: ${data.wind.speed} m/s</p>
  `;
}
