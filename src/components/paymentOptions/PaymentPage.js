import React, { useState, useContext } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "../login/UserContext";
import QR from "../../images/fast-parity.jpg";
function PaymentPage() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const location = useLocation();
  const { amount, paymentMode } = location.state || {
    amount: 0,
    paymentMode: "N/A",
  };
  const [inputValue, setInputValue] = useState("");

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("UPI ID copied", {
      position: "bottom-right",
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
          position: "bottom-right",
        });
        return;
    }
    window.open(url, "_blank");
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleConfirm = async () => {
    try {
      // Check if transaction ID already exists
      const existingTransaction = await axios.get(
        `https://color-server.onrender.com/check-transaction/${inputValue}`
      );
      if (existingTransaction.data.exists) {
        toast.error("Transaction ID already in use", {
          position: "bottom-right",
        });
        return;
      }
      const data = {
        userId: user.userId,
        amount,
        input: inputValue,
      };

      await axios.post("https://color-server.onrender.comimage-upload", data);
      toast.success("Request submitted");
      navigate("/home");
    } catch (error) {
      console.error("Error confirming payment:", error);
      alert("Failed to confirm payment. Please try again.");
    }
  };

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
            Submit Request
          </h1>
        </div>
      </div>
      <div className="flex flex-col items-center mt-8">
        <div className="h-[70px] w-[80px]">
          <img src={QR} />
        </div>
        <div className="flex flex-col mt-4">
          <h2 className="font-bold text-lg mb-4">UTR Reference Number</h2>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="12-digit Transaction Id"
            className="border-2 p-2 rounded-md mb-4"
          />
          <button
            className="bg-myblue-200 text-white p-2 rounded-md border font-bold shadow shadow-xl shadow-myblue-200"
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default PaymentPage;
