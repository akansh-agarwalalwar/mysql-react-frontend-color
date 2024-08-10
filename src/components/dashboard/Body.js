import React from "react";
import { Link } from "react-router-dom";
import fastParity30sec from "../../images/thirty_second.jpg";
import fastParityTwoMin from "../../images/two_min.jpg";
import upcomingOne from "../../images/game_three.jpg";
import heads from "../../images/heads.jpg";

export default function Body() {
  return (
    <div className="flex flex-col justify-between mt-5 px-2 overflow-y-auto overflow-scroll pb-8 ">
      <div className="flex flex-row">
        <div className="w-full mr-2">
          <Link to="/thirty-second-page">
            <div className="flex flex-col bg-white h-40 rounded-lg border-2 border-myblue-200 relative overflow-hidden">
              {/* <div className="flex justify-center items-center h-7 w-[50px] rounded-md border border-myblue-200 absolute bg-opacity-30 bg-backdrop-blur-sm z-10">
                <p className="text-sm text-white">30sec</p>
              </div> */}
              <img
                src={fastParity30sec}
                className="object-cover w-full h-full"
                alt="Fast Parity"
              />
              <div className="absolute bottom-0 w-full bg-white bg-opacity-30 backdrop-blur-sm p-2">
                <p className="text-center font-bold text-white">
                  Crazy30
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div className="w-full mr-1">
          <Link to="/threeMin">
            <div className="flex flex-col bg-white h-40 rounded-lg border-2 border-myblue-200 relative overflow-hidden">
              {/* <div className="flex justify-center items-center h-7 w-[50px] rounded-md border border-myblue-200 absolute bg-opacity-30 bg-backdrop-blur-sm z-10">
                <p className="text-sm text-white">2min</p>
              </div> */}
              <img
                src={fastParityTwoMin}
                className="object-cover w-full h-full"
                alt="Fast Parity"
              />
              <div className="absolute bottom-0 w-full bg-white bg-opacity-30 backdrop-blur-sm p-2">
                <p className="text-center font-bold text-white">
                  Crazy2PM
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className="flex flex-row mt-4 pb-9">
        <div className="w-full mr-2">
          {/* <Link to="/heads"> */}
          <div className="flex flex-col backdrop-blur-sm bg-white h-40 rounded-lg border-2 border-myblue-200 relative overflow-hidden justify-center">
              <img
                src={heads}
                className="object-cover w-full h-full"
                alt=""
              />
              <div className="absolute w-full bg-white bg-opacity-30 p-2">
                <p className="text-center font-bold text-white">
                  Coming Soon
                </p>
              </div>
            </div>
          {/* </Link> */}
        </div>
        <div className="w-full mr-1">
          <Link>
          <div className="flex flex-col backdrop-blur-sm bg-white h-40 rounded-lg border-2 border-myblue-200 relative overflow-hidden justify-center">
              <img
                src={upcomingOne}
                className="object-cover w-full h-full"
                alt=""
              />
              <div className="absolute w-full bg-white bg-opacity-30 p-2">
                <p className="text-center font-bold text-white">
                  Coming Soon
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
