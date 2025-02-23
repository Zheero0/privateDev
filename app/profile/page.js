"use client";
import { useState, useEffect } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { useAuth } from "@/context/authContext/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { logOut } from "@/firebase/auth";
import Login from "../components/Login";
import { toast } from "sonner";

export default function ProfilePage() {
  const { currentUser, isProUser } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(true);
  // New state to manage profile photo file and its preview URL
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(
    currentUser?.photoURL || "/default-avatar.png"
  );

  // Prevent hydration issues: only render on client
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load user data from Firestore
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
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  // Handler for updating photo preview when a new file is selected
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!currentUser) {
      toast.error("No user logged in");
      setLoading(false);
      return;
    }
    const userRef = doc(db, "users", currentUser.uid);
    const updatedData = {
      displayName,
      email,
      location,
      bio,
      ...(photoFile && { photoURL: photoPreview }),
    };
    try {
      await updateProfile(currentUser, {
        displayName,
        ...(photoFile && { photoURL: photoPreview }),
      });
      await setDoc(userRef, updatedData, { merge: true });
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
      toast.success("Signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out");
    }
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen w-[100vw] flex items-center justify-center bg-gradient-to-br  px-4 py-8">
      {loading ? (
        <div className="text-center text-gray-700 text-lg">Loading...</div>
      ) : !currentUser ? (
        <Login />
      ) : (
        <div className="max-w-lg w-full bg-white/60 backdrop-blur-sm border border-white/30 p-8 rounded-2xl shadow-2xl">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-4">
            Profile
          </h2>
          <div className="mb-6 text-center">
            <span className="text-base text-gray-600">
              Subscription Status:
            </span>
            <span
              className={`ml-2 font-semibold ${
                isProUser ? "text-blue-500" : "text-gray-800"
              }`}
            >
              {isProUser ? "Pro" : "Basic"}
            </span>
          </div>
          {/* New Profile Photo Section */}
          <div className="flex flex-col items-center mb-6">
            <img
              src={photoPreview}
              alt="Profile Photo"
              className="w-24 h-24 rounded-full object-cover"
            />
            <label
              htmlFor="photo-upload"
              className="mt-2 cursor-pointer rounded-md text-blue-600 font-semibold px-3 py-1  text-sm hover:text-blue-400 transition"
            >
              Update Photo
            </label>
            <input
              type="file"
              id="photo-upload"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="displayName"
                className="block text-sm font-medium text-gray-700"
              >
                Display Name
              </label>
              <input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Display Name"
                className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                Location
              </label>
              <input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
                className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-gray-700"
              >
                Bio
              </label>
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself..."
                className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                rows={4}
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </form>
          <button
            onClick={handleSignOut}
            className="mt-6 w-full p-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
