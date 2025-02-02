import React from "react";
import Link from "next/link";

export const Hero = () => {
  return (
    <div
      className="bg-cover bg-center bg-hero-pattern h-screen flex items-center justify-center text-black"
      // style={{ backgroundImage: `url('/bgImage.jpg')` }} // Make sure this image reflects the professional theme
    >
      <div className="text-center">
        <h1 className="text-4xl font-bold md:text-5xl">
          Hire Top Talent in Minutes
        </h1>
        <p className="text-xl mt-4 md:text-2xl">
          Post jobs, review candidates, and hire the best
        </p>
        <p className="text-xs italic">-- fast and easy --</p>

        <div className="mt-8">
          <Link
            href={"/post-job"}
            className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
          >
            Post a Job
          </Link>
          <Link
            href={"/search"}
            className="bg-transparent border border-blue-800 hover:bg-white hover:text-gray-800 text-black font-bold py-2 px-4 rounded"
          >
            Browse Jobs
          </Link>
        </div>
      </div>
    </div>
  );
};
