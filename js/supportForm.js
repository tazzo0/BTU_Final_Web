
// supportForm.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("supportForm");

  if (!form) {
    console.error("Form not found!");
    return;
  }

  const fields = {
    firstName: {
      element: document.getElementById("firstName"),
      error: document.getElementById("errorFirstName"),
    },
    lastName: {
      element: document.getElementById("lastName"),
      error: document.getElementById("errorLastName"),
    },
    email: {
      element: document.getElementById("email"),
      error: document.getElementById("errorEmail"),
    },
    phone: {
      element: document.getElementById("phone"),
      error: document.getElementById("errorPhone"),
    },
    password: {
      element: document.getElementById("password"),
      error: document.getElementById("errorPassword"),
    },
    message: {
      element: document.getElementById("message"),
      error: document.getElementById("errorMessage"),
    },
    terms: {
      element: document.getElementById("terms"),
      error: document.getElementById("errorTerms"),
    },
  };

  const phoneRegex = /^\+?[0-9]{9,15}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    for (let key in fields) {
      fields[key].error.textContent = "";
    }

    if (!fields.firstName.element.value.trim()) {
      fields.firstName.error.textContent = "First Name is required.";
      isValid = false;
    }
    if (!fields.lastName.element.value.trim()) {
      fields.lastName.error.textContent = "Last Name is required.";
      isValid = false;
    }
    if (!emailRegex.test(fields.email.element.value.trim())) {
      fields.email.error.textContent = "Enter a valid email.";
      isValid = false;
    }
    if (!phoneRegex.test(fields.phone.element.value.trim())) {
      fields.phone.error.textContent = "Enter a valid phone number.";
      isValid = false;
    }
    if (!fields.password.element.value.trim()) {
      fields.password.error.textContent = "Password is required.";
      isValid = false;
    }
    if (!fields.message.element.value.trim()) {
      fields.message.error.textContent = "Message is required.";
      isValid = false;
    }
    if (!fields.terms.element.checked) {
      fields.terms.error.textContent = "You must accept the Terms.";
      isValid = false;
    }

    if (isValid) {
      alert("Form submitted successfully!");
      form.reset();
    }
  });

  const passwordField = fields.password.element;
  const showPass = document.getElementById("showPassword");

  showPass.addEventListener("click", () => {
    if (passwordField.type === "password") {
      passwordField.type = "text";
      showPass.textContent = "Hide";
    } else {
      passwordField.type = "password";
      showPass.textContent = "Show";
    }
  });
});
