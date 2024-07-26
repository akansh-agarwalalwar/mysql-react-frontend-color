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
      const res = await fetch(`http://localhost:3001/api/v1/admin/bank?userId=${userId}`);
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
    <div className="flex">
      <NavBarAdmin />
      <div className="bg-myblue-500  w-full p-8 ml-[200px] overflow-auto h-screen">
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
            <div className="bg-white p-8 rounded-lg w-3/4 max-h-full overflow-auto">
              <div className="flex justify-end">
                <button onClick={closeModal}>
                  <RxCross1 className="w-6 h-6" />
                </button>
              </div>
              <h2 className="text-2xl font-bold mb-4">User Details</h2>
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-4 whitespace-nowrap text-center">
                      ID
                    </th>
                    <th className="px-6 py-4 whitespace-nowrap text-center">
                      UserID
                    </th>
                    <th className="px-6 py-4 whitespace-nowrap text-center">
                      Username
                    </th>
                    <th className="px-6 py-4 whitespace-nowrap text-center">
                      Email
                    </th>
                    <th className="px-6 py-4 whitespace-nowrap text-center">
                      Mobile Number
                    </th>
                    <th className="px-6 py-4 whitespace-nowrap text-center">
                      Balance
                    </th>
                    <th className="px-6 py-4 whitespace-nowrap text-center">
                      User Refer Code
                    </th>
                    <th className="px-6 py-4 whitespace-nowrap text-center">
                      User Code
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {clickedUser?.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {clickedUser?.IDOfUser}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {clickedUser?.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {clickedUser?.useremail}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {clickedUser?.mobileNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {clickedUser?.balance}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {clickedUser?.userReferenceCode}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {clickedUser?.referenceCode}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="flex flex-row mt-4">
                <button
                  onClick={() => setActiveTab("RechargeHistory")}
                  className={`px-4 py-2 rounded ${
                    activeTab === "RechargeHistory"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  Recharge
                </button>
                <button
                  onClick={handleShowWithdrawHistory}
                  className={`px-4 py-2 rounded ml-4 ${
                    activeTab === "WithdrawHistory"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  Withdraw
                </button>
                <button
                  onClick={handleShowBankDetails}
                  className={`px-4 py-2 rounded ml-4 ${
                    activeTab === "BankDetails"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  Bank Details
                </button>
              </div>

              {activeTab === "RechargeHistory" && (
                <div className="flex flex-col mt-4">
                  <h3 className="text-xl font-bold mb-4">Recharge History</h3>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-4 whitespace-nowrap text-center">
                          Status
                        </th>
                        <th className="px-6 py-4 whitespace-nowrap text-center">
                          Date
                        </th>
                        <th className="px-6 py-4 whitespace-nowrap text-center">
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {rechargeHistory
                        ?.slice()
                        ?.reverse()
                        ?.map((recharge) => (
                          <tr key={recharge?.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                              {recharge?.status}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                              {recharge?.rechargeDate}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                              {recharge?.amount}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === "WithdrawHistory" && (
                <div className="flex flex-col mt-4">
                  <h3 className="text-xl font-bold mb-4">Withdraw History</h3>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-4 whitespace-nowrap text-center">
                          Status
                        </th>
                        <th className="px-6 py-4 whitespace-nowrap text-center">
                          Date
                        </th>
                        <th className="px-6 py-4 whitespace-nowrap text-center">
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {withdrawHistory
                        ?.slice()
                        ?.reverse()
                        ?.map((withdraw) => (
                          <tr key={withdraw?.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                              {withdraw?.status}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                              {withdraw?.withdrawDate}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                              {withdraw?.amount}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
              {activeTab === "BankDetails" && (
                <div className="flex flex-col mt-4">
                  <h3 className="text-xl font-bold mb-4">Bank Details</h3>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-4 whitespace-nowrap text-center">
                          Account Number
                        </th>
                        <th className="px-6 py-4 whitespace-nowrap text-center">
                          IFSC Code
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {bankDetails?.length === 0 ? (
                        <tr>
                          <td colSpan="2" className="px-6 py-4 text-center">
                            No bank details available?.
                          </td>
                        </tr>
                      ) : (
                        bankDetails?.map((bank) => (
                          <tr key={bank?.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                              {bank?.accountNumber}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                              {bank?.ifscCode}
                            </td>
                          </tr>
                        ))
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
