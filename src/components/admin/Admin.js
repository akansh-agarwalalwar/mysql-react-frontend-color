import React, { useState, useEffect } from 'react';
import NavBarAdmin from './NavBarAdmin';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [approveUser, setApproveUser] = useState([])
  const [ToPay, setToPay] = useState([])
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://api.perfectorse.site/all-users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const fetchApproveUser = async () =>{
    try {
      const response = await fetch("http://api.perfectorse.site/api/payments/pending");
      const data = await response.json();
      setApproveUser(data);
    }
    catch(error){
      console.error("Error fetching approve users:", error);
    }
  }
  const fetchToPayUser = async () =>{
    try {
      const response = await fetch("http://api.perfectorse.site/api/withdrawl/history");
      const data = await response.json();
      setToPay(data);
    }
    catch(error){
      console.error("Error fetching approve users:", error);
    }
  }

  useEffect(() => {
    fetchUsers();
    fetchApproveUser();
    fetchToPayUser();
  }, []);

  return (
    <div className="flex">
      <NavBarAdmin users={users} />
      <div className="bg-richblue-50 w-full p-8 ml-[200px] overflow-auto h-screen">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        <div className="justify-evenly flex">
          <Link to='/admin/payment-approve'>
            <div className="bg-white shadow-md rounded-lg p-6 w-64 text-center">
              <h2 className="text-xl font-bold mb-2">Approve</h2>
              <p className="text-4xl font-semibold text-blue-600">{approveUser.length}</p>
            </div>
          </Link>
          <div className="bg-white shadow-md rounded-lg p-6 w-64 text-center">
            <h2 className="text-xl font-bold mb-2">Total Users</h2>
            <p className="text-4xl font-semibold text-blue-600">{users.length}</p>
          </div>
          <Link to='/admin/to-pay'>
            <div className="bg-white shadow-md rounded-lg p-6 w-64 text-center">
              <h2 className="text-xl font-bold mb-2">Pay</h2>
              <p className="text-4xl font-semibold text-blue-600">{ToPay.length}</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}