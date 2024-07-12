import React, { useState, useContext } from "react";
import Axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import UserContext from "./UserContext";
import Cookies from "js-cookie";

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
      const response = await Axios.post("http://3.109.206.254:3001/login", {
        useremail,
        password,
      });
      if (response.status === 200) {
        const {
          userId,
          username,
          useremail,
          mobileNumber,
          balance,
          adminId,
          adminemail,
        } = response.data;
        const user = adminId
          ? { adminId, adminemail }
          : { userId, username, useremail, mobileNumber, balance };
        setUser(user);
        Cookies.set("user", JSON.stringify(user), { expires: 1 });

        if (adminId) {
          navigate("/admin");
        } else {
          navigate("/home");
        }
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      // console.error("There was an error with the login:", error);
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-myblue-500 flex justify-center items-center p-4">
      <div className="p-5 rounded-lg shadow-xl w-[80%] max-w-md border-2 border-myblue-200">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-myblue-200">Login</h1>
        </div>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div className="flex flex-col">
            <label className=" mb-2">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="p-2 rounded-md border border-gray-300"
              value={useremail}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className=" mb-2">Password</label>
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
              className="w-full p-3 bg-myblue-200 text-white rounded-md hover:bg-myblue-200 transition disabled:bg-gray-400"
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
          {error && <div className="text-red-100 text-sm">{error}</div>}
          <div className="text-center mt-4">
            <span className="text-sm">Don't have an account? </span>
            <Link to="/signup" className=" hover:underline underline text-xs">
              Create Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
