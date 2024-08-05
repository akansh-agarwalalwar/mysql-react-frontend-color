import React, { useEffect, useCallback, useState } from "react";
import axios from "axios";
import calculateTimerInfoTwoMin from "../game/calculateTimerInfoTwoMin";
import BetDetailsPopup from "./BetDetailsPopup";

function UserDetails() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [periodNumber, setPeriodNumber] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const fetchGameModeData = useCallback(async () => {
    setLoading(true);
    try {
      const { timerNumber } = calculateTimerInfoTwoMin();
      const currentPeriodNumber =
        timerNumber !== undefined ? timerNumber : null;
      setPeriodNumber(currentPeriodNumber);

      if (currentPeriodNumber) {
        const res = await axios.get(
          "https://api.perfectorse.site/api/v1/admin/manual/details"
        )
        if (Array.isArray(res.data) && res.data.length > 0) {
          setUsers(res.data);
        } else {
          setUsers([]);
        }
        setError(null);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error(error);
      setError("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGameModeData();
    const intervalId = setInterval(fetchGameModeData, 2000);
    return () => clearInterval(intervalId);
  }, [fetchGameModeData]);

  const handleUserIdClick = (userId) => {
    console.log("User ID clicked:", userId); // Debugging with console.log
    setSelectedUserId(userId);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setSelectedUserId(null);
    setShowPopup(false);
  };

  if (loading) return <p className="text-center py-4">Loading...</p>;
  if (error) return <p className="text-center text-red-500 py-4">{error}</p>;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-center mb-4">Game Details</h2>
      {periodNumber ? (
        <>
          {users.length > 0 ? (
            <div className="overflow-x-auto">
              <div className="relative">
                <table className="w-full text-center border-collapse">
                  <thead className="sticky top-0 z-10 bg-gray-200">
                    <tr>
                      <th className="py-2 px-4 border-b">ID</th>
                      <th className="py-2 px-4 border-b">Bet Type</th>
                      <th className="py-2 px-4 border-b">Bet Amount</th>
                      <th className="py-2 px-4 border-b">Possible Payout</th>
                      <th className="py-2 px-4 border-b">Balance</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {users.map((user) => (
                      <tr
                        key={user.IDOfUser}
                        className="cursor-pointer"
                        role="button"
                        onClick={() => handleUserIdClick(user.IDOfUser)}
                      >
                        <td className="py-2 px-4 border-b">
                          <button
                            onClick={() => handleUserIdClick(user.IDOfUser)}
                          >
                            {user.username}
                          </button>
                        </td>
                        <td className="py-2 px-4 border-b">{user.betType}</td>
                        <td className="py-2 px-4 border-b">{user.betAmount}</td>
                        <td className="py-2 px-4 border-b">
                          {user.possiblePayout}
                        </td>
                        <td className="py-2 px-4 border-b">{user.balance}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <p className="text-center py-4">
              No user details available for the current period.
            </p>
          )}
        </>
      ) : (
        <p className="text-center py-4">
          Invalid period number. Details cannot be displayed.
        </p>
      )}
      {selectedUserId && (
        <BetDetailsPopup userId={selectedUserId} onClose={handleClosePopup} />
      )}
    </div>
  );
}

export default UserDetails;