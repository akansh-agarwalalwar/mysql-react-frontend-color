import React, { useState } from "react";
import Axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from 'react-hot-toast'
export default function ForgotPassword() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [otp, setOtp] = useState("");
  const [useremail, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpStatus, setOtpStatus] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setStatusMessage("Passwords do not match");
      return;
    }
    try {
      const response = await Axios.post(
        "https://api.perfectorse.ste/api/v1/forgotPassword",
        {
          useremail: useremail,
          newPassword: newPassword,
        }
      );
      if (response.data.message === "Password updated successfully.") {
        setStatusMessage(response.data.message);
        toast.success("Password updated successfully");
        navigate("/login");
      } else {
        toast.error("Password updation Failed");
        
      }
    } catch (error) {
      toast.error("Password update failed");
    }
  };

  const sendOtp = async (e) => {
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
        setOtpStatus(response.data.message);
      } else {
        setOtpStatus(response.data.message);
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
      } else {
        setOtpStatus(response.data.message);
      }
    } catch (error) {
      setOtpStatus("Failed to verify OTP.");
    }
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    const emailRegex = /^[a-zA-Z0-9@.]+$/;
    if (emailRegex.test(email)) {
      setEmail(email);
    } else {
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-myblue-500 flex justify-center items-center p-4 w-full max-w-md mx-auto">
      <div className="p-5 rounded-lg shadow-xl w-[80%] border-2 border-myblue-200">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-myblue-200">Forgot Password</h1>
        </div>
        <form className="space-y-4" onSubmit={handleForgotPassword}>
          <div className="flex flex-col">
            <label className="mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="p-2 rounded-md border border-gray-300"
              value={useremail}
              onChange={handleEmailChange}
            />
            <button
              className="mt-2 rounded-md transition border-2 border-myblue-200 text-sm p-2 w-full"
              onClick={sendOtp}
              disabled={!useremail}
            >
              Send OTP
            </button>
          </div>
          {otpSent && otpStatus !== "OTP verified successfully" && (
            <div className="flex flex-col mt-4">
              <label className="mb-1 text-sm">OTP</label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="OTP"
                  className={`p-1 rounded-md border w-full ${
                    otpStatus === "OTP verified successfully"
                      ? "border-green-100"
                      : "border-red-100"
                  }`}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <button
                className="mt-2 rounded-md transition border-2 border-myblue-200 text-sm p-2"
                onClick={verifyOtp}
              >
                Verify OTP
              </button>
              <div className="mt-2 text-xs">{otpStatus}</div>
            </div>
          )}
          {otpStatus === "OTP verified successfully" && (
            <div className="flex flex-col mt-4">
              <label className="mb-2">New Password</label>
              <input
                type="password"
                placeholder="New Password"
                className="p-2 rounded-md border border-gray-300"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <label className="mb-2">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                className="p-2 rounded-md border border-gray-300"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          )}
          {statusMessage && (
            <div className="text-red-100 text-sm">{statusMessage}</div>
          )}
          <div className="mt-6">
            <button
              className="w-full p-3 bg-myblue-200 text-white rounded-md"
              type="submit"
            >
              Submit
            </button>
          </div>
          <div className="text-center mt-4">
            <Link to="/login">Back to Login Page</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
