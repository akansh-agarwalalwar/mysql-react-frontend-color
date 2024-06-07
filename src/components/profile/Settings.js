import React, { useContext } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa6";
import UserContext from "../login/UserContext";

function Settings() {
  const { user } = useContext(UserContext);
  console.log(user)
  const navigate = useNavigate();
  const capitalizeFirstLetter = (string) => {
    return string ? string.charAt(0).toUpperCase() + string.slice(1) : "Not Logged In";
  };
  return (
    <div className="px-2 mt-3">
      <div className="flex flex-row items-center">
        <div>
          <Link to="/profile">
            <FaArrowLeftLong size={20} />
          </Link>
        </div>
        <div className="ml-3 justify-center">
          <p className="text-xl font-bold">Update Profile</p>
        </div>
      </div>
      <div className="justify-center items-center flex mt-4">
        <div className="bg-blue-500 items-center rounded-full justify-center p-3 flex row w-[90px] h-[90px]">
          <FaRegUser size={50} color="white" />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="relative w-full p-4">
          <label
            htmlFor="input-name"
            className="absolute top-1 left-5 bg-white px-1 text-md"
          >
            Name
          </label>
          <input
            type="text"
            id="input-name"
            className="border border-gray-300 rounded w-full pt-6 px-2 focus:outline-none focus:border-blue-500 text-xl "
            value={capitalizeFirstLetter(user ? user.username : "Not Logged In")}
            readOnly
          />
          <div className="absolute top-1 left-5 w-10 h-2 bg-white"></div>
        </div>
        <div className="relative w-full p-4">
          <label
            htmlFor="input-email"
            className="absolute top-1 left-5 bg-white px-1 text-md"
          >
            Email
          </label>
          <input
            type="text"
            id="input-email"
            className="border border-gray-300 rounded w-full pt-6 px-2 focus:outline-none focus:border-blue-500"
            // Add value and readOnly if you want to show user email
            value={user ? user.userEmail : ""}
            readOnly
          />
          <div className="absolute top-1 left-5 w-10 h-2 bg-white"></div>
        </div>
        <div className="relative w-full p-4">
          <label
            htmlFor="input-mobile"
            className="absolute top-1 left-5 bg-white px-1 text-md"
          >
            Mobile Number
          </label>
          <input
            type="text"
            id="input-mobile"
            className="border border-gray-300 rounded w-full pt-6 px-2 focus:outline-none focus:border-blue-500"
            // Add value and readOnly if you want to show user mobile number
            value={user ? user.mobileNumber : ""}
            readOnly
          />
          <div className="absolute top-1 left-5 w-10 h-2 bg-white"></div>
        </div>
        <div className="relative w-full p-4">
          <label
            htmlFor="input-gender"
            className="absolute top-1 left-5 bg-white px-1 text-md"
          >
            Gender
          </label>
          <input
            type="text"
            id="input-gender"
            className="border border-gray-300 rounded w-full pt-6 px-2 focus:outline-none focus:border-blue-500"
            // Add value and readOnly if you want to show user gender
            value={user ? user.gender : ""}
            readOnly
          />
          <div className="absolute top-1 left-5 w-10 h-2 bg-white"></div>
        </div>
        <div className="absolute ml-4 h-[50px] w-[150px] bg-secondary justify-center items-center flex rounded-xl bottom-10">
          Change Password
        </div>
      </div>
    </div>
  );
}

export default Settings;
