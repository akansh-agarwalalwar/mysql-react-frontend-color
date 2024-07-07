import React, { useState } from "react";
import NavBarAdmin from "./NavBarAdmin";
import axios from 'axios'
function GameModeSecond() {
  const [periodNumber, setPeriodNumber] = useState("");
  const [color, setColor] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!periodNumber || !color) {
      alert("Please fill out all fields.");
      return;
    }
    try {
      console.log("Sending data:", { periodNumber });

      const response = await axios.post(
        "https://color-server.onrender.com/api/check-and-update-period/two-min",
        {
          periodNumber: periodNumber,
        }
      );
      console.log("Response:", response);
      if (response.status === 200) {
        alert("Period updated successfully!");
      } else {
        alert("Failed to update period.");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        alert(`Failed to update period: ${error.response.data.error}`);
      } else {
        alert("Failed to update period.");
      }
    }
  };
  return (
    <div>
      <NavBarAdmin />
      <div className="flex items-center justify-center w-full h-screen">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="flex flex-row">
            <p>Period Number</p>
            <input
              className="border-2"
              value={periodNumber}
              onChange={(e) => setPeriodNumber(e.target.value)}
            />
          </div>
          <div className="flex flex-row">
            <p>Color</p>
            <input
              className="border-2"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GameModeSecond;
