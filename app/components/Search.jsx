import React from 'react'

const Search = () => {
  return (
    <div className="w-full h-14">
          <div className="flex items-center p-2 bg-white rounded w-full">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM8 14a6 6 0 100-12 6 6 0 000 12z"
              clipRule="evenodd"
            />
          </svg> 
        <input
          type="text"
          placeholder="Search for jobs..."
          className="flex-grow p-2 rounded-l focus:outline-none w-full"
        />
        <button className="p-2 rounded-full text-gray-400">

        </button>
      </div>
    </div>
  );
}

export default Search