const global = {
  currentPage: window.location.pathname,
};
const searchInput = document.querySelector("#searchInput");
function init() {
  switch (global.currentPage) {
    case "/index.html":
      document.querySelector("form").addEventListener("submit", (e) => {
        e.preventDefault();
        const city = searchInput.value;
        if (city) {
          window.location.href = `content.html?city=${city}`;
        } else {
          alert("please enter a city name!");
        }
      });
      break;
    case "/content.html":
      console.log("content");
  }
}
document.addEventListener("DOMContentLoaded", init);
