import React, { useEffect, useContext, useState } from "react";
import { FaCopy } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import UserContext from "../login/UserContext";
import BottomNav from "./BottomNav";
import axios from "axios";
import toast from "react-hot-toast";
import background from '../../images/background.png';
function Invite() {
  const { user } = useContext(UserContext);
  const [referCode, setReferCode] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user?.userId) {
      fetchReferCode(user.userId);
    }
  }, [user]);

  const fetchReferCode = async (userId) => {
    try {
      const response = await axios.get(
        `http://api.perfectorse.site/api/v1/user/refer-and-earn/${userId}`
      );
      setReferCode(response.data?.userReferenceCode || "");
      setLoading(false);
    } catch (err) {
      setError("Error fetching referral code.");
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referCode);
      toast.success("Copied to clipboard!");
    } catch {
      toast.error("Failed to copy to clipboard.");
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
        "http://api.perfectorse.site/api/v1/financial/redeem-coupon",
        { coupon: couponCode, userId: user.userId }
      );
  
      const statusMessageMap = {
        200: "Coupon redeemed successfully!",
        404: "Coupon not found!",
        400: "Coupon already claimed or you need to recharge!",
      };
  
      toast[response.status === 200 ? "success" : "error"](
        statusMessageMap[response.status] || "Unexpected error occurred."
      );
  
      // Clear the coupon code input
      setCouponCode("");
    } catch (err) {
      if (err.response) {
        // Handle errors with response from the server
        const { status, data } = err.response;
        if (status === 400) {
          // Application-specific errors
          toast.error(data.message || "Invalid request. Please check your input.");
        } else if (status === 404) {
          // Resource not found
          toast.error(data.message || "Resource not found.");
        } else if (status === 500) {
          // Server-side errors
          toast.error(data.message || "Server error. Please try again later.");
        } else {
          // Other HTTP errors
          toast.error("Unexpected error occurred. Please try again.");
        }
      } else if (err.request) {
        // No response received from the server
        toast.error("No response from server. Please check your network connection.");
      } else {
        // Error setting up the request
        toast.error("Error setting up request: " + err.message);
      }
    }
  };
  

  const shareReferralLink = () => {
    const referralLink = `https://perfectorse.site/signup?referral=${referCode}`;

    if (navigator.share) {
      navigator
        .share({
          title: "Perfectorse",
          text: "Use my referral code to sign up and get rewards!",
          url: referralLink,
        })
        .catch((err) => console.log("Error sharing", err));
    } else {
      navigator.clipboard
        .writeText(referralLink)
        .then(() => toast.success("Referral link copied to clipboard!"))
        .catch(() => toast.error("Failed to copy referral link."));
    }
  };

  return (
    <div className="flex flex-col w-full h-screen bg-myblue-800 max-w-md mx-auto"
    style={{
      backgroundImage: `url(${background})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div className="flex items-center bg-black w-full text-black py-3 px-4">
        <Link to="/home" className="mr-4">
          <div className=" p-2">
            <IoIosArrowBack size={20} color='#FFF' />
          </div>
        </Link>
        <p className="text-xl font-bold text-white">Invite & Earn</p>
      </div>

      <div className="flex flex-col items-center justify-center flex-grow space-y-6">
        <div className="w-[90%] max-w-lg bg-white rounded-lg p-6 shadow-lg">
          <h1 className="text-lg font-bold mb-4 text-black">
            Invite Friends & Earn Rewards
          </h1>
          <p className="text-sm text-gray-500 mb-6 text-center">
            Share your referral code, and you will get a bonus of up to Rs. 250.
          </p>
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <>
              <div className="flex items-center justify-center space-x-3">
                <div
                  className="flex items-center justify-center bg-myblue-100 w-[180px] rounded-lg p-3"
                  aria-live="polite"
                >
                  <p id="referCode" className="text-sm font-bold text-myblue-700">
                    {referCode}
                  </p>
                  <button
                    onClick={copyToClipboard}
                    className="ml-2 text-myblue-400 hover:text-myblue-500"
                    aria-label="Copy referral code"
                  >
                    <FaCopy size={16} />
                  </button>
                </div>
                <button
                  onClick={shareReferralLink}
                  className="bg-myblue-200 text-white px-4 py-2 rounded-md hover:bg-myblue-700 transition"
                  aria-label="Share referral link"
                >
                  Share
                </button>
              </div>
            </>
          )}
        </div>

        <div className="w-[90%] max-w-lg bg-white rounded-lg p-6 shadow-lg">
          <h2 className="text-md font-semibold text-black mb-4">
            Redeem Coupon Code
          </h2>
          <div className="flex items-center space-x-3">
            <input
              type="text"
              placeholder="Enter Coupon Code"
              value={couponCode}
              onChange={handleCouponChange}
              className="flex-grow p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-myblue-300"
              aria-label="Coupon Code"
            />
            <button
              onClick={addCoupon}
              className="bg-myblue-200 text-white px-4 py-2 rounded-md hover:bg-myblue-700 transition"
              aria-label="Claim Coupon"
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
