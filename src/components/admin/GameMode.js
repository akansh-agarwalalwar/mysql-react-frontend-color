import React, { useState } from "react";
import NavBarAdmin from "./NavBarAdmin";
import axios from "axios";

export default function GameMode() {
  const [periodNumber, setPeriodNumber] = useState("");
  const [color, setColor] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!periodNumber || !color) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      console.log("Sending data:", { periodNumber, color });

      const response = await axios.post(
        "https://api.perfectorse.site/api/check-and-update-period",
        {
          periodNumber,
          color // Send color as well if needed
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
          <div className="flex flex-row mb-4">
            <p className="mr-2">Period Number</p>
            <input
              type="number"
              className="border-2 p-2"
              value={periodNumber}
              onChange={(e) => setPeriodNumber(e.target.value)}
            />
          </div>
          <div className="flex flex-row mb-4">
            <p className="mr-2">Color</p>
            <input
              type="text"
              className="border-2 p-2"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
