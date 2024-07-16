import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EveryOneOrder({ newBets }) {
  const [lastPeriodNumber, setLastPeriodNumber] = useState('');
  const [userBets, setUserBets] = useState([]);

  useEffect(() => {
    const fetchLastPeriodNumber = async () => {
      try {
        const response = await axios.get('https://api.perfectorse.site/api/lastPeriodNumber');
        const { lastPeriodNumber } = response?.data;
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

  useEffect(() => {
    if ( newBets?.length > 0) {
      setUserBets((prevBets) => [...prevBets, ...newBets]);
    }
  }, [newBets]);

  return (
    <div className=" bg-white w-full">
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-col justify-center w-full items-center">
          <p className="mx-2 font-bold text-xl w-[50%] items-center justify-center flex">Parity Order</p>
        <div className="flex flex-col justify-center w-full items-center mb-4 mt-2 border border-myblue-200"></div>
        </div>
        <div className="">
          <div className="flex flex-col justify-center items-center">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="p-2"><div className='rounded-3xl shadow '>Number</div></th>
                  <th className="p-2"><div className='rounded-3xl shadow '>User</div></th>
                  <th className="p-2"><div className='rounded-3xl shadow '>Color</div></th>
                  <th className="p-2"><div className='rounded-3xl shadow '>Amount</div></th>
                </tr>
              </thead>
              <tbody>
                {userBets?.map((bet, index) => (
                  <tr key={index} className=''>
                    <td className="p-2 text-center">{lastPeriodNumber?.slice(-4)}</td>
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
