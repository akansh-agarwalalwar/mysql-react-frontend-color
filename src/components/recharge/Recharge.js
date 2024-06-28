import React, { useState, useContext } from "react";
import { FaGooglePay } from "react-icons/fa";
import BottomNav from "../dashboard/BottomNav";
import UserContext from "../login/UserContext";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { CiPlay1 } from "react-icons/ci";

const Recharge = () => {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [showQrButton, setShowQrButton] = useState(false);

  const handleRecharge = () => {
    if (parseInt(amount) > 200) {
      setError();
      setShowQrButton(true);
      return;
    }
    setError("");
    setShowQrButton(false);
  };

  const handleGenerateQR = () => {
    navigate("/payment-page", { state: { amount } });
  };

  const isRechargeButtonDisabled = parseInt(amount) < 200 || showQrButton;

  return (
    <div className=" bg-myblue-500 h-screen">
      <div className="w-full text-white bg-myblue-200 h-[40px] px-3 flex top-0 items-center">
        <div className="flex justify-start">
          <Link to="/home">
            <FaArrowLeftLong size={20} />
          </Link>
        </div>
        <div className=" items-center justify-center flex ml-4">
          <h1 className="text-2xl font-bold items-center justify-center flex">
            Deposit
          </h1>
        </div>
      </div>
      <div className="flex flex-col mx-5 mt-5">
        <div>
          <p>Enter the recharge amount (200 ~ 50000 INR) </p>
        </div>
        <div className="mb-4 mt-2 w-full border shadow shadow-md rounded-md">
          <input
            type="number"
            id="amount"
            className="p-2 border-myblue-300 rounded-md w-full"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          {error && <p className="text-red-100 text-sm mt-1">{error}</p>}
        </div>
        <div className="grid grid-cols-4 gap-4">
          {[500, 1000, 2500, 10000].map((value) => (
            <button
              key={value}
              className="p-2 text-myblue-400 rounded-md border border-myblue-200 "
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
        {showQrButton && (
          <button
            onClick={handleGenerateQR}
            className="mt-4 p-3 bg-myblue-200 text-white rounded-md font-bold"
          >
            Generate QR
          </button>
        )}
        <div className="mt-3">
          <div>
            <p className=" font-bold text-sm">
              1. Press Recharge Button To Generate QR Code
            </p>
            <p className="ml-4 text-sm">
              To display QR code button, press Recharge button or edit the
              deposit by pressing deposit field
            </p>
          </div>
          <div className="mt-3">
            <p className=" font-bold text-sm">2. Pay with QR Code</p>
            <p className="ml-4 text-sm">
              Scan a QR code using Paytm or make a screenshot with payment app
            </p>
          </div>
          <div className="mt-3">
            <p className=" font-bold text-sm">3. Transaction Confirm</p>
            <p className="ml-4 text-sm">
              Paste a UTR reference number of 12 digits from the payment app
              deposit by pressing deposit field
            </p>
          </div>
          <hr className="mt-3"></hr>
          <div className="flex flex-col justify-center w-full items-center mt-3 mb-[50px]">
            <div>
              <p>Having Problem ?</p>
            </div>
            <div className="flex flex-row justify-center items-center">
              <div className="flex">
                <CiPlay1 />
              </div>
              <div className=" text-sm underline ml-1">Video Guide</div>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Recharge;
