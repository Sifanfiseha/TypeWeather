const searchInput = document.querySelector("#searchInput");
const link = document.querySelector(".redirect-link");
const suggestionsEl = document.querySelector(".suggestions ul");

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const city = searchInput.value.trim();
  if (!city) return;
  link.href = `./content.html?city=${encodeURIComponent(city)}`;
  link.click();
});

searchInput.addEventListener("input", async () => {
  const query = searchInput.value.trim();

  if (query === "") {
    suggestionsEl.innerHTML = "";
    return;
  }

  if (query.length < 2) return;

  const apiKey = "da057670b3c6e44ad17109f4e01c0748";
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    const cities = await response.json();
    showSuggestions(cities);
  } catch (error) {
    console.error("Error fetching city suggestions:", error);
  }
});

function showSuggestions(cities) {
  suggestionsEl.innerHTML = "";
  selectedIndex = -1;

  if (cities.length === 0) {
    const noResult = document.createElement("li");
    noResult.textContent = "No results found";
    noResult.classList.add("no-result");
    suggestionsEl.appendChild(noResult);
    return;
  }

  cities.forEach((city, index) => {
    const suggestion = document.createElement("li");
    suggestion.textContent = `${city.name}, ${city.country}`;
    suggestion.classList.add("suggestion-item");

    suggestion.addEventListener("click", () =>
      selectCity(suggestion.textContent)
    );

    suggestionsEl.appendChild(suggestion);
  });
}
function selectCity(city) {
  searchInput.value = city;
  link.href = `./content.html?city=${encodeURIComponent(city)}`;
  link.click();
  suggestionsEl.innerHTML = "";
}
