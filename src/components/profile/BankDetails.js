import React, { useState, useContext, useEffect } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import UserContext from "../login/UserContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function BankDetails() {
  const { user } = useContext(UserContext);
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [message, setMessage] = useState("");
  const [bankDetailsAvailable, setBankDetailsAvailable] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBankDetails = async () => {
      try {
        const res = await axios.get(`https://mysql-color-backend.vercel.app/api/bank-details/${user.userId}`);
        if (res.status === 200) {
          setAccountNumber(res.data.accountNumber);
          setIfscCode(res.data.ifscCode);
          setBankDetailsAvailable(true);
        }
      } catch (err) {
        console.log("No existing bank details found", err);
      }
    };

    if (user && user.userId) {
      fetchBankDetails();
    }
  }, [user]);

  const handleBankDetails = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://mysql-color-backend.vercel.app/api/bank-details", {
        userId: user.userId,
        accountNumber,
        ifscCode,
      });
      setMessage("Bank details added successfully!");
      console.log(res.data);
      navigate('/home');
    } catch (err) {
      setMessage("Failed to add bank details.");
      console.log(err);
    }
  };

  const getLastFourDigits = (number) => {
    return "****" + number.slice(-4);
  };

  const getFirstThreeDigits = (code) => {
    return "***" + code.slice(0, 3);
  };

  return (
    <div className="flex flex-col w-full bg-gray-100">
      <div>
        <div className="w-full text-white bg-blue-500 h-12 px-3 flex items-center justify-center fixed top-0">
          <div className="flex absolute left-0 ml-2">
            <Link to="/profile">
              <FaArrowLeftLong size={20} />
            </Link>
          </div>
          <div className="flex items-center justify-center ml-4">
            <h1 className="text-2xl font-bold">Bank Details</h1>
          </div>
          <div className="flex absolute right-0 mr-2"></div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center flex-grow mx-5 my-5">
        {bankDetailsAvailable ? (
          <div className="p-8 w-full mt-10 border flex flex-row justify-between">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Account Number</label>
              <p className="text-gray-700">{getLastFourDigits(accountNumber)}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">IFSC Code</label>
              <p className="text-gray-700">{getFirstThreeDigits(ifscCode)}</p>
            </div>
          </div>
        ) : (
          <div className="p-8 w-full border mx-5 my-5 mt-10 ">
            <h2 className="text-2xl font-bold mb-4 text-center">Add Bank Account</h2>
            <form onSubmit={handleBankDetails}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="accountNumber">
                  Account Number
                </label>
                <input
                  type="text"
                  id="accountNumber"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ifscCode">
                  IFSC Code
                </label>
                <input
                  type="text"
                  id="ifscCode"
                  value={ifscCode}
                  onChange={(e) => setIfscCode(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline items-center justify-center w-full"
                >
                  Submit
                </button>
              </div>
              {message && (
                <div className="mt-4 text-center text-red-500">
                  {message}
                </div>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default BankDetails;
