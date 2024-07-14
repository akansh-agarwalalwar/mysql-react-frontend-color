import React, { useState, useEffect } from "react";
import NavBarAdmin from "./NavBarAdmin";
import axios from "axios";
// import io from 'socket.io-client';

// const socket = io('http://3.7.253.226:3001');

export default function GameMode() {
  const [periodNumber, setPeriodNumber] = useState("");
  const [color, setColor] = useState("");
  // const [timer, setTimer] = useState(30);

  // useEffect(() => {
  //   socket.on('timer', (newTimer) => {
  //     setTimer(newTimer);
  //   });
  // return () => {
  //   socket.off('timer');
  // };
  // }, [timer]); 

  // useEffect(() => {
  //   const ws = new WebSocket('ws://localhost:3001');

  //   ws.onmessage = (event) => {
  //     const data = JSON.parse(event.data);
  //     setTimer(data.timer);
  //   };

  //   ws.onopen = () => {
  //     console.log('Connected to WebSocket');
  //   };

  //   ws.onclose = () => {
  //     console.log('Disconnected from WebSocket');
  //   };

  //   return () => {
  //     ws.close();
  //   };
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!periodNumber || !color) {
      alert("Please fill out all fields.");
      return;
    }
    try {
      console.log("Sending data:", { periodNumber });
  
      const response = await axios.post('http://api.perfectorse.site/api/check-and-update-period', {
        periodNumber: periodNumber,
      });
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
