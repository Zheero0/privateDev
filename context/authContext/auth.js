"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth } from "@/firebase/firebase";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const updateUserProfile = async (updates) => {
    if (currentUser) {
      try {
        await updateProfile(currentUser, updates);
        setCurrentUser({ ...currentUser, ...updates }); // Update the local user object as well
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
