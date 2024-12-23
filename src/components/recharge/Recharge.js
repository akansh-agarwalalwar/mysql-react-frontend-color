import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import BottomNav from "../dashboard/BottomNav";
import UserContext from "../login/UserContext";
import { IoIosArrowBack } from "react-icons/io";
import background from '../../images/background.png';

const Recharge = () => {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleRecharge = () => {
    const parsedAmount = parseInt(amount);
    if (parsedAmount >= 200 && parsedAmount <= 10000) {
      navigate("/home/recharge/payment-page", {
        state: { amount: parsedAmount },
      });
    } else {
      setError("Amount must be 500 INR or more");
    }
  };

  const isRechargeButtonDisabled = !(
    parseInt(amount) >= 500 && parseInt(amount) <= 10000
  );

  return (
    <div className="bg-myblue-800 h-screen max-w-md mx-auto"
    style={{
      backgroundImage: `url(${background})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div className="flex items-center bg-black w-full text-black py-3 px-4">
        <Link to="/home" className="mr-4">
          <div className=" p-2">
            <IoIosArrowBack size={20}  color="#FFF"/>
          </div>
        </Link>
        <p className="text-xl font-bold text-white">Recharge</p>
      </div>
      <div className="flex flex-col mx-5 mt-5">
        <div>
          <p>Enter the recharge amount</p>
        </div>
        <div className="mb-4 mt-2 w-full border rounded-md">
          <input
            type="number"
            id="amount"
            className="p-2 border-myblue-300 rounded-md w-full"
            value={amount}
            placeholder=" 500 ~ 10000"
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-4 gap-4">
          {[500, 1000, 2500, 10000]?.map((value) => (
            <button
              key={value}
              className="p-2 rounded-md border"
              onClick={() => setAmount(value.toString())}
            >
              {value}
            </button>
          ))}
        </div>
        <button
          onClick={handleRecharge}
          disabled={isRechargeButtonDisabled}
          className={`mt-4 p-3 bg-black rounded-md font-bold text-white ${
            isRechargeButtonDisabled && "opacity-50 cursor-not-allowed"
          }`}
        >
          Recharge
        </button>
        {error && <p className="text-red-100 text-sm mt-2">{error}</p>}
        <div className="mt-3">
          <div>
            <p className="font-bold text-sm">
              1. Press Recharge Button After Entering Amount
            </p>
            <p className="ml-4 text-sm">
              Press Recharge button or edit the deposit by pressing deposit
              field.
            </p>
          </div>
          <div className="mt-3">
            <p className="font-bold text-sm">2. Pay with QR Code</p>
            <p className="ml-4 text-sm">
              Scan a QR code using Paytm and pay the amount.
            </p>
          </div>
          <div className="mt-3">
            <p className="font-bold text-sm">3. Transaction Confirm</p>
            <p className="ml-4 text-sm">
              Paste a UTR reference number of 12 digits from the payment app
              deposit by pressing deposit field.
            </p>
          </div>
          <div className="mt-3">
            <p className="font-bold text-sm">4. Approval</p>
            <p className="ml-4 text-sm">
              Get Approval into 2-24 hours.
            </p>
          </div>
          {/* <hr className="mt-3" />
          <div className="flex flex-col justify-center w-full items-center mt-3 mb-[50px]">
            <div>
              <p>Having Problem ?</p>
            </div>
            <div className="flex flex-row justify-center items-center bg-red-100 border-2 p-1 rounded-lg shadow shadow-xl">
              <div className="text-sm ml-1 text-white">Video Guide</div>
            </div>
          </div> */}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Recharge;
