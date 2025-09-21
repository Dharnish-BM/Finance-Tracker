import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import Transactions from "./pages/Transactions";
import Analytics from "./pages/Analytics";
import Layout from "./components/Layout";
import Navbar from "./components/Navbar";
import Chatbot from "./components/chatbot"; // ⬅️ import chatbot

// Wrapper to use useLocation inside Router
function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(token);
    }
    setLoading(false);
  }, []);

  // Hide navbar & chatbot on login/register pages
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/register";

  if (loading) return null;

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
        <Route
          path="/dashboard"
          element={
            user ? (
              <Layout>
                <Home />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/dashboard/transactions"
          element={
            user ? (
              <Layout>
                <Transactions />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/dashboard/analytics"
          element={
            user ? (
              <Layout>
                <Analytics />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>

      {/* ✅ Chatbot will be visible in all pages (except login/register) */}
      {!hideNavbar && <Chatbot />}
    </>
  );
}

export default AppWrapper;
