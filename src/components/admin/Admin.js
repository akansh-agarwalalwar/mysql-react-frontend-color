import React, { useState, useEffect } from "react";
import NavBarAdmin from "./NavBarAdmin";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { RxCross1 } from "react-icons/rx";
import CreateCoupon from "./CreateCoupon";
export default function AdminDashboard() {
  const [timerInfo, setTimerInfo] = useState({
    timerNumber: 0,
    countDown: 0,
    time: 0,
  });
  useEffect(() => {
    let ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setTimerInfo({
        timerNumber: data.timerNumber,
        countDown: data.countDown,
        time: data.time,
      });
    };

    ws.onclose = () => {
      console.log(
        "Disconnected from WebSocket server, attempting to reconnect..."
      );
      // Reconnect the WebSocket after a short delay
      setTimeout(() => {
        ws = new WebSocket("ws://localhost:8080");
      }, 1000);
    };

    // No cleanup function here to keep the connection persistent
  }, []);

  const [users, setUsers] = useState([]);
  const [approveUser, setApproveUser] = useState([]);
  const [ToPay, setToPay] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobile] = useState("");
  const [IDOfUser, setIdUser] = useState("");
  const [userReferenceCode, setUserRefernceCode] = useState("");
  const [createUserPopUp, setCreateUserPopUp] = useState(false);
  const [balance, setBalance] = useState("");
  const [couponPop, setCouponPop] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [amount, setAmount] = useState("");
  const [getCoupons, setGetCoupons] = useState([]);
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
    const confirmCreate = window.confirm(
      "Are you sure you want to create a new user?"
    );
    if (confirmCreate) {
      try {
        const response = await axios
          .post("https://api.perfectorse.site/api/v1/admin/createUser", {
            username,
            mobileNumber,
            email,
            password,
            IDOfUser,
            userReferenceCode,
            balance,
          })
          .then((response) => {
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
          setBalance("");
          toast.success("User created successfully.");
        } else {
          throw new Error("Failed to create user");
        }
      } catch (error) {
        console.error("Error creating user:", error);
        toast.error("Error creating user. Please try again.");
      }
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchApproveUser();
    fetchToPayUser();
  }, []);

  const handleCreate = () => {
    setCreateUserPopUp(true);
  };
  const close = () => {
    setCreateUserPopUp(false);
    setCouponPop(false);
  };
  const handleCoupon = () => {
    setCouponPop(true);
  };
  const closeCoupon = () => {
    setCouponPop(false);
  };

  const createCoupon = async () => {
    try {
      const response = await axios.post(
        "https://api.perfectorse.site/api/v1/admin/create-coupon",
        { coupon, amount }
      );

      if (response.status === 200) {
        toast.success("Coupon created successfully!");
        setCoupon("");
        setAmount("");
      }
    } catch (error) {
      console.error("Error creating coupon:", error);
      toast.error("Failed to create coupon");
    }
  };
  const deleteCoupon = async () => {
    try {
      const response = await axios.post(
        "https://api.perfectorse.site/api/v1/admin/delete-coupon",
        { coupon, amount }
      );

      if (response.status === 200) {
        toast.success("Coupon deleted successfully!");
        setCoupon("");
        setAmount("");
      }
    } catch (error) {
      toast.error("Failed to delete coupon");
    }
  };
  const getCoupon = async () => {
    try {
      const response = await fetch(
        "https://api.perfectorse.site/api/v1/admin/get-coupon"
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      console.log(data);
      setGetCoupons(data);
    } catch (error) {
      console.error("Error fetching approve users:", error);
    }
  };
  useEffect(() => {
    getCoupon();
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
        <div className="flex flex-row items-center gap-2">
          <button
            onClick={handleCreate}
            className="bg-green-100 p-2 rounded-lg"
          >
            Create User
          </button>
          {/* <div className="flex flex-row justify-center items-center">
            <label>Balance</label>
            <p>Balance</p>
          </div> */}
          <button
            onClick={handleCoupon}
            className="bg-brown-200 p-2 rounded-lg"
          >
            Create Coupon
          </button>
        </div>

        {createUserPopUp && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white border-2 shadow-md rounded-lg p-6 z-50 w-full max-w-md mx-auto">
              <div className="flex flex-row justify-between items-center w-full mb-4">
                <h2 className="text-2xl font-bold w-full items-center flex justify-center">
                  Create User
                </h2>
                <RxCross1 onClick={close} className="cursor-pointer" />
              </div>
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
                    Balance
                  </label>
                  <input
                    type="number"
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                    placeholder="Balance"
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
        )}

        {couponPop && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white border-2 shadow-md rounded-lg p-6 z-50 w-full max-w-md mx-auto">
              <div className="flex flex-row justify-between items-center w-full mb-4">
                <h2 className="text-2xl font-bold w-full items-center flex justify-center">
                  Create Coupon
                </h2>
                <RxCross1 onClick={closeCoupon} className="cursor-pointer" />
              </div>
              <form onSubmit={createCoupon} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Coupon Code
                  </label>
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Coupon Code"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Amount
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter Amount"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    onClick={createCoupon}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md bg-green-100"
                  >
                    Create
                  </button>
                </div>
              </form>
              <div className="flex flex-col">
                <p>Coupons</p>
                {Array.isArray(getCoupons) &&
                  getCoupons.map((coupon, index) => (
                    <p key={index} className="bg-green-100">
                      {coupon.coupon}: {coupon.amount}
                    </p>
                  ))}
              </div>
            </div>
          </div>
        )}
        <div>
          <h1>Timer Information</h1>
          <p>Timer Number: {timerInfo.timerNumber}</p>
          <p>Countdown: {timerInfo.countDown}</p>
          <p>Time: {new Date(timerInfo.time).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
