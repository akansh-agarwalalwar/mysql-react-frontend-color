import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { FaArrowLeftLong } from "react-icons/fa6";
import UserContext from "../login/UserContext";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import background from "../../images/background.png";

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
      fetchthirtySecond(user?.userId);
      fetchtwomin(user?.userId);
    }
  }, [user]);

  const fetchthirtySecond = async (userId) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.vigya.in/api/v1/financial/thirty-second-history/${userId}`
      );
      if (response.status === 200) {
        setThirtySecond(response?.data);
      } else {
        throw new Error("Failed to fetch Thirty Second history");
      }
    } catch (error) {
      // setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchtwomin = async (userId) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.vigya.in/api/v1/financial/two-min-history/${userId}`
      );
      if (response.status === 200) {
        setTwomin(response?.data);
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
    return status === "lose" ? "text-red-100" : "text-green-100";
  };

  return (
    <div className=" bg-myblue-500 h-screen max-w-md mx-auto">
      <div className="flex flex-col bg-myblue-800 h-screen"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <div>
          <div className="flex items-center bg-black w-full text-black py-3 px-4">
            <Link to="/home/profile" className="mr-4">
              <div className=" p-2">
                <IoIosArrowBack size={20} color="#FFF" />
              </div>
            </Link>
            <p className="text-xl font-bold text-white">Order Record</p>
          </div>
        </div>
        <div className="flex justify-around items-center mb-4 mt-8 px-3">
          <div
            className={`cursor-pointer p-2 w-full flex justify-center items-center mr-2 ${
              activeTab === "30sec" ? "bg-myblue-200 text-white"  : "bg-white"
            } rounded-md shadow-md`}
            onClick={() => handleTabClick("30sec")}
          >
            30 Second
          </div>
          <div
            className={`cursor-pointer p-2 w-full flex justify-center items-center  ml-2 ${
              activeTab === "2min" ? "bg-myblue-200 text-white" : "bg-white"
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
              ? thirtySecond?.slice(0, 10)?.map((record) => (
                  <div
                    key={record.id}
                    className="bg-white rounded-lg p-6 mx-3 shadow-xl"
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
                      Status: {record.status ? record.status : "Pending"}
                    </p>
                  </div>
                ))
              : twomin?.slice(0, 10)?.map((record) => (
                  <div
                    key={record.id}
                    className="bg-white rounded-lg p-6 mx-3 shadow-xl"
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
                      Status: {record.status ? record.status : "Pending"}
                    </p>
                  </div>
                ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderRecord;
