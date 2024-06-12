import React from "react";
import { Link } from "react-router-dom";

export default function Body() {
  return (
    <div className="flex flex-row justify-between mt-5 px-2 mb-4 ">
      <div className="w-full mr-2">
      <Link to='/thirty-second-page'>
      <div className="h-40 bg-blue-500 mr-1 rounded-md flex">
        <p className=" isolate flex h-7 rounded-md absolute text-white px-3 bg-white bg-opacity-30 bg-backdrop-blur-sm	">
          30sec
        </p>
      </div>
      </Link>
      </div>
      <div className="w-full mr-1">
      <Link>
      <div className="h-40 bg-blue-500 mr-1 rounded-md flex">
        <p className="isolate flex h-7 rounded-md absolute text-white px-3 bg-white bg-opacity-30 bg-backdrop-blur-sm ">3 min</p>
      </div>
      </Link>
      </div>
    </div>
  );
} 