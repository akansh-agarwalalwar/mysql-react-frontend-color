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
import ThreeMin from "./components/game/ThreeMin";
import DailyBonus from "./components/dashboard/DailyBonus";
import GameModeSecond from "./components/admin/GameModeSecond";
import MainHomepage from "./components/dashboard/MainHomepage";
function App() {
  function disableRightClick() {
    document.addEventListener(
      "contextmenu",
      (event) => {
        event.preventDefault();
      },
      false
    );
  }
  disableRightClick();
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<MainHomepage />}>
            <Route index element={<HomePage />} />
            <Route path="profile">
              <Route index element={<ProfileMainPage />} />
              <Route path="financial-details" element={<FinancialDetails />} />
              <Route path="order-record" element={<OrderRecord />} />
              <Route path="bank-details" element={<BankDetails />} />
              <Route path="setting" element={<Settings />} />
            </Route>
            <Route path="invite" element={<Invite />} />
            <Route path="recharge">
              <Route index element={<Recharge />} />
              <Route path="payment-page" element={<PaymentPage />} />
            </Route>
          </Route>
          <Route path="thirty-second-page" element={<ThirtySecond />} />
          <Route path="withdraw" element={<Withdraw />} />
          <Route path="daily-bonus" element={<DailyBonus />} />
          <Route path="threeMin" element={<ThreeMin />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/admin">
            <Route index element={<Admin />} />
            <Route path="users" element={<AllUsers />} />
            <Route path="payment-approve" element={<PaymentApprove />} />
            <Route path="to-pay" element={<ToPay />} />
            <Route path="game-mode" element={<GameMode />} />
            <Route path="game-mode/two-min" element={<GameModeSecond />} />
          </Route>
          {/* <Route path="/admin/game-mode/30sec" element={<DisplayTableOfThirtySec />} /> */}
          {/* <Route path="/manual/thirty-second" element={<ManualPage />} /> */}
        </Routes>
      </Router>
    </UserProvider>
  );
}
export default App;
