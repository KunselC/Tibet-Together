// Firebase configuration and initialization
const firebaseConfig = {
  apiKey: "AIzaSyCcTaujfClv1_y9a8CyZYlio7sx5OeYlX0",
  authDomain: "tibet-together.firebaseapp.com",
  projectId: "tibet-together",
  storageBucket: "tibet-together.appspot.com",
  messagingSenderId: "1044233534349",
  appId: "1:1044233534349:web:d71f01eed242d31db79bc4",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the Firestore database
const db = firebase.firestore();

// Cache configuration
const CACHE_KEY = "tibetTogether_waitlistCount";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Function to update the waitlist counter with caching
function updateWaitlistCounter() {
  const counterElement = document.querySelector(".waitlist-cta");
  if (!counterElement) return;

  // Try to get cached count first
  const cachedData = getCachedWaitlistCount();

  if (cachedData) {
    // Use cached data if available and not expired
    updateCounterDisplay(cachedData.count);

    // If user just signed up (detected by URL parameter), force refresh counter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("justSignedUp")) {
      // Remove the parameter from URL for cleaner look
      const newUrl = window.location.pathname + window.location.hash;
      window.history.replaceState({}, document.title, newUrl);

      // Refresh count from server but don't block UI
      refreshCountFromServer();
    }
  } else {
    // No valid cache, get fresh count from server
    refreshCountFromServer();
  }
}

// Helper function to get cached count
function getCachedWaitlistCount() {
  try {
    const cachedData = JSON.parse(localStorage.getItem(CACHE_KEY));
    if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
      return cachedData;
    }
  } catch (error) {
    console.error("Error reading from cache:", error);
  }
  return null;
}

// Helper function to cache count
function cacheWaitlistCount(count) {
  try {
    const data = {
      count: count,
      timestamp: Date.now(),
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving to cache:", error);
  }
}

// Helper function to update the counter display
function updateCounterDisplay(count) {
  const counterElement = document.querySelector(".waitlist-cta");
  if (!counterElement) return;

  if (count > 0) {
    // If we have signups, update the text to show the count
    counterElement.innerHTML = `Join <span class="counter highlight-text" data-target="${count}">0</span> ${
      count === 1 ? "person" : "people"
    } already on our waitlist:`;
  } else {
    // If no signups yet, use encouraging language instead
    counterElement.innerHTML = "Be among the first to join our waitlist:";
  }

  // Re-observe counter elements that might have been added dynamically
  if (typeof observeCounters === "function") {
    setTimeout(observeCounters, 100);
  }
}

// Helper function to get fresh count from server
function refreshCountFromServer() {
  db.collection("waitlist")
    .get()
    .then((querySnapshot) => {
      const count = querySnapshot.size;

      // Update the UI
      updateCounterDisplay(count);

      // Cache the new count
      cacheWaitlistCount(count);
    })
    .catch((error) => {
      console.error("Error getting waitlist count:", error);
      // Fallback to generic text if there's an error
      const counterElement = document.querySelector(".waitlist-cta");
      if (counterElement) {
        counterElement.textContent = "Join our waitlist today:";
      }
    });
}

// Update the user's local cache after they successfully sign up
function updateLocalCounterAfterSignup() {
  try {
    const cachedData = JSON.parse(localStorage.getItem(CACHE_KEY));
    if (cachedData) {
      cachedData.count = cachedData.count + 1;
      localStorage.setItem(CACHE_KEY, JSON.stringify(cachedData));
      updateCounterDisplay(cachedData.count);
    } else {
      // If no cached data exists yet, refresh from server
      refreshCountFromServer();
    }
  } catch (error) {
    console.error("Error updating local counter:", error);
    // Refresh from server as fallback
    refreshCountFromServer();
  }
}

console.log("Firebase initialized successfully");
