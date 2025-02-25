import React from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const Hero = () => {
  // request user location for more accurate result
  return (
    <div className="bg-cover bg-center bg-hero-pattern h-[100vh] w-screen flex items-center justify-center text-black">
      <div className="text-center w-full px-4">
        <h1 className="text-3xl font-bold md:text-5xl">
          Hire Top Talent anywhere
        </h1>
        <p className="text-sm mt-4 md:text-2xl">
          Post jobs, review candidates, and hire the best
        </p>
        <p className="text-[9px] italic mt-2">-- fast and easy --</p>

        <div className="mt-8 max-w-2xl mx-auto relative">
          <div className="relative flex items-center">
            <Input
              placeholder="Search for jobs..."
              className="w-full py-6 pl-8 pr-12 rounded-full border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent text-lg"
            />
            <Search className="absolute right-4 h-6 w-6 text-gray-400" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-center gap-4">
          <Link
            href="/post-job"
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 px-6 rounded-full mr-4 transition-all duration-200 transform hover:scale-105"
          >
            Post a Job
          </Link>
          <Link
            href="/search"
            className="bg-transparent border-2 border-blue-500 hover:bg-blue-50 text-blue-500 font-bold py-3 px-4 rounded-full transition-all duration-200 transform hover:scale-105"
          >
            Browse Jobs
          </Link>
        </div>
      </div>
    </div>
  );
};
