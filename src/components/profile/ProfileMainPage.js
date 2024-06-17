import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../dashboard/BottomNav";
import { FaRegUser, FaDownload } from "react-icons/fa6";
import UserContext from "../login/UserContext";
import { IoSettingsOutline, IoInformationSharp } from "react-icons/io5";
import { MdLibraryBooks, MdContactSupport, MdOutlineSupportAgent } from "react-icons/md";
import { TbReceiptRupee } from "react-icons/tb";
import { RiChatFollowUpFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import Axios from "axios";
import Cookies from 'js-cookie';
import { AiTwotoneBank } from "react-icons/ai";
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
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await Axios.post("https://mysql-color-backend-1.onrender.com/logout");
      setUser(null);
      Cookies.remove('user');
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="flex flex-col mt-4 px-8">
      <h1 className="flex text-2xl items-center font-bold justify-center">
        Profile
      </h1>
      <div className="flex items-center  mt-8">
        <div className="bg-blue-500 rounded-full items-center justify-center p-3 flex row">
          <FaRegUser size={30} color="white" />
        </div>
        <div className="row flex justify-between w-full ml-2 h-full">
          <div>
            <p className="text-2xl text-start border-b border-richblue-50  uppercase">{user ? user.username : "Not Logged In"}</p>
            <h1 className="text-richblack-500">ID : {user ? user.userId : "Not Logged In"}</h1>
          </div>
          <div className="justify-between h-full">
            <div className="w-7 h-7 flex items-center justify-center rounded-full border border-black bg-white">
              <Link to='/setting'>
              <IoSettingsOutline />
              </Link>
            </div>
            <div className="w-7 h-7 flex items-center justify-center rounded-full border border-black bg-white mt-2">
              <IoInformationSharp />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Quick Links</h2>
        <ul className="flex flex-col space-y-2">
          {sideNavData.map((item, index) => (
            <div className={`rounded-lg px-7 border-b border-richblack-300  ${index % 2 === 0? 'bg-richblue-5' : ''}`} key={index}>
              <Link to={item.path} className={`flex items-center justify-between border-richblack-300 py-4 ${index % 2 === 0? 'even:bg-richblue-200' : ''}`}>
                <div className="flex items-center space-x-2 ">
                  <p className="text-2xl text-richblue-300">{item.icon} </p>
                  <p className="text-xl text-richblack-500 ">{item.title}</p> 
                </div>
                <MdKeyboardArrowRight />
              </Link>
            </div>
          ))}
        </ul>
      </div>
      <button
        onClick={handleLogout}
        className="mb-16 mt-5 font-semibold p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full"
      >
        Sign Out
      </button>
      <BottomNav />
    </div>
  );
};

export default ProfileMainPage;
