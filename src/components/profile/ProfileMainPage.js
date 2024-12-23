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
import background from "../../images/background.png";

const sideNavData = [
  {
    title: "Profile",
    icon: <IoSettingsOutline />,
    path: "/home/profile/setting",
  },
  // {
  //   title: "Order Record",
  //   icon: <MdLibraryBooks />,
  //   path: "/home/profile/order-record",
  // },
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
    onClick: () => window.open("https://t.me/+ltD8oPxtiyVjNzE1", "_blank"),
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
    navigate("/signup");
  };

  return (
    <div
      className="flex flex-col bg-myblue-500 min-h-screen text-richblack-5 max-w-md mx-auto"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Wallet />
      <div className="mt-5 px-8">
        <h2 className="text-xl mb-4 text-black font-bold">Quick Links</h2>
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
                    <p className="text-2xl text-black">{item.icon}</p>
                    <p className="text-lg text-black font-bold">{item.title}</p>
                  </div>
                  <MdKeyboardArrowRight className="text-myblue-400" />
                </Link>
              ) : (
                <div className="flex items-center justify-between py-4">
                  <div className="flex items-center space-x-2">
                    <p className="text-2xl text-black">{item.icon}</p>
                    <p className="text-lg text-black font-bold">{item.title}</p>
                  </div>
                  <MdKeyboardArrowRight className="text-myblue-400" />
                </div>
              )}
            </div>
          ))}
        </ul>
      </div>
      <div className="px-8">
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
