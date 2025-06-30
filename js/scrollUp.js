console.log("scrollUp.js loaded");

const scrollBtn = document.getElementById("scrollToTopBtn");

// 1000px-ზე მეტი  აჩვენებს ღილაკს
window.addEventListener("scroll", () => {
  if (
    document.body.scrollTop > 1000 ||
    document.documentElement.scrollTop > 1000
  ) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
});

// ღილაკზე დაჭერისას დაბრუნდება ზედა ნაწილში
scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  // focus-ს გაუქმება რომ ჰოვერი არ დარჩეს
  scrollBtn.blur();
});
