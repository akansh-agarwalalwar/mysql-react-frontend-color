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
import toast from 'react-hot-toast';
const calculateTimerInfo = () => {
  const time = Date.now();
  const timeInSeconds = Math.floor(time / 1000);
  const timerNumber = Math.floor(timeInSeconds / 30);
  const countDown = Math.floor(30 - (timeInSeconds % 30));
  return {
    timerNumber,
    countDown,
  };
};

function Timer() {
  const [data, setData] = useState(calculateTimerInfo);
  const { user, fetchUserData } = useContext(UserContext);
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
    }, 1000);
    return () => {
      clearInterval(timerID);
    };
  }, []);
  const fetchLastPeriodData = async () => {
    try {
      // console.log("-------------------------------------------------------------")
      const response = await axios.get("https://api.perfectorse.site/api/v1/user/winner-thirty-second");
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
  }, [data.countDown===30]);

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
  };

  const handleContractMoneyChange = (
    amount,
    colorTitle = selectedColor?.title
  ) => {
    setContractMoney(amount);
    // Calculate possible payout when contract money changes
    if (colorTitle) {
      let multiplier = 0;
      if (colorTitle === "Red" || colorTitle === "Green") {
        multiplier = 2;
      } else if (colorTitle === "Violet") {
        multiplier = 4.5;
      }

      const payout = amount * multiplier;
      const decreasedAmount = payout - payout * 0.02; // 2% decrease
      setWinAmount(decreasedAmount);
    }
  };

  const handleNumberChange = (number) => {
    setSelectedNumber(number);
  };

  const closePopup = () => {
    setSelectedColor(null);
    setSelectedNumber(1);
    setContractMoney(10);
  };
  const [betAmount, setBetAmount] = useState(0);
  const handleConfirm = async () => {
    const betAmount = contractMoney * selectedNumber;
    // const possiblePayoutValue = possiblePayout[selectedColor.title].toFixed(2);
    setBetAmount(betAmount);
    if (user?.balance <= 10) {
      setErrorMessage("Insufficient balance");
      return;
    }

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
      toast.success('Bet placed successfully!');
      // console.log("Response from server:", response.data);
      if (response.status !== 200) {
        throw new Error("Error placing bet");
      }
      // console.log("Bet placed successfully:", response.data);
      await fetchUserData();
    } catch (error) {
      // console.error("Error placing bet:", error);
    }
    closePopup();
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
    const newBets = [];
    const colors = ["Red", "Violet", "Green"];
    const amounts = [100, 200, 500, 1000];

    for (let i = 0; i < 15; i++) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const randomAmount = amounts[Math.floor(Math.random() * amounts.length)];
      const randomUserNumber = Math.floor(1000 + Math.random() * 9000);
      newBets.push({
        color: randomColor,
        amount: randomAmount,
        userNumber: randomUserNumber,
      });
    }
    setNewBets(newBets);
  };
  useEffect(() => {
    if (data.countDown <= 27 && data.countDown >= 11) {
      setShowRandomBets(true);
      generateRandomBets();
    } else {
      setShowRandomBets(false);
    }
  }, [data.countDown]);
  return (
    <div className="flex flex-col bg-gray-900 min-h-screen bg-myblue-500 max-w-md mx-auto">
      {/* Header */}
      <div className="flex flex-row bg-myblue-200 w-full text-white items-center h-12 md:h-8">
        <Link to="/home">
          <FaArrowLeftLong className="mx-2 " />
        </Link>
        <p className=" text-xl">Fast-Parity</p>
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
          <div>
            <p className="text-l">Count Down</p>
            <div className="rounded-lg p-3 h-8 items-center flex justify-center bg-white">
              {/* <h2 className="text-2xl font-mono">{formatTime(time)}</h2> */}
              <h2 className="text-2xl font-mono">
                {formatTime(data.countDown)}
              </h2>
            </div>
          </div>
        </div>
        {/* Color Boxes */}
        <div className="p-2 mt-2 bg-gray-800 flex justify-around flex-wrap ">
          {colorBoxes?.map((colorBox) => (
            <div className=" w-1/4">
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
      <Popup
        open={!!selectedColor && data.countDown > 11}
        onClose={closePopup}
        className="absolute right-0 left-0 w-full rounded-2xl"
      >
        <div className=" bg-white rounded-lg p-4 shadow-lg w-full mx-auto border-2 border-myblue-200 right-0 bottom-0 left-0">
          <div className="flex flex-row items-center mb-4">
            <h2 className="text-xl font-bold w-full items-center justify-center ">
              {selectedColor?.title}
            </h2>
            <button onClick={closePopup} className="justify-end">
              <RxCross1 />
            </button>
          </div>
          {/* User Balance */}
          <div className="mb-4">
            <p>{` Balance: ${user?.balance}`}</p>
          </div>
          {/* Input Field for Amount */}
          <div className="mb-4">
            <label htmlFor="amountInput">Enter Amount:</label>
            <input
              type="number"
              id="amountInput"
              min="10"
              value={contractMoney}
              onChange={(e) => handleContractMoneyChange(e.target.value)}
              className="p-2 border rounded-lg w-full mt-1"
            />
          </div>
          {/* Possible Payout */}
          <div className="mb-4 text-sm">
            <p>Possible Payout: {winAmount?.toFixed(2)}</p>
          </div>
          {/* Confirm Button */}
          <div className="mb-4">
            <button
              onClick={handleConfirm}
              disabled={
                contractMoney < 10 ||
                user?.balance < contractMoney * selectedNumber
              } // Disable if balance is insufficient
              className={`bg-myblue-200 p-2 rounded-lg w-full shadow-lg text-white ${
                contractMoney < 10 ||
                user?.balance < contractMoney * selectedNumber
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              Confirm
            </button>
          </div>
        </div>
      </Popup>
      {/* WINNER DIVISION */}
      <div className="flex flex-col w-full mb-4 bg-white h-[230px] ">
        <p className=" font-bold text-xl w-full items-center justify-center flex mt-1">
          Parity Result
        </p>
        <div className="flex flex-col justify-center w-full items-center mb-4 mt-2 border h-[1px] border-myblue-200"></div>
        <div className="flex flex-col h-10 items-center w-full">
          <div className="flex flex-row w-full justify-around items-center">            
            {lastPeriodData && (
              <div className="grid grid-cols-9 gap-3 w-full mx-2">
                {lastPeriodData?.slice()?.reverse()?.map((item, index) => {
                  const periodNumberLastThreeDigits = item?.periodNumber
                    ?.toString()
                    .slice(-3);
                  return (
                    <div key={index} className="flex flex-col items-center">
                      <div
                        className={`w-7 h-7 rounded-full ${getColorClass(
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
      {showRandomBets && (
        <div className="flex flex-col">
          <EveryOneOrder
            key={refresh}
            period={data.timerNumber}
            newBets={newBets}
          />
          <hr></hr>
        </div>
      )}
      {/* Last Table Data */}
      {data.countDown <= 11 && (
        <div className="flex p-2 flex-col mr-4 ml-4 justify-center items-center h-[150px] border-2 border-myblue-200 mt-2 bg-white">
          <h2 className="text-myblue-200 font-bold">WAIT FOR RESULT......</h2>
        </div>
      )}
    </div>
  );
}

export default Timer;
