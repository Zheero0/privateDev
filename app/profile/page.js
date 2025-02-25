"use client";
import { useState, useEffect } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { useAuth } from "@/context/authContext/auth";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { logOut } from "@/firebase/auth";
import Login from "../components/Login";
import { toast } from "sonner";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { Card } from "../components/Card";

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
    currentUser?.displayImage ||       <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 text-gray-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5.121 17.804A8 8 0 0112 15a8 8 0 016.879 2.804M12 11a4 4 0 100-8 4 4 0 000 8z"
        />
      </svg>
  );
  // State for jobs posted by the current user
  const [myJobs, setMyJobs] = useState([]);

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
          setPhotoPreview(data.displayImage || "");
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  // Load jobs posted by the current user
  useEffect(() => {
    async function fetchMyJobs() {
      if (!currentUser) return;
      try {
        const q = query(
          collection(db, "jobs"),
          where("postedBy.name", "==", currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        const jobsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMyJobs(jobsList);
      } catch (error) {
        console.error("Error fetching user's jobs:", error);
      }
    }
    fetchMyJobs();
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
    <div className="min-h-screen w-[100vw] px-4 py-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
        {/* Left Column: Profile Form */}
        <div className="w-full md:w-1/2 flex justify-start">
          {loading ? (
            <div className="text-center text-gray-700 text-lg">Loading...</div>
          ) : !currentUser ? (
            <Login />
          ) : (
            <div className=" w-full bg-white/60 border border-white/30 p-8 rounded-2xl">
              <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-4">
                Profile
              </h2>
              <div className="mb-6 text-center">
                <span className="text-base text-gray-600">
                  Subscription:
                </span>
                <span
                  className={`ml-2 font-semibold ${
                    isProUser ? "text-blue-500" : "text-gray-800"
                  }`}
                >
                  {isProUser ? "Pro Plan" : "Basic"}
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
                  className="mt-2 cursor-pointer rounded-md text-blue-600 font-semibold px-3 py-1 text-sm hover:text-blue-400 transition"
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
              <form onSubmit={handleSubmit} className="mb-4">
                <div>
                  <label
                    htmlFor="displayName"
                    className="block text-sm font-medium text-gray-700 my-1"
                  >
                    Display Name
                  </label>
                  <input
                    id="displayName"
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Display Name"
                    className="mt-1 w-full p-3 border my-1 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium my-1 text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="mt-1 w-full my-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                    className="mt-1 w-full p-3 my-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="bio"
                    className="block text-sm my-1 font-medium text-gray-700"
                  >
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us about yourself..."
                    className="mt-1 w-full p-3 border my-1 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
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

        {/* Right Column: Jobs Posted by the User */}
        {/* <div className="flex flex-col">
          <div className=" p-8  w-full md:w-1/2">
            <div className="w-full px-4 h-[45vh]">
              <div className="flex items-center justify-between mb-4 ml-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  My Posted Jobs
                </h2>
                <Link
                  href="/search"
                  className="flex items-center hover:underline"
                >
                  <span className="text-sm font-medium">View All</span>
                  <FaArrowRight className="ml-1" size={16} />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 ml-4 overflow-auto h-full">
                {myJobs.length > 0 ? (
                  myJobs.map((job) => (
                    <Card
                      key={job.id}
                      job={job}
                      daysListed={job.daysListed || 0}
                    />
                  ))
                ) : (
                  <p className="ml-4 text-gray-600">No jobs posted yet.</p>
                )}
              </div>
            </div>
          </div> */}


          {/* Right Column: Jobs Posted by the User */}
          {/* <div className=" p-8  w-full md:w-1/2">
            <div className="w-full px-4 h-[45vh]">
              <div className="flex items-center justify-between mb-4 ml-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  My Saved Jobs
                </h2>
                <Link
                  href="/search"
                  className="flex items-center hover:underline"
                >
                  <span className="text-sm font-medium">View All</span>
                  <FaArrowRight className="ml-1" size={16} />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 ml-4 overflow-auto h-full">
                {myJobs.length > 0 ? (
                  myJobs.map((job) => (
                    <Card
                      key={job.id}
                      job={job}
                      daysListed={job.daysListed || 0}
                    />
                  ))
                ) : (
                  <p className="ml-4 text-gray-600">No jobs posted yet.</p>
                )}
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
