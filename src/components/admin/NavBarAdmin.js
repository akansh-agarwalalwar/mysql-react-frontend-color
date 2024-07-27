import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

export default function NavBarAdmin({ users }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
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

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };

  return (
    <>
      <button
        onClick={toggleNav}
        className="lg:hidden bg-myblue-200 text-white p-4 fixed top-0 left-0 z-50"
      >
        {isNavOpen ? "Close Menu" : "Open Menu"}
      </button>
      <nav
        className={`bg-myblue-200 p-6 h-screen lg:h-auto flex flex-col lg:flex-row lg:justify-between w-full lg:w-[200px] fixed top-0 left-0 lg:relative transition-transform transform ${
          isNavOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 z-40`}
      >
        <div>
          <ul className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
            =
            <li>
              <Link to="/admin" className="text-white hover:underline mt-10" onClick={closeNav}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/admin/users" className="text-white hover:underline" onClick={closeNav}>
                All Users
              </Link>
            </li>
            <li>
              <Link to="/admin/payment-approve" className="text-white hover:underline" onClick={closeNav}>
                Payment Approve
              </Link>
            </li>
            <li>
              <Link to="/admin/to-pay" className="text-white hover:underline" onClick={closeNav}>
                To Pay
              </Link>
            </li>
            <li className="relative group">
              <Link to="/admin/game-mode" className="text-white hover:underline" onClick={closeNav}>
                Thirty Second Mode
              </Link>
            </li>
            <li className="relative group">
              <Link to="/admin/game-mode/two-min" className="text-white hover:underline" onClick={closeNav}>
                Two Minute Mode
              </Link>
            </li>
          </ul>
        </div>
        <div className="mt-6 lg:mt-0 flex flex-col lg:flex-row lg:items-center lg:space-x-2">
          <button
            onClick={exportToExcel}
            className="bg-blue-600 text-white py-2 px-4 rounded mb-2 lg:mb-0 lg:mr-2"
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
      </nav>
    </>
  );
}
