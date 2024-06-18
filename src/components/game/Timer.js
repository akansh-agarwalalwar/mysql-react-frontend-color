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

function Timer() {
  const { user } = useContext(UserContext);
  const [time, setTime] = useState(30);
  const [period, setPeriod] = useState(''); // Ensure period is a number
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedNumber, setSelectedNumber] = useState(1);
  const [contractMoney, setContractMoney] = useState(10);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchInitialPeriod = async () => {
      try {
        const response = await axios.get("http://localhost:3001/period-timer");
        setPeriod(Number(response.data.periodNumber)); // Ensure period is set as a number
      } catch (error) {
        console.error("Error fetching initial period:", error);
      }
    };
    fetchInitialPeriod();
  }, []);
  useEffect(() => {
    if (time === 0) {
      setPeriod((prevPeriod) => {
        const newPeriod = prevPeriod + 1;
        savePeriodToDatabase(newPeriod);
        return newPeriod;
      });
      setTime(30);
    } else {
      const timerId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [time]);

  const savePeriodToDatabase = async (newPeriod) => {
    try {
      await axios.post("http://localhost:3001/period-timer/post", {
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
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
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

    try {
      const response = await axios.post("http://localhost:3001/place-bet", {
        userId: user.userId,
        periodNumber: formatPeriod(period),
        periodDate: new Date().toISOString().split("T")[0],
        betType: selectedColor.title, // Send the color title to the backend
        berforeBetAmount: user.balance,
        betAmount: betAmount,
      });

      if (!response.status === 200) {
        throw new Error("Error placing bet");
      }

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    closePopup();
  };

  return (
    <div className="flex flex-col bg-gray-900 min-h-screen">
      
      <div className="flex flex-row justify-between bg-richblue-500 w-full text-white items-center h-12 md:h-8">
        <Link to="/home">
          <FaArrowLeftLong className="mx-2" />
        </Link>
        <p>Fast-Parity</p>
        <p className="mr-2">Rules</p>
      </div>
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
        <div
          className={`flex ${
            window.innerWidth <= 768 ? "flex-row" : "flex-col"
          } justify-center w-full space-x-4`}
        >
          {colorBoxes.map((item, index) => (
            <Popup
              key={index}
              trigger={
                <div
                  onClick={() => handleColorBoxClick(item)}
                  className={`flex flex-col items-center ${
                    isDisabled
                      ? "bg-gray-500 cursor-not-allowed"
                      : `bg-${item.color}-500`
                  } rounded-lg p-3 shadow-lg w-full md:w-40 cursor-pointer`}
                  style={{ opacity: isDisabled ? 0.5 : 1 }}
                >
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <h2 className="text-xl font-mono">{item.title}</h2>
                </div>
              }
              modal
              nested
              open={selectedColor && selectedColor.title === item.title}
              onClose={closePopup}
              position="bottom center"
              contentStyle={{
                width: "100%",
                borderRadius: "20px 20px 0 0",
                boxShadow: "0px -5px 15px rgba(0, 0, 0, 0.3)",
                border: "none",
              }}
            >
              <div className="p-4 rounded-t-lg">
                <div className="flex right-2 top-2 absolute">
                  <RxCross1 onClick={closePopup} className="text-2xl" />
                </div>
                <div className="flex flex-row top-0">
                  <h2 className="text-2xl items-center flex justify-center w-full">
                    Join {item.title}
                  </h2>
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-row items-center">
                    <input
                      type="text"
                      value={`₹${user.balance}`}
                      className="p-2 rounded-lg w-[70%]"
                      readOnly
                    />
                    <button className="bg-red-500 p-2 ml-2 rounded-lg">
                      Recharge
                    </button>
                  </div>
                  <div className="flex flex-col mr-2 mb-4">
                    <p>Contract Money</p>
                    <div className="flex flex-wrap">
                      {[10, 100, 1000, 10000].map((amount) => (
                        <button
                          key={amount}
                          onClick={() => handleContractMoneyChange(amount)}
                          className="p-2 rounded-lg mr-2 bg-richblack-5 mt-2"
                        >
                          {amount}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col justify-between mb-4">
                    <p>Number</p>
                    <div className="flex justify-around">
                      <button
                        onClick={() => handleNumberChange(1)}
                        className={`p-2 rounded-lg ${
                          selectedNumber === 1 ? "bg-blue-500" : "bg-secondary"
                        }`}
                      >
                        1
                      </button>
                      <button
                        onClick={() => handleNumberChange(10)}
                        className={`p-2 rounded-lg ${
                          selectedNumber === 10 ? "bg-blue-500" : "bg-secondary"
                        }`}
                      >
                        10
                      </button>
                      <button
                        onClick={() => handleNumberChange(100)}
                        className={`p-2 rounded-lg ${
                          selectedNumber === 100
                            ? "bg-blue-500"
                            : "bg-secondary"
                        }`}
                      >
                        100
                      </button>
                    </div>
                    
                  </div>
                  <div className="flex w-full">
                    <button
                      onClick={handleConfirm}
                      className="bg-blue-500 p-2 rounded-lg"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            </Popup>
          ))}
        </div>
      </div>
      <div className="flex p-2 mt-4 bg-gray-800 flex-col ">
          <EveryOneOrder period={formatPeriod(period)} />
        <div className="p-2 mt-4 bg-gray-800 absolute w-full my-4 ">
          <div className="w-full rounded-lg shadow-lg p-4">
            <div className="overflow-y-auto max-h-40">
              {records.map((record, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-2 mb-2 border-b border-gray-200"
                >
                  <span className="font-bold text-gray-700">{record}</span>
                  <span className="text-sm text-gray-500">Period Number</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Timer;
