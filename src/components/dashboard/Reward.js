import React from "react";
import { IoGiftOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
export default function Reward() {
  return (
    <div className='flex justify-evenly mt-4'>
      {/* <div className="border-2 solid  text-richblue p-4 rounded-lg flex-row flex justify-center items-center ">
        <div>
        
        <img src={require('../../images/task_reward_icon.png')}  style={{height:25}}/>
        </div>
        
        <h2 className="text-xl font-bold">Task Reward</h2>
      </div> */}
      <Link to='/daily-bonus'>
      <div className="bg-white text-richblack-700 px-4 py-2 shadow-xl shadow font-semibold rounded-xl flex flex-row justify-center items-center w-full border-2  border-myblue-200">
        <div>
        <img src={require('../../images/bonus_icon.jpeg')}  style={{height:20 }}/>
        </div>
        <h2 className="text-md ml-1">Daily Bonus</h2>
      </div>
      </Link>
    </div>
  );
}
