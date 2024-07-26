import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

export default function NavBarAdmin({ users }) {
  const navigate = useNavigate();

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(users);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    XLSX.writeFile(workbook, "users.xlsx");
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <nav className="bg-myblue-200 p-6 h-screen flex flex-col justify-between w-[200px] fixed top-0 left-0">
      <div>
        <ul className="flex flex-col space-y-4">
          <li>
            <Link to="/admin" className="text-white hover:underline">
              Dashboard
            </Link>
          </li>

          <li>
            <Link to="/admin/users" className="text-white hover:underline">
              All Users
            </Link>
          </li>
          <li>
            <Link
              to="/admin/payment-approve"
              className="text-white hover:underline"
            >
              Payment Approve
            </Link>
          </li>
          <li>
            <Link to="/admin/to-pay" className="text-white hover:underline">
              To Pay
            </Link>
          </li>
          <li className="relative group">
            <Link to="/admin/game-mode" className="text-white hover:underline">
              Thirty Second Mode
            </Link>
          </li>
          <li className="relative group">
            <Link to="/admin/game-mode/two-min" className="text-white hover:underline">
              Two Minute Mode
            </Link>
          </li>

        </ul>
      </div>
      <div className="bottom-0">
        <button
          onClick={exportToExcel}
          className="bg-blue-600 text-white py-2 px-4 rounded mb-2"
        >
          Export to Excel
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-100 text-white py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
      {/* <div>
        <p className="text-white text-xs">Admin Panel</p>
      </div> */}
    </nav>
  );
}
