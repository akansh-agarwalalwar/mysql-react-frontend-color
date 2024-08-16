import axios from "axios";
import React, { useState } from "react";
import NavBarAdmin from "./NavBarAdmin";

function MaintenancePop() {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [popup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const enableMaintenanceMode = async () => {
    try {
      const response = await axios.post(
        "https://api.perfectorse.site/api/v1/admin/toggle-maintenance",
        {
          maintenanceMode: true,
          message: message,
        }
      );
      setMaintenanceMode(response.data.maintenanceMode);
      setShowPopup(false);
      setMessage("");
    } catch (error) {
      console.error("Failed to enable maintenance mode:", error);
    }
  };

  const disableMaintenanceMode = async () => {
    try {
      const response = await axios.post(
        "https://api.perfectorse.site/api/v1/admin/toggle-maintenance",
        {
          maintenanceMode: false,
          message: message,
        }
      );
      setMaintenanceMode(response.data.maintenanceMode);
      setShowPopup(false);
      setMessage("");
    } catch (error) {
      console.error("Failed to disable maintenance mode:", error);
    }
  };

  const handlePop = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="flex flex-row">
      <NavBarAdmin />
      <div className="relative w-full items-center flex">
        <button
          className="bg-myblue-400 p-2 text-white rounded ml-10"
          onClick={handlePop}
        >
          Maintenance Mode
        </button>

        {popup && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
            <div className="bg-white p-4 rounded shadow-lg w-80 relative">
              <button
                onClick={closePopup}
                className="absolute top-2 right-2 p-2 rounded-full"
              >
                &times;
              </button>
              <div className="mb-4 mt-10">
                <input
                  type="text"
                  placeholder="Enter message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <button
                  onClick={enableMaintenanceMode}
                  className="p-2 bg-green-100 text-white rounded"
                >
                  Enable Maintenance Mode
                </button>
                <button
                  onClick={disableMaintenanceMode}
                  className="p-2 bg-red-500 text-white rounded"
                >
                  Disable Maintenance Mode
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MaintenancePop;
