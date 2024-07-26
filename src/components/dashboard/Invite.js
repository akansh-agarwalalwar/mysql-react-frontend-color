import React, { useEffect, useContext, useState } from "react";
import { FaArrowLeftLong, FaCopy } from "react-icons/fa6";
import { Link } from "react-router-dom";
import UserContext from "../login/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BottomNav from "./BottomNav";
import axios from 'axios';

function Invite() {
  const { user } = useContext(UserContext);
  const [referCode, setReferCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user?.userId) {
      inviteReferCode(user?.userId);
    }
  }, [user]);

  const inviteReferCode = async (userId) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://api.perfectorse.site/api/v1/user/refer-and-earn/${userId}`);
      const data = response.data;
      setReferCode(data?.userReferenceCode);
    } catch (error) {
      setError("Error fetching referral code.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (referCode) {
      navigator.clipboard.writeText(referCode)
        .then(() => toast.success("Copied to clipboard!"))
        .catch(() => toast.error("Failed to copy to clipboard."));
    } else {
      toast.error("No referral code to copy.");
    }
  };

  return (
    <div className="flex flex-col w-full h-screen bg-myblue-500 max-w-md mx-auto">
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
            Using your referral code, friends will get a bonus of up to Rs.50
          </p>
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
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
          )}
        </div>
      </div>
      <ToastContainer />
      <BottomNav />
    </div>
  );
}

export default Invite;
