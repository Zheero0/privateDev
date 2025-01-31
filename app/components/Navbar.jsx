"use client";
import React from "react";
import { useAuth } from "@/context/authContext/auth";
import Link from "next/link";
import { RiUserLine } from 'react-icons/ri'; // Import the profile icon
import Image from 'next/image'; // For displaying the profile picture

const NavBar = () => {
  const { currentUser } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link href={"/"}>
            <h1 className="text-2xl font-semibold">Jobology</h1>
          </Link>
        </div>
        {/* <div className="flex items-center justify-center ">
          {" "}
          <form className=" flex justify-center">
            <input
              type="text"
              placeholder="Search for jobs or talent"
              className="pl-1 w-full max-w-lg rounded-l-lg focus:outline-none"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg"
            >
              Search
            </button>
          </form>
        </div> */}
        <div className="flex items-center">
          <Link href="/jobs" className="hover:underline p-2">
            Jobs
          </Link>
          <Link href="/free-trial" className="hover:underline p-2">
            Free Trial
          </Link>
          {currentUser ? (
            currentUser.photoURL ? (
              // Display the user's profile picture if available
              <Link href="/profile" className=" p-2">
                <Image
                  src={currentUser.photoURL}
                  alt="Profile Picture"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              </Link>
            ) : (
              // Fallback to the RiUserLine icon if no profile picture is available
              <RiUserLine
                size={24}
                color="#fff"
                className="bg-white rounded-full p-1"
              />
            )
          ) : (
            // Show login link if the user is not logged in
            <Link href="/login" className="hover:underline p-2">
              Log in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
