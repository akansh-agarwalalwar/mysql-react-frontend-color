import logo from "./logo.svg";
import React from 'react';
import "./App.css";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import HomePage from "./components/dashboard/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
