import React, { useState, useEffect, useRef } from "react";
import NavBarAdmin from "./NavBarAdmin";
import axios from "axios";

export default function GameMode() {
  const [mode, setMode] = useState("Auto");
  const [displayedUser, setDisplayedUser] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [latestPeriod, setLatestPeriod] = useState(null);
  const [amounts, setAmounts] = useState({});
  const [countTime, setCountTime] = useState(30);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (mode === "Auto") {
      fetchAutoData();
    }
  }, [mode]);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const filteredUsers = users.filter((user) =>
      user.periodNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setDisplayedUser(filteredUsers.slice(0, 10));
  }, [users, searchQuery]);

  useEffect(() => {
    if (mode === "Manual") {
      fetchLatestPeriod();
      const interval = setInterval(() => {
        fetchLatestPeriod();
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [mode]);

  useEffect(() => {
    if (latestPeriod) {
      resetCountTime();
      startTimer();
      fetchAmounts();
    }
    return () => clearInterval(intervalRef.current);
  }, [latestPeriod]);

  const fetchAutoData = async () => {
    try {
      const response = await axios.get("https://color-server.onrender.com/admin/thirty-second");
      setDisplayedUser([response.data]);
    } catch (error) {
      console.error("Error fetching auto data:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://color-server.onrender.com/admin/thirty-second");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchLatestPeriod = async () => {
    try {
      const response = await axios.get("https://color-server.onrender.com/admin/thirty-second-manual-calculator");
      setLatestPeriod(response.data);
    } catch (error) {
      console.log("Error fetching the latest period:", error);
    }
  };

  const fetchAmounts = async () => {
    setTimeout(async () => {
      try {
        const response = await axios.get("https://color-server.onrender.com/admin/thirty-second/amount-calculator");
        setAmounts(response.data);
      } catch (error) {
        console.log("Error fetching amounts:", error);
      }
    }, 20000);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const resetCountTime = () => {
    setCountTime(30);
  };

  const startTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCountTime((prevCount) => {
        if (prevCount <= 1) {
          return 30;
        }
        return prevCount - 1;
      });
    }, 1000);
  };

  const handleManualSubmit = () => {
    alert("Submit clicked");
  };

  return (
    <div>
      <NavBarAdmin />
      <div className="ml-[200px]">
        <div className="flex justify-end m-2">
          <button
            className={`m-1 px-4 py-2 cursor-pointer rounded text-white ${
              mode === "Auto" ? "bg-blue-500" : "bg-richblue-200"
            }`}
            onClick={() => setMode("Auto")}
          >
            Auto
          </button>
          <button
            className={`m-1 px-4 py-2 cursor-pointer rounded text-white ${
              mode === "Manual" ? "bg-blue-500" : "bg-richblue-200"
            }`}
            onClick={() => setMode("Manual")}
          >
            Manual
          </button>
          {mode === "Manual" && (
            <button
              className="m-1 px-4 py-2 cursor-pointer rounded bg-secondary text-white"
              onClick={handleManualSubmit}
            >
              Submit
            </button>
          )}
        </div>
        <input
          type="text"
          placeholder="Search Period Numbers"
          className="w-full border border-gray-300 p-2 mb-4"
          value={searchQuery}
          onChange={handleSearch}
        />
        <div className="p-5 bg-gray-100 rounded">
          {mode === "Auto" ? (
            <div>
              {displayedUser.length > 0 ? (
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border p-2 text-left">Period Number</th>
                      <th className="border p-2 text-left">Color</th>
                      <th className="border p-2 text-left">Red</th>
                      <th className="border p-2 text-left">Green</th>
                      <th className="border p-2 text-left">Violet</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedUser
                      .slice()
                      .reverse()
                      .map((user) => (
                        <tr key={user.id}>
                          <td className="border p-2">{user.periodNumber}</td>
                          <td className="border p-2">{user.color}</td>
                          <td className="border p-2">{user.redColor}</td>
                          <td className="border p-2">{user.greenColor}</td>
                          <td className="border p-2">{user.violetColor}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          ) : (
            <div className="h-[550px] w-full bg-Lightblue flex flex-col items-center">
              {latestPeriod ? (
                <div className="flex flex-col items-center mt-4">
                  <h3>Last Inserted Value</h3>
                  <div className="flex flex-row">
                    <p className="mr-2">Period Number:</p>
                    <p>{latestPeriod.periodNumber}</p>
                  </div>
                  <div className="flex flex-row">
                    <p className="mr-2">Period Date:</p>
                    <p>{latestPeriod.periodDate}</p>
                  </div>
                  <div className="flex flex-row">
                    <p className="mr-2">Count Time:</p>
                    <p>{countTime}</p>
                  </div>
                  <div className="flex flex-col h-[150px] w-full bg-richblack-25 items-center justify-center">
                    <div className="flex flex-row mb-1">
                      <div className="">Red Color:</div>
                      <div className="ml-2">{amounts.redColor}</div>
                    </div>
                    <div className="flex flex-row mb-1">
                      <div>Green Color:</div>
                      <div className="ml-2">{amounts.greenColor}</div>
                    </div>
                    <div className="flex flex-row mb-1">
                      <div>Violet Color:</div>
                      <div className="ml-2">{amounts.violetColor}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <p>Loading latest period data...</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
