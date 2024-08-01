import React,{useContext} from "react";
import { Route, Navigate } from "react-router-dom";
import UserContext from "./components/login/UserContext";

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { user } = useContext(UserContext);
  return (
    <Route
      {...rest}
      element={user ? Component : <Navigate to="/login" replace />}
    />
  );
};

export default PrivateRoute;