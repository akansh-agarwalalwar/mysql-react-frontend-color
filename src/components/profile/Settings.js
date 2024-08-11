import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { FaRegUser } from "react-icons/fa6";
import UserContext from "../login/UserContext";
import one from "../../images/profile_one.jpg";
import two from "../../images/profile_two.jpg";
import three from "../../images/profile_three.jpg";
import four from "../../images/profile_four.jpg";
import background from '../../images/background.png';

function Settings() {
  const { user } = useContext(UserContext);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    // Array of profile images
    const profileImages = [one];
    // Randomly select an image
    const randomImage =
      profileImages[Math.floor(Math.random() * profileImages.length)];
    setProfileImage(randomImage);
  }, []);

  const capitalizeFirstLetter = (string) => {
    return string
      ? string.charAt(0).toUpperCase() + string.slice(1)
      : "Not Logged In";
  };

  return (
    <div className=" max-w-md mx-auto">
      <div className="flex flex-col bg-myblue-800 h-screen"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <div>
          <div className="flex items-center bg-black w-full text-black py-3 px-4">
            <Link to="/home/profile" className="mr-4">
              <div className=" p-2">
                <IoIosArrowBack size={20} color="#FFF" />
              </div>
            </Link>
            <p className="text-xl font-bold text-white">Profile</p>
          </div>
        </div>

        <div className="flex items-center justify-center mb-6 mt-16">
          {profileImage ? (
            <div
              style={{
                backgroundImage: `url(${profileImage})`,
                backgroundSize: "cover",
                width: "100px",
                height: "100px",
                borderRadius: "50%",
              }}
            />
          ) : (
            <div className="bg-blue-500 rounded-full p-3">
              <FaRegUser size={50} color="white" />
            </div>
          )}
        </div>

        <div className="flex flex-col space-y-4 px-3">
          <div className="relative shadow-lg">
            <label className=" px-1 text-lg">Name</label>
            <input
              type="text"
              id="input-name"
              className=" rounded w-full py-2 px-3 text-lg "
              value={capitalizeFirstLetter(user?.username)}
              readOnly
            />
          </div>

          <div className="relative shadow-lg">
            <label className="px-1 text-lg">Email</label>
            <input
              type="text"
              id="input-email"
              className=" rounded w-full py-2 px-3 text-lg "
              value={user?.useremail || "email"}
              readOnly
            />
          </div>

          <div className="relative shadow-lg">
            <label className=" px-1 text-lg">Mobile Number</label>
            <input
              type="text"
              id="input-mobile"
              className=" rounded w-full py-2 px-3 text-lg "
              value={user?.mobileNumber || "mobileNumber"}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
