import React, { useState, useEffect, useCallback } from "react";
import NavBarAdmin from "./NavBarAdmin";
import axios from "axios";
import calculateTimerInfoTwoMin from "../game/calculateTimerInfoTwoMin";
import toast from "react-hot-toast";

function GameModeSecond() {
  const [data, setData] = useState(calculateTimerInfoTwoMin);
  const [periodNumber, setPeriodNumber] = useState("");
  const [color, setColor] = useState("");
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(""); 
  const [gameMode, setGameMode] = useState({
    red: 0,
    green: 0,
    violet: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!periodNumber || !color) {
      toast.error("Please fill out all fields.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "http://api.perfectorse.site/api/v1/admin/twoMin",
        { periodNumber, color }
      );
      if (response.status === 200) {
        toast.success("Period updated successfully!");
      } else {
        toast.error("Failed to update period.");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        toast.error("Failed to update period.");
      } else {
        toast.error("Failed to update period.");
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

  const fetchGameModeData = useCallback(async () => {
    try {
      const res = await axios.get("http://api.perfectorse.site/api/v1/admin/manual-two-min");
      setGameMode(res.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchGameModeData();
    const intervalId = setInterval(fetchGameModeData, 1000);
    return () => clearInterval(intervalId);
  }, [fetchGameModeData]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleButtonClick = (e, color) => {
    e.preventDefault();
    setColor(color);
    setPeriodNumber(data.timerNumber);
  };

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
            <div className="border w-[100px] h-7">{gameMode.violet}</div>
            <div className="border w-[100px] h-7">{gameMode.green}</div>
          </div>
          <div className="flex flex-row gap-5 p-4">
            <button
              onClick={(e) => handleButtonClick(e, "Red")}
              className="bg-red-100 p-4 w-[100px]"
            >
              Red
            </button>
            <button
              onClick={(e) => handleButtonClick(e, "Violet")}
              className="bg-Voilet p-4 w-[100px]"
            >
              Violet
            </button>
            <button
              onClick={(e) => handleButtonClick(e, "Green")}
              className="bg-green-100 p-4 w-[100px]"
            >
              Green
            </button>
            
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