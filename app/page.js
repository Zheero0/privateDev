"use client";
import { useState } from "react";
import { signInWithGoogle, logOut } from "@/firebase/auth";
import { useAuth } from "@/context/authContext/auth";
import { db } from "@/firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { Hero } from "./components/Hero";
import Testimonials from "./components/Testimonial";

export default function Home() {
  const { userLoggedIn, currentUser } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);

  const [jobName, setJobName] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");

  //add job to database
  const addJob = async () => {
    if (!jobName || !location || !price) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "jobs"), {
        jobName: jobName,
        price: price,
        location: location,
      });
      alert("Document written with ID: " + docRef.id);
      console.log(jobName, location, price);
    } catch (error) {
      console.log(error);
    }
  };

  //submit job form
  const handleJobSubmit = async (e) => {
    e.preventDefault();

    if (!jobName || !location || !price) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "jobListings"), {
        jobName: jobName,
        price: price,
        location: location,
      });
      alert("Document written with ID: " + docRef.id);
      console.log(jobName, location, price);
    } catch (error) {
      alert("Error adding document: " + error);
      console.log(error);
    }
    console.log("job submitted");
  };

  // //sign in with google
  // const googleSignIn = async (e) => {
  //   e.preventDefault();

  //   if (!isSigningIn) {
  //     setIsSigningIn(true);

  //     try {
  //       await signInWithGoogle();
  //       setIsSigningIn(false); // Reset state after success
  //     } catch (err) {
  //       console.error("Google Sign-In Error:", err);
  //       setIsSigningIn(false); // Reset state after error
  //     }
  //   }
  // };

  // // if(userLoggedIn || !userLoggedIn){
  // //   console.log(currentUser);

  // // }
  // const handleSignOut = async () => {
  //   try {
  //     await logOut();
  //     console.log("User signed out successfully.");
  //   } catch (error) {
  //     console.error("Error signing out:", error);
  //   }
  // };

  return (
    <div className="flex flex-col">
      <Hero />
      <Testimonials />
      {/* <button
        className="bg-green-500 px-4 py-2 text-white rounded"
        onClick={googleSignIn}
        disabled={isSigningIn} // Disable button while signing in
      >
        {isSigningIn ? "Signing in..." : "Sign in with Google"}
      </button>
      <div>{userLoggedIn ? "logged in " : " logged out"}</div>
      <button onClick={handleSignOut} className="bg-red-500">
        sign out
      </button> */}
      {/* <button onClick={addJob} className="bg-blue-500">
        Add Job
      </button>
      <form onSubmit={handleJobSubmit} className="flex flex-col">
        <input
          type="text"
          placeholder="Job Name"
          value={jobName}
          onChange={(e) => {
            setJobName(e.target.value);
            console.log(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
            console.log(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
            console.log(e.target.value);
          }}
        />

        <button type="submit">Submit</button>
      </form> */}

      {/* <form>
        <input type="text" placeholder="Job Name" />
        <input type="text" placeholder="Location" />
        <input type="text" placeholder="Price" />
        <button type="submit">Submit</button>
      </form> */}
    </div>
  );
}
