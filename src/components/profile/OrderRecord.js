import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { FaArrowLeftLong } from "react-icons/fa6";
import UserContext from "../login/UserContext";
import { Link } from "react-router-dom";

function OrderRecord() {
  const { user } = useContext(UserContext);
  const [history, setHistory] = useState([]);
  const [thirtySecond, setThirtySecond] = useState([]);
  const [twomin, setTwomin] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("30sec");

  useEffect(() => {
    if (user && user.userId) {
      fetchthirtySecond(user.userId);
      fetchtwomin(user.userId);
    }
  }, [user]);

  const fetchthirtySecond = async (userId) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://color-server.onrender.com/api/thirty-second-history/${userId}`
      );
      if (response.status === 200) {
        setThirtySecond(response.data);
      } else {
        throw new Error("Failed to fetch Thirty Second history");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchtwomin = async (userId) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://color-server.onrender.com/api/two-min-history/${userId}`
      );
      if (response.status === 200) {
        setTwomin(response.data);
      } else {
        throw new Error("Failed to fetch Two Min history");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const getStatusClass = (status) => {
    return status === "denied" ? "text-red-100" : "text-green-100";
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
            activeTab === "30sec" ? "bg-myblue-200" : "bg-white"
          } rounded-md shadow-md`}
          onClick={() => handleTabClick("30sec")}
        >
          30 Second
        </div>
        <div
          className={`cursor-pointer p-2 ${
            activeTab === "2min" ? "bg-myblue-200" : "bg-white"
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
          {activeTab === "30sec"
            ? thirtySecond.slice().reverse().map((record) => (
                <div
                  key={record.id}
                  className="bg-white rounded-lg shadow-md p-6 border border-myblue-200 shadow-myblue-200"
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
                  <p
                    className={`font-semibold flex justify-end ${getStatusClass(
                      record.status
                    )}`}
                  >
                    Status: {record.status}
                  </p>
                </div>
              ))
            : twomin.slice().reverse().map((record) => (
                <div
                  key={record.id}
                  className="bg-white rounded-lg shadow-md p-6 border border-myblue-200 shadow-myblue-200"
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
                  <p
                    className={`font-semibold flex justify-end ${getStatusClass(
                      record.status
                    )}`}
                  >
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
