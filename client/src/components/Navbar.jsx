import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TranslateToggle from "./TranslateToggle";

function Navbar({ user, setUser }) {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-gradient-to-r from-[#7209b7] to-[#9d4edd] text-white px-6 py-4 shadow-lg fixed w-full z-50"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link
            to="/"
            className="text-2xl font-extrabold tracking-wide hover:text-[#f1f1f1] transition"
          >
            FinanceTracker
          </Link>
        </motion.div>

        {/* Navigation Links */}
        {user && (
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-white/90 hover:text-white transition font-medium"
            >
              Dashboard
            </Link>
            <Link
              to="/transactions"
              className="text-white/90 hover:text-white transition font-medium"
            >
              Transactions
            </Link>
            <Link
              to="/budgets"
              className="text-white/90 hover:text-white transition font-medium"
            >
              Budgets
            </Link>
          </div>
        )}

        {/* Translate + Logout */}
        {user && (
          <div className="flex items-center">
            <TranslateToggle />


            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="ml-3 px-5 py-2 rounded-lg bg-[#c1121f] hover:bg-[#9d0d19] transition text-white font-semibold shadow-md"
            >
              Logout
            </motion.button>
          </div>
        )}

        {/* Mobile Hamburger (optional if you want) */}
        {user && (
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="focus:outline-none"
            >
              <motion.div whileTap={{ scale: 0.9 }}>
                {mobileOpen ? (
                  <span className="text-3xl font-bold">&times;</span>
                ) : (
                  <span className="text-3xl font-bold">&#9776;</span>
                )}
              </motion.div>
            </button>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileOpen && user && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden flex flex-col mt-4 bg-[#5e0a96] rounded-lg overflow-hidden"
        >
          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className="px-6 py-3 hover:bg-[#7209b7] transition text-white font-medium text-left w-full"
          >
            Dashboard
          </Link>
          <Link
            to="/transactions"
            onClick={() => setMobileOpen(false)}
            className="px-6 py-3 hover:bg-[#7209b7] transition text-white font-medium text-left w-full"
          >
            Transactions
          </Link>
          <Link
            to="/budgets"
            onClick={() => setMobileOpen(false)}
            className="px-6 py-3 hover:bg-[#7209b7] transition text-white font-medium text-left w-full"
          >
            Budgets
          </Link>
          <div className="px-6 py-3">
            <TranslateToggle />
          </div>
          <button
            onClick={() => {
              handleLogout();
              setMobileOpen(false);
            }}
            className="px-6 py-3 hover:bg-[#7209b7] transition text-white font-medium text-left w-full"
          >
            Logout
          </button>
        </motion.div>
      )}
    </motion.nav>
  );
}

export default Navbar;
