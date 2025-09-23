import { useEffect, useState } from "react";
import { Navigate, Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import Chatbot from "./components/chatbot"; // chatbot component
import Navbar from "./components/Navbar";
import { FinanceProvider, useFinance } from "./context/FinanceContext";
import BudgetManagement from "./pages/BudgetManagement";
import CalendarPage from "./pages/CalendarPage";
import DebugAuth from "./pages/DebugAuth";
import GitHubCallback from "./pages/GitHubCallback";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TestAuth from "./pages/TestAuth";
import TransactionManagement from "./pages/TransactionManagement";
import MySpace from "./pages/MySpace"; // <-- import MySpace

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
  const { loadUserData } = useFinance();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(token);
      loadUserData();
    }
    setLoading(false);
  }, [loadUserData]);

  // Hide navbar & chatbot on login/register pages
  const hideNavbar = location.pathname === "/login" || location.pathname === "/register";

  if (loading) return null;

  return (
    <>
      {!hideNavbar && <Navbar user={user} setUser={setUser} />}

      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/auth/github/callback" element={<GitHubCallback />} />
        <Route path="/debug" element={<DebugAuth />} />
        <Route path="/test" element={<TestAuth />} />
        <Route path="/" element={user ? <LandingPage /> : <Navigate to="/login" />} />
        <Route path="/transactions" element={user ? <TransactionManagement /> : <Navigate to="/login" />} />
        <Route path="/budgets" element={user ? <BudgetManagement /> : <Navigate to="/login" />} />
        <Route path="/myspace" element={user ? <MySpace /> : <Navigate to="/login" />} /> {/* <-- add MySpace */}
      </Routes>

      {!hideNavbar && <Chatbot />}
    </>
  );
}

export default AppWrapper;
