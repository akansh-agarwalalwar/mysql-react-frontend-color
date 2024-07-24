import React, { useContext, useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa6";
import UserContext from "../login/UserContext";
import one from '../../images/profile_one.jpg';
import two from '../../images/profile_two.jpg';
import three from '../../images/profile_three.jpg';
import four from '../../images/profile_four.jpg';

function Settings() {
  const { user } = useContext(UserContext);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    // Array of profile images
    const profileImages = [one, two, three, four];
    // Randomly select an image
    const randomImage = profileImages[Math.floor(Math.random() * profileImages?.length)];
    setProfileImage(randomImage);
  }, []);

  const capitalizeFirstLetter = (string) => {
    return string ? string.charAt(0).toUpperCase() + string.slice(1) : "Not Logged In";
  };


  return (
    <div className="px-4 py-6 max-w-md mx-auto">
      <div className="flex items-center bg-myblue-200 py-2 px-4 fixed top-0 w-full">
        <Link to='/home'>
        <div className="text-white">
          <FaArrowLeftLong size={20} />
        </div>
        </Link>
        <h1 className="text-xl text-white flex-grow text-center -ml-4">Profile</h1>
      </div>
      <div className="flex items-center justify-center mb-6 mt-16">
        {profileImage ? (
          <div
            style={{
              backgroundImage: `url(${profileImage})`,
              backgroundSize: 'cover',
              width: '100px',
              height: '100px',
              borderRadius: '50%',
            }}
          />
        ) : (
          <div className="bg-blue-500 rounded-full p-3">
            <FaRegUser size={50} color="white" />
          </div>
        )}
      </div>
      <div className="flex flex-col space-y-4">
        <div className="relative mt-4">
          <label className="absolute top-1 left-3 bg-white px-1 text-sm -mt-4">
            Name
          </label>
          <input
            type="text"
            id="input-name"
            className="border border-gray-300 rounded w-full py-2 px-3 text-lg mb-3 shadow-lg"
            value={capitalizeFirstLetter(user?.username)}
            readOnly
          />
        </div>
        <div className="relative mt-4">
          <label className="absolute top-1 left-3 bg-white px-1 text-sm -mt-4">
            Email
          </label>
          <input
            type="text"
            id="input-email"
            className="border border-gray-300 rounded w-full py-2 px-3 text-lg mb-3 shadow-lg"
            value={user?.useremail || "email"}
            readOnly
          />
        </div>
        <div className="relative mt-3">
          <label className="absolute top-1 left-3 bg-white px-1 text-sm -mt-4">
            Mobile Number
          </label>
          <input
            type="text"
            id="input-mobile"
            className="border border-gray-300 rounded w-full py-2 px-3 text-lg shadow-lg"
            value={user?.mobileNumber || "mobileNumber"}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}

export default Settings;
