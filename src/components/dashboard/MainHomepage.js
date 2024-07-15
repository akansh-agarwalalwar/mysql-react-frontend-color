import React from "react";
import { Outlet } from "react-router-dom";
import BottomNav from "./BottomNav";

function MainHomepage() {
  return (
    <div>
      <Outlet />
      <BottomNav />
    </div>
  );
}

export default MainHomepage;
