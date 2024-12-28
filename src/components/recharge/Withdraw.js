import React, { useContext, useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import UserContext from "../login/UserContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import debounce from "lodash.debounce";
import toast from "react-hot-toast";
import "../../index.css";
import background from '../../images/background.png';

function Withdraw() {
  const { user } = useContext(UserContext);
  const [amountset, setAmountset] = useState("");
  const [loading, setLoading] = useState(false);
  const [bankDetails, setBankDetails] = useState(null);
  const [showModal, setShowModal] = useState(false); // Modal state
  const [pendingAmount, setPendingAmount] = useState(null); // Amount to be withdrawn
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBankDetails = async () => {
      try {
        const res = await axios.get(
          `https://api.vigya.in/api/v1/financial/bank-details/${user.userId}`
        );
        if (res.status === 200) {
          setBankDetails(res.data);
        }
      } catch (err) {
        console.error("Error fetching bank details:", err);
        toast.error("Failed to fetch bank details");
      }
    };
    if (user && user.userId) {
      fetchBankDetails();
    }
  }, [user]);

  const handleWithdraw = async () => {
    const amount = parseFloat(amountset);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Amount must be greater than zero");
      return;
    }
    setPendingAmount(amount); // Set the amount to be withdrawn
    setShowModal(true); // Show the modal
  };

  const confirmWithdrawal = async () => {
    if (pendingAmount === null) return; // If there's no pending amount, do nothing

    setLoading(true);
    try {
      const response = await axios.post(
        `https://api.vigya.in/api/v1/financial/amount-withdraw`,
        { userId: user.userId, amount: pendingAmount }
      );
      if (response.status === 200) {
        toast.success("Withdrawal Request Submitted!");
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else {
        toast.error("Failed to process withdrawal. Please try again.");
      }
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.message === "Insufficient balance") {
        toast.error("Insufficient balance!");
      } else if (error.response && error.response.status === 504) {
        toast.error("Server timeout. Redirecting to home page.");
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      } else {
        console.error("There was an error sending the request!", error);
        toast.error(
          error.response?.data?.message ||
            "An error occurred. Please try again."
        );
      }
    } finally {
      setLoading(false);
      setPendingAmount(null); // Reset pending amount
      setShowModal(false); // Hide the modal
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

  const debouncedHandleWithdraw = debounce(handleWithdraw, 700);

  return (
    <div
      className="no-bottom-nav flex flex-col h-screen w-full bg-myblue-800 max-w-md mx-auto justify-between"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div>
        <div className="flex items-center bg-black w-full text-black py-3 px-4">
          <Link to="/home" className="mr-4">
            <div className=" p-2">
              <IoIosArrowBack size={20} color="#FFF" />
            </div>
          </Link>
          <p className="text-xl font-bold text-white">Withdraw</p>
        </div>
        <div className="relative mt-6">
          <div className="my-4 text-center">
            <p className="text-xl">
              Balance
              <br />
              <span className="font-bold text-xl">
                {user?.winnings ? `₹ ${user.winnings}` : "₹ 0"}
              </span>
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
              className="bg-myblue-200 rounded-md w-full h-12 mb-2"
              onClick={handleAddBankDetails}
            >
              <p className="text-xl font-bold text-white ">Add Bank Details</p>
            </button>
          </div>
        )}
        <div>
          <p className="text-bold text-lg">Amount</p>
        </div>
        <div>
          <input
            type="number"
            className="w-full h-10 p-1 border rounded-md"
            placeholder=" 700 ~ 7000 "
            value={amountset}
            onChange={(e) => setAmountset(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center w-full mt-3">
          <button
            className={`bg-myblue-200 rounded-md w-full h-9 ${
              amountset < 700 || amountset > 7000 || loading || !bankDetails
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            onClick={debouncedHandleWithdraw}
            disabled={amountset < 700 || amountset > 7000 || !bankDetails}
          >
            <p className="text-xl font-bold text-white">
              {loading ? "Processing..." : "Confirm"}
            </p>
          </button>
        </div>
        {!bankDetails && (
          <div className="mt-4 text-center">
            <p className="text-red-100">
              Please add bank details to proceed with withdrawal.
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50  ">
          <div className="bg-white p-6 rounded shadow-lg text-center max-w-sm mx-auto">
            <p className="text-lg font-bold mb-4">Withdrawal Request Submitted</p>
            <p>Your request will be processed and approved within 24 hours.</p>
            <button
              className="mt-4 px-4 py-2 bg-myblue-200 text-white rounded"
              onClick={confirmWithdrawal}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Withdraw;
