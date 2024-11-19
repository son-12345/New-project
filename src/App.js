import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home"; // Thêm import
import Login from "./components/Login";
import Register from "./components/Register";
import Transfer from "./components/Transfer";
import Deposit from "./components/Deposit";
import History from "./components/History";
import User from "./components/User";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Trang chủ */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/history" element={<History />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </Router>
  );
}

export default App;
