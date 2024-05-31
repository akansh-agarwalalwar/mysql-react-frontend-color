import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [referenceCode, setReferenceCode] = useState('');
  const [registerStatus, setRegisterStatus] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    Axios.post("https://mysql-color-backend.onrender.com/register", {
      username: username,
      mobileNumber: mobileNumber,
      password: password,
      confirmPassword: confirmPassword,
      referenceCode: referenceCode
    }).then((response) => {
      if (response.data.message) {
        setRegisterStatus(response.data.message);
      } else {
        setRegisterStatus("Registration Successful");
        navigate('/login');
      }
    }).catch((error) => {
      console.error("There was an error with the registration:", error);
      setRegisterStatus("Registration failed");
    });
  };

  return (
    <div className="min-h-screen bg-blue-700 flex justify-center items-center p-4">
      <div className="bg-blue-300 p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-white">Register</h1>
        </div>
        <form className="space-y-4" onSubmit={handleRegister}>
          <div className="flex flex-col">
            <label className="text-white mb-2">Name</label>
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
              type="number"
              placeholder="Mobile Number"
              className="p-2 rounded-md border border-gray-300"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>
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
              className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition disabled:bg-gray-400"
              type="submit"
            >
              Register
            </button>
          </div>
          <div className="text-center mt-4">
            <span className="text-white">Already have an account? </span>
            <Link
              to="/login"
              className="text-white hover:underline hover:text-blue-600"
            >
              Login
            </Link>
          </div>
          <h1 className="text-center text-white mt-4">{registerStatus}</h1>
        </form>
      </div>
    </div>
  );
}
