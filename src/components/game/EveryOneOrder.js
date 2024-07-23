import React, { useState, useEffect } from 'react';
import calculateTimerInfo from "./calculateTimerInfo";

function EveryOneOrder({ newBets }) {
  const [data, setData] = useState(calculateTimerInfo())
  const [userBets, setUserBets] = useState([]);

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
        <div className="flex flex-col justify-center w-full items-center mt-2 border border-myblue-200"></div>
        </div>
        <div className="">
          <div className="flex flex-col justify-center items-center">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="p-2"><div className='rounded-3xl '>Number</div></th>
                  <th className="p-2"><div className='rounded-3xl '>User</div></th>
                  <th className="p-2"><div className='rounded-3xl '>Color</div></th>
                  <th className="p-2"><div className='rounded-3xl '>Amount</div></th>
                </tr>
              </thead>
              <tbody>
                {userBets?.map((bet, index) => (
                  <tr key={index} className='border-t'>
                    <td className="p-2 text-center">{String(data.timerNumber).padEnd(4, '0')}</td>
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
