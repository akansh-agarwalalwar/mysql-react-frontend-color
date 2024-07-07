import React, { useContext, useEffect, useState } from "react";
import UserContext from "../login/UserContext";
import { IoReload } from "react-icons/io5";
import { Link } from "react-router-dom";
import axios from "axios";

export default function TopBody() {
  const { user, fetchUserData } = useContext(UserContext);
  
  useEffect(() => {
    fetchUserData();
  }, []); // Empty dependency array means this will run once when the component mounts
  
  const [balance, setBalance] = useState(user.balance !== undefined ? user.balance : "Loading...");

  return (
    <div className="w-full text-white bg-myblue-200 h-[150px] rounded-b-2xl px-6 flex items-center">
      <div className="flex w-full justify-between items-center">
        <div>
          <p>Balance</p>
          <p className="flex items-center gap-2 text-xl font-semibold">
            {user.balance}
            <IoReload className="cursor-pointer" onClick={fetchUserData} />
          </p>
          <p className="text-richblue-5 text-sm">
            ID:
            <span className="text-richblue-5 text-sm uppercase">
              {user.userId}
            </span>
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Link to="/recharge">
            <button className="bg-pink-400 w-fit text-white font-semibold py-1 px-2 rounded">
              Recharge
            </button>
          </Link>
          <Link to="/withdraw">
            <button className="bg-caribbeangreen-300 w-fit text-white font-semibold py-1 px-2 rounded">
              Withdraw
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
