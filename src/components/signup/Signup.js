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
      const response = await Axios.post("http://api.perfectorse.site/register", {
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
      // console.error("Error during registration:", error);
      setRegisterStatus("Registration failed.");
    }
  };

  const sendOtp = async () => {
    try {
      const response = await Axios.post(
        "http://api.perfectorse.site/send-email-otp",
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
      // console.error("Error sending OTP:", error);
      setOtpStatus("Failed to send OTP.");
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await Axios.post(
        "http://api.perfectorse.site/verify-email-otp",
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
      // console.error("Error verifying OTP:", error);
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
  const handleEmailChange = (e) => {
    const email = e.target.value;
    const emailRegex = /^[a-zA-Z0-9@.]+$/;
    if (emailRegex.test(email)) {
      setEmail(email);
    } else {
      setEmail("");
    }
  };
  const handlePasswordChange = (e) => {
    const password = e.target.value;
    const passwordRegex = /^[a-zA-Z0-9@.]+$/;
    if (passwordRegex.test(password)) {
      setPassword(password);
    } else {
      setPassword("");
    }
  };
  const handleReferenceChange = (e) => {
    const referenceCode = e.target.value;
    const setReferenceRegex = /^[a-zA-Z]/;
    if (setReferenceRegex.test(referenceCode)) {
      setReferenceCode(referenceCode);
    } else {
      setReferenceCode("");
    }
  };
  const handleUserNameChange = (e) => {
    const username = e.target.value;
    const setUserNameRegex = /^[a-zA-Z0-9@]/;
    if (setUserNameRegex.test(username)) {
      setUsername(username);
    } else {
      setUsername("");
    }
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
              onChange={handleUserNameChange}
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm">Mobile Number</label>
            <input
              type="number"
              placeholder="Mobile Number"
              className="p-1 rounded-md border border-gray-300"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm">Email</label>
            <div className=" flex items-center">
              <input
                type="email"
                placeholder="Email"
                className="p-1 rounded-md border w-full"
                value={useremail}
                onChange={handleEmailChange}
              />
              
              
            </div>
            <button
                className="mt-2 rounded-md transition border-2 border-myblue-200 text-sm p-2"
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
            <div className="mt-2 text-xs">{otpStatus}</div>
          )}
          <div className="flex flex-col">
            <label className="mb-1 text-sm">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="p-1 rounded-md border"
              value={password}
              onChange={handlePasswordChange}
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
            <label className="mb-1 text-sm">Referral</label>
            <input
              type="text"
              placeholder="Reference Code"
              className="p-1 rounded-md border"
              value={referenceCode}
              onChange={handleReferenceChange}

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
          <div
            className={`mt-4 text-center text-xs ${
              registerStatus.includes("failed")
                ? "text-red-100"
                : "text-green-100"
            }`}
          >
            {registerStatus}
          </div>
        )}
      </div>
    </div>
  );
}
