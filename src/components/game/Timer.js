import React, { useState, useEffect } from "react";
import { FaHorseHead } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { RxCross1 } from "react-icons/rx";

function Timer() {
  const [time, setTime] = useState(30);
  const [period, setPeriod] = useState(100000000);
  const [selectedColor, setSelectedColor] = useState(null);
  const [balance, setBalance] = useState(9); // Example balance, update this according to your data
  const [contractMoney, setContractMoney] = useState(0);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 1) {
          setPeriod((prevPeriod) => {
            const newPeriod = prevPeriod + 1;
            const newRecord = String(newPeriod).slice(-3); // Get last 3 digits of the new period
            setRecords((prevRecords) => [...prevRecords, newRecord].slice(-30)); // Keep only the last 30 records
            return newPeriod;
          });
          return 30;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

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

  const numbers = [
    { title: "1" },
    { title: "2" },
    { title: "3" },
    { title: "4" },
    { title: "5" },
    { title: "6" },
    { title: "7" },
    { title: "8" },
    { title: "9" },
    { title: "0" },
  ];

  const isDisabled = time <= 10;

  const handleColorBoxClick = (color) => {
    setSelectedColor(color);
  };

  const handleContractMoneyChange = (amount) => {
    setContractMoney(amount);
  };

  const handleContractMoneyAdjustment = (adjustment) => {
    setContractMoney((prevMoney) => Math.max(prevMoney + adjustment, 0));
  };

  const closePopup = () => {
    setSelectedColor(null);
    setContractMoney(0);
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
      <div className="p-2 mt-4">
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
        <div className="flex flex-row justify-center w-full mt-4 space-x-4">
          {colorBoxes.map((item, index) => (
            <Popup
              trigger={
                <div
                  key={index}
                  onClick={() => handleColorBoxClick(item)}
                  className={`flex flex-col items-center ${
                    isDisabled
                      ? "bg-gray-500 cursor-not-allowed"
                      : `bg-${item.color}-500`
                  } rounded-lg p-3 shadow-lg w-40 cursor-pointer`}
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
              position="center center"
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
                      value={`₹${balance}`}
                      className="p-2 rounded-lg w-[70%]"
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
                  <div className="flex flex-row justify-between mb-4">
                    <button
                      onClick={() => handleContractMoneyAdjustment(-5)}
                      className="p-2 rounded-lg bg-secondary mr-2"
                    >
                      -5
                    </button>
                    <button
                      onClick={() => handleContractMoneyAdjustment(-1)}
                      className="bg-secondary p-2 rounded-lg mr-2"
                    >
                      -1
                    </button>
                    <input
                      type="text"
                      readOnly
                      value={contractMoney}
                      className="p-2 rounded-lg text-center w-[55px] mx-2"
                    />
                    <button
                      onClick={() => handleContractMoneyAdjustment(1)}
                      className="bg-secondary p-2 rounded-lg mr-2"
                    >
                      +1
                    </button>
                    <button
                      onClick={() => handleContractMoneyAdjustment(5)}
                      className="bg-secondary p-2 rounded-lg mr-2"
                    >
                      +5
                    </button>
                  </div>
                  <div className="mb-2">
                    Total contract Money is{" "}
                    <span className="text-blue-200">{contractMoney}</span>
                  </div>
                  <button className="p-2 bg-brown-100 rounded-lg">
                    Confirm
                  </button>
                </div>
              </div>
            </Popup>
          ))}
        </div>
        <div className="flex flex-col items-center w-full mt-4 space-y-4">
          <div className="flex flex-row justify-center w-full space-x-4">
            {numbers.slice(0, 5).map((item, index) => (
              <div
                key={index}
                className={`flex flex-col items-center rounded-lg p-3 shadow-lg w-20 ${
                  isDisabled ? "bg-gray-500 cursor-not-allowed" : "bg-white"
                }`}
                style={{ opacity: isDisabled ? 0.5 : 1 }}
              >
                <h2 className="text-xl font-mono">{item.title}</h2>
              </div>
            ))}
          </div>
          <div className="flex flex-row justify-center w-full space-x-4">
            {numbers.slice(5).map((item, index) => (
              <div
                key={index}
                className={`flex flex-col items-center rounded-lg p-3 shadow-lg w-20 ${
                  isDisabled ? "bg-gray-500 cursor-not-allowed" : "bg-white"
                }`}
                style={{ opacity: isDisabled ? 0.5 : 1 }}
              >
                <h2 className="text-xl font-mono">{item.title}</h2>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center items-center mt-8">
          <div className="w-full md:w-3/4">
            <div className="border-b-2 border-blue-500 pb-2 mb-2">
              <h2 className="text-center text-xl font-bold">Record</h2>
            </div>
            <div className="flex justify-between">
              <p>Fast-Parity Record(s)</p>
              <p>more &gt;</p>
            </div>
            <div className="grid grid-cols-10 gap-2 mt-4">
              {records.map((record, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className={`h-10 w-10 flex items-center justify-center rounded-full ${
                      index % 3 === 0
                        ? "bg-richblue-500"
                        : index % 3 === 1
                        ? "bg-richblue-200"
                        : "bg-richblue-100"
                    }`}
                  >
                    <span className="text-white">
                      {time <= 10 ? "?" : record}
                    </span>
                  </div>
                  <p className="text-sm text-center">{record}</p> {/* Show last 3 digits */}
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
