import React, { useState, useContext } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import UserContext from "../login/UserContext";


function PaymentPage({ userId }) {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const location = useLocation();
  const { amount, paymentMode } = location.state || { amount: 0, paymentMode: "N/A" };
  const [inputValue, setInputValue] = useState('');

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("UPI ID copied", {
      position: "bottom-right"
    });
  };

  const handleClickPayment = () => {
    let url;
    switch (paymentMode) {
      case "Google Pay":
        url = `https://pay.google.com/gp/v/assets Transaction?amt=${amount}&cu=INR`;
        break;
      case "Paytm":
        url = `https://paytm.com/qr?amt=${amount}&cu=INR`;
        break;
      case "PhonePe":
        url = `https://phonepe.com/transaction?amt=${amount}&cu=INR`;
        break;
      default:
        toast.error("Invalid payment mode selected", {
          position: "bottom-right"
        });
        return;
    }
    window.open(url, '_blank');
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleConfirm = async () => {
    try {
      // Check if transaction ID already exists
      const existingTransaction = await axios.get(`https://color-server.onrender.com/check-transaction/${inputValue}`);
      if (existingTransaction.data.exists) {
        toast.error("Transaction ID already in use", {
          position: "bottom-right"
        });
        return;
      }
      const data = {
        userId: user.userId,
        amount,
        input: inputValue,
      };

      await axios.post('https://color-server.onrender.com/image-upload', data);
      toast.success('Request submitted');
      navigate("/home")
    } catch (error) {
      console.error('Error confirming payment:', error);
      alert('Failed to confirm payment. Please try again.');
    }
  };

  return (
    <div>
      <div className="w-full text-white bg-blue-200 h-[180px] rounded-b-2xl px-3 flex flex-col">
        <div className="top-0 mt-3 flex-row items-center">
          <div className="left-0 flex flex-row justify-between w-[100%] items-center">
            <div className="flex flex-row items-center">
              <div>
                <Link to="/recharge">
                  <FaArrowLeftLong size={20} />
                </Link>
              </div>
              <div className="ml-2">
                <p>Payment</p>
              </div>
            </div>
            <div className="flex right-0 ">
              <p className="text-xl"> <span id="amount-pay">{amount}</span></p>
            </div>
          </div>
        </div>
        <div className="relative mt-3">
          <div>
            <div>Mode: {paymentMode}</div>
            <div>VGA: <span id="upi-id">your-upi-id@bank</span></div>
          </div>
          <div className="flex mt-2 items-center justify-center">
            <button
              onClick={() => copyToClipboard(document.getElementById("upi-id").innerText)}
              className="bg-blue-500 text-white p-2 rounded-md"
            >
              Copy UPI
            </button>
            <button
              onClick={() => copyToClipboard(document.getElementById("amount-pay").innerText)}
              className="bg-blue-500 text-white p-2 rounded-md ml-2"
            >
              Copy AMT
            </button>
            <button
              onClick={handleClickPayment}
              className="bg-blue-500 text-white p-2 rounded-md ml-2"
            >
              Open APP
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center mt-8">
        <h2 className="font-bold text-lg mb-4">Payment Processing</h2>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter Transaction Id"
          className="border-2 p-2 rounded-md mb-4"
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-md"
          onClick={handleConfirm}
        >
          Confirm
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default PaymentPage;
