import React, { useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "../login/UserContext";
import QR from "../../images/qr_code.jpg";
import background from "../../images/background.png";
import { IoIosArrowBack } from "react-icons/io";

function PaymentPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const location = useLocation();
  const { amount } = location.state || { amount: 0, paymentMode: "N/A" };
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
    setLoading(true);
    try {
      const existingTransaction = await axios.get(
        `https://api.vigya.in/api/v1/transaction/checkTransactionId/${inputValue}`
      );

      if (
        existingTransaction.data.message === "Transaction ID already present"
      ) {
        toast.error("Transaction ID already in use");
        setLoading(false);
        return;
      }
      const data = {
        userId: user?.userId,
        amount,
        input: inputValue,
      };

      await axios.post(
        `https://api.vigya.in/api/v1/transaction/upload-transaction-id`,
        data
      );
      toast.success("Request submitted");

      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error) {
      if (error.response && error.response.status === 504) {
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      } else {
        toast.error("Failed to confirm payment. Please try again.", {
          position: "bottom-right",
        });
        console.error("Error confirming payment:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const isConfirmButtonDisabled = inputValue.length !== 12 || loading;

  return (
    <div
      className="bg-myblue-800 h-screen max-w-md mx-auto"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex items-center bg-black w-full text-black py-3 px-4">
        <Link to="/home" className="mr-4">
          <div className=" p-2">
            <IoIosArrowBack size={20} color="#FFF" />
          </div>
        </Link>
        <p className="text-xl font-bold text-white">Submit Request</p>
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
            className={`bg-myblue-200 text-white p-2 rounded-md font-bold shadow-xl ${
              isConfirmButtonDisabled && "opacity-50 cursor-not-allowed"
            }`}
            onClick={handleConfirm}
            disabled={isConfirmButtonDisabled}
          >
            <p className="text-xl font-bold text-white">
              {loading ? "Processing..." : "Confirm"}
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
