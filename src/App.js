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
import Maintainance from "./components/maintainance/Maintainance";
import PrivateRoute from "./PrivateRoute";
import NewLogin from "./components/login/NewLogin";
import NewSignup from "./components/signup/NewSignup";
import NewForgot from "./components/forgotPassword/NewForgot";
import Heads from "./components/game/HeadsAndTails/Heads";
import MaintenancePop from "./components/admin/MaintainancePop";
function App() {
  function disableRightClick() {
    document.addEventListener(
      "contextmenu",
      (event) => {
        event.preventDefault();
      },
      false
    );
    document.onkeydown = function (e) {
      if (e.KeyCode == 123) {
        return false;
      }
      if (e.ctrlKey && e.shiftKey && e.keyCode == "I".charCodeAt(0)) {
        return false;
      }
      if (e.ctrlKey && e.shiftKey && e.keyCode == "C".charCodeAt(0)) {
        return false;
      }
      if (e.ctrlKey && e.shiftKey && e.keyCode == "J".charCodeAt(0)) {
        return false;
      }
      if (e.ctrlKey && e.keyCode == "U".charCodeAt(0)) {
        return false;
      }
    };
  }
  disableRightClick();
  return (
    // <>
    // <Maintainance/>
    // </>
    <UserProvider>
      <Router>
        <Routes>
          {/* <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} /> */}
          <Route path="/" element={<NewLogin />} />
          <Route path="/login" element={<NewLogin />} />
          {/* <Route path="/signup" element={<Signup />} /> */}
          <Route path="/signup" element={<NewSignup />} />
          {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
          <Route path="/forgot-password" element={<NewForgot />} />
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
          {/* <Route path="heads" element={<Heads />} /> */}
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/admin">
            <Route index element={<Admin />} />
            <Route path="users" element={<AllUsers />} />
            <Route path="payment-approve" element={<PaymentApprove />} />
            <Route path="to-pay" element={<ToPay />} />
            <Route path="game-mode" element={<GameMode />} />
            <Route path="game-mode/two-min" element={<GameModeSecond />} />
            <Route path="maintainance" element={<MaintenancePop />} />
          </Route>
          {/* <Route path="/admin/game-mode/30sec" element={<DisplayTableOfThirtySec />} /> */}
          {/* <Route path="/manual/thirty-second" element={<ManualPage />} /> */}
        </Routes>
      </Router>
    </UserProvider>
  );
}
export default App;
