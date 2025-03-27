document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM content loaded");

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
      console.log("Form submitted");

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

      console.log("Checking for existing email:", email);

      // Check if email already exists in waitlist collection
      db.collection("waitlist")
        .where("email", "==", email)
        .get()
        .then(function (querySnapshot) {
          if (!querySnapshot.empty) {
            // Email already exists
            console.log("Email already exists");
            messageElement.textContent =
              "This email is already on our waitlist.";
            messageElement.style.color = "#ffa500";
            return Promise.reject("Email already exists");
          }

          console.log("Adding new email to waitlist");

          // Add email to waitlist
          return db.collection("waitlist").add({
            email: email,
            signupDate: firebase.firestore.FieldValue.serverTimestamp(),
          });
        })
        .then(function () {
          // Success
          console.log("Email added successfully");
          messageElement.textContent =
            "Thank you for joining our waitlist! We'll be in touch soon.";
          messageElement.style.color = "#4cd964";
          document.getElementById("email").value = "";
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
