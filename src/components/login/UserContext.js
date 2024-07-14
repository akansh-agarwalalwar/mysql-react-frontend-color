import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [postData, setPostData] = useState([]);
  const [user, setUser] = useState(() => {
    const userCookie = Cookies.get("user");
    return userCookie ? JSON.parse(userCookie) : null;
  });
  
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`https://api.perfectorse.site/api/balance/${user.userId}`);
      if (response.status === 200) {
        const usc = user;
        usc.balance = response.data[0].balance;
        // setBalance(response.data.balance);
        setUser({...usc});
      }
    } catch (error) {
      // console.error("Error fetching user data:", error);
    }
  };

  const logout = async () => {
    try {
      await axios.post("https://api.perfectorse.site/logout");
      setUser(null);
      Cookies.remove('user');
    } catch (error) {
      // console.error("Error during logout:", error);
    }
  };
  
  useEffect(() => {
    if (user) {
      fetchUserData(user,setUser);
      Cookies.set("user", JSON.stringify(user), { expires: 1 });
      // console.log(user);
      const balance = user?.balance;
    } else {
      Cookies.remove("user");
    }
  }, [JSON.stringify(user)]);

  return (
    <UserContext.Provider value={{ user, fetchUserData, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;