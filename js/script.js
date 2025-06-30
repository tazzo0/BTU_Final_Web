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

//api, fetch გამოყენება =======
const API_KEY = "bb732a542bd54a4285d474dde9941c5e";
const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

let movies = []; // აქ ჩაიტვირთება ფილმები
let current = 0;
let autoSlideInterval;

const slider1 = document.querySelector(".slider");
const titleEl = document.getElementById("slide-title");
const descEl = document.getElementById("slide-description");
const progressBar = document.getElementById("progress-bar");
const slideContent = document.querySelector(".slide-content");

async function loadMovies() {
  const resp = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}` // მოაქვს პოპულარული ფილმები
  );
  const data = await resp.json();
  movies = data.results.slice(0, 5).map((movie) => {
    return {
      image: IMAGE_BASE + movie.backdrop_path,
      title: movie.title,
      description: movie.overview,
    };
  });
  updateSlide();
  startAutoSlide();
}

function updateSlide() {
  slideContent.classList.add("fade-out");
  setTimeout(() => {
    const slide = movies[current];
    slider1.style.backgroundImage = `url(${slide.image})`;
    titleEl.textContent = slide.title;
    descEl.textContent = slide.description;

    // პროგრესის წერტილები
    progressBar.innerHTML = "";
    movies.forEach((_, index) => {
      const dot = document.createElement("div");
      dot.className = "dot";
      if (index === current) {
        dot.classList.add("active");
      }
      progressBar.appendChild(dot);
    });
    slideContent.classList.remove("fade-out");
    slideContent.classList.add("fade-in");
    setTimeout(() => slideContent.classList.remove("fade-in"), 500);
  }, 700);
}

function goToNextSlide() {
  current = (current + 1) % movies.length;
  updateSlide();
}

function goToPrevSlide() {
  current = (current - 1 + movies.length) % movies.length;
  updateSlide();
}

function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    goToNextSlide();
  }, 5000);
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

// ღილაკები
document.getElementById("nextBtn").addEventListener("click", () => {
  goToNextSlide();
  resetAutoSlide();
});
document.getElementById("prevBtn").addEventListener("click", () => {
  goToPrevSlide();
  resetAutoSlide();
});

// ჩატვირთვა
document.addEventListener("DOMContentLoaded", loadMovies);

// movies  & shows სექცია 2
// function initializeSlider(sliderId) {
//   const track = document.getElementById(`slider-track-${sliderId}`);
//   const dotsContainer = document.getElementById(`slider-dots-${sliderId}`);
//   const prevButton = document.querySelector(
//     `.genre-slider-arrow-btn.prev[data-slider-id="${sliderId}"]`
//   );
//   const nextButton = document.querySelector(
//     `.genre-slider-arrow-btn.next[data-slider-id="${sliderId}"]`
//   );

//   const cards = track.querySelectorAll(".genre-slider-card");
//   const cardStyle = getComputedStyle(cards[0]);
//   const gap = 30; // css-ში gap არის 30px,
//   const cardWidth = cards[0].offsetWidth + gap;

//   // აქ ვაკეთებთ, რომ ყოველთვის 5 ქარდი გადავძვრე ერთ დაწკაპუნებაზე
//   const visibleCards = 5;

//   const totalCards = cards.length;
//   const totalSlides = Math.ceil(totalCards / visibleCards);

//   let currentSlide = 0;

//   dotsContainer.innerHTML = "";
//   for (let i = 0; i < totalSlides; i++) {
//     const dot = document.createElement("div");
//     dot.classList.add("genre-slider-dot");
//     if (i === 0) dot.classList.add("active");
//     dotsContainer.appendChild(dot);
//   }
//   const dots = dotsContainer.querySelectorAll(".genre-slider-dot");

//   function updateSlider() {
//     if (currentSlide >= totalSlides) {
//       currentSlide = 0;
//     }
//     if (currentSlide < 0) {
//       currentSlide = totalSlides - 1;
//     }

//     track.style.transform = `translateX(-${
//       currentSlide * cardWidth * visibleCards
//     }px)`;

//     dots.forEach((dot) => dot.classList.remove("active"));
//     if (dots[currentSlide]) {
//       dots[currentSlide].classList.add("active");
//     }
//   }

//   prevButton.addEventListener("click", () => {
//     currentSlide--;
//     updateSlider();
//   });

//   nextButton.addEventListener("click", () => {
//     currentSlide++;
//     updateSlider();
//   });

//   dots.forEach((dot, index) => {
//     dot.addEventListener("click", () => {
//       currentSlide = index;
//       updateSlider();
//     });
//   });

//   window.addEventListener("resize", () => {
//     updateSlider();
//   });

//   updateSlider();
// }

// // ინიციალიზაცია სახვადასხვა სექციებისთვის სექციისთვის
// initializeSlider("movies");
// initializeSlider("popular");
// initializeSlider("New_Releases");

// ---------------------------------
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
  const gap = 30;

  let currentSlide = 0;

  function getVisibleCards() {
    const screenWidth = window.innerWidth;

    if (screenWidth >= 1600) return 5;
    if (screenWidth >= 1200) return 4;
    if (screenWidth >= 768) return 3;
    return 1;
  }

  function getCardWidth() {
    return cards[0].offsetWidth + gap;
  }

  function getTotalSlides(visibleCards) {
    return Math.ceil(cards.length / visibleCards);
  }

  function createDots(totalSlides) {
    dotsContainer.innerHTML = ""; // გაწმენდა
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement("div");
      dot.classList.add("genre-slider-dot");
      if (i === 0) dot.classList.add("active");
      dotsContainer.appendChild(dot);
    }
  }

  function updateSlider() {
    const visibleCards = getVisibleCards();
    const cardWidth = getCardWidth();
    const totalSlides = getTotalSlides(visibleCards);

    if (currentSlide >= totalSlides) {
      currentSlide = 0;
    }
    if (currentSlide < 0) {
      currentSlide = totalSlides - 1;
    }

    track.style.transform = `translateX(-${
      currentSlide * cardWidth * visibleCards
    }px)`;

    const dots = dotsContainer.querySelectorAll(".genre-slider-dot");
    dots.forEach((dot) => dot.classList.remove("active"));
    if (dots[currentSlide]) {
      dots[currentSlide].classList.add("active");
    }
  }

  function attachEvents() {
    prevButton.addEventListener("click", () => {
      currentSlide--;
      updateSlider();
    });
    nextButton.addEventListener("click", () => {
      currentSlide++;
      updateSlider();
    });
    dotsContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("genre-slider-dot")) {
        const dots = Array.from(
          dotsContainer.querySelectorAll(".genre-slider-dot")
        );
        currentSlide = dots.indexOf(e.target);
        updateSlider();
      }
    });
    window.addEventListener("resize", () => {
      initialize();
    });
  }

  function initialize() {
    const visibleCards = getVisibleCards();
    const totalSlides = getTotalSlides(visibleCards);
    createDots(totalSlides);
    currentSlide = Math.min(currentSlide, totalSlides - 1);
    updateSlider();
  }

  attachEvents();
  initialize();
}
// ინიციალიზება სექციებისთვის
initializeSlider("movies");
initializeSlider("popular");
initializeSlider("New_Releases");
