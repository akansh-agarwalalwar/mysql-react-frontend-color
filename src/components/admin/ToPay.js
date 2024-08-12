import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import NavBarAdmin from "./NavBarAdmin";
import toast from "react-hot-toast";
const ToPay = () => {
  const [withdrawHistory, setWithdrawHistory] = useState([]);
  const [processedWithdrawHistory, setProcessedWithdrawHistory] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const [withdrawResponse, processedResponse] = await Promise.all([
        axios.get("https://api.perfectorse.site/api/v1/admin/withdrawlHistory"),
        axios.get(
          "https://api.perfectorse.site/api/v1/admin/processedWithdrawlHistory"
        ),
      ]);

      setWithdrawHistory(withdrawResponse.data || []);
      setProcessedWithdrawHistory(processedResponse.data || []);
    } catch (error) {
      console.error("Error fetching withdraw histories:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAction = async (id, action) => {
    try {
      const endpoint =
        action === "accept"
          ? "https://api.perfectorse.site/api/v1/admin/withdrawlAccept"
          : "https://api.perfectorse.site/api/v1/admin/withdrawlDeny";

      await axios.post(endpoint, { id });
      setWithdrawHistory((prev) =>
        prev.filter((withdrawal) => withdrawal.id !== id)
      );

      if (action === "deny") {
        const deniedWithdrawal = withdrawHistory.find(
          (withdrawal) => withdrawal.id === id
        );
        setProcessedWithdrawHistory((prev) => [
          ...prev,
          { ...deniedWithdrawal, status: "denied" },
        ]);
      } else {
        fetchData(); // Refresh processed history if accepted
      }
    } catch (error) {
      console.error(`Error ${action} withdrawal:`, error);
    }
  };

  const handleCopy = (userId) => {
    navigator.clipboard
      .writeText(userId)
      .then(() => {
        toast.success("User ID copied to clipboard");
      })
      .catch((error) => {
        console.error("Error copying user ID:", error);
        toast.error("Error copying User ID");
      });
  };

  return (
    <div className="flex flex-row">
      <NavBarAdmin />
      <div className="flex flex-col w-full p-4 items-center">
        <h1 className="font-bold text-2xl my-6 text-gray-800">To Pay</h1>
        <div className="w-full max-w-4xl overflow-x-auto shadow-md rounded-lg p-4">
          {withdrawHistory.length === 0 ? (
            <p className="text-center text-gray-600">
              No withdrawals to process
            </p>
          ) : (
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    User Id
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Name
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
                {withdrawHistory
                  ?.slice()
                  ?.reverse()
                  ?.map((withdrawal) => (
                    <tr key={withdrawal.id}>
                      <td className="py-4 px-6">
                        {withdrawal.userId}
                        <button
                          className="ml-2 bg-blue-500 py-1 px-2 rounded-lg text-white hover:bg-blue-600 text-xs md:text-sm"
                          onClick={() => handleCopy(withdrawal.userId)}
                        >
                          Copy
                        </button>
                      </td>
                      <td className="py-4 px-6">{withdrawal.username}</td>
                      <td className="py-4 px-6">{withdrawal.amount}</td>
                      <td className="py-4 px-6">
                        {new Date(withdrawal.withdrawDate).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button
                          className="bg-red-500 py-1 px-3 rounded-lg hover:bg-red-600 mr-2"
                          onClick={() => handleAction(withdrawal.id, "deny")}
                        >
                          Deny
                        </button>
                        <button
                          className="bg-green-100 py-1 px-3 rounded-lg hover:bg-green-600"
                          onClick={() => handleAction(withdrawal.id, "accept")}
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
        <h1 className="font-bold text-2xl my-6 text-gray-800">
          Processed Withdrawals
        </h1>
        <div className="w-full max-w-4xl overflow-x-auto shadow-md rounded-lg p-4">
          {processedWithdrawHistory.length === 0 ? (
            <p className="text-center text-gray-600">
              No processed withdrawals
            </p>
          ) : (
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    User Id
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Name
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
                {processedWithdrawHistory?.map((withdrawal) => (
                  <tr key={withdrawal.id}>
                    <td className="py-4 px-6 flex items-center">
                      {withdrawal.userId}
                      <button
                        className="ml-2 bg-blue-500 py-1 px-2 rounded-lg text-white hover:bg-blue-600 text-xs md:text-sm"
                        onClick={() => handleCopy(withdrawal.userId)}
                      >
                        Copy
                      </button>
                    </td>
                    <td className="py-4 px-6">{withdrawal.username}</td>
                    <td className="py-4 px-6">{withdrawal.amount}</td>
                    <td className="py-4 px-6">
                      {new Date(withdrawal.withdrawDate).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6">{withdrawal.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToPay;
