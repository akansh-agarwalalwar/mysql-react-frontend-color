import React, { useState } from 'react';
import { FaGooglePay, FaPhone, FaMoneyBillWave, FaPaypal } from 'react-icons/fa';
import BottomNav from '../dashboard/BottomNav';

const Recharge = () => {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleRecharge = () => {
    if (parseInt(amount) < 100) {
      setError('Minimum recharge amount is 100 Rs');
      return;
    }
    // Your recharge logic goes here
  };

  return (
    <div className="flex flex-col items-center mt-8 px-8">
      <h1 className="text-3xl font-bold">Recharge</h1>
      <div className="my-4">
        <p className="text-xl">Balance: Rs. 5000</p>
      </div>
      <div className="mb-4">
        <label htmlFor="amount" className="text-lg mb-2">Amount:</label>
        <input
          type="number"
          id="amount"
          className="p-2 border border-gray-300 rounded-md"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <button className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">100 Rs</button>
        <button className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">200 Rs</button>
        <button className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">500 Rs</button>
        <button className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">1000 Rs</button>
        <button className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">2000 Rs</button>
        <button className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">10000 Rs</button>
      </div>
      <button onClick={handleRecharge} className="mt-4 p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">Recharge</button>
      <div className="flex flex-col items-start mt-4 space-y-4 w-full">
        <PaymentOption icon={<FaGooglePay />} label="Google Pay" />
        <PaymentOption icon={<FaPhone />} label="PhonePe" />
        <PaymentOption icon={<FaMoneyBillWave />} label="Paytm" />
        <PaymentOption icon={<FaPaypal />} label="UPI" />
      </div>
      <BottomNav />
    </div>
  );
};

const PaymentOption = ({ icon, label }) => (
  <button className="flex items-center text-gray-700 focus:outline-none bg-blue-200 p-4 rounded-md w-full">
    {icon}
    <span className="text-lg ml-4">{label}</span>
  </button>
);

export default Recharge;
