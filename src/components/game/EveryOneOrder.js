import React, { useState, useEffect } from 'react';

function EveryOneOrder() {
  const [orders, setOrders] = useState([]);
  const [period, setPeriod] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setPeriod((prevPeriod) => {
        const newPeriod = prevPeriod + 1;
        const newOrders = [...orders, Math.floor(Math.random() * 100)];
        setOrders(newOrders);
        return newPeriod;
      });
    }, 30000); // Example: Update period every 30 seconds

    return () => clearInterval(interval);
  }, [orders]);

  return (
    <div className="flex flex-col bg-gray-900 min-h-screen">
      <div className="flex flex-row justify-between w-full items-center h-12 md:h-8">
        <p className="mx-2 font-bold text-xl items-center justify-center w-full flex">Everyone's Order</p>
      </div>
      <div className="p-2 mt-4">
        <div className="flex flex-col justify-center items-center">
          <div className="text-lg text-white mb-2">Current Period: {period}</div>
          <div className="text-lg text-white mb-2">Orders Count for Current Period: {orders[orders.length - 1] || 0}</div>
          <div className="text-lg text-white">Total Orders in All Periods:</div>
          <ul className="text-white mt-2">
            {orders.map((orderCount, index) => (
              <li key={index}>Period {index + 1}: {orderCount} orders</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default EveryOneOrder;
