import React from "react";
import { Link } from "react-router-dom";
import fastParity30sec from "../../images/fast-parity.jpg";
export default function Body() {
  return (
    <div className="flex flex-col justify-between mt-5 px-2 overflow-y-auto overflow-scroll pb-8">
      <div className="flex flex-row">
        <div className="w-full mr-2">
          <Link to="/thirty-second-page">
            <div className="flex flex-col bg-white h-40 rounded-lg border-2 border-myblue-200 relative overflow-hidden">
              <div className="flex justify-center items-center h-7 w-[50px] rounded-md border border-myblue-200 absolute bg-opacity-30 bg-backdrop-blur-sm z-10">
                <p className="text-sm text-white">30sec</p>
              </div>
              <img
                src={fastParity30sec}
                className="object-cover w-full h-full"
                alt="Fast Parity"
              />
              <div className="absolute bottom-0 w-full bg-white bg-opacity-30 backdrop-blur-sm p-2">
                <p className="text-center font-bold text-white">
                  Fast-Parity
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div className="w-full mr-1">
          <Link to="/threeMin">
            <div className="flex flex-col bg-white h-40 rounded-lg border-2 border-myblue-200 relative overflow-hidden">
              <div className="flex justify-center items-center h-7 w-[50px] rounded-md border border-myblue-200 absolute bg-opacity-30 bg-backdrop-blur-sm z-10">
                <p className="text-sm text-white">2min</p>
              </div>
              <img
                src={fastParity30sec}
                className="object-cover w-full h-full"
                alt="Fast Parity"
              />
              <div className="absolute bottom-0 w-full bg-white bg-opacity-30 backdrop-blur-sm p-2">
                <p className="text-center font-bold text-white">
                  Fast-Parity
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className="flex flex-row mt-5 pb-9">
        <div className="w-full mr-2">
          <Link>
            <div className="flex flex-col bg-white h-40 rounded-lg border-2 border-myblue-200 relative overflow-hidden shadow-md">
              <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 bg-gray-800">
                <p className="text-xl font-bold">Coming Soon</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="w-full mr-1">
          <Link>
            <div className="flex flex-col bg-white h-40 rounded-lg border-2 border-myblue-200 relative overflow-hidden shadow-md">
              <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 bg-gray-800">
                <p className="text-xl font-bold">Coming Soon</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
