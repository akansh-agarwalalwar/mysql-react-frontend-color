import React from "react";
import { IoGiftOutline } from "react-icons/io5";
export default function Reward() {
  return (
    <div className='flex justify-evenly mt-4'>
      <div className="border-2 solid  text-richblue p-4 rounded-lg flex-row flex justify-center items-center ">
        <div>
        
        <img src={require('../../images/task_reward_icon.png')}  style={{height:25}}/>
        </div>
        
        <h2 className="text-xl font-bold">Task Reward</h2>
      </div>
      <div className="border-2 text-richblue p-4 rounded-lg flex flex-row justify-center items-center">
        <div>
        <img src={require('../../images/bonus_icon.jpeg')}  style={{height:20 }}/>
        </div>
        <h2 className="text-xl font-bold ml-1">Daily Bonus</h2>
      </div>
    </div>
  );
}
