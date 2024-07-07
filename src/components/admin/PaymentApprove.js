import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBarAdmin from "./NavBarAdmin";

function PaymentApprove() {
  const [pendingPayments, setPendingPayments] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);

  useEffect(() => {
    const fetchPendingPayments = async () => {
      try {
        const response = await axios.get(
          "https://color-server.onrender.com/api/payments/pending"
        );
        setPendingPayments(response.data);
      } catch (error) {
        console.error("Error fetching pending payments:", error);
      }
    };
    const fetchPaymentHistory = async () => {
      try {
        const response = await axios.get(
          "https://color-server.onrender.com/api/payments/updatedHistory"
        );
        setPaymentHistory(response.data);
      } catch (error) {
        console.error("Error fetching payment history:", error);
      }
    };

    fetchPendingPayments();
    fetchPaymentHistory();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.post("https://color-server.onrender.com/api/payments/approve", { id });
      const approvedPayment = pendingPayments.find(
        (payment) => payment.id === id
      );

      setPendingPayments( 
        pendingPayments.filter((payment) => payment.id !== id)
      );
      setPaymentHistory([
        ...paymentHistory,
        { ...approvedPayment, status: "approved" },
      ]);
    } catch (error) {
      console.error("Error approving payment:", error);
    }
  };

  const handleDeny = async (id) => {
    try {
      await axios.post("https://color-server.onrender.com/api/payments/deny", { id });
      setPendingPayments(
        pendingPayments.filter((payment) => payment.id !== id)
      );
    } catch (error) {
      console.error("Error denying payment:", error);
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen py-8">
      <NavBarAdmin />
      <h2 className="font-bold text-2xl my-6 text-gray-800">
        Approve or Deny Payments
      </h2>
      <div className="w-full max-w-4xl overflow-x-auto bg-white shadow-md rounded-lg p-4">
        {pendingPayments.length === 0 ? (
          <p className="text-center text-gray-600">
            No applications to approve or deny
          </p>
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
                  Transaction Id
                </th>
                <th className="py-3 px-6 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {pendingPayments.slice().reverse().map((payment) => (
                <tr key={payment.id}>
                  <td className="py-4 px-6">{payment.userId}</td>
                  <td className="py-4 px-6">{payment.amount}</td>
                  <td className="py-4 px-6">
                    {payment.transaction_id || "N/A"}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button
                      className="bg-green-500 py-1 px-3 rounded-lg mr-2 hover:bg-green-600"
                      onClick={() => handleApprove(payment.id)}
                    >
                      Approve
                    </button>
                    <button
                      className="bg-red-500 py-1 px-3 rounded-lg hover:bg-red-600"
                      onClick={() => handleDeny(payment.id)}
                    >
                      Deny
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <h2 className="font-bold text-2xl mt-8 mb-4 text-gray-800">Payment History</h2>
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-4">
        {paymentHistory.length === 0 ? (
          <p className="text-center text-gray-600">No payment history available</p>
        ) : (
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  User ID
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Amount
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paymentHistory.slice().reverse().map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {payment.userId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {payment.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {payment.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default PaymentApprove;
