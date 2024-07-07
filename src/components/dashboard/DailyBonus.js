import React, { useState, useEffect, useContext } from "react";
import { FaCoins } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import axios from 'axios';
import UserContext from "../login/UserContext";

function DailyBonus() {
  const { user, setUser } = useContext(UserContext);
  console.log(user);
  const [bonusEarned, setBonusEarned] = useState(false);

  useEffect(() => {
    const userAlreadyEarnedBonus = checkUserBonus();
    setBonusEarned(userAlreadyEarnedBonus);
  }, []);

  const handleClaimBonus = async () => {
    if (bonusEarned) {
      alert("You have already claimed your daily bonus for today!");
    } else {
      console.log("Claiming bonus for user ID:", user.userId);
      try {
        const response = await axios.post('https://color-server.onrender.com/api/claim-bonus', { userId: user.userId });
        setUser({ ...user, balance: response.data.newBalance });
        setBonusEarned(true);
        alert(response.data.message);
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

  return (
    <div className="flex flex-col w-full h-screen bg-myblue-500">
      <div className="flex flex-row bg-myblue-200 w-full text-white items-center h-12">
        <Link to="/home">
          <FaArrowLeftLong className="mx-3" />
        </Link>
        <p className="text-xl">Daily Bonus</p>
      </div>
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="border-2 border-myblue-200 w-[80%] p-3 justify-center items-center flex flex-col shadow shadow-lg rounded-2xl">
          <h1 className="text-3xl font-bold mb-4">Daily Bonus</h1>
          <div className="flex items-center mb-4 justify-center">
            <FaCoins size={24} className="mr-2" />
            <p className="text-lg">Earn 2 Rs daily bonus!</p>
          </div>
          {!bonusEarned ? (
            <button
              onClick={handleClaimBonus}
              className="px-4 py-2 bg-myblue-200 text-white rounded-md shadow-lg w-[150px] justify-center"
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
