import React, { useState, useEffect } from "react";
import axios from "axios";

function Balance() {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch balance and remaining user IDs from the backend
    const fetchBalanceData = async () => {
      try {
        const response = await axios.get(
          "https://api.perfectorse.site/api/v1/admin/balanceCalculator"
        );
        const { balance } = response.data;
        setBalance(balance);
      } catch (err) {
        setError("Error fetching balance data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBalanceData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <p>
        <strong>Balance:</strong> {balance !== null ? `${balance} Rs` : "N/A"}
      </p>
    </div>
  );
}

export default Balance;
