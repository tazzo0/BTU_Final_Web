//ჰედერსი არსებული ნავიგაციის ელემენტების ფონის ცვლილება

const currentPage = window.location.pathname.split("/").pop();
const navLinks = document.querySelectorAll(".header_nav_a");

navLinks.forEach((link) => {
  const linkPage = link.getAttribute("href");
  if (linkPage === currentPage) {
    link.classList.add("active");
  }
});
