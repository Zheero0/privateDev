"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { Button } from "@/components/ui/button";
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaHeart,
  FaShareAlt,
  FaCalendarAlt,
} from "react-icons/fa";
import ImageContainer from "@/app/components/ImageContainer";

export default function JobDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

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

  // Format the posted date in a concise format.
  const postedDate = new Date(job.postedDate).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="min-h-screen tracking-tight p-6 pt-0">
      <div className="max-w-5xl mx-auto bg-white rounded-xl overflow-hidden">
        <div className="p-8">
          {/* Job Title */}
          <h1 className="text-4xl font-semibold text-gray-900">{job.title}</h1>
          {/* Updated Location and CTA Icons */}
          <div className="mt-2 flex items-center justify-between text-gray-600">
            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-2 text-xl" />
              <span>
                {job.location.city}, {job.location.area}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center cursor-pointer hover:text-blue-600 transition-colors">
                <FaHeart className="text-xl" />
                <span className="ml-1 text-sm">Save</span>
              </div>
              <div className="flex items-center cursor-pointer hover:text-blue-600 transition-colors">
                <FaShareAlt className="text-xl" />
                <span className="ml-1 text-sm">Share</span>
              </div>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="mt-6">
            <ImageContainer images={job.images} />
          </div>

          {/* Two-Column Layout for Job Details and CTAs */}
          <div className="mt-8 flex flex-col md:flex-row gap-8 items-start">
            {/* Left Column: Job Details */}
            <div className="md:w-3/5">
              <h2 className="text-2xl font-semibold mb-4">Job Details</h2>
              <p className="text-gray-700 text-lg">{job.description}</p>
              {/* Posted Date and Price Row */}
              <div className="mt-4 pt-4 flex flex-col md:flex-row items-center justify-between">
                <div className="text-gray-600 text-sm">
                  Posted on {postedDate}
                </div>
              </div>
            </div>

            {/* Right Column: Call-to-Actions */}
            <div className="md:w-2/5 bg-gray-100 p-6 rounded-lg shadow-lg">
            <p></p>
              {/* New Pay and Frequency Section */}
              <div className="flex flex-col mb-2">
                <div className="flex items-center space-x-2 mb-2">
                  <FaMoneyBillWave className="" />
                  <p className="text-md font-semibold ">Pay</p>
                  <p className="text-xl rounded-lg">£{job.price}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <FaCalendarAlt className="" />
                  <p className="text-md font-semibold ">
                    Frequency
                  </p>
                  <p className="text-xl">Weekly</p>
                </div>
              </div>
              <p className="text-gray-700 mb-3">
                Chat with the poster for more details.
              </p>
              {/* Poster Preview */}
              <div className="flex items-center mb-4">
                <img
                  src={job.postedBy.photoURL || "/default-avatar.png"}
                  alt="Poster Profile"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div className="text-lg font-semibold text-gray-800">
                  <p className="text-lg font-semibold">{job.postedBy.uid}</p>
                  <p className="text-sm text-gray-500">
                    <span className="">Subscription:</span>{" "}
                    {job.subStatus} Plan
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <Button
                  onClick={() => router.push("/chat/")}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-full transition-colors"
                >
                  Chat with {job.postedBy.uid}
                </Button>
              </div>
            </div>
          </div>

          {/* Map Iframe for Liverpool, UK */}
          <div className="mt-8">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15374.817426969783!2d-2.9887131112282483!3d53.40837167133842!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487b2070b45f4ad3%3A0xf733ccf2c0e63c10!2sLiverpool%2C%20UK!5e0!3m2!1sen!2sus!4v1690000000000"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
