"use client";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase";

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const querySnapshot = await getDocs(collection(db, "jobs"));
        const jobsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setJobs(jobsData);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Job Listings</h1>
        {loading ? (
          <p className="text-gray-600">Loading jobs...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col"
              >
                <img
                  src={job.images?.[0] || "https://via.placeholder.com/400x300"}
                  alt={job.title}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {job.title}
                </h2>
                <p className="text-gray-600 mb-4">
                  {job.description
                    ? job.description.substring(0, 100) + "..."
                    : "No description available"}
                </p>
                <div className="mt-auto">
                  <p className="text-lg font-bold text-blue-600">
                    £{job.price}
                  </p>
                  <p className="text-sm text-gray-500">
                    {job.location
                      ? `${job.location.city}, ${job.location.area}`
                      : "Location not provided"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
