import React from 'react';
import { FaHome, FaUser, FaMoneyBillWave, FaUserFriends } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const BottomNav = ({ activeButton, setActiveButton }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-myblue-100 shadow-lg border-t border-richblack-700">
      <div className="flex justify-around py-2">
        <NavLink 
          to="/home" 
          label="Home" 
          icon={<FaHome />} 
          active={activeButton === "Home"} 
          onClick={() => setActiveButton("Home")} 
        />
        <NavLink 
          to="/invite" 
          label="Invite" 
          icon={<FaUserFriends />} 
          active={activeButton === "Invite"} 
          onClick={() => setActiveButton("Invite")} 
        />
        <NavLink 
          to="/recharge" 
          label="Recharge" 
          icon={<FaMoneyBillWave />} 
          active={activeButton === "Recharge"} 
          onClick={() => setActiveButton("Recharge")} 
        />
        <NavLink 
          to="/profile" 
          label="Profile" 
          icon={<FaUser />} 
          active={activeButton === "Profile"} 
          onClick={() => setActiveButton("Profile")} 
        />
      </div>
    </div>
  );
};

const NavLink = ({ to, icon, label, active, onClick }) => {
  return (
    <Link 
      to={to} 
      className={`flex flex-col items-center text-gray-400 focus:outline-none ${active ? 'text-myblue-200' : 'text-myblue-200'}`}
      onClick={onClick}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </Link>
  );
};

export default BottomNav;
