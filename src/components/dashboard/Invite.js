import React, { useEffect, useContext, useState } from "react";
import { FaArrowLeftLong, FaCopy } from "react-icons/fa6";
import { Link } from "react-router-dom";
import UserContext from "../login/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BottomNav from "./BottomNav";

function Invite() {
  const { user } = useContext(UserContext);
  const [referCode, setReferCode] = useState("");

  useEffect(() => {
    if (user?.userId) {
      inviteReferCode(user.userId);
    }
  }, [user]);

  const inviteReferCode = async (userId) => {
    try {
      const response = await fetch(
        `https://color-server.onrender.com/api/invite/refer/${userId}`
      );
      if (response.ok) {
        const data = await response.json();
        setReferCode(data.userReferenceCode);
      } else {
        console.error("Error fetching referCode: ", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching referCode:", error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referCode);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-myblue-100">
      <div className="w-full bg-myblue-200 h-12 px-3 flex items-center justify-center fixed top-0">
        <div className="absolute left-0 ml-2">
          <Link to="/home">
            <FaArrowLeftLong size={20} className="text-white" />
          </Link>
        </div>
        <div className="flex items-center justify-center ml-4">
          <h1 className="text-2xl font-bold text-white">Invite</h1>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="border w-[90%] max-w-lg bg-white shadow-md rounded-lg p-6 shadow-lg shadow-blue-100 border-myblue-200">
          <h1 className="text-lg font-bold mb-4 text-myblue-700">Invite And Earn</h1>
          <p className="text-sm text-gray-500 mb-4">
            Using Your Refer Code, friends will get a bonus of up to Rs.50
          </p>
          <div className="flex items-center justify-center bg-myblue-300 w-[100px] rounded-lg p-2">
            <p id="referCode" className="text-sm font-bold text-myblue-700">
              {referCode}
            </p>
            <button
              onClick={copyToClipboard}
              className="ml-2 text-myblue-400 hover:text-myblue-500"
            >
              <FaCopy size={16} />
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
      <BottomNav />
    </div>
  );
}

export default Invite;
