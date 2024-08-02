import React, { useState, useEffect } from "react";
import NavBarAdmin from "./NavBarAdmin";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";

const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isDesktop;
};

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
  const isDesktop = useIsDesktop();

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
    setDisplayedUsers(filteredUsers.slice());
  }, [searchQuery, users]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://api.perfectorse.site/api/v1/admin/all-users"
      );
      const data = await response.data;
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchRechargeHistory = async (userId) => {
    try {
      const response = await fetch(
        `https://api.perfectorse.site/api/v1/financial/recharge-history?userId=${userId}`
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
        `https://api.perfectorse.site/api/v1/financial/withdraw-history?userId=${userId}`
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
      const res = await fetch(
        `https://api.perfectorse.site/api/v1/admin/bank?userId=${userId}`
      );
      if (!res.ok) {
        throw new Error(`https error! status: ${res.status}`);
      }
      const data = await res.json();

      if (data && typeof data === "object" && !Array.isArray(data)) {
        setBankDetails([data]); // Ensure data is an array before setting the state
      } else {
        setBankDetails([]);
      }
    } catch (error) {
      console.error("Error fetching bank details:", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      // Ensure userId is correctly formatted
      if (!userId) {
        throw new Error("Invalid userId");
      }

      const response = await axios.delete(
        `https://api.perfectorse.site/api/v1/admin/deleteUser/${userId}`
      );
      console.log(response.data.message); // Log the response message
    } catch (error) {
      console.error(
        "Error deleting user:",
        error.response ? error.response.data : error.message
      );
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

  if (!isDesktop) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-bold">
          This page is only available on desktop devices.
        </p>
      </div>
    );
  }

  return (
    <div className="flex lg:flex-row">
      <NavBarAdmin />
      <div className="bg-myblue-500 w-full p-8 overflow-auto h-screen">
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
              <h2 className="text-2xl font-bold mb-4 w-full flex justify-center">
                User Details
              </h2>
              <button
                onClick={() => deleteUser(clickedUser.IDOfUser)}
                className="p-2 mb-2 mr-2 border bg-red-100 text-white"
              >
                Delete User
              </button>
              <button
                onClick={() => deleteUser(clickedUser.IDOfUser)}
                className="p-2 mb-2 sm:mb-0 sm:mr-2 border border-red-500 text-red-500"
              >
                Edit User
              </button>
              <div className="mb-4">
                <strong>Username:</strong> {clickedUser?.username}
              </div>
              <div className="mb-4">
                <strong>Email:</strong> {clickedUser?.useremail}
              </div>
              <div className="mb-4">
                <strong>Mobile Number:</strong> {clickedUser?.mobileNumber}
              </div>
              <div className="mb-4">
                <strong>Balance:</strong> {clickedUser?.balance}
              </div>

              <div className="flex flex-col sm:flex-row justify-between">
                <button
                  onClick={handleShowWithdrawHistory}
                  className={`p-2 mb-2 sm:mb-0 sm:mr-2 border ${
                    activeTab === "WithdrawHistory"
                      ? "border-blue-500 bg-blue-500 text-white"
                      : "border-gray-300"
                  }`}
                >
                  Withdraw History
                </button>
                <button
                  onClick={handleShowBankDetails}
                  className={`p-2 mb-2 sm:mb-0 sm:mr-2 border ${
                    activeTab === "BankDetails"
                      ? "border-blue-500 bg-blue-500 text-white"
                      : "border-gray-300"
                  }`}
                >
                  Bank Details
                </button>
                <button
                  onClick={() => setActiveTab("RechargeHistory")}
                  className={`p-2 border ${
                    activeTab === "RechargeHistory"
                      ? "border-blue-500 bg-blue-500 text-white"
                      : "border-gray-300"
                  }`}
                >
                  Recharge History
                </button>
              </div>
              {activeTab === "WithdrawHistory" && (
                <div>
                  <h3 className="text-lg font-bold mt-4 mb-2">
                    Withdraw History
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="py-3 text-xs text-center uppercase tracking-wider"
                          >
                            Amount
                          </th>
                          <th
                            scope="col"
                            className="py-3 text-xs text-center uppercase tracking-wider"
                          >
                            Date
                          </th>
                          <th
                            scope="col"
                            className="py-3 text-xs text-center uppercase tracking-wider"
                          >
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {withdrawHistory.map((record, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                              {record?.amount}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                              {record?.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                              {record?.status}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === "BankDetails" && (
                <div>
                  <h3 className="text-lg font-bold mt-4 mb-2 w-full flex justify-center">
                    Bank Details
                  </h3>
                  {bankDetails.length > 0 ? (
                    <div>
                      {bankDetails.map((bankDetail, index) => (
                        <div key={index} className="mb-4">
                          <p>
                            <strong>Account Number:</strong>{" "}
                            {bankDetail?.accountNumber}
                          </p>
                          <p>
                            <strong>IFSC Code:</strong> {bankDetail?.ifscCode}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No bank details found.</p>
                  )}
                </div>
              )}

              {activeTab === "RechargeHistory" && (
                <div>
                  <h3 className="text-lg font-bold mt-4 mb-2">
                    Recharge History
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="py-3 text-xs text-center uppercase tracking-wider"
                          >
                            Amount
                          </th>
                          <th
                            scope="col"
                            className="py-3 text-xs text-center uppercase tracking-wider"
                          >
                            Date
                          </th>
                          <th
                            scope="col"
                            className="py-3 text-xs text-center uppercase tracking-wider"
                          >
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {rechargeHistory.map((record, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                              {record?.amount}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                              {record?.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                              {record?.status}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
