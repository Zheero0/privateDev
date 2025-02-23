"use client";
import { useState, useEffect } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { useAuth } from "@/context/authContext/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { logOut } from "@/firebase/auth";
import Login from "../components/Login";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function ProfilePage() {
  const { currentUser } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(true); // Set to true initially

  // ✅ Prevent hydration issues: Only render UI after user is available
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // ✅ Ensures we only render on client
  }, []);
  //to trigger toast notification when user logs in
  // const searchParams = useSearchParams();

  // useEffect(() => {
  //   // Check if the query parameter "loginSuccess" is set to "true"
  //   if (searchParams.get("loginSuccess") === "true") {
  //     toast.success("Login Successful!");
  //   }
  // }, [searchParams]);
  // ✅ Load user data from Firestore only after authentication state is available
  useEffect(() => {
    if (currentUser) {
      const userRef = doc(db, "users", currentUser.uid);
      getDoc(userRef).then((docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setDisplayName(data.displayName || "");
          setEmail(data.email || "");
          setLocation(data.location || "");
          setBio(data.bio || "");
        }
        setLoading(false); // Stop loading once data is fetched
      });
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!currentUser) {
      alert("No user logged in");
      setLoading(false);
      return;
    }

    const userRef = doc(db, "users", currentUser.uid);
    const updatedData = {
      displayName,
      email,
      location,
      bio,
    };

    try {
      await updateProfile(currentUser, { displayName });
      await setDoc(userRef, updatedData, { merge: true });

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
      console.log("User signed out successfully.");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // ✅ FIX: Prevent hydration errors by ensuring the page only renders on the client
  if (!isClient) {
    return null;
  }

  return (
    <div className="container w-screen mx-auto px-4 py-8">
      {/* 🔥 Show loading spinner before rendering UI */}
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : !currentUser ? (
        <Login /> // Show login if user is not authenticated
      ) : (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg ">
          <h2 className="text-2xl font-bold mb-4 text-center">Profile</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Display Name"
              className="w-full p-3 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-3 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              className="w-full p-3 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Bio"
              className="w-full p-3 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <button
              type="submit"
              disabled={loading}
              className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </form>

          <button
            onClick={handleSignOut}
            className="mt-4 w-full p-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
