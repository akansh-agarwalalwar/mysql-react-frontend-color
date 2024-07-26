import React, { useState, useEffect } from "react";
import NavBarAdmin from "./NavBarAdmin";
import axios from "axios";
import calculateTimerInfoTwoMin from "../game/calculateTimerInfoTwoMin";

function GameModeSecond() {
  const [data, setData] = useState(calculateTimerInfoTwoMin);
  const [periodNumber, setPeriodNumber] = useState("");
  const [timerNumber, setTimerNumber] = useState(0);
  const [countDownTwoMin, setCountDownTwoMin] = useState(0);
  const [color, setColor] = useState("");
  const [loading, setLoading] = useState(false); // State to handle loading
  const [error, setError] = useState(""); // State to handle errors
  // const { timerNumber, countDownTwoMin } = calculateTimerInfoTwoMin();
  const [gameMode, setGameMode] = useState({
    red: 0,
    green: 0,
    violet: 0,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!periodNumber || !color) {
      alert("Please fill out all fields.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "https://api.perfectorse.site/api/v1/admin/twoMin",
        {
          periodNumber,
          color, // Include the color in the request body
        }
      );
      if (response.status === 200) {
        alert("Period updated successfully!");
      } else {
        alert("Failed to update period.");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        alert(
          `Failed to update period: ${
            error.response.data?.error || error.message
          }`
        );
      } else {
        alert("Failed to update period.");
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      setData(calculateTimerInfoTwoMin());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const BetAmountsManual = async () => {
    try {
      const res = await axios.get(
        "https://api.perfectorse.site/api/v1/admin/manual-two-min"
      );
      const data = res?.data;
      console.log(data);
      setGameMode(data);
    } catch (error) {
      console.error(error);
    }
  };
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };
  useEffect(() => {
    BetAmountsManual();
  }, [countDownTwoMin]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      axios
        .get("https://api.perfectorse.site/api/v1/admin/manual-two-min")
        .then((response) => {
          const data = response.data;
          setGameMode(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }, 1000); // 1000ms = 1s

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <div>
      <NavBarAdmin />
      <div className="flex items-center justify-center w-full h-screen flex-row">
        <div className="flex absolute top-36 flex-col">
          <p className="text-xl"> Period: {data.timerNumber}</p>
          <p className="text-xl">Timer: {formatTime(data.countDown)}</p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row gap-5 p-4">
            <div className="border w-[100px] h-7">{gameMode.red}</div>
            <div className="border w-[100px] h-7">{gameMode.green}</div>
            <div className="border w-[100px] h-7">{gameMode.violet}</div>
          </div>
          <div className="flex flex-row gap-5 p-4">
            <button className="bg-red-100 p-4 w-[100px]">Red</button>
            <button className="bg-green-100 p-4 w-[100px]">Green</button>
            <button className="bg-Voilet p-4 w-[100px]">Violet</button>
          </div>
        </div>
        <form className="flex flex-col space-y-4 mx-8" onSubmit={handleSubmit}>
          <div className="flex flex-row items-center space-x-2">
            <p className="w-32">Period Number</p>
            <input
              className="border-2 p-2 rounded-md"
              type="text"
              value={periodNumber}
              onChange={(e) => setPeriodNumber(e.target.value)}
              placeholder="Enter period number"
            />
          </div>
          <div className="flex flex-row items-center space-x-2">
            <p className="w-32">Color</p>
            <input
              className="border-2 p-2 rounded-md"
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              placeholder="Enter color"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className={`bg-blue-500 text-white py-2 px-4 rounded-md ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default GameModeSecond;
