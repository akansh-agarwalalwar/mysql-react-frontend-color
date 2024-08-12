import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const userCookie = Cookies.get("user");
    return userCookie
      ? JSON.parse(userCookie)
      : { balance: 0, bonus: 0, unplayed: 0, winnings: 0 };
  });

  const fetchUserData = async () => {
    if (!user?.userId) return;

    try {
      const response = await axios.get(
        `http://localhost:3001/api/v1/user/balance/${user.userId}`
      );
      const data = response?.data;

      if (response.status === 200 && typeof data === 'object') {
        const { bonus = 0, unplayed = 0, winnings = 0 } = data;
        const balance = bonus + unplayed + winnings;

        setUser((prevUser) => ({
          ...prevUser,
          balance,
          bonus,
          unplayed,
          winnings,
        }));
      } else {
        console.warn("Unexpected data format:", data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (user?.userId) {
      fetchUserData(); // Fetch user data
    }
  }, [user?.userId]);

  const logout = async () => {
    try {
      await axios.post("http://localhost:3001/api/v1/logout");
      setUser(null);
      Cookies.remove("user");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    if (user) {
      Cookies.set("user", JSON.stringify(user), { expires: 1 });
    } else {
      Cookies.remove("user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, fetchUserData, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
