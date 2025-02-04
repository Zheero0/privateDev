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
import Search from "../components/Search";
import { FiSliders } from "react-icons/fi";

const searchPage = () => {
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
    <div className="flex flex-col   min-h-full  overflow-hidden ml-10">
      <div className="mt-5 w-full ">
        <Search />

        <div className=" ml-1 w-full flex  ">
          <div className=" flex   py-2 px-4 hover:scale-105 hover:border-blue-600  duration-[0.5s] items-center  bg-transparent text-blue-900  rounded-full">
            <button type="submit" className=" font-bold mr-1 ">
              Filters
            </button>
            <FiSliders />
          </div>
        </div>
        <JobListings />
      </div>
    </div>
  );
};

export default searchPage;
