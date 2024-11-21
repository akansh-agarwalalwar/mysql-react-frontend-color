import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import UserContext from "../login/UserContext";
import one from "../../images/profile_one.jpg";
import background from "../../images/background.png";
import axios from "axios";
import toast from "react-hot-toast";

function Settings() {
  const { user } = useContext(UserContext);
  const [profileImage, setProfileImage] = useState(null);
  const [username, setUsername] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState({ username: "", mobileNumber: "" });
// const getUserInfo = async () =>{
//   try {
//     const response = await axios.get(`http://localhost:3000/api/v1/user/getUserInfo/${user.userId}`);
//     setUsername(response.data.username);
//     setMobileNumber(response.data.mobileNumber);
//   } catch (error) {
//     toast.error("Failed to fetch user information.");
//   }
// }
// useEffect(() => {
//   getUserInfo();
//   }, []);
  useEffect(() => {
    // Initialize state with user data
    setUsername(user?.username || "");
    setMobileNumber(user?.mobileNumber || "");

    // Array of profile images
    const profileImages = [one];
    // Randomly select an image
    const randomImage =
      profileImages[Math.floor(Math.random() * profileImages.length)];
    setProfileImage(randomImage);
  }, [user]);

  const capitalizeFirstLetter = (string) => {
    return string
      ? string.charAt(0).toUpperCase() + string.slice(1)
      : "Not Logged In";
  };

  const validateFields = () => {
    const usernameRegex = /^[A-Za-z]+$/; // Only letters
    const mobileNumberRegex = /^[0-9]{10}$/; // Exactly 10 digits

    let isValid = true;
    let errors = { username: "", mobileNumber: "" };

    if (!usernameRegex.test(username)) {
      errors.username = "Name can only contain letters.";
      isValid = false;
    }

    if (!mobileNumberRegex.test(mobileNumber)) {
      errors.mobileNumber = "Mobile number must be exactly 10 digits.";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const editUserProfile = async (e) => {
    e.preventDefault();
    if (!validateFields()) return; // Validate fields before making the API call

    try {
      const res = await axios.post(
        "http://api.perfectorse.site/api/v1/user/editUserProfile",
        {
          userId: user.userId,
          username,
          mobileNumber,
        }
      );
      if (res.status === 200) {
        // Close the modal after a successful update
        setIsModalOpen(false);
        toast.success("Profile Updated")
        setUsername('');
        setMobileNumber('')
        // Optionally, update the user context with the new values
        // ...
      }
    } catch (error) {
      console.error(error);
    }
  };
const handleClose = () =>{
  setIsModalOpen(false);
  setUsername('');
  setMobileNumber('')
}
  return (
    <div className="max-w-md mx-auto">
      <div
        className="flex flex-col bg-myblue-800 h-screen"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div>
          <div className="flex items-center bg-black w-full text-black py-3 px-4">
            <Link to="/home/profile" className="mr-4">
              <div className="p-2">
                <IoIosArrowBack size={20} color="#FFF" />
              </div>
            </Link>
            <p className="text-xl font-bold text-white">Profile</p>
          </div>
        </div>
        <div
          className="flex p-3 cursor-pointer justify-end"
          onClick={() => setIsModalOpen(true)}
        >
          <div className="bg-red-100 p-3 rounded-lg">
            Edit
          </div>
        </div>
        <div className="flex items-center justify-center mb-6 ">
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
            <label className="px-1 text-lg">Name</label>
            <input
              type="text"
              id="input-name"
              className="rounded w-full py-2 px-3 text-lg"
              value={capitalizeFirstLetter(user?.username)}
              readOnly
            />
          </div>
          <div className="relative shadow-lg">
            <label className="px-1 text-lg">Email</label>
            <input
              type="text"
              id="input-email"
              className="rounded w-full py-2 px-3 text-lg"
              value={user?.useremail || "email"}
              readOnly
            />
          </div>

          <div className="relative shadow-lg">
            <label className="px-1 text-lg">Mobile Number</label>
            <input
              type="text"
              id="input-mobile"
              className="rounded w-full py-2 px-3 text-lg"
              value={user?.mobileNumber || "mobileNumber"}
              readOnly
            />
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">Edit Profile</h2>
            <form onSubmit={editUserProfile}>
              <div className="mb-4">
                <label className="block">Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {errors.username && (
                  <p className="text-red-500 text-sm">{errors.username}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block">Mobile Number</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  pattern="[0-9]*"
                />
                {errors.mobileNumber && (
                  <p className="text-red-500 text-sm">{errors.mobileNumber}</p>
                )}
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-red-100 text-white px-4 py-2 rounded mr-2"
                  onClick={() => handleClose()}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-myblue-700 text-white px-4 py-2 rounded"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;
