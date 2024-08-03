import React, { useState, useEffect } from "react";
import NavBarAdmin from "./NavBarAdmin";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [approveUser, setApproveUser] = useState([]);
  const [ToPay, setToPay] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobile] = useState("");
  const [IDOfUser, setIdUser] = useState("");
  const [userReferenceCode, setUserRefernceCode] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "https://api.perfectorse.site/api/v1/admin/all-users"
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchApproveUser = async () => {
    try {
      const response = await fetch(
        "https://api.perfectorse.site/api/v1/admin/pendingPayment"
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setApproveUser(data || []);
    } catch (error) {
      console.error("Error fetching approve users:", error);
    }
  };

  const fetchToPayUser = async () => {
    try {
      const response = await fetch(
        "https://api.perfectorse.site/api/v1/admin/withdrawlHistory"
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setToPay(data || []);
    } catch (error) {
      console.error("Error fetching to pay users:", error);
    }
  };

  const createUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://api.perfectorse.site/api/v1/admin/createUser",
        {
          username,
          mobileNumber,
          email,
          password,
          IDOfUser,
          userReferenceCode,
        }
      ).then((response) => {
        return response.data;
      });

      if (response.status === 201) {
        const data = response.data;
        console.log(data);
        setUsers([...users, data]);
        setUsername("");
        setEmail("");
        setPassword("");
        setMobile("");
        setIdUser("");
        setUserRefernceCode("");
        toast.success("User created successfully.");
      } else {
        throw new Error("Failed to create user");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("Error creating user. Please try again.");
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchApproveUser();
    fetchToPayUser();
  }, []);

  return (
    <div className="flex">
      <NavBarAdmin users={users} />
      <div className="flex-1 p-2 overflow-auto">
        <h1 className="text-3xl font-bold mb-8 w-full justify-center flex">
          Admin Dashboard
        </h1>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Link to="/admin/payment-approve">
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <h2 className="text-xl font-bold mb-2">Approve</h2>
              <p className="text-4xl font-semibold text-blue-600">
                {approveUser.length}
              </p>
            </div>
          </Link>
          <Link to="/admin/users">
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <h2 className="text-xl font-bold mb-2">Total Users</h2>
              <p className="text-4xl font-semibold text-blue-600">
                {users.length}
              </p>
            </div>
          </Link>
          <Link to="/admin/to-pay">
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <h2 className="text-xl font-bold mb-2">Pay</h2>
              <p className="text-4xl font-semibold text-blue-600">
                {ToPay.length}
              </p>
            </div>
          </Link>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Create User</h2>
          <form onSubmit={createUser} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mobile Number
              </label>
              <input
                type="tel"
                value={mobileNumber}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Mobile Number"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                IDOfUser
              </label>
              <input
                type="number"
                value={IDOfUser}
                onChange={(e) => setIdUser(e.target.value)}
                placeholder="User Id"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Reference Code
              </label>
              <input
                type="text"
                value={userReferenceCode}
                onChange={(e) => setUserRefernceCode(e.target.value)}
                placeholder="Reference Code"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md bg-green-100"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
