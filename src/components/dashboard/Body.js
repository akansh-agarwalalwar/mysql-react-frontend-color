import React from "react";
import { Link } from "react-router-dom";
import fastParity30sec from "../../images/horses.png";
import horse1 from "../../images/horse1.png";
import horse2 from "../../images/horse2.png";
import horse3 from "../../images/horse3.png";
import fastParityTwoMin from "../../images/two_min.jpg";
import upcomingOne from "../../images/coming_soon.jpg";
import heads from "../../images/coming_soon_heads.jpg";
import coming from "../../images/coming.png";
import { LuAlarmClock } from "react-icons/lu";

export default function Body() {
  return (
    <div className="flex flex-col justify-between mt-5 px-2 overflow-y-auto overflow-scroll pb-8 ">
      <div className="flex flex-row">
        <div className="w-full mr-6">
          <Link to="/thirty-second-page">
            <div className="flex flex-col bg-white h-48 rounded-t-lg relative shadow-lg">
              <div className="flex justify-center items-center h-20 w-full rounded-b-full bg-myblue-600 absolute top-0 z-10">
                <p className="text-lg font-bold  text-myblue-200 absolute top-0 mt-1">
                  Crazy30
                </p>
              </div>
              <div className="flex flex-row justify-center items-center mt-8 relative z-20">
                <img src={horse1} className="h-18 w-12" alt="Fast Parity" />
                <img src={horse2} className="h-18 w-12" alt="Fast Parity" />
              </div>
              <div className="flex justify-center items-center w-full absolute z-20 mt-14">
                <img src={horse3} className="h-18 w-12" alt="Fast Parity" />
              </div>
              <div className="w-full justify-center items-center flex mt-6">
                <button className=" bg-myblue-700 text-white p-1 rounded-lg w-32 shadow-xl">
                  Play Now
                </button>
              </div>
              <div className="bottom-0 w-full bg-myblue-600 p-2 rounded-b-lg absolute">
                <div className="flex flex-row justify-center items-center gap-2">
                  <LuAlarmClock />
                  <p className="text-center font-bold text-myblue-200">
                    30 sec
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="w-full mr-1">
          <Link to="/threeMin">
            <div className="flex flex-col bg-white h-48 rounded-t-lg relative shadow-lg">
              <div className="flex justify-center items-center h-20 w-full rounded-b-full bg-myblue-600 absolute top-0 z-10">
                <p className="text-lg font-bold  text-myblue-200 absolute top-0 mt-1">
                  Crazy2PM
                </p>
              </div>
              <div className="flex flex-row justify-center items-center mt-8 relative z-20">
                <img src={horse1} className="h-18 w-12" alt="Fast Parity" />
                <img src={horse2} className="h-18 w-12" alt="Fast Parity" />
              </div>
              <div className="flex justify-center items-center w-full absolute z-20 mt-14">
                <img src={horse3} className="h-18 w-12" alt="Fast Parity" />
              </div>
              <div className="w-full justify-center items-center flex mt-6">
                <button className=" bg-myblue-700 text-white p-1 rounded-lg w-32 shadow-xl">
                  Play Now
                </button>
              </div>
              <div className="bottom-0 w-full bg-myblue-600 p-2 rounded-b-lg absolute">
                <div className="flex flex-row justify-center items-center gap-2">
                  <LuAlarmClock />
                  <p className="text-center font-bold text-myblue-200">2 min</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className="flex flex-row mt-4 pb-9">
        <div className="w-full mr-6">
          {/* <Link to="/heads"> */}
          <div className="flex flex-col bg-white h-48 rounded-t-lg relative shadow-lg">
            <div className="flex justify-center items-center h-20 w-full rounded-b-full bg-myblue-600 absolute top-0 ">
              {/* <p className="text-lg font-bold  text-myblue-200 absolute top-0">
                  Crazy2PM
                </p> */}
            </div>
            <div className="flex flex-row justify-center items-center relative -mt-10">
              <img src={coming} className="h-48 w-48" alt="Fast Parity" />
              {/* <img src={horse2} className="h-18 w-12" alt="Fast Parity" /> */}
            </div>
            {/* <div className="flex justify-center items-center w-full absolute z-20 mt-14">
                <img src={horse3} className="h-18 w-12" alt="Fast Parity" />
              </div> */}
            <div className="w-full justify-center items-center flex -mt-12">
              <button className="bg-myblue-700 text-white p-1 rounded-lg w-32 shadow-xl">
                Play Now
              </button>
            </div>
            <div className="bottom-0 w-full bg-myblue-600 p-2 rounded-b-lg absolute">
              <div className="flex flex-row justify-center items-center gap-2">
                <LuAlarmClock />
                <p className="text-center font-bold text-myblue-200">25 sec</p>
              </div>
            </div>
          </div>
          {/* </Link> */}
        </div>
        <div className="w-full mr-1">
          <Link>
            <div className="flex flex-col bg-white h-48 rounded-t-lg relative shadow-lg">
              <div className="flex justify-center items-center h-20 w-full rounded-b-full bg-myblue-600 absolute top-0 ">
                {/* <p className="text-lg font-bold  text-myblue-200 absolute top-0">
                  Crazy2PM
                </p> */}
              </div>
              <div className="flex flex-row justify-center items-center relative -mt-10">
                <img src={coming} className="h-48 w-48" alt="Fast Parity" />
                {/* <img src={horse2} className="h-18 w-12" alt="Fast Parity" /> */}
              </div>
              {/* <div className="flex justify-center items-center w-full absolute z-20 mt-14">
                <img src={horse3} className="h-18 w-12" alt="Fast Parity" />
              </div> */}
              <div className="w-full justify-center items-center flex -mt-12">
                <button className="bg-myblue-700 text-white p-1 rounded-lg w-32 shadow-xl">
                  Play Now
                </button>
              </div>
              <div className="bottom-0 w-full bg-myblue-600 p-2 rounded-b-lg absolute">
                <div className="flex flex-row justify-center items-center gap-2">
                  <LuAlarmClock />
                  <p className="text-center font-bold text-myblue-200">25 sec</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
