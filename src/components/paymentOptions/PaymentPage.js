import React, { useState,useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaymentProcessing from "./PaymentProcessing";
import UserContext from "../login/UserContext";
function PaymentPage({userId}) {
  const { user, setUser } = useContext(UserContext);
  const location = useLocation();
  const { amount, paymentMode } = location.state || { amount: 0, paymentMode: "N/A" };
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
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setUploadedImage(file); 
      setShowPopup(true);
    } else {
      alert('Please upload a valid image file.');
    }
  };
  const handleConfirm = async () => {
    axios.post('https://color-server.onrender.com/image-upload', { userId: user.userId, amount: amount })
      .then(response => {
        console.log(response.data);
        alert('Request sent!');
      })
      .catch(error => {
        console.error('There was an error sending the request!', error);
      });
  };

  const handleReload = () => {
    setUploadedImage(null);
    setShowPopup(false);
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
            <div>ID:</div>
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
      {/* <PaymentProcessing amount={amount} /> */}
      <div className="flex flex-col items-center">
      <h2 className="font-bold text-lg mb-4">Payment Processing</h2>
      {!uploadedImage && (
        <div className="h-[125px] w-[230px] flex items-center justify-center border-2 mb-4">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="upload-image"
            onChange={handleImageUpload}
          />
          <label
            htmlFor="upload-image"
            className="bg-blue-500 text-white p-2 rounded-md cursor-pointer"
          >
            Upload Image
          </label>
        </div>
      )}
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-md">
            <h3 className="font-bold mb-2">Image Uploaded!</h3>
            <p className="mb-4">Please confirm or reload the image.</p>
            <button
              className="bg-green-500 border text-black p-2 rounded-md mr-2"
              onClick={handleConfirm}
            >
              Confirm
            </button>
            <button
              className="bg-orange-500 border text-black p-2 rounded-md"
              onClick={handleReload}
            >
              Reload
            </button>
          </div>
        </div>
      )}
    </div>
      <ToastContainer />
    </div>
  );
}

export default PaymentPage;
