import React, { useState, useEffect } from 'react';
import calculateTimerInfoTwoMin from "./calculateTimerInfoTwoMin";
import { motion } from 'framer-motion';

function TwoMinOrder({ newBets }) {
  const [data, setData] = useState(calculateTimerInfoTwoMin());
  const [userBets, setUserBets] = useState([]);

  useEffect(() => {
    if (newBets?.length > 0) {
      setUserBets((prevBets) => {
        const updatedBets = [...prevBets];
        newBets.forEach((bet) => {
          const randomIndex = Math.floor(Math.random() * (updatedBets.length + 1));
          updatedBets.splice(randomIndex, 0, bet);
        });
        return updatedBets;
      });
    }
  }, [newBets]);

  return (
    <div className="bg-white w-full">
      <div className="flex flex-col min-h-screen">
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
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className='border-t'
                  >
                    <td className="p-2 text-center">{String(data.timerNumber).padEnd(4, '0')}</td>
                    <td className="p-2 text-center">{bet.userNumber}</td>
                    <td className="p-2 text-center">{bet.color}</td>
                    <td className="p-2 text-center">{bet.amount}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TwoMinOrder;
