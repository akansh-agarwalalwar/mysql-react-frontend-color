import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserContext from "../login/UserContext";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { FaArrowLeftLong } from "react-icons/fa6";

function FinancialDetails() {
  const { user } = useContext(UserContext);
  const [rechargeHistory, setRechargeHistory] = useState([]);
  const [withdrawHistory, setWithdrawHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeHistory, setActiveHistory] = useState("recharge");
  useEffect(() => {
    if (user && user.userId) {
      fetchRechargeHistory(user.userId);
      fetchWithdrawHistory(user.userId);
    }
  }, [user]);

  const fetchRechargeHistory = async (userId) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://color-server.onrender.com/api/payemnt/history123?userId=${userId}`
      );
      if (response.status === 200) {
        setRechargeHistory(response.data);
      } else {
        throw new Error("Failed to fetch recharge history");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchWithdrawHistory = async (userId) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://color-server.onrender.com/api/show/withdrawl/history?userId=${userId}`
      );
      if (response.status === 200) {
        setWithdrawHistory(response.data);
      } else {
        throw new Error("Failed to fetch withdrawal history");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTabClick = (tab) => {
    setActiveHistory(tab);
  };

  const getStatusClass = (status) => {
    return status === "denied" ? "text-red-100" : "text-green-100";
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-myblue-500 h-screen">
      <div className="w-full bg-myblue-200 h-12 px-3 flex items-center justify-center fixed top-0 left-0 z-10">
        <div className="absolute left-0 ml-2">
          <Link to="/profile">
            <FaArrowLeftLong size={20} className="text-white mx-2" />
          </Link>
        </div>
        <div className="flex items-center justify-center">
          <h1 className="text-xl text-white">Financial Details</h1>
        </div>
      </div>
      <div className="flex justify-around items-center mb-8 mt-8">
        <div
          className={`cursor-pointer p-2 ${
            activeHistory === "recharge" ? "bg-myblue-200" : "bg-white"
          } rounded-md shadow-md`}
          onClick={() => handleTabClick("recharge")}
        >
          Recharge History
        </div>
        <div
          className={`cursor-pointer p-2 ${
            activeHistory === "withdraw" ? "bg-myblue-200" : " bg-white"
          } rounded-md shadow-md`}
          onClick={() => handleTabClick("withdraw")}
        >
          Withdrawal History
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center">
          <ClipLoader size={50} color={"#123abc"} loading={loading} />
        </div>
      ) : error ? (
        <div className="text-red-100 text-center">{error}</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {activeHistory === "recharge"
            ? rechargeHistory.map((recharge) => (
                <div
                  key={recharge.id}
                  className="bg-white rounded-lg shadow-md p-6 border-2 shadow-myblue-200 border-myblue-200"
                >
                  <p>
                    <span className="font-semibold">Amount:</span>{" "}
                    {recharge.amount}
                  </p>
                  <p>
                    <span className="font-semibold">Date:</span>{" "}
                    {new Date(recharge.rechargeDate).toLocaleDateString()}
                  </p>
                  <p className={`font-semibold flex justify-end ${getStatusClass(recharge.status)}`}>
                    Status: {recharge.status}
                  </p>
                </div>
              ))
            : withdrawHistory.map((withdrawal) => (
                <div
                  key={withdrawal.id}
                  className="bg-white rounded-lg shadow-md p-6 shadow-myblue-200 border-2 border-myblue-200 "
                >
                  <p>
                    <span className="font-semibold">Amount:</span>{" "}
                    {withdrawal.amount}
                  </p>
                  <p>
                    <span className="font-semibold">Date:</span>{" "}
                    {new Date(withdrawal.withdrawDate).toLocaleDateString()}
                  </p>
                  <p className={`font-semibold flex justify-end ${getStatusClass(withdrawal.status)}`}>
                    Status: {withdrawal.status}
                  </p>
                </div>
              ))}
        </div>
      )}
    </div>
  );
}

export default FinancialDetails;
