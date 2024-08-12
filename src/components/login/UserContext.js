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
    if (!user?.userId) return;

    try {
      const response = await axios.get(
        `https://api.perfectorse.site/api/v1/user/balance/${user.userId}`
      );
      const data = response?.data;
      // console.log("API response:", data);

      if (response.status === 200 && typeof data === 'object') {
        const userData = data; // Directly use data as an object
        setUser((prevUser) => ({
          ...prevUser,
          balance: userData?.balance ?? 0,
          bonus: userData?.bonus ?? 0,
          unplayed: userData?.unplayed ?? 0,
          winnings : userData?.winnings ?? 0
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
  // useEffect(() => {
  //   if (user) {
  //     fetchUserData(); // Fetch user data when `user` changes
  //   } else {
  //     Cookies.remove("user");
  //   }
  // }, [user]);

  useEffect(() => {
    if (user) {
      Cookies.set("user", JSON.stringify(user), { expires: 1 });
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, fetchUserData, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
