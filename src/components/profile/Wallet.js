import React, { useContext } from "react";
import UserContext from "../login/UserContext";
import { TbReceiptRupee } from "react-icons/tb";
import { TbCurrencyRupee } from "react-icons/tb";
import { TbTransactionRupee } from "react-icons/tb";

import { Link } from "react-router-dom";
function Wallet() {
  const { user } = useContext(UserContext);
  return (
    <div className="flex w-full justify-center items-center">
      <div className="w-full max-w-lg flex flex-col items-center p-6 relative">
        <div className="bg-white rounded-2xl shadow-lg p-5 mt-4 w-full">
          {/* Balance Section */}
          <div className="h-16 flex flex-col items-center justify-center text-black mb-4">
            <p className="text-lg">Wallet Balance</p>
            <p className="text-3xl font-bold text-myblue-200">
              {user?.balance ? `₹${user.balance}` : "₹0"}
            </p>
          </div>
          {/* Unplayed Section */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-row items-center justify-center gap-2">
              <div className="flex items-center justify-center rounded-full bg-black h-7 w-7">
                <TbReceiptRupee />
              </div>
              <div className="flex flex-col">
                <p className="text-black">Unplayed</p>
                <p className="font-semibold text-black">
                  {user?.unplayed ? `₹${user.unplayed}` : "₹0"}
                </p>
              </div>
            </div>
            <Link to="/home/recharge">
              <button className="bg-red-100 text-white rounded-lg px-4 py-2 ml-2 w-full" >
                ADD CASH
              </button>
            </Link>
          </div>
          {/* Bonus Section */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-row items-center justify-center gap-2">
              <div className="flex items-center justify-center rounded-full bg-black h-7 w-7">
                <TbCurrencyRupee />
              </div>
              <div className="flex flex-col">
                <p className="text-black">Bonus</p>
                <p className="font-semibold text-black">
                  {user?.bonus ? `₹${user.bonus}` : "₹0"}
                </p>
              </div>
            </div>
            <Link to='/home/invite'>
            <button className="bg-white rounded-lg px-4 py-2 ml-2 border-2 border-black text-black">
              EARN BONUS
            </button>
            </Link>
          </div>
          {/* Winnings Section */}
          <div className="flex items-center justify-between">
            <div className="flex flex-row items-center justify-center gap-2">
              <div className="flex items-center justify-center rounded-full bg-black h-7 w-7">
                <TbTransactionRupee />
              </div>
              <div className="flex flex-col">
                <p className="text-black">Winnings</p>
                <p className="font-semibold text-black">
                  {user?.balance ? `₹${user.balance}` : "₹0"}
                </p>
              </div>
            </div>
            <Link to="/withdraw">
              <button className="bg-green-100 rounded-lg px-4 py-2 ml-2 text-white">
                WITHDRAW
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Wallet;