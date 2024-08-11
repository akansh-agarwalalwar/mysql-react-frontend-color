import React, { useState, useEffect, useContext } from "react";
import { FaHorseHead } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { RxCross1 } from "react-icons/rx";
import UserContext from "../login/UserContext";
import EveryOneOrder from "./EveryOneOrder";
import axios from "axios";
import { IoIosTrophy } from "react-icons/io";
import toast from "react-hot-toast";
import calculateTimerInfo from "./calculateTimerInfo";
import "./index.css";
import { LuAlarmClock } from "react-icons/lu";
import { IoIosArrowBack } from "react-icons/io";

function Timer() {
  const [userOrders, setUserOrders] = useState([]);
  const [data, setData] = useState(calculateTimerInfo);
  const { user, fetchUserData } = useContext(UserContext);
  console.log(user);
  const [users, setUser] = useState();
  const [periodNumber, setPeriodNumber] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedNumber, setSelectedNumber] = useState(1);
  const [contractMoney, setContractMoney] = useState(10);
  const [winAmount, setWinAmount] = useState(19.6);
  const [refresh, setRefresh] = useState(0);
  const [possiblePayout, setPossiblePayout] = useState({
    Red: 19.6,
    Violet: 44.1,
    Green: 19.6,
  });
  const [lastPeriodData, setLastPeriodData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [newBets, setNewBets] = useState([]);
  const [showRandomBets, setShowRandomBets] = useState(false);
  const [thirtySecond, setThirtySecond] = useState([]);
  const [activeTab, setActiveTab] = useState("parityRecord");
  const [setshowPopUp, setSetshowPopUp] = useState(false);
  const [multiplier, setMultiplier] = useState(1);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };
  useEffect(() => {
    const timerID = setInterval(() => {
      setData(calculateTimerInfo());
      setPeriodNumber(data.timerNumber);
      if (data.countDown <= 11) {
        setSetshowPopUp(false);
      }
    }, 1000);
    return () => {
      clearInterval(timerID);
    };
  }, []);
  const fetchLastPeriodData = async () => {
    try {
      // console.log("-------------------------------------------------------------")
      const response = await axios.get(
        "https://api.perfectorse.site/api/v1/user/winner-thirty-second"
      );
      const data = response.data;
      // console.log(data);
      setLastPeriodData(data);
      // console.log("DATA", lastPeriodData);
    } catch (error) {
      setErrorMessage("Failed to fetch last period data. Please try again.");
    }
  };
  useEffect(() => {
    fetchLastPeriodData();
  }, [data.countDown === 30]);
  useEffect(() => {
    if (user && user.userId) {
      fetchthirtySecond(user?.userId);
    }
  }, [user]);
  const fetchthirtySecond = async (userId) => {
    try {
      // setLoading(true);
      const response = await axios.get(
        `https://api.perfectorse.site/api/v1/financial/thirty-second-history/${userId}`
      );
      if (response.status === 200) {
        setThirtySecond(response?.data);
      } else {
        throw new Error("Failed to fetch Thirty Second history");
      }
    } catch (error) {
      // setError(error.message);
    } finally {
      // setLoading(false);
    }
  };
  const colorBoxes = [
    {
      title: "Red",
      color: "red",
      icon: <FaHorseHead style={{ color: "#FF0000" }} />,
      ratio: "x2",
      values: [1, 3, 7, 9],
    },
    {
      title: "Violet",
      color: "purple",
      icon: <FaHorseHead style={{ color: "#800080" }} />,
      ratio: "x4.5",
      values: [0, 5],
    },
    {
      title: "Green",
      color: "green",
      icon: <FaHorseHead style={{ color: "#00FF00" }} />,
      ratio: "x2",
      values: [2, 4, 6, 8],
    },
  ];

  const isDisabled = data.countDown <= 11;

  const handleColorBoxClick = (color) => {
    setSelectedColor(color);
    setSelectedNumber(1);
    handleContractMoneyChange(contractMoney, color?.title);
    setSetshowPopUp(true);
  };

  const handleNumberChange = (number) => {
    setSelectedNumber(number);
  };

  const closePopup = () => {
    setSelectedColor(null);
    setSelectedNumber(1);
    setContractMoney(10);
    setSetshowPopUp(false);
  };
  const handleConfirm = async () => {
    const betAmount = contractMoney * selectedNumber;
    let newUnplayed = user.unplayed;
    let newBonus = user.bonus;
    let newBalance = user.balance;

    if (newUnplayed >= betAmount) {
      // Use unplayed amount if sufficient
      newUnplayed -= betAmount;
      await handleBetPlacement(betAmount, newUnplayed, newBonus, newBalance);
    } else if (newUnplayed + newBonus >= betAmount) {
      // Use unplayed + bonus if together they are sufficient
      const remainingAmount = betAmount - newUnplayed;
      newUnplayed = 0;
      newBonus -= remainingAmount;
      await handleBetPlacement(betAmount, newUnplayed, newBonus, newBalance);
    } else if (newUnplayed + newBonus + newBalance >= betAmount) {
      // Use unplayed + bonus + balance if together they are sufficient
      const remainingAmount = betAmount - newUnplayed - newBonus;
      newUnplayed = 0;
      newBonus = 0;
      newBalance -= remainingAmount;
      await handleBetPlacement(betAmount, newUnplayed, newBonus, newBalance);
    } else {
      // All amounts combined are insufficient
      setErrorMessage("Insufficient balance or funds to place the bet");
    }
  };

  const handleBetPlacement = async (
    betAmount,
    newUnplayed,
    newBonus,
    newBalance
  ) => {
    try {
      const response = await axios.post("https://api.perfectorse.site/place-bet", {
        userId: user.userId,
        periodNumber: data.timerNumber,
        periodDate: new Date().toISOString().split("T")[0],
        betType: selectedColor?.title,
        berforeBetAmount: user?.balance,
        betAmount: betAmount,
        possiblePayout: possiblePayout[selectedColor?.title]?.toFixed(2),
      });
      if (response.status === 400) {
        toast.error("Recharge First");
      }
      if (response.status === 200) {
        toast.success("Bet placed successfully!");
        setSelectedColor(null);
        setSelectedNumber(1);
        setContractMoney(10);
        setWinAmount(19.6);
        setMultiplier(1);
        closePopup();
        setUserOrders((prevOrders) => [
          ...prevOrders,
          {
            periodNumber: data.timerNumber,
            betType: selectedColor?.title,
            betAmount,
            possiblePayout: possiblePayout[selectedColor?.title]?.toFixed(2),
          },
        ]);
        await fetchUserData(); // Refresh user data
      } else {
        throw new Error("Error placing bet");
      }

      // Update the user state with the new amounts
      setUser((prevUser) => ({
        ...prevUser,
        unplayed: newUnplayed,
        bonus: newBonus,
        balance: newBalance ?? prevUser.balance, // Use the old balance if newBalance is undefined
      }));
    } catch (error) {
      console.error("Error placing bet:", error);
      setErrorMessage("Error placing bet");
    }

    closePopup();
    setSetshowPopUp(false);
  };

  const getWinPopUp = async () => {
    try {
      const res = await axios.get(
        "https://api.perfectorse.site/api/v1/user/getWinPopUp"
      );
      const data = res.data;
      console.log(data);
    } catch (error) {}
  };
  const getColorClass = (color) => {
    switch (color?.toLowerCase()) {
      case "red":
        return "bg-red-100";
      case "green":
        return "bg-green-100";
      case "violet":
        return "bg-purple-100";
      default:
        return "bg-gray-300"; // Default color if the winner's color is not recognized
    }
  };

  const generateRandomBets = () => {
    const colors = ["Red", "Violet", "Green"];
    const amounts = [100, 200, 500, 1000];
    const bets = [];

    for (let i = 0; i < 10; i++) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const randomAmount = amounts[Math.floor(Math.random() * amounts.length)];
      const randomUserNumber = Math.floor(1000 + Math.random() * 9000);
      bets.push({
        color: randomColor,
        amount: randomAmount,
        userNumber: randomUserNumber,
      });
    }

    setNewBets(bets);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      const newTimerData = calculateTimerInfo();
      setData(newTimerData);
      if (newTimerData.countDown <= 27 && newTimerData.countDown >= 11) {
        setShowRandomBets(true);
        generateRandomBets();
      } else {
        setShowRandomBets(false);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    if (data.countDown === 29) {
      window.location.reload();
    }
    if (data.countDown === 28) {
      getWinPopUp();
    }
    if (data.countDown === 30) {
      setSetshowPopUp(false);
    }
  }, [data.countDown]);

  const handleContractMoneyChange = (amount) => {
    setContractMoney(amount);

    if (selectedColor?.title) {
      let payoutMultiplier = 0;
      if (selectedColor.title === "Red" || selectedColor.title === "Green") {
        payoutMultiplier = 2;
      } else if (selectedColor.title === "Violet") {
        payoutMultiplier = 4.5;
      }

      const payout = amount * payoutMultiplier;
      const decreasedAmount = payout - payout * 0.02; // 2% decrease
      setWinAmount(decreasedAmount * multiplier);
    }
  };

  const handlePresetAmountClick = (amount) => {
    // Calculate the new amount considering the current multiplier
    const newAmount = amount * multiplier;
    handleContractMoneyChange(newAmount);
  };

  const increaseMultiplier = () => {
    setMultiplier((prev) => {
      const newMultiplier = prev + 1;
      setContractMoney((prevAmount) => {
        const newAmount = (prevAmount / prev) * newMultiplier;
        handleContractMoneyChange(newAmount);
        return newAmount;
      });
      return newMultiplier;
    });
  };

  const decreaseMultiplier = () => {
    setMultiplier((prev) => {
      if (prev > 1) {
        const newMultiplier = prev - 1;
        setContractMoney((prevAmount) => {
          const newAmount = (prevAmount / prev) * newMultiplier;
          handleContractMoneyChange(newAmount);
          return newAmount;
        });
        return newMultiplier;
      }
      return prev;
    });
  };

  return (
    <div className="flex flex-col bg-myblue-800 min-h-scree max-w-md mx-auto relative">
      {/* Header */}
      <div className="flex items-center bg-white w-full text-black py-3 px-4">
        <Link to="/home" className="mr-4">
          <div className="bg-myblue-800 p-2">
            <IoIosArrowBack size={20} />
          </div>
        </Link>
        <p className="text-xl font-bold">Crazy30</p>
      </div>
      {/* Timer Section */}
      <div className="w-full">
        <div className="flex flex-row justify-between w-full items-center h-16 my-2 px-3 bg-white mb-2">
          <div className="flex flex-col">
            <div className="flex flex-row gap-2 items-center justify-center">
              <IoIosTrophy />
              <p className="text-l">Period Number</p>
            </div>
            <div className="rounded-lg p-3 h-8 flex items-center bg-white justify-center">
              <h2 className="text-xl text-black font-mono">
                {/* {formatPeriod(period)} */}
                {data.timerNumber}
              </h2>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-l ml-4">Count Down</p>
            <div className="rounded-lg p-3 h-8 items-center flex justify-center bg-white flex-row">
              {/* <h2 className="text-2xl font-mono">{formatTime(time)}</h2> */}
              <LuAlarmClock className="mr-3" />
              <h2 className="text-2xl font-mono">
                {formatTime(data.countDown)}
              </h2>
            </div>
          </div>
        </div>
        {/* Color Boxes */}
        <div className="p-2 mt-2 bg-gray-800 flex justify-around flex-wrap ">
          {colorBoxes?.map((colorBox) => (
            <div className="w-1/4">
              <div
                key={colorBox.color}
                className={`flex flex-col justify-center items-center border-2 border-myblue-200 rounded-lg p-2 cursor-pointer bg-white ${
                  isDisabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => !isDisabled && handleColorBoxClick(colorBox)}
              >
                <div className="text-4xl">{colorBox.icon}</div>
                <div className="mt-2">{colorBox.title}</div>
                <div className="">{colorBox.ratio}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Popup Modal */}
      {setshowPopUp && data.countDown > 11 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className="bg-white rounded-lg p-4 w-11/12 max-w-md mx-auto border-2 border-myblue-200 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-row items-center mb-2">
              <h2 className="text-xl flex font-bold w-full items-center justify-center">
                {selectedColor?.title}
              </h2>
              <button onClick={closePopup} className="absolute top-4 right-4">
                <RxCross1 />
              </button>
            </div>
            <div className="mb-4">
              <p>{`Balance: ${user?.balance}`}</p>
            </div>
            <div className="flex flex-col w-full justify-between">
              <div className="flex flex-row mb-4 space-x-2">
                {[10, 100, 200, 500].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handlePresetAmountClick(amount)}
                    className="border-myblue-200 p-2 border-2 rounded-lg text-myblue-200"
                  >
                    {amount}
                  </button>
                ))}
              </div>
              <div className="flex flex-row items-center mb-2 space-x-2">
                <button
                  onClick={decreaseMultiplier}
                  className="border-myblue-200 p-1 border-2 rounded-lg text-myblue-200 w-full"
                >
                  -1
                </button>
                <p className="text-xl w-full justify-center items-center flex">
                  {multiplier}
                </p>
                <button
                  onClick={increaseMultiplier}
                  className="border-myblue-200 p-1 border-2 rounded-lg text-myblue-200 w-full"
                >
                  +1
                </button>
              </div>
            </div>
            <div className="mb-2">
              <input
                type="number"
                id="amountInput"
                min="10"
                value={contractMoney}
                onChange={(e) =>
                  handleContractMoneyChange(Number(e.target.value))
                }
                readOnly
                className="p-2 border rounded-lg w-full mt-1"
              />
            </div>
            <div>
              <button
                onClick={handleConfirm}
                disabled={
                  contractMoney < 10 || // Minimum contract money check
                  !(
                    user?.unplayed >= contractMoney || // Check if unplayed amount is sufficient
                    user?.bonus >= contractMoney || // Check if bonus amount is sufficient
                    user?.balance >= contractMoney
                  ) // Check if balance amount is sufficient
                }
                className={`bg-myblue-200 p-2 rounded-lg w-full shadow-lg text-white ${
                  contractMoney < 10 || // Minimum contract money check
                  !(
                    user?.unplayed >= contractMoney || // Check if unplayed amount is sufficient
                    user?.bonus >= contractMoney || // Check if bonus amount is sufficient
                    user?.balance >= contractMoney
                  ) // Check if balance amount is sufficient
                    ? "opacity-50 cursor-not-allowed" // Disable button and apply styles
                    : ""
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* WINNER DIVISION */}
      <div className="flex flex-col w-full mb-4 bg-white h-[230px] ">
        <p className="text-xl w-full items-center justify-center flex mt-1">
          Parity Result
        </p>
        <div className="flex flex-col justify-center w-full items-center mb-4 mt-1 border h-[1px] border-myblue-200"></div>
        <div className="flex flex-col h-10 items-center w-full">
          <div className="flex flex-row w-full justify-around items-center">
            {lastPeriodData && (
              <div className="grid grid-cols-9 gap-3 w-full mx-2">
                {lastPeriodData
                  ?.slice()
                  ?.reverse()
                  ?.map((item, index) => {
                    const periodNumberLastThreeDigits = item?.periodNumber
                      ?.toString()
                      .slice(-3);
                    return (
                      <div key={index} className="flex flex-col items-center">
                        <div
                          className={`w-7 h-7 rounded-full border ${getColorClass(
                            item?.color
                          )}`}
                        ></div>
                        <span className="text-xs mt-1">
                          {periodNumberLastThreeDigits}
                        </span>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-around w-full items-center">
        <div className="flex flex-row w-full justify-around items-center">
          <div
            className={`flex flex-col items-center cursor-pointer w-full text-xl ${
              activeTab === "parityRecord"
                ? "border-myblue-200 text-black bg-white"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("parityRecord")}
          >
            Parity Record
          </div>
          <div
            className={`flex flex-col items-center cursor-pointer w-full text-xl ${
              activeTab === "userRecord"
                ? "border-myblue-200 text-black bg-white"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("userRecord")}
          >
            User Record
          </div>
        </div>

        {activeTab === "parityRecord" ? (
          <div className="flex flex-col border-t-2 border-myblue-200 w-full">
            {/* Content for Parity Record tab */}
            <EveryOneOrder
              key={refresh}
              period={data.timerNumber}
              newBets={newBets}
            />
            <hr />
          </div>
        ) : (
          <div className="flex flex-col w-full">
            {/* Content for User Record tab */}
            <div className="bg-white">
              <div className="flex flex-col justify-center items-center border-myblue-200 w-full">
                {thirtySecond && (
                  <table className="table-auto w-full">
                    <thead className="border-t-2 mt-3 border-myblue-200">
                      <tr>
                        <th className="p-2">
                          <div className="rounded-3xl">Number</div>
                        </th>
                        <th className="p-2">
                          <div className="rounded-3xl">Color</div>
                        </th>
                        <th className="p-2">
                          <div className="rounded-3xl">Amount</div>
                        </th>
                        <th className="p-2">
                          <div className="rounded-3xl">Status</div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {thirtySecond?.slice(0, 10)?.map((order, index) => (
                        <tr key={index} className="border-t">
                          <td className="p-2 text-center">
                            {order.periodNumber}
                          </td>
                          <td className="p-2 text-center">{order.betType}</td>
                          <td className="p-2 text-center">{order.betAmount}</td>
                          <td className="p-2 text-center">
                            {order.status ? order.status : "Pending"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Timer;
