const global = {
  currentPage: window.location.pathname,
};
const apiKey = "da057670b3c6e44ad17109f4e01c0748";
const searchInput = document.querySelector("#searchInput");
const cityName = document.querySelector(".city-name");
const discriptionEl = document.querySelector(".discription");
const loadingEl = document.querySelector(".loading");
const tempEl = document.querySelectorAll(".temp1");
const chanceEl = document.querySelector(".chance");
const windSpeedEl = document.querySelector(".wind-speed");
const humidityEl = document.querySelector(".humidity");
const uvIndexEl = document.querySelector(".uv-index");
const highLowTempEl = document.querySelector(".highLowTemp");
const link = document.querySelector(".redirect-link");

async function fetchWeather(city) {
  try {
    if (!city) throw new Error("city name is required");
    loadingEl.classList.remove("hide");
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) {
      throw new Error("City not found. Please try again.");
    }
    const data = await response.json();
    console.log(data);
    displayCurrentWeather(data);
  } catch (error) {
    console.log(error);
  } finally {
    loadingEl?.classList.add("hide");
  }
}
function displayCurrentWeather(data) {
  cityName.innerText = `${data.name}, ${data.sys.country}`;
  discriptionEl.innerText = data.weather[0].description;
  tempEl.forEach((el) => {
    el.innerHTML = `${data.main.temp.toFixed(1)}°C`;
  });
  highLowTempEl.textContent = `${data.main.temp_max}°C / ${data.main.temp_min}°C`;
  humidityEl.innerText = `${data.main.humidity}%`;
  windSpeedEl.innerText = `${data.wind.speed.toFixed(1)} Km/Hr`;
}

function searchWeather(e) {
  e.preventDefault();
  const city = searchInput.value.trim();
  searchInput.value = "";
  if (city) {
    fetchWeather(city);
  } else {
    alert("Please enter a city name");
  }
}

// get city name from the url
function getCityFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("city");
}

// Event listeners
function init() {
  switch (global.currentPage) {
    case "/index.html":
      console.log("home");
      break;
    case "/content.html":
      const city = getCityFromUrl();
      fetchWeather(city);
      document.querySelector("form").addEventListener("submit", searchWeather);
  }
}
document.addEventListener("DOMContentLoaded", init);
console.log("working 1");
