"use client";
import React, { useState } from "react";
import Link from "next/link";
import { signInWithGoogle, logOut } from "@/firebase/auth";
import { useAuth } from "@/context/authContext/auth";
import GoogleSignIn from "./GoogleSignIn";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { userLoggedIn, currentUser } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Username:", username, "Password:", password);
    // Handle your login logic here
  };

  const googleSignIn = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await signInWithGoogle();
      } catch (err) {
        console.error("Google Sign-In Error:", err);
      } finally {
        setIsSigningIn(false);
      }
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

  return (
    <div className="min-h-screen flex items-center justify-center w-screen px-4 mx-auto">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl ">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Sign In
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md transition-colors"
          >
            Sign In
          </button>
        </form>
        <div className="flex items-center justify-center">
          <span className="text-sm text-gray-600">or</span>
        </div>

        <GoogleSignIn onClick={googleSignIn}/>
        <div className="text-center">
          <Link
            href="/forgot-password"
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
        {/* Optionally, you can include a sign-out button for debugging */}
        {/* <button
          onClick={handleSignOut}
          className="w-full py-2 px-4 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-md transition-colors"
        >
          Sign Out
        </button> */}
      </div>
    </div>
  );
}
