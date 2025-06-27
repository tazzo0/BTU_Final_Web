console.log("scrollUp.js loaded");

const scrollBtn = document.getElementById("scrollToTopBtn");

// როცა იუზერი ქვემოთ ჩასქროლავს 300px-ზე მეტი → აჩვენე ღილაკი
window.addEventListener("scroll", () => {
  if (
    document.body.scrollTop > 300 ||
    document.documentElement.scrollTop > 300
  ) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
});

// ღილაკზე დაჭერისას smoothly დავაბრუნოთ ზედა ნაწილში
scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
