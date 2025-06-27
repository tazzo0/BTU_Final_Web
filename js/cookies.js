const popup = document.getElementById("cookie-popup");
const acceptBtn = document.getElementById("accept-cookie");
const declineBtn = document.getElementById("decline-cookie");

const COOKIE_KEY = "cookieConsentTime";

function shouldShowPopup() {
  const storedTime = localStorage.getItem(COOKIE_KEY);
  if (!storedTime) return true;

  const lastConsentTime = parseInt(storedTime, 10);
  const currentTime = new Date().getTime();

  return currentTime - lastConsentTime > 60000; // 1 minute
}

// Show/hide popup
function showPopup() {
  popup.style.display = "block";
}

function hidePopup() {
  popup.style.display = "none";
}

// On "I Agree"
acceptBtn.addEventListener("click", () => {
  const currentTime = new Date().getTime();
  localStorage.setItem(COOKIE_KEY, currentTime.toString());
  hidePopup();
});

// On "I Disagree"
declineBtn.addEventListener("click", () => {
  window.location.href = "https://google.com"; // redirect if disagree
});

// On page load
window.addEventListener("load", () => {
  if (shouldShowPopup()) {
    showPopup();
  }
});
