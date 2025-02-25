"use client";
import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { Hero } from "./components/Hero";
import Testimonials from "./components/Testimonial";
import { Card } from "./components/Card";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function Home() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const querySnapshot = await getDocs(collection(db, "jobs"));
        const jobListings = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setJobs(jobListings);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    }
    fetchJobs();
  }, []);

  return (
    <div className="w-full overflow-x-hidden flex flex-col space-y-12 justify-center items-center">
      <Hero />
      <div className="w-full max-w-7xl mx-auto px-4 h-[55vh]">
        {/* Header for Recent Jobs */}
        <div className="flex items-center justify-between mb-4 ml-4">
          <h2 className="text-2xl font-bold text-gray-800">Recent Jobs</h2>
          <Link href="/search" className="flex items-center hover:underline">
            <span className="text-sm font-medium">View All</span>
            <FaArrowRight className="ml-1" size={16} />
          </Link>
        </div>

        {/* Job Listings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 ml-4">
          {jobs.slice(0, 4).map((job) => (
            <Card key={job.id} job={job} daysListed={job.daysListed || 0} />
          ))}
        </div>
      </div>
      <div className="w-full max-w-7xl mx-auto px-4 h-[55vh]">
        {/* Header for Featured Jobs */}
        <div className="flex items-center justify-between mb-4 ml-4">
          <h2 className="text-2xl font-bold text-gray-800">Featured Jobs</h2>
          <Link href="/search" className="flex items-center hover:underline">
            <span className="text-sm font-medium">View All</span>
            <FaArrowRight className="ml-1" size={16} />
          </Link>
        </div>

        {/* Job Listings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 ml-4">
          {jobs.slice(4, 7).map((job) => (
            <Card key={job.id} job={job} daysListed={job.daysListed || 0} />
          ))}
        </div>
      </div>

      <Testimonials />
    </div>
  );
}
