import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const userCookie = Cookies.get("user");
    return userCookie ? JSON.parse(userCookie) : null;
  });

  useEffect(() => {
    if (user) {
      Cookies.set("user", JSON.stringify(user), { expires: 1 });
      // console.log(user);
      const balance = user?.balance;
      //console.log("User Balance:", balance);
    } else {
      Cookies.remove("user");
    }
  }, [user]);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserContext;