import React from 'react';
import { FaHome, FaUser, FaMoneyBillWave, FaUserFriends } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function BottomNav({ activeButton, setActiveButton }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200">
      <div className="flex justify-around py-2">
        <Link to="/home" className={`flex flex-col items-center text-gray-700 focus:outline-none ${activeButton === "Home" ? 'text-blue-500' : ''}`}>
          <FaHome />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link to='/invite'>
        <NavButton 
          icon={<FaUserFriends />} 
          label="Invite" 
          active={activeButton === "Invite"} 
          onClick={() => setActiveButton("Invite")}
        />
        </Link>
        <Link to="/recharge" className={`flex flex-col items-center text-gray-700 focus:outline-none ${activeButton === "Recharge" ? 'text-blue-500' : ''}`}>
          <FaMoneyBillWave />
          <span className="text-xs mt-1">Recharge</span>
        </Link>
        <Link to="/profile" className={`flex flex-col items-center text-gray-700 focus:outline-none ${activeButton === "Profile" ? 'text-blue-500' : ''}`}>
          <FaUser />
          <span className="text-xs mt-1">Profile</span>
        </Link>
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
