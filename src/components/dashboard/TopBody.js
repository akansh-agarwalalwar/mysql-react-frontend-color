import React, { useContext } from "react";
import UserContext from "../login/UserContext";
import { IoReload } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function TopBody() {
  const { user } = useContext(UserContext);
  return (
    <div className="w-full text-white bg-blue-200 h-[150px] rounded-b-2xl px-6 flex items-center">
      <div className="flex w-full justify-between items-center">
        <div>
          <p>Balance</p>
          <p className="flex items-center gap-2 text-xl font-semibold">
            {user.balance !== undefined ? user.balance : "Loading..."}
            <a>
              <IoReload className="font-semibold" />
            </a>
          </p>
          <p className="text-richblue-5 text-sm">
            ID :
            <span className="text-richblue-5 text-sm uppercase">
              {user.userId}
            </span>
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <Link to='/recharge' >
          <button className="bg-blue-500 w-fit hover:bg-blue-700 text-white font-semibold py-1 px-2 rounded">
            Recharge
          </button>
          </Link>

          <button className="bg-pink-400 w-fit hover:bg-pink-700 text-white font-semibold py-1 px-2 rounded">
            Withdraw
          </button>
        </div>
      </div>
    </div>
  );
}
