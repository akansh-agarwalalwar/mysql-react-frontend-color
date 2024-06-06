import React, { useState, useContext } from "react";
import { FaGooglePay } from "react-icons/fa";
import BottomNav from "../dashboard/BottomNav";
import UserContext from "../login/UserContext";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

import { FaArrowLeftLong } from "react-icons/fa6";
const Recharge = () => {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleRecharge = () => {
    if (parseInt(amount) < 100) {
      setError("Minimum recharge amount is 100 Rs");
      return;
    }
    setError("");
    setShowPaymentOptions(true);
  };

  const rechargeOptions = [
    {
      title: "UPI",
      icon: (
        <img
          src={require("../../images/upi_icon.png")}
          style={{ height: 20 }}
          alt="UPI"
        />
      ),
      path: "/payment-page",
    },
    {
      title: "Paytm",
      icon: (
        <img
          src={require("../../images/paytm_icon.png")}
          style={{ height: 20 }}
          alt="Paytm"
        />
      ),
      path: "/payment-page",
    },
    {
      title: "PhonePe",
      icon: (
        <img
          src={require("../../images/phonepe_icons.png")}
          style={{ height: 20 }}
          alt="PhonePe"
        />
      ),
      path: "/payment-page",
    },
    {
      title: "Google Pay",
      icon: <FaGooglePay />,
      path: "/payment-page",
    },
  ];

  const handlePaymentOptionClick = (path, title) => {
    navigate(path, { state: { amount, paymentMode: title } });
  };

  return (
    <div className="flex flex-col items-center mt-8 px-8">
      <div className="w-full text-white bg-blue-200 h-[40px] px-3 flex absolute top-0 items-center ">
        <div className="flex justify-start">
          <Link to="/home">
            <FaArrowLeftLong size={20} />
          </Link>
        </div>
        <div className=" items-center justify-center flex ml-4">
          <h1 className="text-2xl font-bold items-center justify-center flex">
            Recharge
          </h1>
        </div>
      </div>

      <div className="my-4">
        <p className="text-xl">Balance: {user.balance}</p>
      </div>
      <div className="mb-4">
        <label htmlFor="amount" className="text-lg mb-2">
          Amount:{" "}
        </label>
        <input
          type="number"
          id="amount"
          className="p-2 border border-gray-300 rounded-md"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[100, 200, 500, 1000, 2000, 10000].map((value) => (
          <button
            key={value}
            className="p-2 bg-primary text-white rounded-md hover:bg-blue-600"
            onClick={() => setAmount(value.toString())}
          >
            {value} Rs
          </button>
        ))}
      </div>
      <button
        onClick={handleRecharge}
        className="mt-4 p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Recharge
      </button>
      {showPaymentOptions && (
        <div className="flex flex-col items-start mt-4 space-y-4 w-full mb-16">
          <ul className="flex flex-col space-y-2 w-full">
            {rechargeOptions.map((item, index) => (
              <div
                className={`rounded-lg px-7 border-b border-richblack-300 ${
                  index % 2 === 0 ? "bg-richblue-5" : ""
                }`}
                key={index}
              >
                <div
                  onClick={() =>
                    handlePaymentOptionClick(item.path, item.title)
                  }
                  className={`flex items-center justify-between border-richblack-300 py-4 cursor-pointer ${
                    index % 2 === 0 ? "even:bg-richblue-200" : ""
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <p className="text-2xl text-richblue-300">{item.icon}</p>
                    <p className="text-xl text-richblack-500">{item.title}</p>
                  </div>
                  <MdKeyboardArrowRight />
                </div>
              </div>
            ))}
          </ul>
        </div>
      )}
      <BottomNav />
    </div>
  );
};

export default Recharge;
