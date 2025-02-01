import React from "react";

const GoogleSignIn = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
    >
      {/* Google "G" Logo */}
      <svg
        className="w-5 h-5 mr-2"
        viewBox="0 0 256 262"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#4285F4"
          d="M255.61 131.75c0-8.21-.74-16.06-2.13-23.69H130v44.88h70.15c-3.04 16.39-12.19 30.33-25.89 39.61v32.91h41.9c24.51-22.56 38.63-55.77 38.63-93.71z"
        />
        <path
          fill="#34A853"
          d="M130 261c35.14 0 64.64-11.72 86.19-31.91l-41.9-32.91c-11.66 7.82-26.57 12.45-44.29 12.45-34.12 0-63-23.08-73.48-54.14H13.04v33.95A130.07 130.07 0 0 0 130 261z"
        />
        <path
          fill="#FBBC05"
          d="M56.52 156.86c-2.86-8.6-4.52-17.78-4.52-27.15s1.66-18.56 4.52-27.15V69.71H13.04A130.08 130.08 0 0 0 0 130c0 20.98 5.04 40.73 13.04 69.29l43.48-42.43z"
        />
        <path
          fill="#EA4335"
          d="M130 52.14c18.98 0 32.11 8.21 39.41 15.09l29.42-29.42C196.26 21.94 166.86 9 130 9 76.26 9 29.84 36.32 13.04 69.71l43.48 42.43C67 75.22 95.88 52.14 130 52.14z"
        />
      </svg>
      <span className="text-sm font-medium text-gray-700">
        Sign in with Google
      </span>
    </button>
  );
};

export default GoogleSignIn;
