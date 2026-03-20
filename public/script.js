const input = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");

input.addEventListener("input", async () => {

  const query = input.value;

  if (!query) {
    resultsDiv.innerHTML = "";
    return;
  }

  const response = await fetch(`/search?q=${query}`);
  const results = await response.json();

  resultsDiv.innerHTML = "";

  results.forEach(item => {
    const div = document.createElement("div");
    div.textContent = item;
    resultsDiv.appendChild(div);
  });

});