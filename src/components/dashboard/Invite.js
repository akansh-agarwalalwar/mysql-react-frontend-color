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
        `http://localhost:3001/api/invite/refer/${userId}`
      );
      if (response.ok) {
        const data = await response.json();
        setReferCode(data.userReferenceCode);
      } else {
        // console.error("Error fetching referCode: ", response.statusText);
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
    <div className="flex flex-col w-full h-screen bg-myblue-500">
     <div className="flex flex-row bg-myblue-200 w-full text-white items-center h-12">
        <Link to="/home">
          <FaArrowLeftLong size={20} className="mx-4" />
        </Link>
        <p className="text-xl font-bold -mt-0.5">Invite</p>
      </div>
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="border w-[90%] max-w-lg bg-white rounded-lg p-6 shadow-lg border-myblue-200">
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
