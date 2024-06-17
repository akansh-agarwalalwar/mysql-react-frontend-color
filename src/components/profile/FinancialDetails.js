import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserContext from "../login/UserContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { FaArrowLeftLong } from "react-icons/fa6";
function FinancialDetails() {
  const { user } = useContext(UserContext);
  const [rechargeHistory, setRechargeHistory] = useState([]);
  const [withdrawHistory, setWithdrawHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeHistory, setActiveHistory] = useState("withdraw");
  useEffect(() => {
    if (user && user.userId) {
      fetchRechargeHistory(user.userId);
    }
    if (user.userId) {
      fetchWithdrawHistory(user.userId);
    }
  }, [user]);
  const fetchRechargeHistory = async () => {
    try {
      const response = await fetch(
        `https://mysql-color-backend.vercel.app/api/payemnt/history123?userId=${user.userId}`
      );
      if (response.ok) {
        const data = await response.json();
        setRechargeHistory(data);
      } else {
        console.error("Failed to fetch recharge history");
      }
    } catch (error) {
      console.error("Error fetching recharge history:", error);
    }
  };
  const fetchWithdrawHistory = async (userId) => {
    try {
      const response = await fetch(
        `https://mysql-color-backend.vercel.app/api/show/withdrawl/history?userId=${user.userId}`
      );
      if (response.ok) {
        const data = await response.json();
        setWithdrawHistory(data);
      } else {
        console.error("Failed to fetch withdrawal history");
      }
    } catch (error) {
      console.error("Error fetching withdrawal history:", error);
    }
  };

  const handleTabClick = (tab) => {
    setActiveHistory(tab);
  };
  const getStatusClass = (status) => {
    return status === "denied" ? "text-red-500" : "text-green-500";
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full text-white bg-blue-200 h-10 px-3 flex items-center justify-center fixed top-0 left-0">
        <div className="flex absolute left-0 ml-2">
          <Link to="/profile">
            <FaArrowLeftLong size={20} />
          </Link>
        </div>
        <div className="flex items-center justify-center ml-4">
          <h1 className="text-2xl font-bold">Financial Details</h1>
        </div>
      </div>
      <div className="flex justify-around items-center mb-8 mt-5">
        <div
          className={`cursor-pointer p-2 ${
            activeHistory === "recharge" ? "bg-blue-200" : "bg-pure-greys-50"
          } rounded-md shadow-md`}
          onClick={() => handleTabClick("recharge")}
        >
          Recharge History
        </div>
        <div
          className={`cursor-pointer p-2 ${
            activeHistory === "withdraw" ? "bg-blue-200" : " bg-pure-greys-50"
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
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {activeHistory === "recharge"
            ? rechargeHistory.slice().reverse().map((recharge) => (
                <div
                  key={recharge.id}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
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
            : withdrawHistory.slice().reverse().map((withdrawal) => (
                <div
                  key={withdrawal.id}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
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
