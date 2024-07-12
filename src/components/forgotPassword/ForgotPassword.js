import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [mobileNumber, setMobileNumber] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setStatusMessage("Passwords do not match");
      return;
    }
    try {
      const response = await Axios.post("http://3.109.206.254:3001/forgot-password", {
        mobileNumber: mobileNumber,
        newPassword: newPassword,
      });
      if (response.data.message) {
        setStatusMessage(response.data.message);
      } else {
        setStatusMessage("Password updated successfully");
        navigate('/login');
      }
    } catch (error) {
      // console.error("There was an error updating the password:", error);
      setStatusMessage("Password update failed");
    }
  };

  return (
    <div className="min-h-screen bg-blue-700 flex justify-center items-center p-4">
      <div className="bg-blue-300 p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-white">Forgot Password</h1>
        </div>
        <form className="space-y-4" onSubmit={handleForgotPassword}>
          <div className="flex flex-col">
            <label className="text-white mb-2">Mobile Number</label>
            <input
              type="number"
              placeholder="Mobile Number"
              className="p-2 rounded-md border border-gray-300"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-white mb-2">New Password</label>
            <input
              type="password"
              placeholder="New Password"
              className="p-2 rounded-md border border-gray-300"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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
          {statusMessage && (
            <div className="text-red-500 text-sm">{statusMessage}</div>
          )}
          <div className="mt-6">
            <button
              className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              type="submit"
            >
              Submit
            </button>
          </div>
          <div className="text-center mt-4">
            <Link
              to="/login"
              className="text-white hover:underline hover:text-blue-600"
            >
              Back to Login Page
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
