import React, { useContext, useState, useEffect } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import UserContext from "../login/UserContext";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function Withdraw() {
  const { user } = useContext(UserContext);
  const [amountset, setAmountset] = useState('');
  const [message, setMessage] = useState('');
  const [bankDetails, setBankDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBankDetails = async () => {
      try {
        const res = await axios.get(`https://color-server.onrender.com/api/bank-details/${user.userId}`);
        if (res.status === 200) {
          setBankDetails(res.data);
        }
      } catch (err) {
        console.log( err);
      }
    };

    if (user && user.userId) {
      fetchBankDetails();
    }
  }, [user]);

  const handleWithdraw = async () => {
    const amount = parseFloat(amountset);
    if (isNaN(amount) || amount <= 0) {
      setMessage('Amount must be greater than zero');
      return;
    }
    try {
      const response = await axios.post('https://color-server.onrender.com/api/withdraw', { userId: user.userId, amount });
      navigate('/home');
    } catch (error) {
      setMessage((error.response?.data?.message));
    }
  };

  const handleAddBankDetails = () => {
    navigate("/bank-details");
  };

  const getLastFourDigits = (number) => {
    return "****" + number.slice(-4);
  };

  const getFirstThreeCharacters = (code) => {
    return "***" + code.slice(0, 3);
  };

  return (
    <div className="flex flex-col justify-between h-screen w-full bg-myblue-500">
      <div>
        <div className="w-full text-white bg-myblue-200 h-10 px-3 flex items-center justify-center fixed top-0">
          <div className="flex absolute left-0 ml-2">
            <Link to="/home">
              <FaArrowLeftLong size={20} />
            </Link>
          </div>
          <div className="flex items-center justify-center ml-4">
            <h1 className="text-2xl font-bold">Withdraw</h1>
          </div>
        </div>
        <div className="relative mt-10">
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
            {/* Display bank card if it exists */}
            <div className="my-4 text-center border-2 rounded p-4 border-myblue-200">
              <p className="text-xl">
                Bank Details
                <br />
                <span className="font-bold text-xl">{getLastFourDigits(bankDetails.accountNumber)}</span>
                <br />
                <span className="font-bold text-xl">{getFirstThreeCharacters(bankDetails.ifscCode)}</span>
              </p>
            </div>
          </div>
        ) : (
          <div>
            {/* Display add bank details button if bank card does not exist */}
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
            className="w-full h-10 border rounded-md border-myblue-200"
            placeholder=" 300 ~ 7500 "
            value={amountset}
            onChange={(e) => setAmountset(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center w-full mt-3">
          <button 
            className={`bg-myblue-200 rounded-md w-full h-9 ${amountset < 300 ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleWithdraw}
            disabled={amountset < 300}
          >
            <p className="text-xl font-bold text-white">Confirm</p>
          </button>
        </div>
        {message && (
          <div className="mt-4 text-center">
            <p className="text-red-500">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Withdraw;
