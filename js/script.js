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
function initializeSlider(sliderId) {
  const track = document.getElementById(`slider-track-${sliderId}`);
  const dotsContainer = document.getElementById(`slider-dots-${sliderId}`);
  const prevButton = document.querySelector(
    `.genre-slider-arrow-btn.prev[data-slider-id="${sliderId}"]`
  );
  const nextButton = document.querySelector(
    `.genre-slider-arrow-btn.next[data-slider-id="${sliderId}"]`
  );

  const cards = track.querySelectorAll(".genre-slider-card");
  const cardStyle = getComputedStyle(cards[0]);
  const gap = 30; // css-ში gap არის 30px,
  const cardWidth = cards[0].offsetWidth + gap;

  // აქ ვაკეთებთ, რომ ყოველთვის 5 ქარდი გადავძვრე ერთ დაწკაპუნებაზე
  const visibleCards = 5;

  const totalCards = cards.length;
  const totalSlides = Math.ceil(totalCards / visibleCards);

  let currentSlide = 0;

  dotsContainer.innerHTML = "";
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("div");
    dot.classList.add("genre-slider-dot");
    if (i === 0) dot.classList.add("active");
    dotsContainer.appendChild(dot);
  }
  const dots = dotsContainer.querySelectorAll(".genre-slider-dot");

  function updateSlider() {
    if (currentSlide >= totalSlides) {
      currentSlide = 0;
    }
    if (currentSlide < 0) {
      currentSlide = totalSlides - 1;
    }

    track.style.transform = `translateX(-${
      currentSlide * cardWidth * visibleCards
    }px)`;

    dots.forEach((dot) => dot.classList.remove("active"));
    if (dots[currentSlide]) {
      dots[currentSlide].classList.add("active");
    }
  }

  prevButton.addEventListener("click", () => {
    currentSlide--;
    updateSlider();
  });

  nextButton.addEventListener("click", () => {
    currentSlide++;
    updateSlider();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentSlide = index;
      updateSlider();
    });
  });

  window.addEventListener("resize", () => {
    updateSlider();
  });

  updateSlider();
}

// ინიციალიზაცია სახვადასხვა სექციებისთვის სექციისთვის
initializeSlider("movies");
initializeSlider("popular");
initializeSlider("New_Releases");

