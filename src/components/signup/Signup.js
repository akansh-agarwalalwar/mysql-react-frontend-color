import React, { useState } from "react";
import Axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [useremail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [referenceCode, setReferenceCode] = useState("");
  const [registerStatus, setRegisterStatus] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpStatus, setOtpStatus] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!otp || otpStatus !== "OTP verified successfully") {
      setRegisterStatus("Please verify your OTP first.");
      return;
    }

    try {
      const response = await Axios.post("https://color-server.onrender.com/register", {
        username,
        mobileNumber: `+91${mobileNumber}`,
        useremail,
        password,
        referenceCode,
      });
      if (response.data.message === "Registration Successful") {
        setRegisterStatus(response.data.message);
        navigate("/login");
      } else {
        setRegisterStatus(response.data.message);
      }
    } catch (error) {
      console.error( error);
      setRegisterStatus("Registration failed.");
    }
  };

  const sendOtp = async () => {
    try {
      const response = await Axios.post("https://color-server.onrender.com/send-email-otp", {
        useremail,
      });
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

  const verifyOtp = async () => {
    try {
      const response = await Axios.post("https://color-server.onrender.com/verify-email-otp", {
        useremail,
        otp,
      });
      if (response.data.message === "OTP verified successfully") {
        setOtpStatus(response.data.message);
      } else {
        setOtpStatus(response.data.message);
      }
    } catch (error) {
      setOtpStatus("Failed to verify OTP.");
    }
  };

  const isFormValid = () => {
    return (
      username &&
      mobileNumber.length === 10 &&
      useremail &&
      password &&
      confirmPassword &&
      password === confirmPassword &&
      otpStatus === "OTP verified successfully"
    );
  };

  return (
    <div className="min-h-screen bg-myblue-500 flex justify-center items-center p-4">
      <div className="p-8 rounded-lg shadow-lg w-[80%] max-w-md border-2 border-myblue-200 bg-white">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-myblue-200">Sign Up</h1>
        </div>
        <form className="space-y-4" onSubmit={handleSignup}>
          <div className="flex flex-col">
            <label className="mb-1 text-sm">Username</label>
            <input
              type="text"
              placeholder="Username"
              className="p-1 rounded-md border"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm">Mobile Number</label>
            <input
              type="text"
              placeholder="Mobile Number"
              className="p-1 rounded-md border border-gray-300"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm">Email</label>
            <div className="relative flex items-center">
              <input
                type="email"
                placeholder="Email"
                className="p-1 rounded-md border w-full"
                value={useremail}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className="absolute right-1 p-1 rounded-md transition border-2 border-myblue-200 text-sm"
                onClick={sendOtp}
                disabled={!useremail}
              >
                Send OTP
              </button>
            </div>
          </div>
          {otpSent && otpStatus !== "OTP verified successfully" && (
            <div className="flex flex-col mt-4">
              <label className="mb-1 text-sm">OTP</label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="OTP"
                  className={`p-1 rounded-md border w-full ${
                    otpStatus === "OTP verified successfully" ? "border-green-100" : "border-red-100"
                  }`}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <button
                  className="absolute right-1 p-1 rounded-md transition border-2 border-myblue-200 text-sm"
                  onClick={verifyOtp}
                >
                  Verify OTP
                </button>
              </div>
              <div className="mt-2 text-xs">{otpStatus}</div>
            </div>
          )}
          {otpStatus === "OTP verified successfully" && (
            <div className="mt-2 text-xs">{otpStatus}</div>
          )}
          <div className="flex flex-col">
            <label className="mb-1 text-sm">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="p-1 rounded-md border"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="p-1 rounded-md border"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm">Reference Code</label>
            <input
              type="text"
              placeholder="Reference Code"
              className="p-1 rounded-md border"
              value={referenceCode}
              onChange={(e) => setReferenceCode(e.target.value)}
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full p-3 bg-myblue-200 text-white rounded-md font-bold"
              disabled={!isFormValid()}
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <p className="text-xs">
            Already have an account?{" "}
            <Link to="/login" className="underline text-xs">
              Login here
            </Link>
          </p>
        </div>
        {registerStatus && (
          <div className={`mt-4 text-center text-xs ${registerStatus.includes("failed") ? "text-red-100" : "text-green-100"}`}>
            {registerStatus}
          </div>
        )}
      </div>
    </div>
  );
}
