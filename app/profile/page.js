"use client";
import { useState, useEffect } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { useAuth } from "@/context/authContext/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase"; // Adjust this import according to your Firebase configuration setup

export default function Profile() {
  const { currentUser } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      const userRef = doc(db, "users", currentUser.uid);
      getDoc(userRef).then((docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setDisplayName(data.displayName);
          setEmail(data.email);
          setLocation(data.location);
          setBio(data.bio);
        }
      });
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

    const userRef = doc(db, "users", currentUser?.uid);
    const updatedData = {
      displayName,
      email,
      location,
      bio,
    };

    try {
      // Ensure currentUser is not null before calling updateProfile
      if (currentUser) {
        await updateProfile(currentUser, { displayName });
      }

      // Update the Firestore document
      await setDoc(userRef, updatedData, { merge: true });

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-lg shadow-md"
      >
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Display Name"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
        />
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Bio"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
        ></textarea>
        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}
