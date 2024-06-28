import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TwoMinOrder({newBets}) {
  const [lastPeriodNumber, setLastPeriodNumber] = useState('');
  const [userBets, setUserBets] = useState([]);
  

  useEffect(() => {
    const fetchLastPeriodNumber = async () => {
      try {
        const response = await axios.get('https://color-server.onrender.com/api/lastPeriodNumber/two-min');
        const { lastPeriodNumber } = response.data;
        if (lastPeriodNumber) {
          setLastPeriodNumber(lastPeriodNumber);
          fetchUserBets(lastPeriodNumber); // Fetch user bets for the last period
        } else {
          console.error('Last periodNumber is undefined');
        }
      } catch (error) {
        console.error('Error fetching last periodNumber:', error);
      }
    };
    fetchLastPeriodNumber();
  }, []);

  const fetchUserBets = async (periodNumber) => {
    try {
      const response = await axios.get(`https://color-server.onrender.com/api/userBets/two-min/${periodNumber}`);
      setUserBets(response.data);
    } catch (error) {
      console.error('Error fetching user bets:', error);
    }
  };

  useEffect(() => {
    if (newBets.length > 0) {
      setUserBets((prevBets) => [...prevBets, ...newBets]);
    }
  }, [newBets]);

  return (
    <div className="flex flex-col bg-gray-900 min-h-screen">
      <div className="flex flex-row justify-between w-full items-center h-12 md:h-8">
        <p className="mx-2 font-bold text-xl items-center justify-center w-full flex">Everyone's Order</p>
      </div>
      <div className="p-2 mt-4">
        <div className="flex flex-col justify-center items-center">
          <table className="border-gray-600">
            <thead>
              <tr>
                <th className="border border-gray-600 p-2">Period Number</th>
                <th className="border border-gray-600 p-2">User</th>
                <th className="border border-gray-600 p-2">Color</th>
                <th className="border border-gray-600 p-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {userBets.map((bet, index) => (
                <tr key={index}>
                  <td className="border border-gray-600 p-2">{lastPeriodNumber.slice(-4)}</td>
                  <td className="border border-gray-600 p-2">{bet.userNumber}</td>
                  <td className="border border-gray-600 p-2">{bet.color}</td>
                  <td className="border border-gray-600 p-2">{bet.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TwoMinOrder;