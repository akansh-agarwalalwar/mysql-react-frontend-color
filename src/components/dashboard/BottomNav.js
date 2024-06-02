import React from 'react';
import { FaHome, FaUser, FaMoneyBillWave, FaUserFriends } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function BottomNav({ activeButton, setActiveButton }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200">
      <div className="flex justify-around py-2">
      <Link to="/home" className="flex flex-col items-center text-gray-700 focus:outline-none">
          <FaMoneyBillWave className="text-blue-500" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <NavButton 
          icon={<FaUserFriends />} 
          label="Invite" 
          active={activeButton === "Invite"} 
          onClick={() => setActiveButton("Invite")}
        />
        <Link to="/recharge" className="flex flex-col items-center text-gray-700 focus:outline-none">
          <FaMoneyBillWave className="text-blue-500" />
          <span className="text-xs mt-1">Recharge</span>
        </Link>
        <NavButton 
          icon={<FaUser />} 
          label="My Profile" 
          active={activeButton === "Profile"} 
          onClick={() => setActiveButton("Profile")} 
        />
      </div>
    </div>
  );
}

function NavButton({ icon, label, active, onClick }) {
  return (
    <button 
      className={`flex flex-col items-center text-gray-700 focus:outline-none ${active ? 'text-blue-500' : 'hover:text-blue-500'}`}
      onClick={onClick}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </button>
  );
}
