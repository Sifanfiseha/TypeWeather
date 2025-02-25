const apiKey = "da057670b3c6e44ad17109f4e01c0748";
const searchForm = document.querySelector("form");
const searchInput = document.getElementById("searchInput");
const loadingEl = document.querySelector(".loading");
const cityName = document.querySelector(".city-name");
const dateEl = document.querySelector(".date");
const temperatureEl = document.querySelector(".temperature");
const highLowTempEl = document.querySelector(".highLowTemp");
const descriptionEl = document.querySelector(".description");

const global = {
  currentPage: window.location.pathname,
};

function fetchWeather(city) {
  if (!city) return;

  // Show loading animation
  loadingEl.style.display = "block";

  // Fetch current weather
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      displayCurrentWeather(data);
    })
    .catch((error) => {
      console.error("Error fetching current weather:", error);
    });

  // Fetch 5-day forecast
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
      // Hide loading animation
      loadingEl.style.display = "none";
    });
}

function displayCurrentWeather(data) {
  cityName.innerText = `${data.name}, ${data.sys.country}`;
  dateEl.innerText = `${new Date(data.dt * 1000).toLocaleDateString()}`;
  temperatureEl.innerText = `${data.main.temp}°C`;
  highLowTempEl.textContent = `${data.main.temp_max}°C / ${data.main.temp_min}°C`;
  descriptionEl.textContent = `${data.weather[0].description}`;
}

function displayForecast(data) {
  console.log("Forecast data:", data);
}

function searchWeather(event) {
  event.preventDefault(); // Prevent form submission
  const city = searchInput.value.trim(); // Get user input
  if (city) {
    fetchWeather(city); // Fetch weather without reloading page
  } else {
    alert("Please enter a city name");
  }
}

function getCityFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("city");
}

function init() {
  if (global.currentPage === "/index.html") {
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const city = searchInput.value.trim();
      link.location.href = `content.html?city=${encodeURIComponent(city)}`;
      if (city) {
        window.location.href = `content.html?city=adama`;
        // link.loca/=tion.href = `content.html?city=${encodeURIComponent(city)}`;
        link.click();
      } else {
        alert("Please enter a city name");
      }
    });
  } else if (global.currentPage === "/content.html") {
    // Check if a city is in the URL and fetch its weather
    const city = getCityFromURL();
    if (city) {
      fetchWeather(city);
    }

    // Attach event listener to search form on content page
    searchForm.addEventListener("submit", searchWeather);
  }
}

document.addEventListener("DOMContentLoaded", init);
