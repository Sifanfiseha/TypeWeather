document
  .getElementById("searchInput")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission (if inside a form)
      const query = encodeURIComponent(this.value.trim()); // Get and encode input value
      if (query) {
        window.location.href = `content.html?city=${query}`; // Navigate to new page with query
      }
    }
  });
