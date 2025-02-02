import React from "react";
import { FaUser } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";

export const Card = ({ job, daysListed }) => {
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  return (
    <div
      key={job.id}
      className="bg-white  rounded-lg max-w-[250px] overflow-hidden w-full max-h-[400px] h-full transform hover:scale-105 transition-all duration-300"
    >
      <img
        src={job.images?.[0] || "https://via.placeholder.com/400x300"}
        alt={job.title}
        className="w-full h-[150px] object-cover"
      />
      <div className="pb-1 pt- px-3">
        <h2 className="text-[0.8rem] my-1 font-semibold text-gray-700">
          {truncate(job.title, 25)}
        </h2>
        <div className="flex items-center mb-1">
          <img
            src={job.postedBy?.photoURL || "https://via.placeholder.com/40x40"}
            alt={job.postedBy?.uid}
            className="w-5 h-5 rounded-full object-cover mr-2"
          />
          <p className="text-[0.5rem] font-semibold text-gray-700">
            {job.postedBy.uid}
          </p>
          <p className="text-[0.5rem] font-semibold text-gray-700">
            {job.postedBy.displayName}
          </p>
        </div>
        {/* <p className="text-gray-600 mt-1 text-[0.7rem] w-full text-center px-1">
          {truncate(job.description, 61)}
        </p> */}
      </div>
      <div className="px-4 pb-2 flex justify-between items-center">
        <p className="text-blue-800 text-xl font-semibold">
          <span className="text-sm font-medium">£</span>{job.price}
        </p>
        <div className=" text-gray-500">
          <div className="flex items-center space-x-1">
            <FaClock size={12} className="text-gray-500" />
            <p className="text-xs text-gray-500">{daysListed} days ago</p>
          </div>

        </div>
      </div>
    </div>
  );
};
