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
import Settings from "./components/profile/Settings";
import Admin from "./components/admin/Admin";
import AllUsers from "./components/admin/AllUser";
import PaymentApprove from "./components/admin/PaymentApprove";
import ToPay from "./components/admin/ToPay";
import GameMode from "./components/admin/GameMode";
import ThirtySecond from "./components/game/ThirtySecond";
import Withdraw from "./components/recharge/Withdraw";
import FinancialDetails from "./components/profile/FinancialDetails";
import BankDetails from "./components/profile/BankDetails";
import Invite from "./components/dashboard/Invite";
import OrderRecord from "./components/profile/OrderRecord";

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
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/invite" element={<Invite />} />
          <Route path="/profile" element={<ProfileMainPage />} />
          <Route path="/payment-page" element={<PaymentPage />} />
          <Route path="/financial-details" element={<FinancialDetails />} />
          <Route path="/order-record" element={<OrderRecord />} />
          <Route path="/bank-details" element={<BankDetails />} />
          <Route path="/setting" element={<Settings />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/admin/users" element={<AllUsers />} />
          <Route path="/admin/payment-approve" element={< PaymentApprove/>} />
          <Route path="/admin/to-pay" element={<ToPay />} />
          <Route path="/admin/game-mode" element={<GameMode />} />
          <Route path="/thirty-second-page" element={<ThirtySecond />} />
          {/* <Route path="/admin/game-mode/30sec" element={<DisplayTableOfThirtySec />} /> */}
          {/* <Route path="/manual/thirty-second" element={<ManualPage />} /> */}
        </Routes>
      </Router>
    </UserProvider>
  );
}
export default App;
