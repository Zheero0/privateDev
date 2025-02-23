"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "@/firebase/firebase"; // Ensure you import Firestore from your config

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Default subscription status
  const [isProUser, setIsProUser] = useState(false); // Set to false for default state

  // Function to toggle pro user status
  const updateProStatus = async (userId, planType = "monthly") => {
    try {
      // Get current user data first
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.exists() ? userSnap.data() : {};

      // Toggle the current status and update plan type
      const newProStatus = !userData.isProUser;

      // Update in Firestore with plan type
      await updateDoc(userRef, {
        isProUser: newProStatus,
        updatedAt: new Date().toISOString(),
      });

      // Update both states
      setIsProUser(newProStatus);

      return true;
    } catch (error) {
      console.error("Error updating pro status:", error);
      alert("Error toggling pro status: " + error.message);
      return false;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        await createUserDocument(user); // Ensure Firestore has the user's document

        // Fetch the user's subscription status from Firestore
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          setIsProUser(userData.isProUser || false);

        }
      } else {
        setCurrentUser(null);
        setIsProUser(false); // Reset to default when user logs out

      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Function to create or update the user document in Firestore
  const createUserDocument = async (user) => {
    if (!user) return;

    const userRef = doc(db, "users", user.uid); // Reference to Firestore doc
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      // If user doc doesn't exist, create a new one
      await setDoc(userRef, {
        name: user.displayName || "Anonymous",
        email: user.email,
        profileImage: user.photoURL || "",
        isProUser: false, // Default to false for new users
      });
    }
  };

  const updateUserProfile = async (updates) => {
    if (currentUser) {
      try {
        await updateProfile(currentUser, updates);
        setCurrentUser({ ...currentUser, ...updates }); // Update local state

        // Update Firestore user document
        const userRef = doc(db, "users", currentUser.uid);
        await setDoc(userRef, updates, { merge: true }); // Merge updates into existing data

        return { success: true };
      } catch (error) {
        console.error("Error updating user profile:", error);
        return { success: false, message: error.message };
      }
    }
  };

  const value = {
    currentUser,
    updateUserProfile,
    loading,
    isProUser, // Expose the subscription status
    updateProStatus, // Export the function
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
