import React, { useContext, useEffect, useState } from "react";
import UserContext from "../login/UserContext";
import { IoReload } from "react-icons/io5";
import { Link } from "react-router-dom";
export default function TopBody() {
  const { user, fetchUserData } = useContext(UserContext);

  useEffect(() => {
    fetchUserData();
  }, []);

  const [balance, setBalance] = useState(
    user.balance !== undefined ? user.balance : "Loading..."
  );

  return (
    <div className="w-full text-black bg-white h-[150px] rounded-b-2xl px-6 flex items-center shadow-2xl">
      <div className="flex w-full justify-between items-center">
        <div className="flex flex-row gap-2 items-center justify-center">
          <div>
            <img src={require("../../images/bank.png")} />
          </div>
          <div>
            <p>Balance</p>
            <p className="flex items-center gap-2 text-xl font-semibold text-myblue-200">
              {user?.balance ? `₹ ${user.balance}` : "₹ 0"}
              <IoReload className="cursor-pointer" onClick={fetchUserData} />
            </p>
            <p className="text-black text-sm">
              ID:
              <span className="text-black text-sm uppercase">
                {user?.userId}
              </span>
            </p>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-2">
          <Link to="/home/recharge">
            <button className="bg-pink-300 w-fit text-white font-semibold py-1 px-2 rounded">
              Recharge
            </button>
          </Link>
          <Link to="/withdraw">
            <button className="bg-caribbeangreen-100 w-fit text-white font-semibold py-1 px-2 rounded">
              Withdraw
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
