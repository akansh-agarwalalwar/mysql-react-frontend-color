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
      console.error("Error during registration:", error);
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
      console.error("Error sending OTP:", error);
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
      console.error("Error verifying OTP:", error);
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
    <div className="min-h-screen bg-myblue-300 flex justify-center items-center p-4">
      <div className="bg-myblue-400 p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-white">Sign Up</h1>
        </div>
        <form className="space-y-4" onSubmit={handleSignup}>
          <div className="flex flex-col">
            <label className="text-white mb-2">Username</label>
            <input
              type="text"
              placeholder="Username"
              className="p-2 rounded-md border border-gray-300"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-white mb-2">Mobile Number</label>
            <input
              type="text"
              placeholder="Mobile Number"
              className="p-2 rounded-md border border-gray-300"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-white mb-2">Email</label>
            <div className="relative flex items-center">
              <input
                type="email"
                placeholder="Email"
                className="p-2 rounded-md border border-gray-300 w-full"
                value={useremail}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-2 bg-myblue-200 text-white p-1 rounded-md hover:bg-blue-600 transition"
                onClick={sendOtp}
                disabled={!useremail}
              >
                Send OTP
              </button>
            </div>
          </div>
          {otpSent && otpStatus !== "OTP verified successfully" && (
            <div className="flex flex-col mt-4">
              <label className="text-white mb-2">OTP</label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="OTP"
                  className={`p-2 rounded-md border w-full ${otpStatus === "OTP verified successfully" ? "border-green-500" : "border-red-500"}`}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-2 bg-blue-500 text-white p-1 rounded-md hover:bg-blue-600 transition"
                  onClick={verifyOtp}
                >
                  Verify OTP
                </button>
              </div>
              <div className="text-white mt-2">{otpStatus}</div>
            </div>
          )}
          {otpStatus === "OTP verified successfully" && (
            <div className="text-white mt-2">{otpStatus}</div>
          )}
          <div className="flex flex-col">
            <label className="text-white mb-2">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="p-2 rounded-md border border-gray-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-white mb-2">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="p-2 rounded-md border border-gray-300"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-white mb-2">Reference Code</label>
            <input
              type="text"
              placeholder="Reference Code"
              className="p-2 rounded-md border border-gray-300"
              value={referenceCode}
              onChange={(e) => setReferenceCode(e.target.value)}
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full p-3 bg-myblue-200 text-white rounded-md hover:bg-blue-600 transition disabled:bg-gray-400"
              disabled={!isFormValid()}
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <p className="text-white">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-800 hover:underline">
              Login here
            </Link>
          </p>
        </div>
        {registerStatus && (
          <div className={`mt-4 text-center ${registerStatus.includes("failed") ? "text-red-500" : "text-green-500"}`}>
            {registerStatus}
          </div>
        )}
      </div>
    </div>
  );
}
