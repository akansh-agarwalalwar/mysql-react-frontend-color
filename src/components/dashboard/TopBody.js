import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function TopBody() {
  const [userData, setUserData] = useState({});
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    // Fetch user data from MySQL
    axios.get('http://your-backend-api/user')
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });

    // Fetch balance from MySQL
    axios.get('http://your-backend-api/balance')
      .then(response => {
        setBalance(response.data.balance);
      })
      .catch(error => {
        console.error('Error fetching balance:', error);
      });
  }, []);

  return (
    <div className="flex flex-col items-center py-8">
      <h1 className="text-2xl font-bold mb-4">Welcome {userData.name}</h1>
      <div className="flex items-center">
        <div className="mr-4">Balance Amount: {balance}</div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">Recharge</button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Withdraw</button>
      </div>
    </div>
  );
}
