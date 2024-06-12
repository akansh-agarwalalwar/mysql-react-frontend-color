import React, { useState, useEffect } from "react";
import { FaHorseHead } from "react-icons/fa";

function Timer() {
  const [time, setTime] = useState(30);
  const [period, setPeriod] = useState(100000000);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 1) {
          setPeriod((prevPeriod) => prevPeriod + 1);
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
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const formatPeriod = (period) => {
    return String(period).padStart(9, "0"); 
  };

  const colorBoxes = [
    {
      title: "Red",
      color: "red",
      icon: <FaHorseHead style={{ color: "#FF0000" }} />,
    },
    {
      title: "Red/Green",
      color: "green",
      icon: <FaHorseHead />,
    },
    {
      title: "Green",
      icon: <FaHorseHead style={{ color: "#00FF00" }} />,
      color: "#104455",
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

  return (
    <div className="flex flex-col items-center bg-gray-900 p-6">
      <div className="flex flex-row justify-between w-full items-center h-15 my-2 px-3">
        <div>
          <p className="text-xl">Periods Timer</p>
          <div className="rounded-lg p-3 shadow-lg h-10 flex items-center bg-white">
            <h2 className="text-3xl text-black font-mono">{formatPeriod(period)}</h2>
          </div>
        </div>
        <div>
          <p className="text-xl">Count Down</p>
          <div className="rounded-lg p-3 shadow-lg h-10 items-center flex justify-center">
            <h2 className="text-3xl font-mono">{formatTime(time)}</h2>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center w-full mt-4 space-x-4">
        {colorBoxes.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col items-center ${isDisabled ? 'bg-gray-500 cursor-not-allowed' : `bg-${item.color}-500`} rounded-lg p-3 shadow-lg w-40`}
            style={{ opacity: isDisabled ? 0.5 : 1 }}
          >
            <div className="text-3xl mb-2">{item.icon}</div>
            <h2 className="text-xl font-mono">{item.title}</h2>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center w-full mt-4 space-y-4">
        <div className="flex flex-row justify-center w-full space-x-4">
          {numbers.slice(0, 5).map((item, index) => (
            <div
              key={index}
              className={`flex flex-col items-center rounded-lg p-3 shadow-lg w-20 ${isDisabled ? 'bg-gray-500 cursor-not-allowed' : 'bg-white'}`}
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
              className={`flex flex-col items-center rounded-lg p-3 shadow-lg w-20 ${isDisabled ? 'bg-gray-500 cursor-not-allowed' : 'bg-white'}`}
              style={{ opacity: isDisabled ? 0.5 : 1 }}
            >
              <h2 className="text-xl font-mono">{item.title}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Timer;
