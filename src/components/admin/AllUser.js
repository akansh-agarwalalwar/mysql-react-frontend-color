import React, { useState, useEffect } from "react";
import NavBarAdmin from "./NavBarAdmin";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [clickedUser, setClickedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rechargeHistory, setRechargeHistory] = useState([]);
  const [withdrawHistory, setWithdrawHistory] = useState([]);
  const [bankDetails, setBankDetails] = useState([]);
  const [activeTab, setActiveTab] = useState("RechargeHistory");

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const filteredUsers = users?.filter(
      (user) =>
        user?.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user?.useremail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user?.mobileNumber.includes(searchQuery) ||
        user?.IDOfUser.includes(searchQuery)
    );
    setDisplayedUsers(filteredUsers.slice(0, 10));
  }, [searchQuery, users]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://api.perfectorse.site/api/v1/admin/all-users");
      const data = await response.data;
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchRechargeHistory = async (userId) => {
    try {
      const response = await fetch(
        `https://api.perfectorse.site/api/payments/history?userId=${userId}`
      );
      if (!response.ok) {
        throw new Error(`https error! status: ${response?.status}`);
      }
      const data = await response.json();
      setRechargeHistory(data);
    } catch (error) {
      console.error("Error fetching recharge history:", error);
    }
  };

  const fetchWithdrawHistory = async (userId) => {
    try {
      const response = await fetch(
        `https://api.perfectorse.site/api/show/withdrawl/history?userId=${userId}`
      );
      if (!response.ok) {
        throw new Error(`https error! status: ${response?.status}`);
      }
      const data = await response?.json();
      setWithdrawHistory(data);
    } catch (error) {
      console.error("Error fetching withdraw history:", error);
    }
  };

  const fetchBankDetails = async (userId) => {
    try {
      const res = await fetch(`https://api.perfectorse.site/api/v1/admin/bank?userId=${userId}`);
      if (!res.ok) {
        throw new Error(`https error! status: ${res.status}`);
      }
      const data = await res.json();

      if (data && typeof data === 'object' && !Array.isArray(data)) {
        setBankDetails([data]); // Ensure data is an array before setting the state
      } else {
        setBankDetails([]);
      }
    } catch (error) {
      console.error("Error fetching bank details:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClickUser = async (user) => {
    setClickedUser(user);
    setIsModalOpen(true);
    setActiveTab("RechargeHistory");
    await fetchRechargeHistory(user?.IDOfUser);
  };

  const handleShowWithdrawHistory = async () => {
    if (clickedUser) {
      setActiveTab("WithdrawHistory");
      await fetchWithdrawHistory(clickedUser?.IDOfUser);
    }
  };

  const handleShowBankDetails = async () => {
    if (clickedUser) {
      setActiveTab("BankDetails");
      await fetchBankDetails(clickedUser?.IDOfUser);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setClickedUser(null);
    setRechargeHistory([]);
    setWithdrawHistory([]);
    setBankDetails([]);
  };

  useEffect(() => {
  }, [bankDetails]);

  return (
    <div className="">
      <NavBarAdmin />
      <div className="bg-myblue-500 p-8 sm:ml-[200px] overflow-auto h-screen mt-6">
        <h1 className="text-3xl font-bold mb-4">All Users</h1>
        <input
          type="text"
          placeholder="Search users..."
          className="w-full border border-gray-300 p-2 mb-4"
          value={searchQuery}
          onChange={handleSearch}
        />
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="py-3 text-xs text-center uppercase tracking-wider"
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="py-3 text-xs text-center uppercase tracking-wider"
                >
                  UserID
                </th>
                <th
                  scope="col"
                  className="py-3 text-center text-xs uppercase tracking-wider"
                >
                  Username
                </th>
                <th
                  scope="col"
                  className="py-3 text-center text-xs uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="py-3 text-center text-xs uppercase tracking-wider"
                >
                  Mobile Number
                </th>
                <th
                  scope="col"
                  className="py-3 text-center text-xs uppercase tracking-wider"
                >
                  Balance
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {displayedUsers
                ?.slice()
                ?.reverse()
                ?.map((user) => (
                  <tr
                    key={user.id}
                    onClick={() => handleClickUser(user)}
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {user?.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {user?.IDOfUser}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {user?.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {user?.useremail}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {user?.mobileNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {user?.balance}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {isModalOpen && clickedUser && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ">
            <div className="bg-white p-8 rounded-lg w-full sm:w-3/4 max-h-full overflow-auto">
              <div className="flex justify-end">
                <button onClick={closeModal}>
                  <RxCross1 className="w-6 h-6" />
                </button>
              </div>
              <h2 className="text-2xl font-bold mb-4">User Details</h2>
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-2 sm:px-6 py-4 whitespace-nowrap text-center">
                      ID
                    </th>
                    <th className="px-2 sm:px-6 py-4 whitespace-nowrap text-center">
                      UserID
                    </th>
                    <th className="px-2 sm:px-6 py-4 whitespace-nowrap text-center">
                      Username
                    </th>
                    <th className="px-2 sm:px-6 py-4 whitespace-nowrap text-center">
                      Email
                    </th>
                    <th className="px-2 sm:px-6 py-4 whitespace-nowrap text-center">
                      Mobile Number
                    </th>
                    <th className="px-2 sm:px-6 py-4 whitespace-nowrap text-center">
                      Balance
                    </th>
                    <th className="px-2 sm:px-6 py-4 whitespace-nowrap text-center">
                      User Refer Code
                    </th>
                    <th className="px-2 sm:px-6 py-4 whitespace-nowrap text-center">
                      User Code
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-center">
                      {clickedUser?.id}
                    </td>
                    <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-center">
                      {clickedUser?.IDOfUser}
                    </td>
                    <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-center">
                      {clickedUser?.username}
                    </td>
                    <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-center">
                      {clickedUser?.useremail}
                    </td>
                    <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-center">
                      {clickedUser?.mobileNumber}
                    </td>
                    <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-center">
                      {clickedUser?.balance}
                    </td>
                    <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-center">
                      {clickedUser?.userrefercode}
                    </td>
                    <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-center">
                      {clickedUser?.usercode}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-4 flex justify-between">
                <button
                  className={`py-2 px-4 rounded ${
                    activeTab === "RechargeHistory"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                  onClick={() => {
                    setActiveTab("RechargeHistory");
                    fetchRechargeHistory(clickedUser?.IDOfUser);
                  }}
                >
                  Recharge History
                </button>
                <button
                  className={`py-2 px-4 rounded ${
                    activeTab === "WithdrawHistory"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                  onClick={handleShowWithdrawHistory}
                >
                  Withdraw History
                </button>
                <button
                  className={`py-2 px-4 rounded ${
                    activeTab === "BankDetails"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                  onClick={handleShowBankDetails}
                >
                  Bank Details
                </button>
              </div>

              {activeTab === "RechargeHistory" && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">
                    Recharge History
                  </h3>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-2 sm:px-6 py-4 whitespace-nowrap text-center">
                          Amount
                        </th>
                        <th className="px-2 sm:px-6 py-4 whitespace-nowrap text-center">
                          Date
                        </th>
                        <th className="px-2 sm:px-6 py-4 whitespace-nowrap text-center">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {rechargeHistory?.length > 0 ? (
                        rechargeHistory?.map((record, index) => (
                          <tr key={index}>
                            <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-center">
                              {record.amount}
                            </td>
                            <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-center">
                              {record.date}
                            </td>
                            <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-center">
                              {record.status}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="3"
                            className="px-6 py-4 whitespace-nowrap text-center"
                          >
                            No recharge history available.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === "WithdrawHistory" && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">
                    Withdraw History
                  </h3>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-2 sm:px-6 py-4 whitespace-nowrap text-center">
                          Amount
                        </th>
                        <th className="px-2 sm:px-6 py-4 whitespace-nowrap text-center">
                          Date
                        </th>
                        <th className="px-2 sm:px-6 py-4 whitespace-nowrap text-center">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {withdrawHistory?.length > 0 ? (
                        withdrawHistory?.map((record, index) => (
                          <tr key={index}>
                            <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-center">
                              {record.amount}
                            </td>
                            <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-center">
                              {record.date}
                            </td>
                            <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-center">
                              {record.status}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="3"
                            className="px-6 py-4 whitespace-nowrap text-center"
                          >
                            No withdraw history available.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === "BankDetails" && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Bank Details</h3>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-2 sm:px-6 py-4 whitespace-nowrap text-center">
                          Account Holder Name
                        </th>
                        <th className="px-2 sm:px-6 py-4 whitespace-nowrap text-center">
                          Account Number
                        </th>
                        <th className="px-2 sm:px-6 py-4 whitespace-nowrap text-center">
                          IFSC Code
                        </th>
                        <th className="px-2 sm:px-6 py-4 whitespace-nowrap text-center">
                          Bank Name
                        </th>
                        <th className="px-2 sm:px-6 py-4 whitespace-nowrap text-center">
                          Bank Branch
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {bankDetails?.length > 0 ? (
                        bankDetails?.map((bank, index) => (
                          <tr key={index}>
                            <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-center">
                              {bank.accountHolderName}
                            </td>
                            <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-center">
                              {bank.accountNumber}
                            </td>
                            <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-center">
                              {bank.ifscCode}
                            </td>
                            <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-center">
                              {bank.bankName}
                            </td>
                            <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-center">
                              {bank.bankBranch}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="5"
                            className="px-6 py-4 whitespace-nowrap text-center"
                          >
                            No bank details available.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
