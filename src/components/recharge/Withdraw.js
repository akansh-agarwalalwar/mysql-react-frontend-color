import React, { useContext, useState, useEffect } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import UserContext from "../login/UserContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import debounce from "lodash.debounce";
import toast from "react-hot-toast";
import "../../index.css";
function Withdraw() {
  const { user } = useContext(UserContext);
  const [amountset, setAmountset] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [bankDetails, setBankDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBankDetails = async () => {
      try {
        const res = await axios.get(
          `https://api.perfectorse.ste/api/v1/financial/bank-details/${user.userId}`
        );
        if (res.status === 200) {
          setBankDetails(res.data);
        }
      } catch (err) {
        console.error("Error fetching bank details:", err);
      }
    };
    if (user && user.userId) {
      fetchBankDetails();
    }
  }, [user]);
  const handleWithdraw = async () => {
    const amount = parseFloat(amountset);
    if (isNaN(amount) || amount <= 0) {
      setMessage("Amount must be greater than zero");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `https://api.perfectorse.ste/api/v1/financial/amount-withdraw`,
        { userId: user.userId, amount }
      );
      if (response.status === 200) {
        toast.success("Withdrawl Request Submitted!");
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else {
        setMessage("Failed to process withdrawal. Please try again.");
      }
    } catch (error) {
      if (error.response && error.response.status === 504) {
        setMessage("Server timeout. Redirecting to home page.");
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      } else {
        console.error("There was an error sending the request!", error);
        setMessage(
          error.response?.data?.message ||
            "An error occurred. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };
  const handleAddBankDetails = () => {
    navigate("/home/profile/bank-details");
  };

  const getLastFourDigits = (number) => {
    return "***" + number?.slice(-4);
  };

  const getFirstThreeCharacters = (code) => {
    return "***" + code?.slice(0, 3);
  };

  const debouncedHandleWithdraw = debounce(handleWithdraw, 500);

  return (
    <div className="no-bottom-nav flex flex-col h-screen w-full bg-myblue-500 max-w-md mx-auto justify-between">
      <div>
        <div className="flex flex-row bg-myblue-200 w-full text-white items-center h-12">
          <Link to="/home">
            <FaArrowLeftLong className="mx-3" />
          </Link>
          <p className="text-xl">Withdraw</p>
        </div>
        <div className="relative mt-6">
          <div className="my-4 text-center">
            <p className="text-xl">
              Balance
              <br />
              <span className="font-bold text-xl">₹{user.balance}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col mx-4 my-4">
        {bankDetails ? (
          <div>
            <div className="my-4 text-center border-2 rounded p-4 border-myblue-200 shadow-xl">
              <p className="text-xl">
                Bank Details
                <br />
                <span className="font-bold text-xl">
                  {getLastFourDigits(bankDetails.accountNumber)}
                </span>
                <br />
                <span className="font-bold text-xl">
                  {getFirstThreeCharacters(bankDetails.ifscCode)}
                </span>
              </p>
            </div>
          </div>
        ) : (
          <div>
            <button
              className="bg-myblue-200 rounded-md w-full h-9"
              onClick={handleAddBankDetails}
            >
              <p className="text-xl font-bold text-white">Add Bank Details</p>
            </button>
          </div>
        )}
        <div>
          <p className="text-bold text-lg">Amount</p>
        </div>
        <div>
          <input
            type="number"
            className="w-full h-10 p-1 border rounded-md border-myblue-200"
            placeholder=" 500 ~ 7500 "
            value={amountset}
            onChange={(e) => setAmountset(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center w-full mt-3">
          <button
            className={`bg-myblue-200 rounded-md w-full h-9 ${
              amountset < 500 || amountset > 7500 || loading || !bankDetails
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            onClick={debouncedHandleWithdraw}
            disabled={amountset < 500 || amountset > 7500 || !bankDetails}
          >
            <p className="text-xl font-bold text-white">
              {loading ? "Processing..." : "Confirm"}
            </p>
          </button>
        </div>
        {message && (
          <div className="mt-4 text-center">
            <p className="text-red-100">{message}</p>
          </div>
        )}
        {!bankDetails && (
          <div className="mt-4 text-center">
            <p className="text-red-100">
              Please add bank details to proceed with withdrawal.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Withdraw;
