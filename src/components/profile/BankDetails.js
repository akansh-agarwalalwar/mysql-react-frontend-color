import React, { useState, useContext, useEffect } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import UserContext from "../login/UserContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { IoIosArrowBack } from "react-icons/io";
import background from "../../images/background.png";

function BankDetails() {
  const { user } = useContext(UserContext);
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [bankName, setBankName] = useState("")
  const [accountHolderName, setAccountHolderName] = useState("")
  const [bankDetailsAvailable, setBankDetailsAvailable] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [additionalBank, setAdditionalBank] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBankDetails = async () => {
      try {
        const res = await axios.get(
          `https://api.vigya.in/api/v1/financial/bank-details/${user.userId}`
        );
        if (res.status === 200) {
          setAccountNumber(res?.data?.accountNumber);
          setIfscCode(res?.data?.ifscCode);
          setBankDetailsAvailable(true);
        }
      } catch (err) {
        // console.log("No existing bank details found", err);
      }
    };
    if (user && user.userId) {
      fetchBankDetails();
    }
  }, [user]);
  const handleBankDetails = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://api.vigya.in/api/v1/financial/bank-details",
        {
          userId: user?.userId,
          accountNumber,
          ifscCode,
          bankName,
          accountHolderName
        }
      );
      toast.success("Bank details added successfully!");
      setBankDetailsAvailable(true);
    } catch (err) {
      toast.error("Failed to add bank details.");
      // console.log(err);
    }
  };
  const editBankDetails = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://api.vigya.in/api/v1/financial/edit-bank-details",
        {
          userId: user?.userId,
          accountNumber,
          ifscCode,
          bankName,
          accountHolderName
        }
      );
      toast.success("Bank details updated successfully!");
      setIsEditing(false);
    } catch (err) {
      toast.error("Failed to update bank details.");
      // console.log(err);
    }
  };
  const deleteBankDetails = async () => {
    try {
      await axios.post(
        `https://api.vigya.in/api/v1/financial/delete-bank-details`,
        {
          userId: user?.userId,
        }
      );
      toast.success("Bank details deleted successfully!");
      setAccountNumber("");
      setIfscCode("");
      setBankName("");
      setAccountHolderName("")
      setBankDetailsAvailable(false);
    } catch (err) {
      toast.error("Failed to delete bank details.");
      // console.log(err);
    }
  };
  const getLastFourDigits = (number) => {
    return "****" + number?.slice(-4);
  };
  const getFirstThreeDigits = (code) => {
    return "***" + code?.slice(0, 3);
  };
  return (
    <div className="max-w-md mx-auto">
      <div
        className="flex flex-col bg-myblue-800 h-screen"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div>
          <div className="flex items-center bg-black w-full text-black py-3 px-4">
            <Link to="/home/profile" className="mr-4">
              <div className=" p-2">
                <IoIosArrowBack size={20} color="#FFF" />
              </div>
            </Link>
            <p className="text-xl font-bold text-white">Bank Details</p>
          </div>
        </div>
        <div className="flex flex-col flex-grow mx-5 my-5 mt-8">
          {bankDetailsAvailable && !isEditing ? (
            <div className="p-8 w-full flex flex-row justify-between shadow-xl bg-white rounded-2xl">
              <div className="mb-4">
                <label className="block text-md font-bold mb-2">
                  Account Number
                </label>
                <p className="text-pure-greys-400">
                  {getLastFourDigits(accountNumber)}
                </p>
              </div>
              <div className="mb-4">
                <label className="block text-md font-bold mb-2">
                  IFSC Code
                </label>
                <p className="text-pure-greys-400">
                  {getFirstThreeDigits(ifscCode)}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  className="font-bold py-2 px-4 rounded bg-myblue-200 text-white"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </button>
                <button
                  className="font-bold py-2 px-4 rounded bg-red-100 text-white"
                  onClick={deleteBankDetails}
                >
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 w-full my-5 mt-10 shadow-xl bg-white">
              <h2 className="text-xl font-bold mb-4 text-center text-myblue-200">
                {bankDetailsAvailable
                  ? "Edit Bank Account"
                  : "Add Bank Account"}
              </h2>
              <form
                onSubmit={
                  bankDetailsAvailable ? editBankDetails : handleBankDetails
                }
              >
                <div className="mb-4">
                  <label
                    className="block text-black text-sm font-bold mb-2"
                    htmlFor="accountNumber"
                  >
                    Bank Name
                  </label>
                  <input
                    type="text"
                    id="bankName"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value.toUpperCase())}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                    pattern="[A-Z ]+"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-black text-sm font-bold mb-2"
                    htmlFor="accountNumber"
                  >
                    Account Holder Name
                  </label>
                  <input
                    type="text"
                    id="accountHolder"
                    value={accountHolderName}
                    onChange={(e) => setAccountHolderName(e.target.value.toUpperCase())}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                    pattern="[A-Z ]+"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-black text-sm font-bold mb-2"
                    htmlFor="accountNumber"
                  >
                    Account Number
                  </label>
                  <input
                    type="number"
                    id="accountNumber"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="block text-black text-sm font-bold mb-2"
                    htmlFor="ifscCode"
                  >
                    IFSC Code
                  </label>
                  <input
                    type="text"
                    id="ifscCode"
                    value={ifscCode}
                    onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                    autoCapitalize="characters"
                    pattern="[A-Z0-9]{11}"
                    title="IFSC Code must be 11 characters long and contain only uppercase letters and numbers."
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="font-bold py-2 px-4 rounded items-center justify-center w-full bg-myblue-200 text-white"
                  >
                    {bankDetailsAvailable ? "Update" : "Submit"}
                  </button>
                </div>
                {/* {message && (
                  <div className="mt-4 text-center text-red-100">{message}</div>
                )} */}
              </form>
            </div>
          )}
          {additionalBank && (
            <div className="p-8 w-full border-2 my-5 mt-10 shadow-xl border-myblue-200 bg-white">
              <h2 className="text-xl font-bold mb-4 text-center">
                Add Another Bank Account
              </h2>
              <form onSubmit={handleBankDetails}>
                <div className="mb-4">
                  <label
                    className="block text-myblue-200 text-sm font-bold mb-2"
                    htmlFor="accountNumber"
                  >
                    Account Number
                  </label>
                  <input
                    type="number"
                    id="accountNumber"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="block text-myblue-200 text-sm font-bold mb-2"
                    htmlFor="ifscCode"
                  >
                    IFSC Code
                  </label>
                  <input
                    type="text"
                    id="ifscCode"
                    value={ifscCode}
                    onChange={(e) => setIfscCode(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                    autoCapitalize="characters"
                    pattern="[A-Z0-9]{11}"
                    title="IFSC Code must be 11 characters long and contain only uppercase letters and numbers."
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="font-bold py-2 px-4 rounded items-center justify-center w-full bg-myblue-200 text-white"
                  >
                    Add Bank Account
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BankDetails;
