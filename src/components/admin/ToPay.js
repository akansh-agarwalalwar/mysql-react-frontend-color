import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBarAdmin from './NavBarAdmin';

export default function ToPay() {
  const [withdrawHistory, setWithdrawHistory] = useState([]);
  const [processedWithdrawHistory, setProcessedWithdrawHistory] = useState([]);

  const fetchWithdrawHistory = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/withdrawl/history');
      setWithdrawHistory(response.data);
    } catch (error) {
      console.error('Error fetching withdraw history:', error);
    }
  };

  const fetchProcessedWithdrawHistory = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/withdrawl/processed-history');
      setProcessedWithdrawHistory(response.data);
    } catch (error) {
      console.error('Error fetching processed withdraw history:', error);
    }
  };

  useEffect(() => {
    fetchWithdrawHistory();
    fetchProcessedWithdrawHistory();
  }, []);

  const handleAccept = async (id) => {
    try {
      await axios.post('http://localhost:3001/api/withdrawals/accept', { id });
      setWithdrawHistory(withdrawHistory.filter((withdrawal) => withdrawal.id !== id));
      fetchProcessedWithdrawHistory();
    } catch (error) {
      console.error('Error accepting withdrawal:', error);
    }
  };

  const handleDeny = async (id) => {
    try {
      await axios.post('http://localhost:3001/api/withdrawals/deny', { id });
      const deniedWithdrawal = withdrawHistory.find((withdrawal) => withdrawal.id === id);
      setWithdrawHistory(withdrawHistory.filter((withdrawal) => withdrawal.id !== id));
      setProcessedWithdrawHistory([...processedWithdrawHistory, { ...deniedWithdrawal, status: 'denied' }]);
    } catch (error) {
      console.error('Error denying withdrawal:', error);
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen py-8">
      <NavBarAdmin />
      <h1 className="font-bold text-2xl my-6 text-gray-800">To Pay</h1>
      <div className="w-full max-w-4xl overflow-x-auto shadow-md rounded-lg p-4">
        {withdrawHistory.length === 0 ? (
          <p className="text-center text-gray-600">No withdrawals to process</p>
        ) : (
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  User Id
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Amount
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="py-3 px-6 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {withdrawHistory.slice().reverse().map((withdrawal) => (
                <tr key={withdrawal.id}>
                  <td className="py-4 px-6">{withdrawal.userId}</td>
                  <td className="py-4 px-6">{withdrawal.amount}</td>
                  <td className="py-4 px-6">{new Date(withdrawal.withdrawDate).toLocaleDateString()}</td>
                  <td className="py-4 px-6 text-center">
                    <button
                      className="bg-red-500 py-1 px-3 rounded-lg hover:bg-red-600 mr-2"
                      onClick={() => handleDeny(withdrawal.id)}
                    >
                      Deny
                    </button>
                    <button
                      className="bg-green-500 py-1 px-3 rounded-lg hover:bg-green-600"
                      onClick={() => handleAccept(withdrawal.id)}
                    >
                      Accept
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <h1 className="font-bold text-2xl my-6 text-gray-800">Processed Withdrawals</h1>
      <div className="w-full max-w-4xl overflow-x-auto shadow-md rounded-lg p-4">
        {processedWithdrawHistory.length === 0 ? (
          <p className="text-center text-gray-600">No processed withdrawals</p>
        ) : (
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  User Id
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Amount
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {processedWithdrawHistory.slice().reverse().map((withdrawal) => (
                <tr key={withdrawal.id}>
                  <td className="py-4 px-6">{withdrawal.userId}</td>
                  <td className="py-4 px-6">{withdrawal.amount}</td>
                  <td className="py-4 px-6">{new Date(withdrawal.withdrawDate).toLocaleDateString()}</td>
                  <td className="py-4 px-6">{withdrawal.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
