import React, { useContext } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa6";
import UserContext from "../login/UserContext";

function Settings() {
  const { user } = useContext(UserContext);

  const capitalizeFirstLetter = (string) => {
    return string ? string.charAt(0).toUpperCase() + string.slice(1) : "Not Logged In";
  };

  return (
    <div className="px-4 py-6">
      <div className="flex items-center bg-myblue-200 py-2 px-4 fixed top-0 left-0 right-0">
        <Link to="/profile" className="text-white">
          <FaArrowLeftLong size={20} />
        </Link>
        <h1 className="text-xl font-bold text-white ml-3 flex-grow text-center">Update Profile</h1>
      </div>
      <div className="flex items-center justify-center mb-6 mt-16">
        <div className="bg-blue-500 rounded-full p-3">
          <FaRegUser size={50} color="white" />
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        <div className="relative mt-4">
          <label className="absolute top-0 left-3 bg-white px-1 text-sm -mt-4">
            Name
          </label>
          <input
            type="text"
            id="input-name"
            className="border border-gray-300 rounded w-full py-2 px-3 text-lg mb-3"
            value={capitalizeFirstLetter(user?.username)}
            readOnly
          />
        </div>
        <div className="relative mt-4">
          <label className="absolute top-0 left-3 bg-white px-1 text-sm -mt-4">
            Email
          </label>
          <input
            type="text"
            id="input-email"
            className="border border-gray-300 rounded w-full py-2 px-3 text-lg mb-3"
            value={user?.useremail || "email"}
            readOnly
          />
        </div>
        <div className="relative mt-3">
          <label className="absolute top-0 left-3 bg-white px-1 text-sm -mt-4">
            Mobile Number
          </label>
          <input
            type="text"
            id="input-mobile"
            className="border border-gray-300 rounded w-full py-2 px-3 text-lg"
            value={user?.mobileNumber || "mobileNumber"}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}

export default Settings;
