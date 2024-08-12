import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserContext from "../login/UserContext";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import background from '../../images/background.png';

function FinancialDetails() {
  const { user } = useContext(UserContext);
  const [rechargeHistory, setRechargeHistory] = useState([]);
  const [withdrawHistory, setWithdrawHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeHistory, setActiveHistory] = useState("recharge");
  useEffect(() => {
    if (user && user?.userId) {
      fetchRechargeHistory(user?.userId);
      fetchWithdrawHistory(user?.userId);
    }
  }, [user]);
  const fetchRechargeHistory = async (userId) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.perfectorse.site/api/v1/financial/recharge-history?userId=${userId}`
      );
      if (response.status === 200) {
        setRechargeHistory(response?.data);
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
        `https://api.perfectorse.site/api/v1/financial/withdraw-history?userId=${userId}`
      );
      if (response.status === 200) {
        setWithdrawHistory(response?.data);
      } else {
        throw new Error("Failed to fetch withdrawal history");
      }
    } catch (error) {
      // setError(error.message);
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
    <div
      className=" bg-myblue-800 h-screen max-w-md mx-auto"
      
    >
      <div className="flex flex-col bg-myblue-800 h-screen"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
        <div>
          <div className="flex items-center bg-black w-full text-black py-3 px-4">
            <Link to="/home/profile" className="mr-4">
              <div className=" p-2">
                <IoIosArrowBack size={20} color="#FFF" />
              </div>
            </Link>
            <p className="text-xl font-bold text-white">Financial Details</p>
          </div>
        </div>
        <div className="flex justify-around items-center mb-8 mt-8 px-3">
          <div
            className={`cursor-pointer p-2 w-full flex justify-center items-center mr-2  ${
              activeHistory === "recharge" ? "bg-myblue-200 text-white" : "bg-white"
            } rounded-md shadow-md`}
            onClick={() => handleTabClick("recharge")}
          >
            Recharge History
          </div>
          <div
            className={`cursor-pointer p-2 w-full flex justify-center items-center ml-2  ${
              activeHistory === "withdraw" ? "bg-myblue-200 text-white" : " bg-white"
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
              ? rechargeHistory
                  ?.slice()
                  ?.reverse()
                  ?.map((recharge) => (
                    <div
                      key={recharge.id}
                      className="bg-white rounded-lg p-6 shadow-xl mx-3 "
                    >
                      <p>
                        <span className="font-semibold">Amount:</span>{" "}
                        {recharge.amount}
                      </p>
                      <p>
                        <span className="font-semibold">Date:</span>{" "}
                        {new Date(recharge.rechargeDate).toLocaleDateString()}
                      </p>
                      <p
                        className={`font-semibold flex justify-end ${getStatusClass(
                          recharge.status
                        )}`}
                      >
                        Status: {recharge.status}
                      </p>
                    </div>
                  ))
              : withdrawHistory
                  ?.slice()
                  ?.reverse()
                  ?.map((withdrawal) => (
                    <div
                      key={withdrawal.id}
                      className="bg-white rounded-lg p-6 shadow-xl mx-3 "
                    >
                      <p>
                        <span className="font-semibold">Amount:</span>{" "}
                        {withdrawal.amount}
                      </p>
                      <p>
                        <span className="font-semibold">Date:</span>{" "}
                        {new Date(withdrawal.withdrawDate).toLocaleDateString()}
                      </p>
                      <p
                        className={`font-semibold flex justify-end ${getStatusClass(
                          withdrawal.status
                        )}`}
                      >
                        Status: {withdrawal.status}
                      </p>
                    </div>
                  ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FinancialDetails;
