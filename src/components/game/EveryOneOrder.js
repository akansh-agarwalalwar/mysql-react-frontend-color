import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EveryOneOrder({ newBets }) {
  const [lastPeriodNumber, setLastPeriodNumber] = useState('');
  const [userBets, setUserBets] = useState([]);

  useEffect(() => {
    const fetchLastPeriodNumber = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/lastPeriodNumber');
        const { lastPeriodNumber } = response.data;
        if (lastPeriodNumber) {
          setLastPeriodNumber(lastPeriodNumber);
          // fetchUserBets(lastPeriodNumber);
        } else {
          console.error('Last periodNumber is undefined');
        }
      } catch (error) {
        console.error('Error fetching last periodNumber:', error);
      }
    };
    fetchLastPeriodNumber();
  }, []);

  // const fetchUserBets = async (periodNumber) => {
  //   try {
  //     const response = await axios.get(`http://localhost:3001/api/userBets/${periodNumber}`);
  //     setUserBets(response.data);
  //   } catch (error) {
  //     console.error('Error fetching user bets:', error);
  //   }
  // };

  useEffect(() => {
    if ( newBets.length > 0) {
      setUserBets((prevBets) => [...prevBets, ...newBets]);
    }
  }, [newBets]);

  return (
    <div className="container mx-auto">
      <div className="flex flex-col bg-gray-900 min-h-screen py-4">
        <div className="flex flex-row justify-center w-full items-center mb-4">
          <p className="mx-2 font-bold text-xl border-2 bg-white border-myblue-200 w-[50%] items-center justify-center flex h-10 rounded-xl shadow shadow-lg">Everyone's Order</p>
        </div>
        <div className="p-2">
          <div className="flex flex-col justify-center items-center">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="p-2"><div className='border-2 border-myblue-200 rounded-3xl shadow text-myblue-200'>Number</div></th>
                  <th className="p-2"><div className='border-2 border-myblue-200 rounded-3xl shadow text-myblue-200'>User</div></th>
                  <th className="p-2"><div className='border-2 border-myblue-200 rounded-3xl shadow text-myblue-200'>Color</div></th>
                  <th className="p-2"><div className='border-2 border-myblue-200 rounded-3xl shadow text-myblue-200'>Amount</div></th>
                </tr>
              </thead>
              <tbody>
                {userBets.map((bet, index) => (
                  <tr key={index}>
                    <td className="p-2 text-center">{lastPeriodNumber.slice(-4)}</td>
                    <td className="p-2 text-center">{bet.userNumber}</td>
                    <td className="p-2 text-center">{bet.color}</td>
                    <td className="p-2 text-center">{bet.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EveryOneOrder;
