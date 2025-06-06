//ჰედერსი არსებული ნავიგაციის ელემენტების ფონის ცვლილება

const currentPage = window.location.pathname.split("/").pop();
const navLinks = document.querySelectorAll(".header_nav_a");

navLinks.forEach((link) => {
  const linkPage = link.getAttribute("href");
  if (linkPage === currentPage) {
    link.classList.add("active");
  }
});

// სექცია ორის კარუსელის ფუნქცია


const track = document.getElementById("track");
const indicatorContainer = document.getElementById("indicatorContainer");
const step = 180;
const maxSteps = 4;
let currentStep = 0;
let position = 0;

function renderIndicators() {
  indicatorContainer.innerHTML = "";
  for (let i = 0; i <= maxSteps; i++) {
    const dot = document.createElement("div");
    dot.classList.add("indicator-segment");
    if (i === currentStep) dot.classList.add("active");
    indicatorContainer.appendChild(dot);
  }
}

function updateCarousel() {
  track.style.transform = `translateX(-${step * currentStep}px)`;
  renderIndicators();
}

function moveLeft() {
  if (currentStep === 0) {
    currentStep = maxSteps;
  } else {
    currentStep--;
  }
  updateCarousel();
}

function moveRight() {
  if (currentStep === maxSteps) {
    currentStep = 0;
  } else {
    currentStep++;
  }
  updateCarousel();
}

// ინიციალიზაცია
renderIndicators();
