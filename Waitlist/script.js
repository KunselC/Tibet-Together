// Smooth scrolling for all waitlist buttons
document
  .getElementById("nav-waitlist-button")
  .addEventListener("click", function () {
    document
      .getElementById("waitlist-section")
      .scrollIntoView({ behavior: "smooth" });
  });

document
  .getElementById("hero-waitlist-button")
  .addEventListener("click", function () {
    document
      .getElementById("waitlist-section")
      .scrollIntoView({ behavior: "smooth" });
  });

document
  .getElementById("footer-waitlist-button")
  .addEventListener("click", function () {
    document
      .getElementById("waitlist-section")
      .scrollIntoView({ behavior: "smooth" });
  });

// Form submission handler
document
  .getElementById("email-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const messageElement = document.getElementById("message");

    // Simple email validation
    if (!validateEmail(email)) {
      messageElement.textContent = "Please enter a valid email address.";
      messageElement.style.color = "#ff6b6b";
      return;
    }

    // Success message (in a real app, you'd send this to your backend)
    messageElement.textContent =
      "Thank you for joining our waitlist! We'll be in touch soon.";
    messageElement.style.color = "#4cd964";
    document.getElementById("email").value = "";

    // Simulating data storage (in a real app, this would be a server request)
    console.log("Email added to waitlist:", email);
  });

// Email validation function
function validateEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Add animations on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

// Observe all feature cards, mission points
document
  .querySelectorAll(".feature-card, .mission-point")
  .forEach((element) => {
    element.classList.add("fade-in");
    observer.observe(element);
  });

// Add fade-in classes
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".fade-in").forEach((el, index) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    el.style.transitionDelay = `${index * 0.1}s`;
  });

  // Add show class after a slight delay to trigger animations
  setTimeout(() => {
    document.querySelectorAll(".fade-in").forEach((el) => {
      el.classList.add("show");
    });
  }, 100);
});

// Add show class CSS
const style = document.createElement("style");
style.textContent = `
  .fade-in {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  .show {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);
