import React, { useState } from "react";
import { FaHome, FaUser, FaMoneyBillWave } from "react-icons/fa";
import { LuBadgeDollarSign } from "react-icons/lu";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const BottomNav = () => {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-myblue-100 shadow-lg border-t border-richblack-700 max-w-md mx-auto">
      <div className="flex justify-around py-2">
        <NavLink to="/home" label="Home" icon={<FaHome />} isActive={location.pathname === "/home"} />
        <NavLink to="/home/invite" label="Earn" icon={<LuBadgeDollarSign />} isActive={location.pathname === "/home/invite"} />
        <NavLink to="/home/recharge" label="Recharge" icon={<FaMoneyBillWave />} isActive={location.pathname === "/home/recharge"} />
        <NavLink to="/home/profile" label="Profile" icon={<FaUser />} isActive={location.pathname === "/home/profile"} />
      </div>
    </div>
  );
};

const NavLink = ({ to, icon, label, isActive }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
  };

  return (
    <Link
      to={to}
      onClick={handleClick}
      className={`relative flex flex-col items-center focus:outline-none transition duration-300 ${isActive ? "text-secondary" : "text-myblue-200"}`}
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={isActive ? { y: -8, scale: 1.2 } : { y: 0, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center p-2 rounded-full relative"
      >
        {icon}
        <span className="text-xs mt-1">{label}</span>
        {isActive && (
          <motion.div
            className="absolute bottom-0 transform -translate-x-1/2 w-6 h-0.5 bg-secondary rounded-full"
            layoutId="underline"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </motion.div>
      {isClicked && (
        <motion.div
          className="absolute inset-0 bg-white rounded-full"
          initial={{ scale: 0.5, opacity: 0.5 }}
          animate={{ scale: 1.2, opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </Link>
  );
};

export default BottomNav;
