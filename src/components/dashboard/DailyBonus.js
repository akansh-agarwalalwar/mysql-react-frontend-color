import React, { useState, useEffect } from "react";
import { FaCoins } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

function DailyBonus() {
  const [bonusEarned, setBonusEarned] = useState(false);

  useEffect(() => {
    const userAlreadyEarnedBonus = checkUserBonus();
    setBonusEarned(userAlreadyEarnedBonus);
  }, []);

  const handleClaimBonus = () => {
    if (bonusEarned) {
      alert("You have already claimed your daily bonus for today!");
    } else {
      claimBonus();
      setBonusEarned(true);
      alert("Congratulations! You have earned 1 Rs bonus.");
    }
  };
  const checkUserBonus = () => {
    return false;
  };

  const claimBonus = () => {
    console.log("Bonus claimed!");
  };

  return (
    <div className="flex flex-col w-full absolute">
      <div className="w-full bg-blue-500 h-12 px-3 flex items-center justify-center fixed top-0">
        <div className="absolute left-0 ml-2">
          <Link to="/home">
            <FaArrowLeftLong size={20} className="text-white" />
          </Link>
        </div>
        <div className="flex items-center justify-center ml-4">
          <h1 className="text-2xl font-bold text-white">Daily Bonus</h1>
        </div>
      </div>
      <h1 className="text-3xl font-bold mb-4">Daily Bonus</h1>
      <div className="flex items-center mb-4">
        <FaCoins size={24} className="mr-2" />
        <p className="text-lg">Earn 1 Rs daily bonus!</p>
      </div>
      {!bonusEarned ? (
        <button
          onClick={handleClaimBonus}
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition"
        >
          Claim Bonus
        </button>
      ) : (
        <p className="text-green-500 font-bold">Bonus claimed for today!</p>
      )}
    </div>
  );
}

export default DailyBonus;
