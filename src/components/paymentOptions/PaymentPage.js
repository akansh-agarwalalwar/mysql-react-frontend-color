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
  const { amount } = location.state || {
    amount: 0,
    paymentMode: "N/A",
  };
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    const value = event.target.value;
    // Only allow numeric input
    if (/^\d*$/.test(value)) {
      setInputValue(value);
    }
  };

  const handleConfirm = async () => {
    if (inputValue.length !== 12) {
      toast.error("Transaction ID must be 12 digits long", {
        position: "bottom-right",
      });
      return;
    }

    try {
      const existingTransaction = await axios.get(
        `http://3.109.206.254:3001/check-transaction/${inputValue}`
      );
      if (existingTransaction.data.exists) {
        toast.error("Transaction ID already in use", {
          position: "bottom-right",
        });
        return;
      }
      const data = {
        userId: user.userId,
        amount: amount, // Pass amount from location state
        input: inputValue,
      };

      await axios.post("http://3.109.206.254:3001/image-upload", data);
      toast.success("Request submitted");
      navigate("/home");
    } catch (error) {
      // console.error("Error confirming payment:", error);
      // alert("Failed to confirm payment. Please try again.");
    }
  };

  const isConfirmButtonDisabled = inputValue.length !== 12;

  return (
    <div className="bg-myblue-500 h-screen">
      <div className="flex flex-row bg-myblue-200 w-full text-white items-center h-12">
        <Link to="/home">
          <FaArrowLeftLong className="mx-3" />
        </Link>
        <p className="text-xl">Submit Request</p>
      </div>
      <div className="flex flex-col items-center mt-8">
        <div className="h-[70px] w-[80px]">
          <img src={QR} alt="QR Code" />
        </div>
        <div className="flex flex-col mt-4">
          <h2 className="font-bold text-lg mb-4">UTR Reference Number</h2>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter 12-digit Transaction Id"
            className="border-2 p-2 rounded-md mb-4"
          />
          <button
            className={`bg-myblue-200 text-white p-2 rounded-md border font-bold shadow shadow-xl ${
              isConfirmButtonDisabled && "opacity-50 cursor-not-allowed"
            }`}
            onClick={handleConfirm}
            disabled={isConfirmButtonDisabled}
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
