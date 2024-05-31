import React from 'react';
import { FaHome, FaUser, FaMoneyBillWave, FaUserFriends } from 'react-icons/fa';

export default function BottomNav({ activeButton, setActiveButton }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200">
      <div className="flex justify-around py-2">
        <NavButton 
          icon={<FaHome />} 
          label="Home" 
          active={activeButton === "Home"}
          onClick={() => setActiveButton("Home")} 
        />
        <NavButton 
          icon={<FaUserFriends />} 
          label="Invite" 
          active={activeButton === "Invite"} 
          onClick={() => setActiveButton("Invite")}
        />
        <NavButton 
          icon={<FaMoneyBillWave />} 
          label="Recharge" 
          active={activeButton === "Recharge"} 
          onClick={() => setActiveButton("Recharge")} 
        />
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
