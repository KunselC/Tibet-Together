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

// Intersection Observer for scroll animations
document.addEventListener("DOMContentLoaded", function () {
  // Create an Intersection Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // If element is visible
        if (entry.isIntersecting) {
          // Add animated class
          entry.target.classList.add("animated");
          // Stop observing after animation is applied
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null, // viewport
      threshold: 0.15, // trigger when 15% of the element is visible
      rootMargin: "0px",
    }
  );

  // Observe feature cards
  document.querySelectorAll(".feature-card").forEach((card) => {
    observer.observe(card);
  });

  // Observe mission points
  document.querySelectorAll(".mission-point").forEach((point) => {
    observer.observe(point);
  });

  // Add staggered delay to feature cards
  document.querySelectorAll(".feature-card").forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
  });

  // Add staggered delay to mission points
  document.querySelectorAll(".mission-point").forEach((point, index) => {
    point.style.transitionDelay = `${index * 0.1}s`;
  });

  // Ensure all paragraph text is visible
  document.querySelectorAll("p").forEach((el) => {
    el.style.opacity = "1";
    el.style.visibility = "visible";
  });
});

// Add a subtle parallax effect to the hero section
window.addEventListener("scroll", function () {
  const scrollValue = window.scrollY;
  const heroContent = document.querySelector(".hero-content");

  if (scrollValue < 600) {
    heroContent.style.transform = `translateY(${scrollValue * 0.2}px)`;
  }
});

// Form input animation
const emailInput = document.getElementById("email");
emailInput.addEventListener("focus", function () {
  this.parentElement.classList.add("focused");
});

emailInput.addEventListener("blur", function () {
  if (!this.value) {
    this.parentElement.classList.remove("focused");
  }
});
