import React from "react";
import { FaClock, FaMapMarkerAlt, FaUser } from "react-icons/fa";

export const Card = ({ job, daysListed }) => {
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  // Format location: show area and city if available
  const formatLocation = (location) => {
    if (!location) return "";
    const { area, city } = location;
    return [area, city].filter(Boolean).join(", ");
  };

  return (
    <div className="bg-white rounded-lg  overflow-hidden transform hover:scale-105 transition duration-300 max-w-xs w-full">
      {/* Image container with fixed height and overflow hidden */}
      <div className="w-full h-60 overflow-hidden rounded-xl flex items-center justify-center bg-gray-100">
        <img
          src={job.images?.[0] || "https://via.placeholder.com/400x300"}
          alt={job.title}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="px-2 py-2">
        <h2 className="text-lg font-bold text-gray-900 mb-2">
          {truncate(job.title, 25)}
        </h2>
        <p className="text-sm font-medium text-gray-700 mb-2 flex items-center">
          <FaUser className="text-gray-500 mr-1" size={14} />
          {job.postedBy?.uid || "Anonymous"}
        </p>
        {job.location && (
          <div className="flex items-center mb-3">
            <FaMapMarkerAlt className="text-gray-500 mr-1" size={14} />
            <span className="text-sm text-gray-600">
              {formatLocation(job.location)}
            </span>
          </div>
        )}
        <div className="flex justify-between items-center">
          <p className="text-2xl font-bold text-blue-600">
            <span className="text-xl font-medium">£</span>
            {job.price}
          </p>
          <div className="flex items-center space-x-1">
            <FaClock className="text-gray-500" size={14} />
            <span className="text-xs text-gray-500">{daysListed} days ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};
