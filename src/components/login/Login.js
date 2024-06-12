import React, { useState, useContext } from "react";
import Axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import UserContext from "./UserContext";
import Cookies from 'js-cookie';

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [useremail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await Axios.post("http://localhost:3001/login", {
        useremail,
        password,
      });
      if (response.status === 200) {
        const { userId, username, useremail, mobileNumber, balance, adminId, adminemail } = response.data;
        const user = adminId ? { adminId, adminemail } : { userId, username, useremail, mobileNumber, balance };
        setUser(user);
        Cookies.set('user', JSON.stringify(user), { expires: 1 });

        if (adminId) {
          navigate("/admin");
        } else {
          navigate("/home");
        }
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      console.error("There was an error with the login:", error);
      setError("Login failed. Please try again.");
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
            <label className="text-white mb-2">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="p-2 rounded-md border border-gray-300"
              value={useremail}
              onChange={(e) => setEmail(e.target.value)}
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
          {error && <div className="text-red-500 text-sm">{error}</div>}
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
