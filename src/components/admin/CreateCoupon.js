import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function CreateCoupon() {
  const [coupon, setCoupon] = useState("");
  const [amount, setAmount] = useState("");

  const createCoupon = async () => {
    try {
      const response = await axios.post(
        "http://api.perfectorse.site/api/v1/admin/create-coupon",
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

  return (
    <div>
      <div className="flex flex-col">
        <div className="flex flex-col">
          <p>Coupon Code</p>
          <input
            placeholder="Enter Coupon"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <p>Amount</p>
          <input
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
      </div>
      <button onClick={createCoupon}>Create Coupon</button>
    </div>
  );
}

export default CreateCoupon;