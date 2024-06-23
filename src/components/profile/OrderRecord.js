import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { FaArrowLeftLong } from "react-icons/fa6";
import UserContext from "../login/UserContext";
import { Link } from "react-router-dom";

function OrderRecord() {
  const { user } = useContext(UserContext);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("30sec");

  useEffect(() => {
    if (user && user.userId) {
      fetchOrderHistory(user.userId);
    }
  }, [user]);

  const fetchOrderHistory = async (userId) => {
    try {
      setLoading(true);
      let response;
      if (activeTab === "30sec") {
        response = await axios.get(
          `https://color-server.onrender.com/api/alluserperiodsthirtysecond?userId=${userId}`
        );
      } else if (activeTab === "2min") {
        response = await axios.get(
          `https://color-server.onrender.com/api/twominuserperiod?userId=${userId}`
        );
      }
      if (response.status === 200) {
        setHistory(response.data);
      } else {
        console.error(`Failed to fetch ${activeTab} history`);
      }
    } catch (error) {
      console.error(`Error fetching ${activeTab} history:`, error);
      setError(`Error fetching ${activeTab} history.`);
    } finally {
      setLoading(false);
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const getStatusClass = (status) => {
    return status === "denied" ? "text-red-500" : "text-green-500";
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-myblue-500">
      <div className="w-full bg-myblue-200 h-10 px-3 flex items-center justify-center fixed top-0 left-0 z-10">
        <div className="absolute left-0 ml-2">
          <Link to="/profile">
            <FaArrowLeftLong size={20} className="text-white" />
          </Link>
        </div>
        <div className="flex items-center justify-center">
          <h1 className="text-2xl font-bold text-white">Order Record</h1>
        </div>
      </div>
      <div className="flex justify-around items-center mb-4 mt-5">
        <div
          className={`cursor-pointer p-2 ${
            activeTab === "30sec" ? "bg-myblue-300" : "bg-gray-200"
          } rounded-md shadow-md`}
          onClick={() => handleTabClick("30sec")}
        >
          30 Second
        </div>
        <div
          className={`cursor-pointer p-2 ${
            activeTab === "2min" ? "bg-myblue-300" : "bg-gray-200"
          } rounded-md shadow-md`}
          onClick={() => handleTabClick("2min")}
        >
          2 Minute
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center">
          <ClipLoader size={50} color={"#123abc"} loading={loading} />
        </div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {history.map((record) => (
            <div
              key={record.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 border border-myblue-200"
            >
              <p>
                <span className="font-semibold">Amount:</span>{" "}
                {record.betAmount}
              </p>
              <p>
                <span className="font-semibold">Period Number:</span>{" "}
                {record.periodNumber}
              </p>
              <p>
                <span className="font-semibold">Bet Type:</span>{" "}
                {record.betType}
              </p>
              <p className={`font-semibold flex justify-end ${getStatusClass(record.status)}`}>
                Status: {record.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderRecord;
