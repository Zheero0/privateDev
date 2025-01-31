import React from "react";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa"; // Added LinkedIn for variety

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        {/* Top Section: Logo and Social Media Links */}
        <div className="flex flex-col md:flex-row items-center justify-between border-b border-gray-700 pb-6">
          {/* Logo and Brand Name */}
          <Link href="/" passHref>
            <span className="text-2xl font-bold cursor-pointer hover:text-gray-300 transition duration-300">
              YourBrand
            </span>
          </Link>

          {/* Social Media Links */}
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition duration-300"
            >
              <FaFacebook className="w-6 h-6" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition duration-300"
            >
              <FaTwitter className="w-6 h-6" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-500 transition duration-300"
            >
              <FaInstagram className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-600 transition duration-300"
            >
              <FaLinkedin className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Middle Section: Navigation Links */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left mt-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xxs text-gray-400">
            {/* Column 1: Job Seeker Links */}
            <div className="flex flex-col space-y-2">
              <span className="font-semibold text-gray-300 mb-1">
                Job Seekers
              </span>
              <Link href="/jobs" passHref>
                <span className="hover:text-white cursor-pointer transition duration-300">
                  Find Jobs
                </span>
              </Link>
              <Link href="/career-resources" passHref>
                <span className="hover:text-white cursor-pointer transition duration-300">
                  Career Resources
                </span>
              </Link>
              <Link href="/resume-builder" passHref>
                <span className="hover:text-white cursor-pointer transition duration-300">
                  Resume Builder
                </span>
              </Link>
            </div>

            {/* Column 2: Employer Links */}
            <div className="flex flex-col space-y-2">
              <span className="font-semibold text-gray-300 mb-1">
                Employers
              </span>
              <Link href="/employers" passHref>
                <span className="hover:text-white cursor-pointer transition duration-300">
                  Employers
                </span>
              </Link>
              <Link href="/post-job" passHref>
                <span className="hover:text-white cursor-pointer transition duration-300">
                  Post a Job
                </span>
              </Link>
              <Link href="/pricing" passHref>
                <span className="hover:text-white cursor-pointer transition duration-300">
                  Pricing
                </span>
              </Link>
            </div>

            {/* Column 3: General Links */}
            <div className="flex flex-col space-y-2">
              <span className="font-semibold text-gray-300 mb-1">General</span>
              <Link href="/about-us" passHref>
                <span className="hover:text-white cursor-pointer transition duration-300">
                  About Us
                </span>
              </Link>
              <Link href="/contact" passHref>
                <span className="hover:text-white cursor-pointer transition duration-300">
                  Contact
                </span>
              </Link>
              <Link href="/privacy-policy" passHref>
                <span className="hover:text-white cursor-pointer transition duration-300">
                  Privacy Policy
                </span>
              </Link>
              <Link href="/terms-of-service" passHref>
                <span className="hover:text-white cursor-pointer transition duration-300">
                  Terms of Service
                </span>
              </Link>
            </div>
          </div>

          {/* Newsletter Signup (Optional) */}
          <div className="mt-6 md:mt-0">
            <p className="text-sm text-gray-400 mb-2">
              Subscribe to our newsletter
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-l-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="text-center text-gray-500 text-xs mt-8">
          © {new Date().getFullYear()} YourBrand. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
