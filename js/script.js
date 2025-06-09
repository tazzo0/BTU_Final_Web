//ჰედერსი არსებული ნავიგაციის ელემენტების ფონის ცვლილება

const currentPage = window.location.pathname.split("/").pop() || "index.html"; // ან home.html თუ ეგაა ძირითადი
const navLinks = document.querySelectorAll(".header_nav_a");

navLinks.forEach((link) => {
  const linkPage = link.getAttribute("href");
  if (linkPage === currentPage) {
    link.classList.add("active");
  }
});

// სექცია 3 კითხვების ფუნქცია

document.querySelectorAll(".faq-item").forEach((item) => {
  item.querySelector(".faq-header").addEventListener("click", () => {
    const isActive = item.classList.contains("active");

    document.querySelectorAll(".faq-item").forEach((i) => {
      i.classList.remove("active");
      i.querySelector(".toggle-btn").textContent = "+";
    });

    if (!isActive) {
      item.classList.add("active");
      item.querySelector(".toggle-btn").textContent = "−";
    }
  });
});

// movies  & shows სექცია 1

const slides = [
  {
    image: "./images/Avengers.jpg",
    title: "Avengers: Endgame",
    description:
      "With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos' actions and restore balance to the universe.",
  },
  {
    image: "./images/star_wars_3.jpg",
    title: "Star Wars: Episode III - Revenge of the Sith",
    description:
      "Anakin Skywalker is lured to the dark side of the Force and becomes Darth Vader, leading to the fall of the Jedi Order.",
  },
  {
    image: "./images/2001.jpg",
    title: "2001: A Space Odyssey",
    description:
      "A voyage to Jupiter with the sentient computer HAL-9000, exploring themes of evolution, technology, and artificial intelligence.",
  },
  {
    image: "./images/fox.jpg",
    title: "Fantastic Mr. Fox",
    description:
      "A clever fox must outsmart three mean farmers to protect his family and friends in this stop-motion animated film.",
  },
];

let current = 0;
let autoSlideInterval;

const slider1 = document.querySelector(".slider");
const titleEl = document.getElementById("slide-title");
const descEl = document.getElementById("slide-description");
const progressBar = document.getElementById("progress-bar");
const slideContent = document.querySelector(".slide-content");

function updateSlide() {
  slideContent.classList.add("fade-out");

  setTimeout(() => {
    const slide = slides[current];
    slider1.style.backgroundImage = `url(${slide.image})`;
    titleEl.textContent = slide.title;
    descEl.textContent = slide.description;

    progressBar.innerHTML = "";
    slides.forEach((_, index) => {
      const dot = document.createElement("div");
      dot.className = "dot";
      if (index === current) {
        dot.classList.add("active");
      }
      progressBar.appendChild(dot);
    });

    slideContent.classList.remove("fade-out");
  }, 700); // ⏱ აქ გაიზარდა ვადა, რაც უფრო "ნელი" გადასვლისთვისაა
}

function goToNextSlide() {
  current = (current + 1) % slides.length;
  updateSlide();
}

function goToPrevSlide() {
  current = (current - 1 + slides.length) % slides.length;
  updateSlide();
}

function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    goToNextSlide();
  }, 5000); // ⏱ 5 წამში ერთხელ ცვლის ავტომატურად
}

document.getElementById("nextBtn").addEventListener("click", () => {
  goToNextSlide();
  resetAutoSlide();
});

document.getElementById("prevBtn").addEventListener("click", () => {
  goToPrevSlide();
  resetAutoSlide();
});

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

document.addEventListener("DOMContentLoaded", () => {
  updateSlide();
  startAutoSlide();
});

// movies  & shows სექცია 2

const slider = document.getElementById("genre-slider-track");
const dotsContainer = document.getElementById("genre-slider-dots");
const totalCards = slider.children.length;
const cardsPerSlide = 5;
const totalSlides = Math.ceil(totalCards / cardsPerSlide);
let currentSlide = 0;
let isTransitioning = false;

function renderGenreSliderDots() {
  dotsContainer.innerHTML = "";
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("div");
    dot.classList.add("genre-slider-dot");
    if (i === currentSlide) dot.classList.add("active");
    dotsContainer.appendChild(dot);
  }
}

function updateGenreSlider() {
  const cardWidth =
    document.querySelector(".genre-slider-card").offsetWidth + 30; // 30px margin
  const moveX = currentSlide * cardWidth * cardsPerSlide;
  slider.style.transition = "transform 1s cubic-bezier(0.77, 0, 0.175, 1)";
  slider.style.transform = `translateX(-${moveX}px)`;
  renderGenreSliderDots();
}

function genreSliderNext() {
  if (isTransitioning) return;
  currentSlide++;
  if (currentSlide >= totalSlides) {
    currentSlide = 0;
  }
  isTransitioning = true;
  updateGenreSlider();
  setTimeout(() => {
    isTransitioning = false;
  }, 1000);
}



function genreSliderPrev() {
  if (isTransitioning) return;
  currentSlide--;
  if (currentSlide < 0) {
    currentSlide = totalSlides - 1;
  }
  isTransitioning = true;
  updateGenreSlider();
  setTimeout(() => {
    isTransitioning = false;
  }, 1000);
}

window.addEventListener("resize", updateGenreSlider);
window.addEventListener("load", () => {
  renderGenreSliderDots();
  updateGenreSlider();
});


document.querySelectorAll(".genre-slider").forEach((section) => {
  const sliderId = section.dataset.sliderId;
  const track = section.querySelector(".genre-slider-track");
  const dotsContainer = section.querySelector(".genre-slider-dots");
  const cards = section.querySelectorAll(".genre-slider-card");
  const prevBtn = section.querySelector(".genre-slider-prev");
  const nextBtn = section.querySelector(".genre-slider-next");

  const cardsPerSlide = 5;
  const totalSlides = Math.ceil(cards.length / cardsPerSlide);
  let currentSlide = 0;
  let isTransitioning = false;

  const renderDots = () => {
    dotsContainer.innerHTML = "";
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement("div");
      dot.classList.add("genre-slider-dot");
      if (i === currentSlide) dot.classList.add("active");
      dotsContainer.appendChild(dot);
    }
  };

  const updateSlider = () => {
    const cardWidth = cards[0].offsetWidth + 16;
    const moveX = currentSlide * cardWidth * cardsPerSlide;
    track.style.transition = "transform 1s cubic-bezier(0.77, 0, 0.175, 1)";
    track.style.transform = `translateX(-${moveX}px)`;
    renderDots();
  };

  const nextSlide = () => {
    if (isTransitioning) return;
    currentSlide = (currentSlide + 1) % totalSlides;
    isTransitioning = true;
    updateSlider();
    setTimeout(() => (isTransitioning = false), 1000);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    isTransitioning = true;
    updateSlider();
    setTimeout(() => (isTransitioning = false), 1000);
  };

  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);
  window.addEventListener("resize", updateSlider);
  window.addEventListener("load", updateSlider);

  renderDots();
  updateSlider();
});
