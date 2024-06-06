import React from "react";
import "./App.css";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import HomePage from "./components/dashboard/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ForgotPassword from "./components/forgotPassword/ForgotPassword";
import { UserProvider } from "./components/login/UserContext";
import Recharge from "./components/recharge/Recharge";
import ProfileMainPage from "./components/profile/ProfileMainPage";
import PaymentPage from "./components/paymentOptions/PaymentPage";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/recharge" element={<Recharge />} />
          <Route path="/profile" element={<ProfileMainPage />} />
          <Route path="/payment-page" element={<PaymentPage />} />


        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
