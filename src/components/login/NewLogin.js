import React, { useState, useContext, useEffect } from "react";
import Axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import UserContext from "./UserContext";
import toast from "react-hot-toast";
import { MdOutlineEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import Button from "../button/Button";

function NewLogin() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [useremail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const userSession = sessionStorage.getItem("user");
    if (userSession) {
      navigate("/home");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!useremail) {
      toast.error("Enter Email");
      return;
    }
    if (!password) {
      toast.error("Enter Password");
      return;
    }

    setLoading(true);
    try {
      const response = await Axios.post("https://api.perfectorse.site/api/v1/login", {
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
        sessionStorage.setItem("user", JSON.stringify(user));

        if (adminId) {
          toast.success("Login Successful");
          navigate("/admin");
        } else {
          toast.success("Login Successful");
          navigate("/home");
        }
      } else {
        setError("Invalid email or password");
        toast.error("Invalid email or password");
      }
    } catch (error) {
      console.error("There was an error with the login:", error);
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-myblue-800 flex p-4">
      <div className="flex flex-col w-full max-w-md mx-auto items-center">
        <img
          src={require("../../images/mylogo.jpg")}
          height={180}
          width={180}
          className="rounded-xl mt-10"
        />
        <div className="flex flex-col items-center w-full mt-4">
          <p className="text-xl font-semibold">Login Now</p>
        </div>
        <form onSubmit={handleLogin} className="w-full">
          <div className="flex flex-row items-center w-full mt-4 bg-white rounded-full h-12">
            <div className="bg-red-100 flex rounded-full justify-center items-center h-10 w-10 ml-2">
              <MdOutlineEmail className="text-white" size={30} />
            </div>
            <input
              type="email"
              placeholder="Email"
              className="p-2 border-none focus:outline-none w-[80%] bg-transparent"
              value={useremail}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-row items-center w-full mt-4 bg-white rounded-full h-12">
            <div className="bg-brown-100 flex rounded-full justify-center items-center h-10 w-10 ml-2">
              <FaKey className="text-white" size={20} />
            </div>
            <input
              type="password"
              placeholder="Password"
              className="p-2 border-none focus:outline-none w-[80%] bg-transparent"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-end w-full mt-2 mr-2">
            <Link to="/forgot-password">
              <p className="text-right text-sm mr-2">Forgot Password?</p>
            </Link>
          </div>
          <div className="w-full mt-2">
            <Button text="Login" onClick={handleLogin} />
          </div>
          <div className="text-center mt-4">
            <span className="text-sm">Don't have an account? </span>
            <Link to="/signup" className="text-myblue-200 font-semibold text-sm">
              Register
            </Link>
          </div>
          {error && <div className="text-red-100 text-sm">{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default NewLogin;