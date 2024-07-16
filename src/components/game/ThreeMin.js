import React, { useState, useEffect, useContext } from "react";
import { FaHorseHead } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { RxCross1 } from "react-icons/rx";
import UserContext from "../login/UserContext";
import EveryOneOrder from "./EveryOneOrder";
import axios from "axios";
import TwoMinOrder from "./TwoMinOrder";

function TwoMin() {
  const { user, setUser, fetchUserData } = useContext(UserContext);
  const [time, setTime] = useState(120); // 2 minutes in seconds
  const [period, setPeriod] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedNumber, setSelectedNumber] = useState(1);
  const [contractMoney, setContractMoney] = useState(10);
  const [records, setRecords] = useState([]);
  const [userBalance, setUserBalance] = useState(0);
  const [winAmount, setWinAmount] = useState(19.6);
  const [refresh, setRefresh] = useState(0);
  const [possiblePayout, setPossiblePayout] = useState({
    Red: 19.6,
    Violet: 44.10,
    Green: 19.6,
  });
  const [lastPeriodData, setLastPeriodData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const [newBets, setNewBets] = useState([]);
  const [showRandomBets, setShowRandomBets] = useState(false); // State to show random bets
  
  useEffect(() => {
    const fetchInitialPeriodAndTime = async () => {
      try {
        const periodResponse = await axios.get("https://api.perfectorse.site/period-timer/two-min");
        setPeriod(Number(periodResponse?.data?.periodNumber));

        const timeResponse = await axios.get("https://api.perfectorse.site/period-time/get-time/two-min");
        setTime((timeResponse?.data?.countdown || 120));
      } catch (error) {
        // console.error("Error fetching initial period and time:", error);
      }
    };
    fetchInitialPeriodAndTime();
  }, []);

  const fetchLastPeriodData = async () => {
    try {
      const response = await axios.get("https://api.perfectorse.site/winner-api/two-min");
      setLastPeriodData(response?.data);

      // console.log(response.data)
    } catch (error) {
      // console.error(error);
    }
  };

  useEffect(() => {
    fetchLastPeriodData();
  }, []);

  useEffect(() => {
    if (time === 0) {
      setPeriod((prevPeriod) => {
        const newPeriod = prevPeriod + 1;
        savePeriodToDatabase(newPeriod);
        return newPeriod;
      });
      setTime(120); // Reset to 120 seconds
    } else {
      const timerId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [time]);

  useEffect(() => {
    if (time === 119) {
      fetchLastPeriodData();
    }

    const sendTimeDataToServer = async () => {
      try {
        await axios.post("https://api.perfectorse.site/period-time/two-min", {
          periodNumber: formatPeriod(period),
          periodTime: new Date().toISOString().split("T")[1].split(".")[0],
          periodDate: new Date().toISOString().split("T")[0],
          countdown: time,
        });
        if (time === 7) {
          await axios.post("https://api.perfectorse.site/update-status/two-min", {
            periodNumber: formatPeriod(period),
            periodDate: new Date().toISOString().split("T")[0],
          });
        }
      } catch (error) {
        // console.error("Error sending time data to server:", error);
      }
    };

    const intervalId = setInterval(() => {
      sendTimeDataToServer();
      setRefresh((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [period, time]);

  useEffect(() => {
    if (time === 10) {
      const updateAmounts = async () => {
        try {
          await axios.post("https://api.perfectorse.site/update-amounts/two-min", {
            periodNumber: formatPeriod(period),
          });
          // console.log("Amounts updated successfully.");
        } catch (error) {
          // console.error("Error updating amounts:", error);
        }
      };
      updateAmounts();
    }
  }, [time]);
  const savePeriodToDatabase = async (newPeriod) => {
    try {
      await axios.post("https://api.perfectorse.site/period-timer/post/two-min", {
        periodNumber: newPeriod,
        periodDate: new Date().toISOString().split("T")[0],
      });
    } catch (error) {
      // console.error("Error saving period to database:", error);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart("2", "0")}`;
  };

  const formatPeriod = (period) => {
    return String(period).padStart(9, "0");
  };

  const colorBoxes = [
    {
      title: "Red",
      color: "red",
      icon: <FaHorseHead style={{ color: "#FF0000" }} />,
      values: [1, 3, 7, 9],
    },
    {
      title: "Violet",
      color: "purple",
      icon: <FaHorseHead style={{ color: "#800080" }} />,
      values: [0, 5],
    },
    {
      title: "Green",
      color: "green",
      icon: <FaHorseHead style={{ color: "#00FF00" }} />,
      values: [2, 4, 6, 8],
    },
  ];

  const isDisabled = time <= 30;

  const handleColorBoxClick = (color) => {
    setSelectedColor(color);
    setSelectedNumber(1); // Reset selected number to default
    handleContractMoneyChange(contractMoney, color.title);
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
      const response = await axios.post("https://api.perfectorse.site/place-bet/two-min", {
        userId: user.userId,
        periodNumber: formatPeriod(period),
        periodDate: new Date().toISOString().split("T")[0],
        betType: selectedColor?.title,
        berforeBetAmount: user?.balance,
        betAmount: betAmount,
        possiblePayout: possiblePayout[selectedColor?.title]?.toFixed(2),
      });
 

      // console.log("Response from server:", response.data);

      if (response.status !== 200) {
        throw new Error("Error placing bet");
      }

      // console.log("Bet placed successfully:", response.data);

      // Fetch the latest user data
      await fetchUserData();
    } catch (error) {
      // console.error("Error placing bet:", error);
    }
    closePopup();
  };
  useEffect(() => {
    if (time <= 117 && time >=30) {
      setShowRandomBets(true);
      generateRandomBets();
    } else {
      setShowRandomBets(false);
    }
  }, [time]);
  const generateRandomBets = () => {
    const newBets = [];
    const colors = ["Red", "Violet", "Green"];
    const amounts = [100, 200, 500, 1000];
  
    for (let i = 0; i < 30; i++) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const randomAmount = amounts[Math.floor(Math.random() * amounts.length)];
      const randomUserNumber = Math.floor(1000 + Math.random() * 9000);
      newBets.push({ color: randomColor, amount: randomAmount, userNumber: randomUserNumber });
    }
  
    setNewBets(newBets);
  };
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

  return (
    <div className="flex flex-col bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex flex-row bg-myblue-200 w-full text-white items-center h-12 md:h-8">
        <Link to="/home">
          <FaArrowLeftLong className="mx-2" />
        </Link>
        <p className="text-xl">Fast-Parity</p>
       
      </div>
      {/* Timer Section */}
      <div className="p-2 mt-2">
        <div className="flex flex-row justify-between w-full items-center h-15 my-2 px-3">
          <div className="flex flex-col">
          <p className="text-l">Periods Timer</p>
            <div className="rounded-lg p-3 shadow-lg h-8 flex items-center bg-white">
              <h2 className="text-xl text-black font-mono">
                {formatPeriod(period)}
              </h2>
            </div>
          </div>
          <div>
            <p className="text-l">Count Down</p>
            <div className="rounded-lg p-3 shadow-lg h-8 items-center flex justify-center bg-white">
              <h2 className="text-2xl font-mono">{formatTime(time)}</h2>
            </div>
          </div>
        </div>
        {/* Color Boxes */}
        <div className="p-2 mt-4 bg-gray-800 flex justify-around flex-wrap">
          {colorBoxes?.map((colorBox) => (
            <div className=" w-1/4">
            <div
              key={colorBox?.color}
              className={`flex flex-col justify-center items-center border-2 border-myblue-200 rounded-lg p-2 cursor-pointer bg-white shadow-lg ${
                isDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => !isDisabled && handleColorBoxClick(colorBox)}
            >
              <div className="text-4xl">{colorBox.icon}</div>
              <div className="mt-2">{colorBox.title}</div>
            </div>
            <div className=" ml-7">{colorBox.ratio}</div>
          </div>
        ))}
      </div>
      </div>

      {/* Popup Modal */}
      <Popup open={!!selectedColor && time>11} closeOnDocumentClick onClose={closePopup} modal>
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
          {errorMessage && <div className="text-red-100 mb-4">{errorMessage}</div>}
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
      <div className="flex flex-row justify-around border-2 border-myblue-200 shadow-lg h-14 items-center mx-4 rounded-xl bg-white">
        <div>{lastPeriodData ? lastPeriodData?.periodNumber : "Loading..."}</div>
        <div>{lastPeriodData ? lastPeriodData?.color : "Loading..."}</div>
        {lastPeriodData && (
          <div
            className={`w-8 h-8 rounded-full ${getColorClass(
              lastPeriodData?.color
            )}`}
          ></div>
        )}
      </div>

      {/* EveryOneOrder Component */}
      {showRandomBets && (
        <div className="flex p-2 bg-gray-800 flex-col">
          <TwoMinOrder key={refresh} period={formatPeriod(period)} newBets={newBets} />
          <hr/>
        </div>
      )}

      {/* Last Table Data */}
      {time <= 30 ? (
        <div className="flex p-2 flex-col mr-4 ml-4 justify-center items-center h-[150px] border-2 border-myblue-200 mt-11 shadow-lg bg-white">
        <h2 className="text-myblue-200 font-bold">WAIT FOR RESULT......</h2>
      </div>
      ) : (
        <div className="flex p-2 bg-gray-800 flex-col">
          {/* <EveryOneOrder key={refresh} period={formatPeriod(period - 1)} newBets={lastTableData} /> */}
        </div>
      )}
    </div>
  );
}

export default TwoMin;
