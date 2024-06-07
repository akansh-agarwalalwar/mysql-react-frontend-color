import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaymentProcessing from "./PaymentProcessing";

function PaymentPage() {
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
      <PaymentProcessing/>
      <ToastContainer />
    </div>
  );
}

export default PaymentPage;