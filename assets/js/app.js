const apiKey = "da057670b3c6e44ad17109f4e01c0748";
const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");
const loadingEl = document.querySelector(".loading");
const cityName = document.querySelector(".city-name");
const dateEl = document.querySelector(".date");
const temperatureEl = document.querySelector(".temperature");
const highLowTempEl = document.querySelector(".highLowTemp");
function fetchWeather() {
  const city = searchInput.value;
  if (!city) {
    alert("Please enter a city name");
    return;
  }
  loadingEl.classList.remove("hide");
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  )
    .then((res) => {
      const data = res.json();
      return data;
    })
    .then((data) => {
      displayCurrentWeather(data);
    })
    .catch((error) => {
      console.error("Error fetching current weather:", error);
    })
    .finally(() => {
      loadingEl.classList.add("hide");
    });
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      displayForecast(data);
    })
    .catch((error) => {
      console.error("Error fetching forecast:", error);
    })
    .finally(() => {
      loadingEl.classList.add("hide");
    });
}
function displayCurrentWeather(data) {
  console.log("ss");
  cityName.innerText = `${data.name}, ${data.sys.country}`;
  dateEl.innerText = `${new Date(data.dt * 1000).toLocaleDateString()}`;
  temperatureEl.innerText = `${data.main.temp}°C`;
  highLowTempEl.textContent = `${data.highTemp}°C / ${data.lowTemp}°C`;
}
function displayForecast(data) {}

// Event Listners

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  fetchWeather();
});
