import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { Card } from "./Card";

const JobListings = () => {
  const [jobs, setJobs] = useState([]); // State to store job listings
  const [loading, setLoading] = useState(true); // State to show loading status

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

      setJobs(jobsArray); // Update state with fetched jobs
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  // Trigger fetchJobs on component mount (page load)
  useEffect(() => {
    fetchJobs();
  }, []); // Empty dependency array ensures it runs only once

  return (
    <div className="p-4 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {loading ? (
        <p className="col-span-full text-center">Loading jobs...</p>
      ) : jobs.length > 0 ? (
        jobs.map((job) => {
          const daysListed = job.postedDate
            ? (() => {
                const postedDate = new Date(job.postedDate); // UTC
                const currentDate = new Date(); // UTC

                const timeDiff = currentDate.getTime() - postedDate.getTime(); // Difference in milliseconds
                const days = Math.max(
                  0,
                  Math.floor(timeDiff / (1000 * 60 * 60 * 24))
                ); // Convert to days
                return days;
              })()
            : "N/A";

          // Format the postedDate in GMT
          const formattedDate = job.postedDate
            ? new Date(job.postedDate).toLocaleString("en-GB", {
                timeZone: "GMT", // Ensure GMT (UTC)
                hour12: false,
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })
            : "N/A";

          return <Card key={job.id} job={job} daysListed={daysListed} />;
        })
      ) : (
        <p className="col-span-full text-center">No jobs found.</p>
      )}
    </div>
  );
};

export default JobListings;
