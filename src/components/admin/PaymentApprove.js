import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import NavBarAdmin from "./NavBarAdmin";
import toast from "react-hot-toast";

function PaymentApprove() {
  const [pendingPayments, setPendingPayments] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPayments = useCallback(async () => {
    try {
      const [pendingResponse, historyResponse] = await Promise.all([
        axios.get("https://api.vigya.in/api/v1/admin/pendingPayment"),
        axios.get("https://api.vigya.in/api/v1/admin/adminUpdatedHistory"),
      ]);
      setPendingPayments(pendingResponse.data);
      setPaymentHistory(historyResponse.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  }, []);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  const handleApprove = async (id) => {
    try {
      await axios.post(
        "https://api.vigya.in/api/v1/admin/adminPaymentApprove",
        { id }
      );
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
      toast.success("Approved Successfully");
    } catch (error) {
      console.error("Error approving payment:", error);
      toast.error("Error While Approving");
    }
  };

  const handleDeny = async (id) => {
    try {
      await axios.post("https://api.vigya.in/api/v1/admin/adminPaymentDeny", {
        id,
      });
      setPendingPayments(
        pendingPayments.filter((payment) => payment.id !== id)
      );
      toast.success("Declined");
    } catch (error) {
      console.error("Error denying payment:", error);
      toast.error("Error While Declining");
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
      <div className="flex flex-col w-full items-center">
        <h2 className="font-bold text-2xl my-6 text-gray-800">
          Approve or Deny Payments
        </h2>
        <div className="w-full max-w-6xl overflow-x-auto bg-white shadow-md rounded-lg p-4">
          {loading ? (
            <p className="text-center text-gray-600">Loading...</p>
          ) : pendingPayments.length === 0 ? (
            <p className="text-center text-gray-600">
              No applications to approve or deny
            </p>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
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
                    Transaction Id
                  </th>
                  <th className="py-3 px-6 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {pendingPayments
                  .slice()
                  .reverse()
                  .map((payment) => (
                    <tr key={payment.id} className="text-sm">
                      <td className="py-4 px-6 flex items-center">
                        {payment.userId}
                        <button
                          className="ml-2 bg-blue-500 py-1 px-2 rounded-lg text-white hover:bg-blue-600 text-xs md:text-sm"
                          onClick={() => handleCopy(payment.userId)}
                        >
                          Copy
                        </button>
                      </td>
                      <td className="py-4 px-6">{payment.username}</td>
                      <td className="py-4 px-6">{payment.amount}</td>
                      <td className="py-4 px-6">
                        {payment.transaction_id || "N/A"}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button
                          className="bg-green-100 py-1 px-2 rounded-lg mr-2 hover:bg-green-600 text-xs md:text-sm"
                          onClick={() => handleApprove(payment.id)}
                        >
                          Approve
                        </button>
                        <button
                          className="bg-red-500 py-1 px-2 rounded-lg hover:bg-red-600 text-xs md:text-sm"
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
        <h2 className="font-bold text-2xl mt-8 mb-4 text-gray-800">
          Payment History
        </h2>
        <div className="w-full max-w-6xl overflow-x-auto bg-white shadow-md rounded-lg p-4">
          {paymentHistory.length === 0 ? (
            <p className="text-center text-gray-600">
              No payment history available
            </p>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    User ID
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Transaction Id
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paymentHistory
                  ?.slice(-10)
                  ?.reverse()
                  ?.map((payment) => (
                    <tr key={payment.id} className="text-sm">
                      <td className="py-4 px-6 flex items-center">
                        {payment.userId}
                        <button
                          className="ml-2 bg-blue-500 py-1 px-2 rounded-lg text-white hover:bg-blue-600 text-xs md:text-sm"
                          onClick={() => handleCopy(payment.userId)}
                        >
                          Copy
                        </button>
                      </td>
                      <td className="py-4 px-6">{payment.username}</td>
                      <td className="py-4 px-6">{payment.amount}</td>
                      <td className="py-4 px-6">{payment.transaction_id}</td>
                      <td className="py-4 px-6">{payment.status}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default PaymentApprove;
