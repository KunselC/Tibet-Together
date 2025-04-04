document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS animation library
  AOS.init({
    duration: 800,
    easing: "ease-out-cubic",
    once: true,
    offset: 50,
  });

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

  // Form submission handler with Firebase integration
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

      // Show loading state
      messageElement.textContent = "Submitting...";
      messageElement.style.color = "#ffd700";

      // Check if email already exists in waitlist collection
      db.collection("waitlist")
        .where("email", "==", email)
        .get()
        .then(function (querySnapshot) {
          if (!querySnapshot.empty) {
            // Email already exists
            messageElement.textContent =
              "This email is already on our waitlist.";
            messageElement.style.color = "#ffa500";
            return Promise.reject("Email already exists");
          }

          // Add email to waitlist
          return db.collection("waitlist").add({
            email: email,
            signupDate: firebase.firestore.FieldValue.serverTimestamp(),
          });
        })
        .then(function () {
          // Success
          messageElement.textContent =
            "Thank you for joining our waitlist! We'll be in touch soon.";
          messageElement.style.color = "#4cd964";
          document.getElementById("email").value = "";

          // Update the local counter for immediate feedback
          if (typeof updateLocalCounterAfterSignup === "function") {
            updateLocalCounterAfterSignup();
          } else {
            // Fallback to server refresh if local update not available
            if (typeof updateWaitlistCounter === "function") {
              setTimeout(updateWaitlistCounter, 1000);
            }
          }
        })
        .catch(function (error) {
          // If it's our custom error for duplicate email, don't show error message
          if (error === "Email already exists") {
            return;
          }

          // Error
          console.error("Error adding document: ", error);
          messageElement.textContent =
            "There was an error joining the waitlist. Please try again.";
          messageElement.style.color = "#ff6b6b";
        });
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

  // Count animation for waitlist members
  function animateCounter(element, target) {
    let current = 0;
    const duration = 2000;
    const step = 25; // ms
    const increment = target / (duration / step);

    const counter = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(counter);
      }
      element.textContent = Math.floor(current);
    }, step);
  }

  // Start the animation when the element is in view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.target.classList.contains("counter")) {
        animateCounter(
          entry.target,
          parseInt(entry.target.getAttribute("data-target"))
        );
        observer.unobserve(entry.target);
      }
    });
  });

  // Function to observe counter elements (exposed globally)
  window.observeCounters = function () {
    document.querySelectorAll(".counter").forEach((counter) => {
      observer.observe(counter);
    });
  };

  // Observe counter elements initially
  observeCounters();

  // Update waitlist counter when page loads
  if (typeof updateWaitlistCounter === "function") {
    updateWaitlistCounter();
  }
});

// Email validation function
function validateEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Add a subtle parallax effect to the hero section
window.addEventListener("scroll", function () {
  const scrollValue = window.scrollY;
  const heroContent = document.querySelector(".hero-content");

  if (scrollValue < 600 && heroContent) {
    heroContent.style.transform = `translateY(${scrollValue * 0.2}px)`;
  }
});

// Set current year in footer
document.addEventListener("DOMContentLoaded", function () {
  const yearElement = document.getElementById("current-year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
