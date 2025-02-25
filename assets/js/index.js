const searchInput = document.querySelector("#searchInput");
const link = document.querySelector(".redirect-link");

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const city = searchInput.value;
  link.href = `./content.html?city=${encodeURIComponent(city)}`;
  console.log(city);
  link.click();
});
