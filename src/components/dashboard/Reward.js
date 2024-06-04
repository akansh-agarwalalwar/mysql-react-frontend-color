import React from "react";
import { IoGiftOutline } from "react-icons/io5";
export default function Reward() {
  return (
    <div className='flex justify-evenly mt-4'>
      <div className="bg-richblue-500 text-richblue p-4 rounded-lg flex-row flex justify-center items-center ">
        <div>
        <IoGiftOutline/>
        </div>
        
        <h2 className="text-xl font-bold">Task Reward</h2>
      </div>
      <div className="bg-richblue-500 text-richblue p-4 rounded-lg">
        <h2 className="text-xl font-bold">Daily Bonus</h2>
      </div>
    </div>
  );
}
