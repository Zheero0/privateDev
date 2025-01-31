"use client"
import React, { useState } from "react";
import Link from "next/link";
import { signInWithGoogle, logOut } from "@/firebase/auth";
import { useAuth } from "@/context/authContext/auth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
    const { userLoggedIn, currentUser } = useAuth();
    const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Username:", username, "Password:", password);
    // Handle your login logic here, then redirect or show an error message
  };

  //sign in with google
  const googleSignIn = async (e) => {
    e.preventDefault();

    if (!isSigningIn) {
      setIsSigningIn(true);

      try {
        await signInWithGoogle();
        setIsSigningIn(false); // Reset state after success
      } catch (err) {
        console.error("Google Sign-In Error:", err);
        setIsSigningIn(false); // Reset state after error
      }
    }
  };

  // if(userLoggedIn || !userLoggedIn){
  //   console.log(currentUser);

  // }
  const handleSignOut = async () => {
    try {
      await logOut();
      console.log("User signed out successfully.");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-xs">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
            <Link href="/forgot-password">
              <button className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 focus:outline-none">
                Forgot Password?
              </button>
            </Link>
          </div>
        </form>
        <button
          className="bg-green-500 px-4 py-2 text-white rounded"
          onClick={googleSignIn}
          disabled={isSigningIn} // Disable button while signing in
        >
          {isSigningIn ? "Signing in..." : "Sign in with Google"}
        </button>
        {/* <div>{userLoggedIn ? "logged in " : " logged out"}</div> */}
        <button onClick={handleSignOut} className="bg-red-500">
          sign out
        </button>
      </div>
    </div>
  );
}
