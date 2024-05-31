import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [rememberMeError, setRememberMeError] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!rememberMe) {
      setRememberMeError("You must agree to remember me.");
      return;
    }
    setRememberMeError("");
    setLoading(true);
    try {
      const response = await Axios.post("https://mysql-color-backend.onrender.com/login", {
        mobileNumber: mobileNumber,
        password: password,
      });
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        setLoginStatus(`Welcome, user ${response.data[0].mobileNumber}`);
        navigate('/home');
      }
    } catch (error) {
      console.error("There was an error with the login:", error);
      setLoginStatus("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-700 flex justify-center items-center p-4">
      <div className="bg-blue-300 p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-white">Login</h1>
        </div>
        <form className="space-y-4" onSubmit={handleLogin}>
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
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                className="mr-2"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="rememberMe" className="text-white">Remember Me</label>
            </div>
            <Link
              to="/forgot-password"
              className="text-sm text-white hover:underline hover:text-blue-600"
            >
              Forgot Password?
            </Link>
          </div>
          {rememberMeError && (
            <div className="text-red-500 text-sm">{rememberMeError}</div>
          )}
          <div className="mt-6">
            <button
              className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition disabled:bg-gray-400"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Login"
              )}
            </button>
          </div>
          <div className="text-center mt-4">
            <span className="text-white">Don't have an account? </span>
            <Link
              to="/signup"
              className="text-white hover:underline hover:text-blue-600"
            >
              Create Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
