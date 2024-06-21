import React, { useEffect, useContext, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaCopy } from "react-icons/fa";
import { Link } from "react-router-dom";
import UserContext from "../login/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BottomNav from './BottomNav'
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
        const response = await fetch(`https://color-server.onrender.com/api/invite/refer/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setReferCode(data.userReferenceCode);
        } else {
          console.log("Error fetching referCode: ", response.statusText);
        }
      } catch (error) {
        console.log("Error fetching referCode:", error);
      }
    };

    const copyToClipboard = () => {
      navigator.clipboard.writeText(referCode);
      toast.success("Copied to clipboard!");
    };

  return (
    <div className="flex flex-col w-full bg-gray-100 min-h-screen">
      <div>
        <div className="w-full text-white bg-blue-500 h-12 px-3 flex items-center justify-center fixed top-0">
          <div className="flex absolute left-0 ml-2">
            <Link to="/home">
              <FaArrowLeftLong size={20} />
            </Link>
          </div>
          <div className="flex items-center justify-center ml-4">
            <h1 className="text-2xl font-bold">Invite</h1>
          </div>
          <div className="flex absolute right-0 mr-2"></div>
        </div>
      </div>
      <div className="border w-full h-[200px] mt-[100px] px-7 py-2 bg-white shadow-md rounded-lg">
        <div className="flex flex-col items-center">
          <div>
            <h1 className="text-lg font-bold">Invite And Earn</h1>
          </div>
          <div className="text-center mt-2">
            <p className="text-sm text-gray-500">
              Using Your Refer Code, <br />
              friends will get a bonus of up to <br />
              Rs.50
            </p>
            <div className="flex items-center mt-2 flex-col">
              <p id="referCode" className="text-sm font-bold bg-gray-100 p-2 rounded-md">
                {referCode}
              </p>
              <button
                onClick={copyToClipboard}
                className="ml-2 text-blue-500 hover:text-blue-700"
              >
                <div>Copy</div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      <BottomNav/>
    </div>
  );
}

export default Invite;
