import React from 'react';
import { FaHome, FaUser, FaMoneyBillWave, FaUserFriends } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const BottomNav = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-myblue-100 shadow-lg border-t border-richblack-700">
      <div className="flex justify-around py-2">
        <NavLink 
          to="/home" 
          label="Home" 
          icon={<FaHome />} 
          
        />
        <NavLink 
          to="/home/invite" 
          label="Invite" 
          icon={<FaUserFriends />} 
        
        />
        <NavLink 
          to="/home/recharge" 
          label="Recharge" 
          icon={<FaMoneyBillWave />} 
          
        />
        <NavLink 
          to="/home/profile" 
          label="Profile" 
          icon={<FaUser />} 
        />
      </div>
    </div>
  );
};

const NavLink = ({to,icon,label}) => {
  return (
    <Link 
      to={to} 
      className="flex flex-col items-center focus:outline-none text-myblue-200"
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </Link>
  );
};

export default BottomNav;