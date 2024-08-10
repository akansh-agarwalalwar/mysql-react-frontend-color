import React, { useEffect, useContext, useState } from "react";
import { FaArrowLeftLong, FaCopy } from "react-icons/fa6";
import { Link } from "react-router-dom";
import UserContext from "../login/UserContext";
import BottomNav from "./BottomNav";
import axios from "axios";
import toast from "react-hot-toast";

function Invite() {
  const { user } = useContext(UserContext);
  const [referCode, setReferCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [couponCode, setCouponCode] = useState("");

  useEffect(() => {
    if (user?.userId) {
      inviteReferCode(user.userId);
    }
  }, [user]);

  const inviteReferCode = async (userId) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.perfectorse.ste/api/v1/user/refer-and-earn/${userId}`
      );
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
      navigator.clipboard
        .writeText(referCode)
        .then(() => toast.success("Copied to clipboard!"))
        .catch(() => toast.error("Failed to copy to clipboard."));
    } else {
      toast.error("No referral code to copy.");
    }
  };

  const handleCouponChange = (e) => {
    const input = e.target.value.toUpperCase();
    if (/^[A-Z0-9]*$/.test(input)) {
      setCouponCode(input);
    }
  };

  const addCoupon = async () => {
    if (!user?.userId) {
      toast.error("User not logged in.");
      return;
    }

    try {
      const response = await axios.post(
        "https://api.perfectorse.ste/api/v1/financial/redeem-coupon",
        { coupon: couponCode, userId: user.userId }
      );
      console.log(couponCode, user.userId);
      if (response.status === 200) {
        toast.success("Coupon redeemed successfully!");
        setCouponCode("");
      }
    } catch (error) {
      console.error("Error redeeming coupon:", error);
      toast.error("Already Claimed!");
    }
  };

  return (
    <div className="flex flex-col w-full h-screen bg-myblue-500 max-w-md mx-auto">
      <div className="flex items-center bg-myblue-200 w-full text-white py-3 px-4">
        <Link to="/home" className="mr-4">
          <FaArrowLeftLong size={20} />
        </Link>
        <p className="text-xl font-bold">Invite & Earn</p>
      </div>

      <div className="flex flex-col items-center justify-center flex-grow space-y-6">
        <div className="w-[90%] max-w-lg bg-white rounded-lg p-6 shadow-lg border border-myblue-200">
          <h1 className="text-lg font-bold mb-4 text-myblue-700">
            Invite Friends & Earn Rewards
          </h1>
          <p className="text-sm text-gray-500 mb-6 text-center">
            Share your referral code and your friends will get a bonus of up to
            Rs. 250.
          </p>
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="flex items-center justify-center bg-myblue-100 w-[180px] rounded-lg p-3 mx-auto">
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

        <div className="w-[90%] max-w-lg bg-white rounded-lg p-6 shadow-lg border border-myblue-200">
          <h2 className="text-md font-semibold text-myblue-700 mb-4">
            Redeem Coupon Code
          </h2>
          <div className="flex items-center space-x-3">
            <input
              type="text"
              placeholder="Enter Coupon Code"
              value={couponCode}
              onChange={handleCouponChange}
              className="flex-grow p-2 border border-myblue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-myblue-300"
            />
            <button
              onClick={addCoupon}
              className="bg-myblue-200 text-white px-4 py-2 rounded-md hover:bg-myblue-700 transition"
            >
              Claim
            </button>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

export default Invite;
