"use client";

import React, { useState } from "react";
import Link from "next/link";
import { signInWithGoogle, logOut } from "@/firebase/auth";
import { useAuth } from "@/context/authContext/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import GoogleSignIn from "./GoogleSignIn";

export default function Login() {
  // Using 'username' for email input (you may rename this variable to 'email' if preferred)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { userLoggedIn, currentUser } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSigningIn(true);
    try {
      // Sign in using email/password (username here should be an email)
      await signInWithEmailAndPassword(auth, username, password);
      console.log("User signed in with email and password");
    } catch (error) {
      console.error("Error signing in:", error);
    } finally {
      setIsSigningIn(false);
    }
  };

  const googleSignIn = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await signInWithGoogle();
        console.log("Google sign-in successful");
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
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Sign In
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="username"
              type="email"
              placeholder="Enter your email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
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
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md transition-colors"
            disabled={isSigningIn}
          >
            {isSigningIn ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <div className="flex items-center justify-center">
          <span className="text-sm text-gray-600">or</span>
        </div>
        <GoogleSignIn onClick={googleSignIn} />
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
