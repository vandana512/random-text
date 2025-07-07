localStorage.removeItem("favorites");

const quoteText = document.getElementById("quote");
const speakerText = document.getElementById("speaker");
const newQuoteBtn = document.getElementById("new-quote");
const addFavBtn = document.getElementById("add-favorite");
const favoritesList = document.getElementById("favorites");

let currentQuote = {};
let quotesData = [];

// Load JSON quotes
async function loadQuotes() {
  try {
    const response = await fetch("quotes.json");
    quotesData = await response.json();
    getNewQuote(); // Show first quote immediately
  } catch (err) {
    quoteText.textContent = "Failed to load quotes 😓";
    speakerText.textContent = "";
  }
}

// Show a new quote
function getNewQuote() {
  const random = quotesData[Math.floor(Math.random() * quotesData.length)];
  currentQuote = random;
  quoteText.textContent = `"${random.quote}"`;
  speakerText.textContent = `— ${random.speaker}`;
}

// Add to localStorage favorites
function addToFavorites() {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const exists = favorites.some(fav => fav.quote === currentQuote.quote && fav.speaker === currentQuote.speaker);

  if (!exists) {
    favorites.push(currentQuote);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderFavorites();
  }
}

// Render favorites list
function renderFavorites() {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favoritesList.innerHTML = "";

  favorites.forEach(fav => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>"${fav.quote}"</strong><br><em>— ${fav.speaker}</em>`;
    favoritesList.appendChild(li);
  });
}

// Event Listeners
newQuoteBtn.addEventListener("click", getNewQuote);
addFavBtn.addEventListener("click", addToFavorites);

// Start App
loadQuotes();
renderFavorites();

