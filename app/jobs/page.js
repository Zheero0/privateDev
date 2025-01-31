"use client";
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import React from "react";
import JobListings from "../components/JobListings";
import { useAuth } from "@/context/authContext/auth";

const AddJobPage = () => {
  const { currentUser } = useAuth();

  const handleJobSubmit = async (e) => {
    try {
      const jobData = {
        title: "Fix my leaking faucet",
        description:
          "Looking for a plumber to fix a faucet in my kitchen. Must have your own tools.",
        price: 50.0,
        location: {
          city: "London",
          area: "Camden",
          geoPoint: {
            latitude: 51.5432,
            longitude: -0.1747,
          },
        },
        images: ["https://example.com/image1.jpg"],
        postedBy: {
          photoURL: currentUser.photoURL,
          uid: currentUser.uid,
        },
      };

      // Add the job listing to Firestore
      const docRef = await addDoc(collection(db, "jobs"), jobData);
      console.log(
        "Job listing added with ID:",
        docRef.id,
        currentUser.displayName
      );
    } catch (error) {
      console.error("Error adding job listing:", error);
    }
    console.log("job submitted");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="mt-4">
        <button
          onClick={handleJobSubmit}
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Job
        </button>
      </div>
      <JobListings />
    </div>
  );
};

export default AddJobPage;
