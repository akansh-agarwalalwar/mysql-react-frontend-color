import React, { useState } from "react";
import Axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { MdOutlineEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import Button from "../button/Button";

function NewForgot() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [otp, setOtp] = useState("");
  const [useremail, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpStatus, setOtpStatus] = useState("");
  const [sendOtpText, setSendOtpText] = useState("Send OTP");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setStatusMessage("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }
    try {
      const response = await Axios.post(
        "https://api.perfectorse.ste/api/v1/forgotPassword",
        {
          useremail,
          newPassword,
        }
      );
      if (response.data.message === "Password updated successfully.") {
        setStatusMessage(response.data.message);
        toast.success("Password updated successfully");
        navigate("/login");
      } else {
        toast.error("Password update failed");
      }
    } catch (error) {
      toast.error("Password update failed");
    }
  };

  const sendOtp = async (e) => {
    setSendOtpText("Sending...");
    e.preventDefault();
    try {
      const response = await Axios.post(
        "https://api.perfectorse.ste/api/v1/sendOtp",
        {
          useremail,
        }
      );
      if (response.data.message === "OTP sent successfully") {
        setOtpSent(true);
        setOtpStatus(response?.data?.message);
        setSendOtpText("Sent");
        toast.success("OTP Sent");
      } else {
        setOtpStatus(response?.data?.message);
        setSendOtpText("Send OTP");
        toast.error("OTP Failed");
      }
    } catch (error) {
      setOtpStatus("Failed to send OTP.");
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post(
        "https://api.perfectorse.ste/api/v1/verifyEmail",
        {
          useremail,
          otp,
        }
      );
      if (response.data.message === "OTP verified successfully") {
        setOtpStatus(response.data.message);
        toast.success("OTP verified successfully");
      } else {
        setOtpStatus(response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      setOtpStatus("Failed to verify OTP.");
      toast.error("Failed to verify OTP.");
    }
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  return (
    <div className="min-h-screen bg-myblue-500 flex p-4">
      <div className="flex flex-col w-full max-w-md mx-auto items-center">
        <img
          src={require("../../images/mylogo.jpg")}
          height={180}
          width={180}
          className="rounded-xl mt-10"
          alt="Logo"
        />
        <div className="flex flex-col items-center w-full mt-4">
          <p className="text-xl font-semibold">Forgot Password</p>
        </div>
        <form onSubmit={handleForgotPassword} className="w-full">
          <div className="flex flex-row items-center w-full mt-4 bg-white rounded-full h-12">
            <div className="bg-red-100 flex rounded-full justify-center items-center h-10 w-10 ml-2">
              <MdOutlineEmail className="text-white" size={30} />
            </div>
            <input
              type="email"
              placeholder="Email"
              className="p-2 border-none focus:outline-none w-[80%] bg-transparent"
              value={useremail}
              onChange={handleEmailChange}
            />
          </div>
          <button
            className="mt-2 rounded-full  w-full transition border-2 border-myblue-200 text-sm p-2 bg-myblue-200 text-white"
            onClick={sendOtp}
            disabled={!useremail}
            type="button"
          >
            {sendOtpText}
          </button>
          {otpSent && otpStatus !== "OTP verified successfully" && (
            <div className="flex flex-col mt-4 p-4 bg-white rounded-lg shadow-md">
              <label className="mb-1 text-sm font-semibold">OTP</label>
              <input
                type="text"
                placeholder="Enter OTP"
                className={`p-2 rounded-md border w-full ${
                  otpStatus === "OTP verified successfully"
                    ? "border-green-100 bg-green-50"
                    : "border-red-100 bg-red-50"
                }`}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button
                className="mt-2 rounded-full transition border-2 border-myblue-200 text-sm p-2 bg-myblue-200 text-white hover:bg-myblue-300"
                onClick={verifyOtp}
                type="button"
              >
                Verify OTP
              </button>
              <div className="mt-2 text-xs text-center text-gray-600">
                {otpStatus}
              </div>
            </div>
          )}
          {otpStatus === "OTP verified successfully" && (
            <>
              <div className="flex flex-row items-center w-full mt-4 bg-white rounded-full h-12">
                <div className="bg-brown-100 flex rounded-full justify-center items-center h-10 w-10 ml-2">
                  <FaKey className="text-white" size={20} />
                </div>
                <input
                  type="password"
                  placeholder="New Password"
                  className="p-2 border-none focus:outline-none w-[80%] bg-transparent"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="flex flex-row items-center w-full mt-4 bg-white rounded-full h-12">
                <div className="bg-brown-100 flex rounded-full justify-center items-center h-10 w-10 ml-2">
                  <FaKey className="text-white" size={20} />
                </div>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="p-2 border-none focus:outline-none w-[80%] bg-transparent"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </>
          )}
          {statusMessage && (
            <div className="mt-2 text-red-500 text-sm">{statusMessage}</div>
          )}
          <div className="w-full mt-4">
            <Button text="Reset Password" onClick={handleForgotPassword} />
          </div>
          <div className="text-center mt-4">
            <span className="text-sm">Remember your password? </span>
            <Link to="/login" className="text-myblue-200 font-semibold text-sm">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewForgot;
