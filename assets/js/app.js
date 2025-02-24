const global = {
  currentPage: window.location.pathname,
};
const apiKey = "da057670b3c6e44ad17109f4e01c0748";
const searchInput = document.querySelector("#searchInput");
const cityName = document.querySelector(".city-name");
const discriptionEl = document.querySelector(".discription");
const loadingEl = document.querySelector(".loading");

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
    cityName.innerText = `${data.name}, ${data.sys.country}`;
    discriptionEl.innerText = data.weather[0].description;
  } catch (error) {
    alert(error);
  } finally {
    loadingEl?.classList.add("hide");
  }
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
      document.querySelector("form").addEventListener("submit", (e) => {
        e.preventDefault();
        const city = searchInput.value.trim();
        if (city) {
          window.location.href = `content.html?city=${city}`;
        } else {
          alert("please enter a city name!");
        }
      });
      break;
    case "/content.html":
      const city = getCityFromUrl();
      fetchWeather(city);
      document.querySelector("form").addEventListener("submit", searchWeather);
  }
}
document.addEventListener("DOMContentLoaded", init);
