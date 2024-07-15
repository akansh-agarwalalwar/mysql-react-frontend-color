import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import BottomNav from "../dashboard/BottomNav";
import UserContext from "../login/UserContext";

const Recharge = () => {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleRecharge = () => {
    const parsedAmount = parseInt(amount);
    if (parsedAmount >= 200 && parsedAmount <=10000) {
      navigate("/home/recharge/payment-page", { state: { amount: parsedAmount } });
    } else {
      setError("Amount must be 200 INR or more");
    }
  };

  const isRechargeButtonDisabled = !(parseInt(amount) >= 200 && parseInt(amount)<= 10000);

  return (
    <div className="bg-myblue-500 h-screen">
      <div className="flex flex-row bg-myblue-200 w-full text-white items-center h-12">
        <Link to="/home">
          <FaArrowLeftLong size={20} className="mx-4" />
        </Link>
        <p className="text-xl font-bold -mt-1">Recharge</p>
      </div>
      <div className="flex flex-col mx-5 mt-5">
        <div>
          <p>Enter the recharge amount</p>
        </div>
        <div className="mb-4 mt-2 w-full border shadow-xl rounded-md">
          <input
            type="number"
            id="amount"
            className="p-2 border-myblue-300 rounded-md w-full"
            value={amount}
            placeholder="200 ~ 10000"
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-4 gap-4">
          {[500, 1000, 2500, 10000]?.map((value) => (
            <button
              key={value}
              className="p-2 text-myblue-400 rounded-md border border-myblue-200"
              onClick={() => setAmount(value.toString())}
            >
              {value}
            </button>
          ))}
        </div>
        <button
          onClick={handleRecharge}
          disabled={isRechargeButtonDisabled}
          className={`mt-4 p-3 bg-myblue-200 text-white rounded-md font-bold ${
            isRechargeButtonDisabled && "opacity-50 cursor-not-allowed"
          }`}
        >
          Recharge
        </button>
        {error && <p className="text-red-100 text-sm mt-2">{error}</p>}
        <div className="mt-3">
          <div>
            <p className="font-bold text-sm">
              1. Press Recharge Button To Generate QR Code
            </p>
            <p className="ml-4 text-sm">
              To display QR code button, press Recharge button or edit the
              deposit by pressing deposit field
            </p>
          </div>
          <div className="mt-3">
            <p className="font-bold text-sm">2. Pay with QR Code</p>
            <p className="ml-4 text-sm">
              Scan a QR code using Paytm or make a screenshot with payment app
            </p>
          </div>
          <div className="mt-3">
            <p className="font-bold text-sm">3. Transaction Confirm</p>
            <p className="ml-4 text-sm">
              Paste a UTR reference number of 12 digits from the payment app
              deposit by pressing deposit field
            </p>
          </div>
          <hr className="mt-3" />
          <div className="flex flex-col justify-center w-full items-center mt-3 mb-[50px]">
            <div>
              <p>Having Problem ?</p>
            </div>
            <div className="flex flex-row justify-center items-center bg-red-100 border-2 p-1 rounded-lg shadow shadow-xl">
              <div className="text-sm ml-1 text-white">Video Guide</div>
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Recharge;
