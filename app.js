// Global variables
const container = document.querySelector(".box-container");
const colorInput = document.querySelector(".color-settings input");
const colorBtn = document.querySelector(".color-settings button");
const movieInput = document.querySelector(".background-settings input");
const movieBtn = document.querySelector(".background-settings button");
const colorPallet = document.querySelector(".color-pallet");

// Default settings
let defaultColor = "black";
const boxWidth = 20;
const boxHeight = 20;

colorPallet.style.backgroundColor = defaultColor;

// Event Listeners
window.addEventListener("resize", () => {
  container.innerHTML = "";
  fillContainerWithBoxes();
});

colorBtn.addEventListener("click", handleSelectColor);

movieBtn.addEventListener("click", handleChangeBackground);

// Event Handlers
function handleSelectColor() {
  const color = colorInput.value;
  const box = document.createElement("div");
  defaultColor = color;
  colorPallet.style.backgroundColor = defaultColor;
}

function handleChangeBackground() {
  const movie = movieInput.value;

  fetch(`https://omdb-api-proxy.up.railway.app/movie/${movie}`)
    .then((res) => res.json())
    .then((data) => {
      const poster = data.Poster;
      container.style.backgroundImage = `url(${poster})`;
    });
}

// Helpers
function createBox() {
  const box = document.createElement("div");
  box.className = "box";
  container.appendChild(box);
}

function fillContainerWithBoxes() {
  const numBoxesX = Math.floor(window.innerWidth / boxWidth);
  const numBoxesY = Math.floor(window.innerHeight / boxHeight);

  const containerArea = numBoxesX * numBoxesY;

  for (let i = 0; i < containerArea; i++) {
    createBox();
  }

  const boxes = document.querySelectorAll(".box");

  boxes.forEach((box) => {
    box.addEventListener("click", () => {
      box.style.backgroundColor = defaultColor;
    });
  });
}

fillContainerWithBoxes();
