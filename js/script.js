//ჰედერსი არსებული ნავიგაციის ელემენტების ფონის ცვლილება

const currentPage = window.location.pathname.split("/").pop();
const navLinks = document.querySelectorAll(".header_nav_a");

navLinks.forEach((link) => {
  const linkPage = link.getAttribute("href");
  if (linkPage === currentPage) {
    link.classList.add("active");
  }
});

// სექცია 3 კითხვების ფუნქცია

document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-header').addEventListener('click', () => {
    const isActive = item.classList.contains('active');

    // Close all
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('active');
      i.querySelector('.toggle-btn').textContent = '+';
    });

    // Toggle clicked item
    if (!isActive) {
      item.classList.add('active');
      item.querySelector('.toggle-btn').textContent = '−';
    }
  });
});



