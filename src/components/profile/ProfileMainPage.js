import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import BottomNav from "../dashboard/BottomNav";
import { FaRegUser } from "react-icons/fa6";
import UserContext from "../login/UserContext";
import { IoSettingsOutline } from "react-icons/io5";
import one from "../../images/profile_one.jpg";
import two from "../../images/profile_two.jpg";
import three from "../../images/profile_three.jpg";
import four from "../../images/profile_four.jpg";
import {
  MdLibraryBooks,
  MdContactSupport,
  MdOutlineSupportAgent,
  MdKeyboardArrowRight,
} from "react-icons/md";
import { TbReceiptRupee } from "react-icons/tb";
import { RiChatFollowUpFill } from "react-icons/ri";
import { AiTwotoneBank } from "react-icons/ai";
import Wallet from "./Wallet";

const sideNavData = [
  {
    title: "Order Record",
    icon: <MdLibraryBooks />,
    path: "/home/profile/order-record",
  },
  {
    title: "Financial Details",
    icon: <TbReceiptRupee />,
    path: "/home/profile/financial-details",
  },
  {
    title: "Bank Details",
    icon: <AiTwotoneBank />,
    path: "/home/profile/bank-details",
  },
  // {
  //   title: "Download",
  //   icon: <AiTwotoneBank />,
  //   path: "/home/profile/bank-details",
  // },
  {
    title: "Follow Us",
    icon: <RiChatFollowUpFill />,
    onClick: () => window.open("https://t.me/Perfectorse", "_blank"),
  },
  {
    title: "Support",
    icon: <MdContactSupport />,
    onClick: () => window.open("https://t.me/+bp_hjMGPihwyN2E9", "_blank"),
  },
];

const ProfileMainPage = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const profileImages = [one];
    const randomImage =
      profileImages[Math.floor(Math.random() * profileImages?.length)];
    setProfileImage(randomImage);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="flex flex-col bg-myblue-500 min-h-screen text-richblack-5 max-w-md mx-auto">
      {/* <div className="flex items-center mt-8">
        <div className="rounded-full p-3 flex justify-center items-center -ml-5">
          {profileImage ? (
            <div
              style={{
                backgroundImage: `url(${profileImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "48px",
                height: "48px",
                borderRadius: "50%",
              }}
            />
          ) : (
            <FaRegUser size={30} color="white" />
          )}
        </div>
        <div className="flex justify-between w-full ml-2">
          <div>
            <p className="text-2xl text-start border-b border-richblack-50 uppercase text-richblack-900">
              {user ? user.username : "Not Logged In"}
            </p>
            <h1 className="text-richblack-700">
              ID : {user ? user.userId : "Not Logged In"}
            </h1>
          </div>
          <div className="flex items-center justify-center">
            <Link to="/home/profile/setting">
              <IoSettingsOutline className="rounded-full h-9 w-9 text-richblack-900" />
            </Link>
          </div>
        </div>
      </div> */}
      {/* <div className="flex w-full justify-end mt-8">
        <Link to="/home/profile/setting">
          <IoSettingsOutline className="rounded-full h-9 w-9 text-richblack-900" />
        </Link>
      </div> */}
      <Wallet />
      <div className="mt-5  px-8">
        <h2 className="text-xl font-bold mb-4 text-black">Quick Links</h2>
        <ul className="flex flex-col space-y-2">
          {sideNavData?.map((item, index) => (
            <div
              className={`rounded-lg px-7 border-b border-richblack-100 ${
                index % 2 === 0 ? "bg-richblue-5" : "bg-white"
              }`}
              key={index}
              onClick={item.onClick ? item.onClick : null}
            >
              {item.path ? (
                <Link
                  to={item.path}
                  className="flex items-center justify-between py-4"
                >
                  <div className="flex items-center space-x-2">
                    <p className="text-2xl text-myblue-400">{item.icon}</p>
                    <p className="text-lg text-black">{item.title}</p>
                  </div>
                  <MdKeyboardArrowRight className="text-myblue-400" />
                </Link>
              ) : (
                <div className="flex items-center justify-between py-4">
                  <div className="flex items-center space-x-2">
                    <p className="text-2xl text-myblue-400">{item.icon}</p>
                    <p className="text-lg text-black">{item.title}</p>
                  </div>
                  <MdKeyboardArrowRight className="text-myblue-400" />
                </div>
              )}
            </div>
          ))}
        </ul>
      </div>
      <div className=" px-8">
        <button
          onClick={handleLogout}
          className="mb-16 mt-5 font-semibold p-3  bg-myblue-200 rounded-md w-full shadow-lg"
        >
          Sign Out
        </button>
      </div>

      <BottomNav />
    </div>
  );
};

export default ProfileMainPage;
