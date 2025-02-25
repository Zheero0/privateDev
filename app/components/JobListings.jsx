"use client";
import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { Card } from "./Card";
import Link from "next/link";

const JobListings = () => {
  const [jobs, setJobs] = useState([]); // State to store job listings
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch jobs function
  const fetchJobs = async () => {
    try {
      const jobsRef = collection(db, "jobs");
      const querySnapshot = await getDocs(jobsRef);
      // Map Firestore docs to array
      const jobsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setJobs(jobsArray);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  // Trigger fetchJobs on component mount
  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="p-8 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {loading ? (
        <p className="col-span-full text-center">Loading jobs...</p>
      ) : jobs.length > 0 ? (
        jobs.map((job) => {
          const daysListed = job.postedDate
            ? (() => {
                const postedDate = new Date(job.postedDate);
                const currentDate = new Date();
                const timeDiff = currentDate.getTime() - postedDate.getTime();
                return Math.max(
                  0,
                  Math.floor(timeDiff / (1000 * 60 * 60 * 24))
                );
              })()
            : "0";

          return (
            <Link key={job.id} href={`/jobs/${job.id}`} className="block">
              <Card job={job} daysListed={daysListed} />
            </Link>
          );
        })
      ) : (
        <p className="col-span-full text-center">No jobs found.</p>
      )}
    </div>
  );
};

export default JobListings;
