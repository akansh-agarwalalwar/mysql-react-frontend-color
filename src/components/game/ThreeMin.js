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
import TwoMinOrder from "./TwoMinOrder";

function TwoMin() {
  const { user, setUser, fetchUserData } = useContext(UserContext);
  const [time, setTime] = useState(120); // 2 minutes in seconds
  const [period, setPeriod] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedNumber, setSelectedNumber] = useState(1);
  const [contractMoney, setContractMoney] = useState(10);
  const [records, setRecords] = useState([]);
  const [userBalance, setUserBalance] = useState(0);
  const [winAmount, setWinAmount] = useState(19.6);
  const [refresh, setRefresh] = useState(0);
  const [possiblePayout, setPossiblePayout] = useState({
    Red: 19.6,
    Violet: 45.0,
    Green: 19.6,
  });
  const [lastPeriodData, setLastPeriodData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  useEffect(() => {
    const fetchInitialPeriodAndTime = async () => {
      try {
        const periodResponse = await axios.get("https://color-server.onrender.com/period-timer/two-min");
        setPeriod(Number(periodResponse.data.periodNumber));

        const timeResponse = await axios.get("https://color-server.onrender.com/period-time/get-time/two-min");
        setTime(timeResponse.data.countdown || 120); // Default to 120 seconds
      } catch (error) {
        console.error("Error fetching initial period and time:", error);
      }
    };
    fetchInitialPeriodAndTime();
  }, []);

  const fetchLastPeriodData = async () => {
    try {
      const response = await axios.get("https://color-server.onrender.com/winner-api/two-min");
      setLastPeriodData(response.data[0]); // Assuming response.data is an array
    } catch (error) {
      console.error("Error fetching last period data:", error);
    }
  };

  useEffect(() => {
    fetchLastPeriodData();
  }, []);

  useEffect(() => {
    if (time === 0) {
      setPeriod((prevPeriod) => {
        const newPeriod = prevPeriod + 1;
        savePeriodToDatabase(newPeriod);
        return newPeriod;
      });
      setTime(120); // Reset to 120 seconds
    } else {
      const timerId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [time]);

  useEffect(() => {
    if (time === 118) {
      fetchLastPeriodData();
    }

    const sendTimeDataToServer = async () => {
      try {
        await axios.post("https://color-server.onrender.com/period-time/two-min", {
          periodNumber: formatPeriod(period),
          periodTime: new Date().toISOString().split("T")[1].split(".")[0],
          periodDate: new Date().toISOString().split("T")[0],
          countdown: time,
        });
        if (time === 7) {
          // Call the endpoint to update status
          await axios.post("https://color-server.onrender.com/update-status/two-min", {
            periodNumber: formatPeriod(period),
            periodDate: new Date().toISOString().split("T")[0],
          });
        }
      } catch (error) {
        console.error("Error sending time data to server:", error);
      }
    };

    const intervalId = setInterval(() => {
      sendTimeDataToServer();
      setRefresh((prev) => prev + 1); // Update refresh state every second
    }, 1000);

    return () => clearInterval(intervalId);
  }, [period, time]);

  useEffect(() => {
    if (time === 10) {
      const updateAmounts = async () => {
        try {
          await axios.post("https://color-server.onrender.com/update-amounts/two-min", {
            periodNumber: formatPeriod(period),
          });
          console.log("Amounts updated successfully.");
        } catch (error) {
          console.error("Error updating amounts:", error);
        }
      };
      updateAmounts();
    }
  }, [time]);

  const savePeriodToDatabase = async (newPeriod) => {
    try {
      await axios.post("https://color-server.onrender.com/period-timer/post/two-min", {
        periodNumber: newPeriod,
        periodDate: new Date().toISOString().split("T")[0],
      });
    } catch (error) {
      console.error("Error saving period to database:", error);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart("2", "0")}`;
  };

  const formatPeriod = (period) => {
    return String(period).padStart(9, "0");
  };

  const colorBoxes = [
    {
      title: "Red",
      color: "red",
      icon: <FaHorseHead style={{ color: "#FF0000" }} />,
      values: [1, 3, 7, 9],
    },
    {
      title: "Violet",
      color: "purple",
      icon: <FaHorseHead style={{ color: "#800080" }} />,
      values: [0, 5],
    },
    {
      title: "Green",
      color: "green",
      icon: <FaHorseHead style={{ color: "#00FF00" }} />,
      values: [2, 4, 6, 8],
    },
  ];

  const isDisabled = time <= 10;

  const handleColorBoxClick = (color) => {
    setSelectedColor(color);
    setSelectedNumber(1); // Reset selected number to default
  };

  const handleContractMoneyChange = (amount) => {
    setContractMoney(amount);
    // Calculate possible payout when contract money changes
    if (selectedColor) {
      let multiplier = 0;
      if (selectedColor.title === "Red" || selectedColor.title === "Green") {
        multiplier = 2;
      } else if (selectedColor.title === "Violet") {
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
    setSelectedNumber(1); // Reset selected number to default
    setContractMoney(10); // Reset contract money to default
  };

  const handleConfirm = async () => {
    const betAmount = contractMoney * selectedNumber;
    const possiblePayoutValue = possiblePayout[selectedColor.title].toFixed(2);

    if (user.balance <= 10) {
      setErrorMessage("Insufficient balance"); // Set error message if balance is insufficient
      return;
    }

    try {
      const response = await axios.post("https://color-server.onrender.com/place-bet/two-min", {
        userId: user.userId,
        periodNumber: formatPeriod(period),
        periodDate: new Date().toISOString().split("T")[0],
        betType: selectedColor.title,
        berforeBetAmount: user.balance,
        betAmount: betAmount,
        possiblePayout: possiblePayout[selectedColor.title].toFixed(2),
      });

      console.log("Response from server:", response.data);

      if (response.status !== 200) {
        throw new Error("Error placing bet");
      }

      console.log("Bet placed successfully:", response.data);

      // Fetch the latest user data
      await fetchUserData();
    } catch (error) {
      console.error("Error placing bet:", error);
    }

    closePopup();
  };

  return (
    <div className="flex flex-col bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex flex-row justify-between bg-richblue-500 w-full text-white items-center h-12 md:h-8">
        <Link to="/home">
          <FaArrowLeftLong className="mx-2" />
        </Link>
        <p>Fast-Parity</p>
        <p className="mr-2">Rules</p>
      </div>
      {/* Timer Section */}
      <div className="p-2 mt-2">
        <div className="flex flex-row justify-between w-full items-center h-15 my-2 px-3">
          <div className="flex flex-col">
          <p className="text-l">Periods Timer</p>
            <div className="rounded-lg p-3 shadow-lg h-8 flex items-center bg-white">
              <h2 className="text-xl text-black font-mono">
                {formatPeriod(period)}
              </h2>
            </div>
          </div>
          <div>
            <p className="text-l">Count Down</p>
            <div className="rounded-lg p-3 shadow-lg h-10 items-center flex justify-center">
              <h2 className="text-3xl font-mono">{formatTime(time)}</h2>
            </div>
          </div>
        </div>
        {/* Color Boxes */}
        <div className="p-2 mt-4 bg-gray-800 flex justify-around flex-wrap">
          {colorBoxes.map((colorBox) => (
            <div
              key={colorBox.color}
              className={`flex flex-col justify-center items-center w-1/4 border border-gray-600 rounded-lg p-2 cursor-pointer ${
                isDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => !isDisabled && handleColorBoxClick(colorBox)}
            >
              <div className="text-4xl">{colorBox.icon}</div>
              <div className="mt-2">{colorBox.title}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Popup Modal */}
      <Popup open={!!selectedColor} closeOnDocumentClick onClose={closePopup} modal>
        <div className="modal bg-white rounded-lg p-4 shadow-lg max-w-xs mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{selectedColor?.title} Numbers</h2>
            <button onClick={closePopup} className="text-red-500">
              <RxCross1 />
            </button>
          </div>
          {/* User Balance */}
          <div className="mb-4">
            <p>{`User Balance: ${user.balance}`}</p>
          </div>
          {/* Error Message */}
          {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
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
          <div className="mb-4">
            <p>Possible Payout: {winAmount.toFixed(2)}</p>
          </div>
          {/* Confirm Button */}
          <div className="mb-4">
            <button
              onClick={handleConfirm}
              disabled={contractMoney < 10}
              className={`bg-blue-500 p-2 rounded-lg w-full ${
                contractMoney < 10 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Confirm
            </button>
          </div>
        </div>
      </Popup>

      {/* WINNER DIVISION */}
      <div className="flex flex-row justify-between ml-4 mr-4">
        <div>
          {lastPeriodData ? lastPeriodData.periodNumber : "Loading..."}
        </div>
        <div>
         {lastPeriodData ? lastPeriodData.color : "Loading..."}
        </div>
      </div>

      {/* EveryOneOrder Component */}
      <div className="flex p-2 mt-4 bg-gray-800 flex-col">
        <TwoMinOrder key={refresh} period={formatPeriod(period)} />
      </div>
    </div>
  );
}

export default TwoMin;