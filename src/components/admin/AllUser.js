import React, { useState, useEffect } from "react";
import NavBarAdmin from "./NavBarAdmin";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import toast from "react-hot-toast";

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
  const [fetchTotal, setfetchTotal] = useState("");
  const [isEditingModalOpen, setIsEditingModalOpen] = useState(false);
  const [editFormValues, setEditFormValues] = useState({
    username: "",
    email: "",
    mobileNumber: "",
    balance: "",
    unplayed: "",
    bonus: "",
    winnings: "",
  });

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
        "https://api.vigya.in/api/v1/admin/all-users"
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
        `https://api.vigya.in/api/v1/financial/recharge-history?userId=${userId}`
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
        `https://api.vigya.in/api/v1/financial/withdraw-history?userId=${userId}`
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
        `https://api.vigya.in/api/v1/admin/bank?userId=${userId}`
      );
      if (!res.ok) {
        throw new Error(`https error! status: ${res.status}`);
      }
      const data = await res.json();

      if (data && typeof data === "object" && !Array.isArray(data)) {
        setBankDetails([data]);
      } else {
        setBankDetails([]);
      }
    } catch (error) {
      console.error("Error fetching bank details:", error);
    }
  };
  const fetchBalanceTotal = async (userId) => {
    try {
      const res = await fetch(
        `https://api.vigya.in/api/v1/admin/profitAmount?userId=${userId}`
      );
      if (!res.ok) {
        throw new Error(`https error! status: ${res.status}`);
      }
      const data = await res.json();
      setfetchTotal(data);
      // console.log(fetchTotal)
    } catch (error) {
      console.error("Error fetching bank details:", error);
    }
  };

  const deleteUser = async (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      try {
        if (!userId) {
          throw new Error("Invalid userId");
        }
        const response = await axios.post(
          `https://api.vigya.in/api/v1/admin/deleteUser/${userId}`
        );
        toast.success("Deleted Successfully");
      } catch (error) {
        console.error(
          "Error deleting user:",
          error.response ? error.response.data : error.message
        );
      }
    }
  };
  const editUser = async (userId) => {
    try {
      setIsEditingModalOpen(true);
      // const response = await axios.post(
      //   `https://api.vigya.in/api/v1/admin/editUser/${userId}`
      // );
      // console.log(response.data.message);

      // Set the form values to the current user details
      setEditFormValues({
        username: clickedUser.username,
        email: clickedUser.useremail,
        mobileNumber: clickedUser.mobileNumber,
        balance: clickedUser.balance,
        unplayed: clickedUser.unplayed,
        bonus: clickedUser.bonus,
        winnings: clickedUser.winnings,
      });
      setIsEditingModalOpen(true);
    } catch (error) {
      console.error(
        "Error editing user:",
        error.response ? error.response.data : error.message
      );
    }
  };
  const updateUser = async (userId, updatedDetails) => {
    try {
      const response = await axios.post(
        `https://api.vigya.in/api/v1/admin/editUser/${userId}`,
        updatedDetails
      );
      toast.success("User updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user.");
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
    const intervalId = setInterval(() => {
      fetchBalanceTotal(clickedUser?.IDOfUser);
    }, 5000); // Fetch every 5 seconds (5000 ms)
  
    return () => clearInterval(intervalId); // Clear the interval on component unmount
  }, [clickedUser?.IDOfUser]);
  
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
                onClick={() => editUser(clickedUser.IDOfUser)}
                className="p-2 mb-2 sm:mb-0 sm:mr-2 border border-red-500 text-red-500"
              >
                Edit User
              </button>
              {isEditingModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                  <div className="bg-white p-8 rounded-lg w-full sm:w-3/4 max-h-full overflow-auto">
                    <div className="flex justify-end">
                      <button onClick={() => setIsEditingModalOpen(false)}>
                        <RxCross1 className="w-6 h-6" />
                      </button>
                    </div>
                    <h2 className="text-2xl font-bold mb-4 w-full flex justify-center">
                      Edit User
                    </h2>
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        await updateUser(clickedUser.IDOfUser, editFormValues);
                        setIsEditingModalOpen(false);
                        // Optionally refetch the user data here
                        fetchUsers();
                      }}
                    >
                      <div className="mb-4">
                        <label className="block mb-2 font-bold">
                          Username:
                        </label>
                        <input
                          type="text"
                          value={editFormValues.username}
                          onChange={(e) =>
                            setEditFormValues({
                              ...editFormValues,
                              username: e.target.value,
                            })
                          }
                          className="border border-gray-300 p-2 w-full"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2 font-bold">Email:</label>
                        <input
                          type="email"
                          value={editFormValues.email}
                          onChange={(e) =>
                            setEditFormValues({
                              ...editFormValues,
                              email: e.target.value,
                            })
                          }
                          className="border border-gray-300 p-2 w-full"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2 font-bold">
                          Mobile Number:
                        </label>
                        <input
                          type="text"
                          value={editFormValues.mobileNumber}
                          onChange={(e) =>
                            setEditFormValues({
                              ...editFormValues,
                              mobileNumber: e.target.value,
                            })
                          }
                          className="border border-gray-300 p-2 w-full"
                          pattern="[0-9]{10}"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2 font-bold">Balance:</label>
                        <input
                          type="number"
                          value={editFormValues.balance}
                          onChange={(e) =>
                            setEditFormValues({
                              ...editFormValues,
                              balance: e.target.value,
                            })
                          }
                          className="border border-gray-300 p-2 w-full"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2 font-bold">
                          Unplayed:
                        </label>
                        <input
                          type="number"
                          value={editFormValues.unplayed}
                          onChange={(e) =>
                            setEditFormValues({
                              ...editFormValues,
                              unplayed: e.target.value,
                            })
                          }
                          className="border border-gray-300 p-2 w-full"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2 font-bold">Bonus:</label>
                        <input
                          type="number"
                          value={editFormValues.bonus}
                          onChange={(e) =>
                            setEditFormValues({
                              ...editFormValues,
                              bonus: e.target.value,
                            })
                          }
                          className="border border-gray-300 p-2 w-full"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2 font-bold">
                          Winnings:
                        </label>
                        <input
                          type="number"
                          value={editFormValues.winnings}
                          onChange={(e) =>
                            setEditFormValues({
                              ...editFormValues,
                              winnings: e.target.value,
                            })
                          }
                          className="border border-gray-300 p-2 w-full"
                          required
                        />
                      </div>
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => setIsEditingModalOpen(false)}
                          className="p-2 mb-2 border border-gray-300 bg-gray-200 text-gray-700 mr-2"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="p-2 mb-2 border bg-blue-500 text-white"
                        >
                          Confirm
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
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
              <div className="mb-4">
                <strong>Unplayed:</strong> {clickedUser?.unplayed}
              </div>
              <div className="mb-4">
                <strong>Bonus:</strong> {clickedUser?.bonus}
              </div>
              <div className="mb-4">
                <strong>Winnings:</strong> {clickedUser?.winnings}
              </div>
              <div className="mb-4">
                <strong>Profit:</strong> {fetchTotal?.profitAmount}
              </div>
              <div className="mb-4">
                <strong>Referral Code:</strong> {clickedUser?.userReferenceCode}
              </div>
              <div className="mb-4">
                <strong>Refered From:</strong> {clickedUser?.referenceCode}
              </div>

              <div className="flex flex-col sm:flex-row justify-between">
                <button
                  onClick={handleShowWithdrawHistory}
                  className={`p-2 mb-2 sm:mb-0 sm:mr-2 border ${
                    activeTab === "WithdrawHistory"
                      ? "border-blue-500 bg-blue-500 text-white"
                      : "border-black"
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
                          <p>
                            <strong>Bank Name:</strong> {bankDetail?.bankName}
                          </p>
                          <p>
                            <strong>Account Holder Name:</strong>{" "}
                            {bankDetail?.accountHolderName}
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
