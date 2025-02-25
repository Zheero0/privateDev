"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { Button } from "@/components/ui/button"; // Ensure you have a Button component
import { FaMapMarkerAlt } from "react-icons/fa";

export default function JobDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch the job document from Firestore using the id param
  useEffect(() => {
    async function fetchJob() {
      try {
        const jobRef = doc(db, "jobs", id);
        const jobSnap = await getDoc(jobRef);
        if (jobSnap.exists()) {
          setJob({ id: jobSnap.id, ...jobSnap.data() });
        } else {
          console.error("Job not found");
        }
      } catch (error) {
        console.error("Error fetching job:", error);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading job details...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Job not found.</p>
      </div>
    );
  }

  // Format the posted date
  const postedDate = new Date(job.postedDate).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg p-8 space-y-6">
        {/* Job Title */}
        <h1 className="text-3xl font-bold text-gray-800">{job.title}</h1>

        {/* Job Image */}
        <div className="w-full h-64 overflow-hidden rounded-lg">
          <img
            src={job.images?.[0] || "https://via.placeholder.com/800x600"}
            alt={job.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Job Description */}
        <p className="text-gray-700">{job.description}</p>

        {/* Job Price */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Price</h2>
          <p className="text-2xl text-blue-600 font-extrabold">£{job.price}</p>
        </div>

        {/* Location */}
        <div className="flex items-center space-x-2">
          <FaMapMarkerAlt className="text-gray-500" size={16} />
          <p className="text-gray-600">
            {job.location?.city}, {job.location?.area}
          </p>
        </div>

        {/* Posted By */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Posted By</h2>
          <div className="flex items-center space-x-4">
            <img
              src={job.postedBy?.photoURL || "https://via.placeholder.com/48"}
              alt={job.postedBy?.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-medium text-gray-700">
                {job.postedBy?.name || "Unknown User"}
              </p>
              <p className="text-sm text-gray-500">UID: {job.postedBy?.uid}</p>
            </div>
          </div>
        </div>

        {/* Posted Date */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Posted On</h2>
          <p className="text-gray-600">{postedDate}</p>
        </div>

        {/* Chat Button */}
        <div className="pt-4 border-t">
          <Button onClick={() => router.push(`/chat?uid=${job.postedBy.uid}`)}>
            Chat with Poster
          </Button>
        </div>
      </div>
    </div>
  );
}
