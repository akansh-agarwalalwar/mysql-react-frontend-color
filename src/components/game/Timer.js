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
import background from "../../images/background.png";
import red from "../../images/red.png";
import green from "../../images/green.png";
import violet from "../../images/violet.png";

import redImage from "../../images/red.png";
import violetImage from "../../images/violet.png";
import greenImage from "../../images/green.png";

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
      color: "red",
      icon: <img src={red} alt="Red Horse" className="h-28 w-32" />,
      ratio: "x2",
    },
    {
      color: "purple",
      icon: <img src={violet} alt="Violet Horse" className="h-28 w-32" />,
      ratio: "x4.5",
    },
    {
      color: "green",
      icon: <img src={green} alt="Green Horse" className="h-28 w-32" />,
      ratio: "x2",
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

  const colorToImageMap = {
    red: redImage,
    violet: violetImage,
    green: greenImage,
  };

  return (
    <div
      className="flex flex-col bg-myblue-800 min-h-scree max-w-md mx-auto relative"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Header */}

      <div className="flex items-center w-full text-white bg-black py-3 px-4">
        <Link to="/home" className="mr-4">
          <div className=" p-2">
            <IoIosArrowBack size={20} color="#FFF" />
          </div>
        </Link>
        <p className="text-xl font-bold">Crazy30</p>
      </div>
      {/* Timer Section */}
      <div className="w-full">
        <div className="flex flex-row justify-between w-full items-center h-16 my-2 px-3 mb-2">
          <div className="flex flex-col mx-3 bg-black w-full rounded-lg">
            <div className="flex flex-row gap-2 items-center justify-center">
              <IoIosTrophy color="#FFF" />
              <p className="text-l text-white">Period Number</p>
            </div>
            <div className="rounded-lg p-3 h-8 flex items-center justify-center">
              <h2 className="text-xl text-white font-mono">
                {/* {formatPeriod(period)} */}
                {data.timerNumber}
              </h2>
            </div>
          </div>
          <div className="flex flex-col mx-3 bg-black w-full rounded-lg">
            <p className="text-l ml-4 text-white flex">Count Down</p>
            <div className="rounded-lg p-3 h-8 items-center flex justify-center flex-row">
              {/* <h2 className="text-2xl font-mono">{formatTime(time)}</h2> */}
              <LuAlarmClock className="mr-3 " color="#FFF" />
              <h2 className="text-2xl font-mono text-white">
                {formatTime(data.countDown)}
              </h2>
            </div>
          </div>
        </div>
        {/* Color Boxes */}
        <div className="p-2 mt-2 flex flex-row gap-3 items-center mb-2 mx-3 rounded-xl justify-center">
          {colorBoxes?.map((colorBox) => (
            <div className="w-full mb-4" key={colorBox.color}>
              <div
                className={`flex flex-col justify-center items-center rounded-lg p-2 cursor-pointer ${
                  isDisabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => !isDisabled && handleColorBoxClick(colorBox)}
              >
                <div className="text-white text-4xl">{colorBox.icon}</div>
                {/* <div className="text-white mt-2">{colorBox.title}</div> */}
                <div className="text-black">{colorBox.ratio}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Popup Modal */}
      {setshowPopUp && data.countDown > 11 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className="bg-white rounded-lg p-4 w-11/12 max-w-md mx-auto border-2 border-black shadow-2xl relative"
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
                    className="border-black p-2 border-2 rounded-lg text-black"
                  >
                    {amount}
                  </button>
                ))}
              </div>
              <div className="flex flex-row items-center mb-2 space-x-2">
                <button
                  onClick={decreaseMultiplier}
                  className="border-black p-1 border-2 rounded-lg text-black w-full"
                >
                  -1
                </button>
                <p className="text-xl w-full justify-center items-center flex">
                  {multiplier}
                </p>
                <button
                  onClick={increaseMultiplier}
                  className="border-black p-1 border-2 rounded-lg text-black w-full"
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
                className={`bg-black p-2 rounded-lg w-full shadow-lg text-white ${
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
      <div className="mx-3 rounded-full">
        <div className="flex flex-col w-full mb-4 h-[230px] rounded-2xl shadow-3xl border-2">
          <p className="text-xl w-full items-center justify-center flex mt-1 text-black font-bold">
            Parity Result
          </p>
          <div className="flex flex-col justify-center w-full items-center mb-4 mt-1 border h-[1px] border-black"></div>
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
                      const colorImage =
                        colorToImageMap[item?.color.toLowerCase()];

                      return (
                        <div key={index} className="flex flex-col items-center">
                          {colorImage ? (
                            <img
                              src={colorImage}
                              alt={item?.color}
                              className="w-7 h-7 rounded-full"
                            />
                          ) : (
                            <div className="w-7 h-7 rounded-full border border-white"></div>
                          )}
                          <span className="text-xs mt-1 text-black font-bold">
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
      </div>

      <div className="mx-3 ">
        <div className="flex flex-col justify-around w-full items-center rounded-lg">
          <div className="flex flex-row w-full justify-around items-center">
            <div
              className={`flex flex-col items-center cursor-pointer w-full text-xl rounded-t-lg ${
                activeTab === "parityRecord"
                  ? "border-t-2 border-l-2 border-r-2 border-black text-black"
                  : " text-black"
              }`}
              onClick={() => setActiveTab("parityRecord")}
            >
              Parity Record
            </div>
            <div
              className={`flex flex-col items-center cursor-pointer w-full text-xl rounded-t-lg ${
                activeTab === "userRecord"
                  ? "border-t-2 border-l-2 border-r-2 border-black text-black"
                  : " text-black"
              }`}
              onClick={() => setActiveTab("userRecord")}
            >
              User Record
            </div>
          </div>

          {activeTab === "parityRecord" ? (
            <div className="flex flex-col border-t-2 w-full">
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
              <div className="">
                <div className="flex flex-col justify-center items-center border-black w-full">
                  {thirtySecond && (
                    <table className="table-auto w-full border-2">
                      <thead className="border-t-2 mt-3 ">
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
                            <td className="p-2 text-center font-bold">
                              {order.periodNumber}
                            </td>
                            <td className="p-2 text-center font-bold">
                              {order.betType}
                            </td>
                            <td className="p-2 text-center font-bold">
                              {order.betAmount}
                            </td>
                            <td className="p-2 text-center font-bold">
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
    </div>
  );
}

export default Timer;
