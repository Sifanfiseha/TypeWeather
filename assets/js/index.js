const searchInput = document.querySelector("#searchInput");
const link = document.querySelector(".redirect-link");
//  document.querySelector("form").addEventListener("submit", (e) => {
//         e.preventDefault();
//         const city = searchInput.value.trim();
//         sessionStorage.setItem("city", city);
//         // if (city) {
//         //   window.location.assign(
//         //     `/content.html?city=${encodeURIComponent(city)}`
//         //   );
//         // } else {
//         //   alert("please enter a city name!");
//         // }
//         // window.location.href = "content.html";
//         link.href = `./content.html?city=${encodeURIComponent(city)}`;
//         link.click();
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const city = searchInput.value;
  link.href = `./content.html?city=${encodeURIComponent(city)}`;
  console.log(city);
  link.click();
});
