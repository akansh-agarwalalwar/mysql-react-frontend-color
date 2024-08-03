import React, { useEffect, useState } from "react";
import axios from "axios";

function BetDetailsPopup({ userId, onClose }) {
  const [bets, setBets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBets = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://api.perfectorse.site/api/v1/admin/manual/bets/${userId}`);
        setBets(res.data);
        setError(null);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch bet details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBets();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Bet Details for User {userId}</h3>
        {bets.length > 0 ? (
          <ul>
            {bets.map((bet, index) => (
              <li key={index} className="border-b py-2">
                <div>Color: {bet.color}</div>
                <div>Amount: {bet.amount}</div>
                <div>Status: {bet.status}</div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No bet details available.</p>
        )}
        <button onClick={onClose} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Close</button>
      </div>
    </div>
  );
}

export default BetDetailsPopup;
