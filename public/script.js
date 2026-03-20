const input = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");

let selectedIndex = -1;
let currentResults = [];

// debounce (prevents too many requests)
let timeout;

input.addEventListener("input", () => {
  clearTimeout(timeout);

  timeout = setTimeout(async () => {
    const query = input.value;

    if (!query) {
      resultsDiv.innerHTML = "";
      return;
    }

    const res = await fetch(`/search?q=${query}`);
    const results = await res.json();

    currentResults = results;
    selectedIndex = -1;

    renderResults(results, query);
  }, 300);
});

// render results
function renderResults(results, query) {
  resultsDiv.innerHTML = "";

  if (results.length === 0) {
    resultsDiv.innerHTML = "<div class='result-item'>No results</div>";
    return;
  }

  results.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("result-item");

    // highlight match
    const regex = new RegExp(`(${query})`, "gi");
    div.innerHTML = item.replace(regex, `<span class="highlight">$1</span>`);

    div.addEventListener("click", () => {
      alert("You selected: " + item);
    });

    resultsDiv.appendChild(div);
  });
}

// keyboard navigation
input.addEventListener("keydown", (e) => {
  const items = document.querySelectorAll(".result-item");

  if (e.key === "ArrowDown") {
    selectedIndex++;
  } else if (e.key === "ArrowUp") {
    selectedIndex--;
  } else if (e.key === "Enter") {
    if (selectedIndex >= 0) {
      alert("You selected: " + currentResults[selectedIndex]);
    }
  }

  if (selectedIndex >= items.length) selectedIndex = 0;
  if (selectedIndex < 0) selectedIndex = items.length - 1;

  items.forEach(item => item.classList.remove("active"));

  if (items[selectedIndex]) {
    items[selectedIndex].classList.add("active");
  }
});