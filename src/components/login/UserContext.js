import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const userCookie = Cookies.get("user");
    return userCookie
      ? JSON.parse(userCookie)
      : { balance: 0, bonus: 0, unplayed: 0 };
  });

  const fetchUserData = async () => {
    if (!user?.userId) {
      console.warn("User ID is not available");
      return;
    }
    try {
      console.log(`Fetching data for userId: ${user.userId}`);
      const response = await axios.get(
        `https://api.perfectorse.site/api/v1/user/balance/${user.userId}`
      );
      // console.log("Response from backend:", response);

      if (response.status === 200 && typeof response.data === "object") {
        const userData = response.data;
        setUser((prevUser) => ({
          ...prevUser,
          balance: userData?.balance ?? 0,
          bonus: userData?.bonus ?? 0,
          unplayed: userData?.unplayed ?? 0,
          winnings: userData?.winnings ?? 0,
        }));
      } else {
        // console.warn("Unexpected data format or response status:", response);
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
      await axios.post("https://api.perfectorse.site/api/v1/logout");
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
