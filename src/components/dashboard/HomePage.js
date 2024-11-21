import React, { useState, useEffect } from "react";
import BottomNav from "./BottomNav";
import Body from "./Body";
import TopBody from "./TopBody";
import Reward from "./Reward";
import Slider from "./Slider";
import background from "../../images/background.png";
import axios from 'axios';
import NewOffer from "./NewOffer";

export default function HomePage() {
  const [showPopup, setShowPopup] = useState(false);
  const [maintenanceMessage, setMaintenanceMessage] = useState("");

  useEffect(() => {
    const checkMaintenanceStatus = async () => {
      try {
        const response = await axios.get('http://api.perfectorse.site/api/v1/user/getMaintainance');
        const { maintenanceMode, message } = response.data;
        const storedMaintenanceMode = localStorage.getItem('maintenanceMode');
        const dismissed = localStorage.getItem('maintenanceDismissed');
        if (storedMaintenanceMode !== maintenanceMode) {
          localStorage.setItem('maintenanceMode', maintenanceMode);
          setMaintenanceMessage(message); 
          if (maintenanceMode && !dismissed) {
            setShowPopup(true);
          }
        }
      } catch (error) {
        console.error('Failed to fetch maintenance status:', error);
      }
    };

    checkMaintenanceStatus();
  }, []);

  const closePopup = () => {
    setShowPopup(false);
    localStorage.setItem('maintenanceDismissed', 'true');
  };

  return (
    <div
      className="overflow-y-auto bg-myblue-500 h-screen max-w-md mx-auto"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {showPopup && (
        <div className="fixed inset-0 bg-opacity-75 flex items-center justify-center z-50 max-w-xs mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Maintenance Mode</h2>
            <p>{maintenanceMessage || "The system is currently under maintenance. Please try again later."}</p>
            <button
              onClick={closePopup}
              className="mt-6 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <TopBody />
      <Slider />
      <NewOffer />
      {/* <Reward/> */}
      <Body />
    </div>
  );
}
