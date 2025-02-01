"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/firebase"; // Ensure you import Firestore from your config

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        await createUserDocument(user); // Ensure Firestore has the user's document
      } else {
        setCurrentUser(null);
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
        isProUser: false, // Default user status
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
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
