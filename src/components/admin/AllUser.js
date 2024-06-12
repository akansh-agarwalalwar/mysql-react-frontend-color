import React, { useState, useEffect } from "react";
import NavBarAdmin from "./NavBarAdmin";

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [clickedUser, setClickedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const filteredUsers = users.filter(
      (user) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.useremail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.mobileNumber.includes(searchQuery)
    );
    setDisplayedUsers(filteredUsers.slice(0, 10));
  }, [searchQuery, users]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3001/all-users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClickUser = (user) => {
    setClickedUser(user);
  };

  return (
    <div className="flex">
      <NavBarAdmin />
      <div className="bg-richblue-50 w-full p-8 ml-[200px] overflow-auto h-screen">
        <h1 className="text-3xl font-bold mb-4">All Users</h1>
        <input
          type="text"
          placeholder="Search users..."
          className="w-full border border-gray-300 p-2 mb-4"
          value={searchQuery}
          onChange={handleSearch}
        />
        {/* Main table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 ">
              <tr>
                <th
                  scope="col"
                  className="py-3 text-xs text-center uppercase tracking-wider "
                >
                  ID
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
              {displayedUsers.map((user) => (
                <tr
                  key={user.id}
                  onClick={() => handleClickUser(user)}
                  className="cursor-pointer hover:bg-gray-100"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {user.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {user.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {user.useremail}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {user.mobileNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {user.balance}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Table to display clicked user's data */}
        {clickedUser && (
          <div>
            <h2 className="text-2xl font-bold mt-8 mb-4">User Details</h2>
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-4 whitespace-nowrap">ID</th>
                  <th className="px-6 py-4 whitespace-nowrap">UserID</th>
                  <th className="px-6 py-4 whitespace-nowrap">Username</th>
                  <th className="px-6 py-4 whitespace-nowrap">Email</th>
                  <th className="px-6 py-4 whitespace-nowrap">Mobile Number</th>
                  <th className="px-6 py-4 whitespace-nowrap">Balance</th>
                  <th className="px-6 py-4 whitespace-nowrap">
                    User Refer Code
                  </th>
                  <th className="px-6 py-4 whitespace-nowrap">User Code</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {clickedUser.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {clickedUser.IDOfUser}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {clickedUser.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {clickedUser.useremail}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {clickedUser.mobileNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {clickedUser.balance}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {clickedUser.userReferenceCode}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {clickedUser.referenceCode}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
