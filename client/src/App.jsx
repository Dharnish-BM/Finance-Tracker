import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import ExchangeDashboard from "./components/ExchangeDashboard";
import Transactions from "./pages/Transactions";
import Analytics from "./pages/Analytics";
import Layout from "./components/Layout";
import Navbar from "./components/Navbar";

function AppWrapper() {
  // Wrap App with Router to use useLocation
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const location = useLocation(); // Get current route

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(token);
    }
  }, []);

  // Don't show navbar on login or register pages
  const hideNavbar = location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!hideNavbar && <Navbar user={user} setUser={setUser} />}
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={user ? <LandingPage /> : <Navigate to="/login" />}
        />
        <Route path="/dashboard" element={
          user ? (
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/exchange" element={<ExchangeDashboard />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/analytics" element={<Analytics />} />
              </Routes>
            </Layout>
          ) : <Navigate to="/login" />
        } />
      </Routes>
    </>
  );
}

export default AppWrapper;
