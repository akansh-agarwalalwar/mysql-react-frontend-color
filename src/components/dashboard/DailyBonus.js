import React, { useState, useEffect, useContext } from "react";
import { FaCoins } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import axios from 'axios';
import UserContext from "../login/UserContext";
import "./DailyBonus.css"; 

function DailyBonus() {
  const { user, setUser } = useContext(UserContext);
  // console.log(user);
  const [bonusEarned, setBonusEarned] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const [hasRecharged, setHasRecharged] = useState(false);

  useEffect(() => {
    // console.log(user)
    const userAlreadyEarnedBonus = checkUserBonus();
    setBonusEarned(userAlreadyEarnedBonus);
    setAnimateIn(true);
    checkIfUserHasRecharged();
  }, [user]);
  
 
  const handleClaimBonus = async () => {
    if (bonusEarned) {
      alert("You have already claimed your daily bonus for today!");
    } else if (!hasRecharged) {
      alert("You need to recharge your account at least once to claim the daily bonus!");
    } else {
      try {
        const response = await axios.post(`http://localhost:3001/api/claim-bonus`, { userId: user?.userId });
        setUser({...user, balance: response?.data?.newBalance });
        setBonusEarned(true);
        localStorage?.setItem("lastBonusClaimed", new Date().toISOString());
      } catch (error) {
        console.error("Error claiming bonus:", error);
        alert(error.response?.data?.error || "Failed to claim bonus");
      }
    }
  };
  const checkUserBonus = () => {
    const lastClaimed = localStorage.getItem("lastBonusClaimed");
    if (!lastClaimed) return false;

    const lastClaimedDate = new Date(lastClaimed);
    const now = new Date();
    const timeDifference = now - lastClaimedDate;
    const oneDay = 24 * 60 * 60 * 1000;

    return timeDifference < oneDay;
  };

  const checkIfUserHasRecharged = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/user/${user?.userId}/recharge-history`);
      const rechargeHistory = response.data;
      if (rechargeHistory.length > 0) {
        setHasRecharged(true);
      }
    } catch (error) {
      console.error("Error checking recharge history:", error);
    }
  };
  return (
    <div className={`flex flex-col w-full h-screen bg-myblue-500 ${animateIn ? 'fade-in-top active' : ''}`}>
      <div className="flex flex-row bg-myblue-200 w-full text-white items-center h-12">
        <Link to="/home">
          <FaArrowLeftLong className="mx-3" />
        </Link>
        <p className="text-xl">Daily Bonus</p>
      </div>
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="border-2 border-myblue-200 bg-myblue-200 w-[80%] p-3 justify-center items-center flex flex-col shadow-lg rounded-2xl text-white">
          <h1 className="text-3xl font-bold mb-4 ">Daily Bonus</h1>
          <div className="flex items-center mb-4 justify-center">
            <FaCoins size={24} className="mr-2" />
            <p className="text-lg">Earn 2 Rs daily bonus!</p>
          </div>
          {!bonusEarned ? (
            <button
              onClick={handleClaimBonus}
              className="px-4 py-2 bg-white text-myblue-200 rounded-md shadow-lg w-[150px] justify-center"
            >
              Claim Bonus
            </button>
          ) : (
            <p className="text-green-100 font-bold">Bonus claimed for today!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DailyBonus;
