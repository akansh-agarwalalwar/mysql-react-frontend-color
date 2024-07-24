import React, { useState } from "react";
import NavBarAdmin from "./NavBarAdmin";
import axios from 'axios';

function GameModeSecond() {
  const [periodNumber, setPeriodNumber] = useState("");
  const [color, setColor] = useState("");
  const [loading, setLoading] = useState(false); // State to handle loading
  const [error, setError] = useState(""); // State to handle errors

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!periodNumber || !color) {
      alert("Please fill out all fields.");
      return;
    }
    setLoading(true);
    setError(""); // Clear any previous errors
    try {
      const response = await axios.post(
        "https://api.perfectorse.site/api/check-and-update-period/two-min",
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
        alert(`Failed to update period: ${error.response.data?.error || error.message}`);
      } else {
        alert("Failed to update period.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <NavBarAdmin />
      <div className="flex items-center justify-center w-full h-screen">
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
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
            className={`bg-blue-500 text-white py-2 px-4 rounded-md ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
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
