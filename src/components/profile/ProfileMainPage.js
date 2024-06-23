import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import BottomNav from "../dashboard/BottomNav";
import { FaRegUser, FaDownload } from "react-icons/fa6";
import UserContext from "../login/UserContext";
import { IoSettingsOutline } from "react-icons/io5";
import {
  MdLibraryBooks,
  MdContactSupport,
  MdOutlineSupportAgent,
  MdKeyboardArrowRight,
} from "react-icons/md";
import { TbReceiptRupee } from "react-icons/tb";
import { RiChatFollowUpFill } from "react-icons/ri";
import { AiTwotoneBank } from "react-icons/ai";
import Axios from "axios";
import Cookies from "js-cookie";

const sideNavData = [
  {
    title: "Order Record",
    icon: <MdLibraryBooks />,
    path: "/order-record",
  },
  {
    title: "Financial Details",
    icon: <TbReceiptRupee />,
    path: "/financial-details",
  },
  {
    title: "Bank Details",
    icon: <AiTwotoneBank />,
    path: "/bank-details",
  },
  {
    title: "Download",
    icon: <FaDownload />,
    path: "/download",
  },
  {
    title: "Follow Us",
    icon: <RiChatFollowUpFill />,
    path: "/follow-us",
  },
  {
    title: "Support",
    icon: <MdContactSupport />,
    path: "/support",
  },
  {
    title: "Complaint",
    icon: <MdOutlineSupportAgent />,
    path: "/complaint",
  },
];

const ProfileMainPage = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="flex flex-col px-8 bg-myblue-500 min-h-screen text-richblack-5">
      <div className="flex items-center mt-8">
        <div className="bg-richblue-200 rounded-full p-3 flex justify-center items-center">
          <FaRegUser size={30} color="white" />
        </div>
        <div className="flex justify-between w-full ml-2">
          <div>
            <p className="text-2xl text-start border-b border-richblack-50 uppercase text-richblack-900">
              {user ? user.username : "Not Logged In"}
            </p>
            <h1 className=" text-richblack-700">
              ID : {user ? user.userId : "Not Logged In"}
            </h1>
          </div>
          <div className="w-7 h-7 flex items-center justify-center rounded-full border border-richblack-700 bg-richblack-800">
            <Link to="/setting">
              <IoSettingsOutline className="text-richblack-50" />
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <h2 className="text-xl font-bold mb-4 text-black">Quick Links</h2>
        <ul className="flex flex-col space-y-2">
          {sideNavData.map((item, index) => (
            <div
              className={`rounded-lg px-7 border-b border-richblack-100 ${
                index % 2 === 0 ? "bg-richblue-5" : "bg-white"
              }`}
              key={index}
            >
              <Link
                to={item.path}
                className={`flex items-center justify-between py-4`}
              >
                <div className="flex items-center space-x-2">
                  <p className="text-2xl text-myblue-400">{item.icon}</p>
                  <p className=" text-lg text-black">{item.title}</p>
                </div>
                <MdKeyboardArrowRight className="text-myblue-400" />
              </Link>
            </div>
          ))}
        </ul>
      </div>
      <button
        onClick={handleLogout}
        className="mb-16 mt-5 font-semibold p-3 bg-myblue-200 rounded-md w-full shadow-lg"
      >
        Sign Out
      </button>
      <BottomNav />
    </div>
  );
};

export default ProfileMainPage;
