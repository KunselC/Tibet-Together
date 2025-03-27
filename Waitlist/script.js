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

// Modified animation implementation
document.addEventListener("DOMContentLoaded", function () {
  // Immediately make all content visible
  document.querySelectorAll(".feature-card, .mission-point").forEach((el) => {
    el.style.opacity = "1";
    el.style.visibility = "visible";
    el.style.transform = "translateY(0)";
  });

  // Ensure all paragraph text is visible
  document.querySelectorAll("p").forEach((el) => {
    el.style.opacity = "1";
    el.style.visibility = "visible";
  });

  // Add simple entrance animations
  const addAnimations = () => {
    const elements = document.querySelectorAll(".feature-card, .mission-point");

    elements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add("animated");
      }, index * 150);
    });
  };

  // Add animation class
  setTimeout(addAnimations, 300);
});

// Add animation styles
const style = document.createElement("style");
style.textContent = `
  .feature-card, .mission-point {
    opacity: 1;
    visibility: visible;
    transition: transform 0.5s ease;
  }
  
  .feature-card.animated, .mission-point.animated {
    transform: translateY(0);
  }
  
  p {
    opacity: 1 !important;
    visibility: visible !important;
  }
`;
document.head.appendChild(style);
