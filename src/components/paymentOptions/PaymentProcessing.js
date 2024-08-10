import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function PaymentProcessing({ userId, amount }) {
  const [inputValue, setInputValue] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleConfirm = async () => {
    try {
      const data = {
        userId,
        amount,
        input: inputValue,
      };

      await axios.post('https://api.perfectorse.ste/confirm-payment', data);
      toast.success('Request submitted');
      setShowPopup(false);
    } catch (error) {
      // console.error('Error confirming payment:', error);
      alert('Failed to confirm payment. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="font-bold text-lg mb-4">Payment Processing</h2>
      <div className="mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter your input"
          className="border-2 p-2 rounded-md"
        />
      </div>
      <button
        className="bg-blue-500 text-white p-2 rounded-md"
        onClick={() => setShowPopup(true)}
      >
        Confirm
      </button>
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-md">
            <h3 className="font-bold mb-2">Confirm your input</h3>
            <p className="mb-4">Please confirm your input before proceeding.</p>
            <button
              className="bg-green-500 border text-black p-2 rounded-md mr-2"
              onClick={handleConfirm}
            >
              Confirm
            </button>
            <button
              className="bg-orange-500 border text-black p-2 rounded-md"
              onClick={() => setShowPopup(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentProcessing;
