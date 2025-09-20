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
import Navbar from "./components/Navbar";

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
  const [loading, setLoading] = useState(true); // Loading state while checking token
  const location = useLocation();

  useEffect(() => {
    // Check token from localStorage
    const token = localStorage.getItem("token");
    if (token) {
      setUser(token); // or parse JSON if storing user object
    }
    setLoading(false); // done checking
  }, []);

  // Don't show Navbar on login or register pages
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/register";

  if (loading) return null; // Or render a spinner here

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
        {/* Optional: catch-all route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default AppWrapper;
