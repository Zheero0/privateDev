"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

export const Hero = () => {
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    router.push("/search");

  };

  return (
    <div className="h-screen flex w-full p-[5vw] ml-[6rem]">
      {/* Left Column: Form */}
      <div className="w-full md:w-1/2 flex items-center  bg-white p-1 py-3">
        <div className="w-full ">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-relaxed tracking-wide">
            Hire top talent anywhere
          </h1>
          <div className="flex  space-x-8 mt-4 w-full">
            <div className="flex flex-col items-center">
              <button className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition">
                <Search size={24} />
              </button>
              <span className="mt-2 text-sm font-medium text-gray-700">
                Search
              </span>
            </div>
            <div className="flex flex-col items-center">
              <button className="flex items-center justify-center w-12 h-12 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
              <span className="mt-2 text-sm font-medium text-gray-700">
                Post
              </span>
            </div>
          </div>
          <form className="space-y-4 mt-6" onSubmit={handleSearch}>
            <div>
              <Input
                id="location"
                placeholder="Enter your location"
                className="mt-1"
              />
            </div>
            <div>
              <Input
                id="jobKeyword"
                placeholder="Job title or keyword"
                className="mt-1"
              />
            </div>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price
                </label>
                <Select>
                  <SelectTrigger className="mt-1  w-full flex items-center justify-between">
                    <SelectValue placeholder="Select price range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Select price range</SelectItem>
                    <SelectItem value="0-50">$0 - $50</SelectItem>
                    <SelectItem value="50-100">$50 - $100</SelectItem>
                    <SelectItem value="100-200">$100 - $200</SelectItem>
                    <SelectItem value="200+">$200+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="radius"
                  className="block text-sm font-medium text-gray-700"
                >
                  Radius (miles)
                </label>
                <Select>
                  <SelectTrigger className="mt-1  w-full flex items-center justify-between">
                    <SelectValue placeholder="Select radius" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Select radius</SelectItem>
                    <SelectItem value="5">5 miles</SelectItem>
                    <SelectItem value="10">10 miles</SelectItem>
                    <SelectItem value="20">20 miles</SelectItem>
                    <SelectItem value="50">50 miles</SelectItem>
                    <SelectItem value="100">100 miles</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md transition-colors"
            >
              <span className="inline-flex items-center">
                <Search size={16} className="mr-2" />
                Search Jobs
              </span>
            </button>
          </form>
        </div>
      </div>

      {/* Right Column: Map */}
      <div className="w-full md:w-full py-[5rem] top-[5rem] flex items-center justify-center  ">
        <div className="w-full h-full max-w-md max-h-md  rounded-lg overflow-hidden shadow-md">
          <iframe
            title="Liverpool City Center Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15374.817426969783!2d-2.9887131112282483!3d53.40837167133842!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487b2070b45f4ad3%3A0xf733ccf2c0e63c10!2sLiverpool%2C%20UK!5e0!3m2!1sen!2sus!4v1690000000000"
            className="w-full h-full object-cover"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};
