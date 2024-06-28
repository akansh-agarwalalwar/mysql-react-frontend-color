import React, { useState, useEffect, useContext } from "react";
import { FaCoins } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import UserContext from "../login/UserContext";

function DailyBonus() {
  const { user, setUser } = useContext(UserContext);
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
      alert("Congratulations! You have earned 2 Rs bonus.");
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

  const claimBonus = () => {
    const newBalance = user.balance + 2;
    setUser({ ...user, balance: newBalance });
    localStorage.setItem("lastBonusClaimed", new Date().toISOString());
    // Here you should also send the updated balance to the server if necessary
    console.log("Bonus claimed! New balance:", newBalance);
  };

  return (
    <div className="flex flex-col w-full h-screen bg-myblue-500">
      <div className="w-full bg-myblue-200 h-12 px-3 flex items-center justify-center fixed top-0">
        <div className="absolute left-0 ml-2">
          <Link to="/home">
            <FaArrowLeftLong size={20} className="text-white" />
          </Link>
        </div>
        <div className="flex items-center justify-center ml-4">
          <h1 className="text-2xl font-bold text-white">Daily Bonus</h1>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center flex-grow ">
        <div className="border-2 border-myblue-200 w-[80%] p-3 justify-center items-center flex flex-col shadow shadow-lg shadow-myblue-200 bg-myblue-100">
          <h1 className="text-3xl font-bold mb-4">Daily Bonus</h1>
          <div className="flex items-center mb-4 justify-center">
            <FaCoins size={24} className="mr-2" />
            <p className="text-lg">Earn 2 Rs daily bonus!</p>
          </div>
          {!bonusEarned ? (
            <button
              onClick={handleClaimBonus}
              className="px-4 py-2 bg-myblue-200 text-white rounded-md shadow-lg shadow-myblue-200 w-[150px] justify-center"
            >
              Claim Bonus
            </button>
          ) : (
            <p className="text-green-500 font-bold">Bonus claimed for today!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DailyBonus;
