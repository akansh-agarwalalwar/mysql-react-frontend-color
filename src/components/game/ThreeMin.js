import React, { useState, useEffect, useContext } from "react";
import { FaHorseHead } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { RxCross1 } from "react-icons/rx";
import UserContext from "../login/UserContext";
import axios from "axios";
import TwoMinOrder from "./TwoMinOrder";
import { IoIosTrophy } from "react-icons/io";
import calculateTimerInfoTwoMin from "./calculateTimerInfoTwoMin";
import toast from "react-hot-toast";
import { LuAlarmClock } from "react-icons/lu";
function TwoMin() {
  const [data, setData] = useState(calculateTimerInfoTwoMin);
  const { user, fetchUserData } = useContext(UserContext);
  const [period, setPeriod] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedNumber, setSelectedNumber] = useState(1);
  const [contractMoney, setContractMoney] = useState(10);
  const [winAmount, setWinAmount] = useState(19.6);
  const [refresh, setRefresh] = useState(0);
  const [userOrders, setUserOrders] = useState([]);
  const [possiblePayout, setPossiblePayout] = useState({
    Red: 19.6,
    Violet: 44.1,
    Green: 19.6,
  });
  const [twomin, setTwomin] = useState([]);
  const [lastPeriodData, setLastPeriodData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const [newBets, setNewBets] = useState([]);
  const [showRandomBets, setShowRandomBets] = useState(false);
  const [activeTab, setActiveTab] = useState("parityRecord");

  useEffect(() => {
    const timerID = setInterval(() => {
      setData(calculateTimerInfoTwoMin());
      // setPeriodNumber(data.timerNumber);
    }, 1000);
    return () => {
      clearInterval(timerID);
    };
  }, []);
  const fetchLastPeriodData = async () => {
    try {
      const response = await axios.get(
        "https://api.perfectorse.site/api/v1/user/winner-two-min"
      );
      const data = response?.data;
      setLastPeriodData(data);
      // console.log(data)
      // console.log(response.data)
    } catch (error) {
      // console.error(error);
    }
  };
  useEffect(() => {
    fetchLastPeriodData();
    // console.log(lastPeriodData,"hugsafd")
  }, [data.countDown === 120]);
  useEffect(() => {
    if (user && user.userId) {
      fetchtwomin(user?.userId);
    }

  }, [user]);
  const fetchtwomin = async (userId) => {
    try {
      // setLoading(true);
      const response = await axios.get(
        `https://api.perfectorse.site/api/v1/financial/two-min-history/${userId}`
      );
      if (response.status === 200) {
        setTwomin(response?.data);
      }
    } catch (error) {
      // setError(error.message);
      console.error(error)
    } finally {
      // setLoading(false);
    }
  };



  const colorBoxes = [
    {
      title: "Red",
      color: "red",
      icon: <FaHorseHead style={{ color: "#FF0000" }} />,
      ratio: "x2",
      values: [1, 3, 7, 9],
    },
    {
      title: "Violet",
      color: "purple",
      icon: <FaHorseHead style={{ color: "#800080" }} />,
      ratio: "x4.5",
      values: [0, 5],
    },
    {
      title: "Green",
      color: "green",
      icon: <FaHorseHead style={{ color: "#00FF00" }} />,
      ratio: "x2",
      values: [2, 4, 6, 8],
    },
  ];

  const isDisabled = data.countDown <= 30;

  const handleColorBoxClick = (color) => {
    setSelectedColor(color);
    setSelectedNumber(1);
    handleContractMoneyChange(contractMoney, color.title);
  };
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };
  const handleContractMoneyChange = (
    amount,
    colorTitle = selectedColor?.title
  ) => {
    setContractMoney(amount);
    // Calculate possible payout when contract money changes
    if (colorTitle) {
      let multiplier = 0;
      if (colorTitle === "Red" || colorTitle === "Green") {
        multiplier = 2;
      } else if (colorTitle === "Violet") {
        multiplier = 4.5;
      }

      const payout = amount * multiplier;
      const decreasedAmount = payout - payout * 0.02; // 2% decrease
      setWinAmount(decreasedAmount);
    }
  };

  const handleNumberChange = (number) => {
    setSelectedNumber(number);
  };

  const closePopup = () => {
    setSelectedColor(null);
    setSelectedNumber(1); // Reset selected number to default
    setContractMoney(10); // Reset contract money to default
  };

  const handleConfirm = async () => {
    const betAmount = contractMoney * selectedNumber;
    const possiblePayoutValue = possiblePayout[selectedColor.title].toFixed(2);

    if (user?.balance < 10) {
      setErrorMessage("Insufficient balance"); // Set error message if balance is insufficient
      return;
    }
    try {
      const response = await axios.post(
        "https://api.perfectorse.site/place-bet/two-min",
        {
          userId: user.userId,
          periodNumber: data.timerNumber,
          periodDate: new Date().toISOString().split("T")[0],
          betType: selectedColor?.title,
          berforeBetAmount: user?.balance,
          betAmount: betAmount,
          possiblePayout: possiblePayout[selectedColor?.title]?.toFixed(2),
        }
      );
      toast.success("Bet placed successfully!");
      // console.log("Response from server:", response.data);

      if (response.status !== 200) {
        throw new Error("Error placing bet");
      }
      setUserOrders((prevOrders) => [
        ...prevOrders,
        {
          periodNumber: data.timerNumber,
          betType: selectedColor?.title,
          betAmount,
          possiblePayout: possiblePayout[selectedColor?.title]?.toFixed(2),
        },
      ]);
      await fetchUserData();
    } catch (error) {
      // console.error("Error placing bet:", error);
    }

    closePopup();
  };
  const generateRandomBets = () => {
    const colors = ["Red", "Violet", "Green"];
    const amounts = [100, 200, 500, 1000];
    const bets = [];

    for (let i = 0; i < 10; i++) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const randomAmount = amounts[Math.floor(Math.random() * amounts.length)];
      const randomUserNumber = Math.floor(1000 + Math.random() * 9000);
      bets.push({
        color: randomColor,
        amount: randomAmount,
        userNumber: randomUserNumber,
      });
    }

    setNewBets(bets);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      const newTimerData = calculateTimerInfoTwoMin();
      setData(newTimerData);

      if (newTimerData.countDown >= 30) {
        setShowRandomBets(true);
        generateRandomBets();
      }
    }, 3000);
    generateRandomBets()
    return () => clearInterval(interval);
  }, [showRandomBets,data.countDown]);
  const getColorClass = (color) => {
    switch (color.toLowerCase()) {
      case "red":
        return "bg-red-100";
      case "green":
        return "bg-green-100";
      case "violet":
        return "bg-purple-100";
      default:
        return "bg-gray-300"; // Default color if the winner's color is not recognized
    }
  };
  useEffect(() => {
    if (data.countDown === 118) {
      window.location.reload();
    }
  }, [data.countDown]);
  return (
    <div className="flex flex-col bg-myblue-500 min-h-screen max-w-md mx-auto">
      {/* Header */}
      <div className="flex flex-row bg-myblue-200 w-full text-white items-center h-12 md:h-8">
        <Link to="/home">
          <FaArrowLeftLong className="mx-2" />
        </Link>
        <p className="text-xl">Fast-Parity</p>
      </div>
      {/* Timer Section */}
      <div className="w-full">
        <div className="flex flex-row justify-between w-full items-center h-16 my-2 px-3 bg-white mb-2">
          <div className="flex flex-col">
            <div className="flex flex-row gap-2 items-center justify-center">
              <IoIosTrophy />
              <p className="text-l">Period Number</p>
            </div>
            <div className="rounded-lg p-3 h-8 flex items-center bg-white justify-center">
              <h2 className="text-xl text-black font-mono">
                {data.timerNumber}
              </h2>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-l ml-4">Count Down</p>
            <div className="rounded-lg p-3 h-8 items-center flex justify-center bg-white flex-row">
              {/* <h2 className="text-2xl font-mono">{formatTime(time)}</h2> */}
              <LuAlarmClock className="mr-3" />
              <h2 className="text-2xl font-mono">
                {formatTime(data.countDown)}
              </h2>
            </div>
          </div>
        </div>
        {/* Color Boxes */}
        <div className="p-2 mt-2 bg-gray-800 flex justify-around flex-wrap ">
          {colorBoxes?.map((colorBox) => (
            <div className=" w-1/4">
              <div
                key={colorBox.color}
                className={`flex flex-col justify-center items-center border-2 border-myblue-200 rounded-lg p-2 cursor-pointer bg-white ${
                  isDisabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => !isDisabled && handleColorBoxClick(colorBox)}
              >
                <div className="text-4xl">{colorBox.icon}</div>
                <div className="mt-2">{colorBox.title}</div>
                <div className="">{colorBox.ratio}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popup Modal */}
      <Popup
        open={!!selectedColor && data.countDown > 30}
        closeOnDocumentClick
        onClose={closePopup}
        modal
      >
        <div className="modal bg-white rounded-lg p-4 shadow-lg max-w-xs mx-auto border-2 border-myblue-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{selectedColor?.title}</h2>
            <button onClick={closePopup} className="text-red-500">
              <RxCross1 />
            </button>
          </div>
          {/* User Balance */}
          <div className="mb-4">
            <p>{`Balance: ${user?.balance}`}</p>
          </div>
          {/* Error Message */}
          {errorMessage && (
            <div className="text-red-100 mb-4">{errorMessage}</div>
          )}
          {/* Input Field for Amount */}
          <div className="mb-4">
            <label htmlFor="amountInput">Enter Amount:</label>
            <input
              type="number"
              id="amountInput"
              min="10"
              value={contractMoney}
              onChange={(e) => handleContractMoneyChange(e.target.value)}
              className="p-2 border rounded-lg w-full mt-1"
            />
          </div>
          {/* Possible Payout */}
          <div className="mb-4 text-sm">
            <p>Possible Payout: {winAmount?.toFixed(2)}</p>
          </div>
          {/* Confirm Button */}
          <div className="mb-4">
            <button
              onClick={handleConfirm}
              disabled={contractMoney < 10}
              className={`bg-myblue-200 p-2 rounded-lg w-full shadow-lg text-white ${
                contractMoney < 10 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Confirm
            </button>
          </div>
        </div>
      </Popup>

      {/* WINNER DIVISION */}
      <div className="flex flex-col w-full mb-4 bg-white h-[230px] ">
        <p className="text-xl w-full items-center justify-center flex mt-1">
          Parity Result
        </p>
        <div className="flex flex-col justify-center w-full items-center mb-4 mt-2 border h-[1px] border-myblue-200"></div>
        <div className="flex flex-col h-10 items-center w-full">
          <div className="flex flex-row w-full justify-around items-center">
            {lastPeriodData && (
              <div className="grid grid-cols-9 gap-3 w-full mx-2">
                {lastPeriodData &&
                  lastPeriodData
                    ?.slice()
                    ?.reverse()
                    ?.map((item, index) => {
                      const periodNumberLastThreeDigits = item?.periodNumber
                        ?.toString()
                        .slice(-3);
                      return (
                        <div key={index} className="flex flex-col items-center">
                          <div
                            className={`w-7 h-7 rounded-full border ${getColorClass(
                              item?.color
                            )}`}
                          ></div>
                          <span className="text-xs mt-1">
                            {periodNumberLastThreeDigits}
                          </span>
                        </div>
                      );
                    })}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-around w-full items-center">
        <div className="flex flex-row w-full justify-around items-center">
          <div
            className={`flex flex-col items-center cursor-pointer w-full text-xl ${
              activeTab === "parityRecord"
                ? "border-myblue-200 text-black bg-white"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("parityRecord")}
          >
            Parity Record
          </div>
          <div
            className={`flex flex-col items-center cursor-pointer w-full text-xl ${
              activeTab === "userRecord"
                ? "border-myblue-200 text-black bg-white"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("userRecord")}
          >
            User Record
          </div>
        </div>

        {activeTab === "parityRecord" ? (
          <div className="flex flex-col border-t-2 border-myblue-200 w-full">
            {/* Content for Parity Record tab */}
            <TwoMinOrder
              key={refresh}
              period={data.timerNumber}
              newBets={newBets}
            />
            <hr />
          </div>
        ) : (
          <div className="flex flex-col w-full">
            {/* Content for User Record tab */}
            <div className="bg-white">
              <div className="flex flex-col justify-center items-center border-myblue-200 w-full">
                {twomin && (
                  <table className="table-auto w-full">
                    <thead className="border-t-2 mt-3 border-myblue-200">
                      <tr>
                        <th className="p-2">
                          <div className="rounded-3xl">Number</div>
                        </th>
                        <th className="p-2">
                          <div className="rounded-3xl">Color</div>
                        </th>
                        <th className="p-2">
                          <div className="rounded-3xl">Amount</div>
                        </th>
                        <th className="p-2">
                          <div className="rounded-3xl">Status</div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {twomin?.slice(0, 10)?.map((order, index) => (
                        <tr key={index} className="border-t">
                          <td className="p-2 text-center">
                            {order.periodNumber}
                          </td>
                          <td className="p-2 text-center">{order.betType}</td>
                          <td className="p-2 text-center">{order.betAmount}</td>
                          <td className="p-2 text-center">
                            {order.status ? order.status : "Pending"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default TwoMin;
