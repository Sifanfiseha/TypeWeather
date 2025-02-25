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
const dateEl = document.querySelector(".date");
const timeEl = document.querySelector(".time");
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
async function fetch5DayWeather(city) {
  try {
    if (!city) throw new Error("city name is required");
    loadingEl.classList.remove("hide");
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) {
      throw new Error("City not found. Please try again.");
    }
    const data = await response.json();
    displayForecast(data.list);
    data;
  } catch (error) {
    console.log(error);
  } finally {
    loadingEl?.classList.add("hide");
  }
}
function displayForecast(data) {
  console.log(data);
  const week = document.querySelector(".container");
  data.forEach((day) => {
    let dayName = getDayName(day.dt_txt);
    if (window.innerWidth <= 1000) {
      dayName = dayName.slice(0, 3);
    }
    if (day.dt_txt.includes("15:00:00")) {
      const div = document.createElement("div");
      div.classList.add("day");
      div.innerHTML = `
            <p class="long">${dayName}</p>
            <p class="short">mon</p>
            <img
              src="./assets/image/weather icon/Weather=Few clouds, Moment=Day.svg"
              alt=""
            />
            <p class="weather-stat">${day.weather[0].description}</p>
            <p class="lp">
              <span>${day.main.temp_max}°C</span> <span>${day.main.temp_min}°C</span>
            </p>
          `;
      week.appendChild(div);
    }
  });
}

function displayCurrentWeather(data) {
  const date = formatTimestamp(data.dt);
  const time = formatTime(data.dt);
  timeEl.innerText = time;
  dateEl.innerText = date;
  cityName.innerText = `${data.name}, ${data.sys.country}`;
  discriptionEl.innerText = data.weather[0].description;
  tempEl.forEach((el) => {
    el.innerHTML = `${data.main.temp.toFixed(1)}°C`;
  });
  highLowTempEl.textContent = `${data.main.temp_max}°C / ${data.main.temp_min}°C`;
  humidityEl.innerText = `${data.main.humidity}%`;
  windSpeedEl.innerText = `${data.wind.speed.toFixed(1)} Km/Hr`;
  chanceEl.innerText = `${data.main.feels_like.toFixed(1)}%`;
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

function formatTimestamp(dt) {
  const date = new Date(dt * 1000); // Convert seconds to milliseconds
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
function formatTime(dt) {
  const date = new Date(dt * 1000); // Convert seconds to milliseconds
  const hours = +String(date.getHours()).padStart(2, "0") - 4;
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}
// get city name from the url
function getCityFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("city");
}
function getDayName(dateString) {
  if (!dateString || typeof dateString !== "string") {
    return "Invalid date format";
  }

  // Ensure proper parsing
  const formattedDate = dateString.replace(" ", "T");
  const date = new Date(formattedDate);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  return date.toLocaleDateString("en-US", { weekday: "long" });
}

// Event listeners
function init() {
  switch (window.location.pathname) {
    case "/index.html":
      console.log("home");
      break;
    case "/content.html":
      const city = getCityFromUrl();
      fetchWeather(city);
      fetch5DayWeather(city);
      document.querySelector("form").addEventListener("submit", searchWeather);
      document
        .querySelector("form")
        .addEventListener("submit", fetch5DayWeather);
  }
}
document.addEventListener("DOMContentLoaded", init);
