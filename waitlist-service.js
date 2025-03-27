import { db } from "./firebase-config.js";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

/**
 * Add an email to the waitlist in Firebase
 * @param {string} email - The email to add to the waitlist
 * @returns {Promise} - Resolves with success or rejects with error
 */
export async function addToWaitlist(email) {
  try {
    // Check if email already exists
    const emailExists = await checkEmailExists(email);

    if (emailExists) {
      return {
        success: false,
        message: "This email is already on our waitlist.",
      };
    }

    // Add email to waitlist collection
    await addDoc(collection(db, "waitlist"), {
      email: email,
      signupDate: serverTimestamp(),
    });

    return {
      success: true,
      message: "Thank you for joining our waitlist! We'll be in touch soon.",
    };
  } catch (error) {
    console.error("Error adding email to waitlist:", error);
    return {
      success: false,
      message: "There was an error joining the waitlist. Please try again.",
    };
  }
}

/**
 * Check if an email already exists in the waitlist
 * @param {string} email - The email to check
 * @returns {Promise<boolean>} - True if email exists, false otherwise
 */
async function checkEmailExists(email) {
  const q = query(collection(db, "waitlist"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
}
