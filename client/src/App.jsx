import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LandingPage from "./pages/LandingPage";
import TransactionManagement from "./pages/TransactionManagement";
import BudgetManagement from "./pages/BudgetManagement";
import GitHubCallback from "./pages/GitHubCallback";
import DebugAuth from "./pages/DebugAuth";
import Chatbot from "./components/chatbot"; // chatbot component
import Navbar from "./components/Navbar";
import { FinanceProvider } from "./context/FinanceContext";

function AppWrapper() {
  return (
    <FinanceProvider>
      <Router>
        <App />
      </Router>
    </FinanceProvider>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setUser(token);
    setLoading(false);
  }, []);

  // Hide navbar & chatbot on login/register pages
  const hideNavbar = location.pathname === "/login" || location.pathname === "/register";

  if (loading) return null;

  return (
    <>
      {!hideNavbar && <Navbar user={user} setUser={setUser} />}

      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/auth/github/callback" element={<GitHubCallback />} />
        <Route path="/debug" element={<DebugAuth />} />
        <Route path="/" element={user ? <LandingPage /> : <Navigate to="/login" />} />
        <Route path="/transactions" element={user ? <TransactionManagement /> : <Navigate to="/login" />} />
        <Route path="/budgets" element={user ? <BudgetManagement /> : <Navigate to="/login" />} />
      </Routes>

      {!hideNavbar && <Chatbot />}
    </>
  );
}

export default AppWrapper;
