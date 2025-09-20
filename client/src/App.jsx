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
              <Home />
            </Layout>
          ) : <Navigate to="/login" />
        } />
        <Route path="/dashboard/exchange" element={
          user ? (
            <Layout>
              <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-purple-800 p-8">
                <div className="max-w-4xl mx-auto">
                  <div className="bg-white rounded-2xl p-8 shadow-2xl">
                    <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
                      INR to USD Dashboard
                    </h1>
                    <div className="text-center">
                      <p className="text-xl text-gray-600 mb-4">
                        Dashboard is working! This is a test version.
                      </p>
                      <div className="bg-blue-50 p-6 rounded-xl">
                        <h2 className="text-2xl font-semibold text-blue-800 mb-2">
                          Current Exchange Rate
                        </h2>
                        <p className="text-3xl font-bold text-blue-900">
                          ₹83.25 = $1.00 USD
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Layout>
          ) : <Navigate to="/login" />
        } />
        <Route path="/dashboard/transactions" element={
          user ? (
            <Layout>
              <Transactions />
            </Layout>
          ) : <Navigate to="/login" />
        } />
        <Route path="/dashboard/analytics" element={
          user ? (
            <Layout>
              <Analytics />
            </Layout>
          ) : <Navigate to="/login" />
        } />
      </Routes>
    </>
  );
}

export default AppWrapper;
