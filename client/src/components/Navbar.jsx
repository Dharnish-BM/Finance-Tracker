import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

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

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          {!user ? (
            <>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  to="/login"
                  className="relative px-4 py-2 font-medium hover:text-[#e0aaff] transition"
                >
                  Login
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#e0aaff] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  to="/register"
                  className="px-5 py-2 rounded-lg bg-[#9d4edd] hover:bg-[#7b2cbf] transition text-white font-semibold shadow-md"
                >
                  Register
                </Link>
              </motion.div>
            </>
          ) : (
            <>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  to="/dashboard"
                  className="px-4 py-2 font-medium hover:text-[#e0aaff] transition"
                >
                  Dashboard
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  to="/dashboard/exchange"
                  className="px-4 py-2 font-medium hover:text-[#e0aaff] transition"
                >
                  Exchange Rate
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  to="/dashboard/transactions"
                  className="px-4 py-2 font-medium hover:text-[#e0aaff] transition"
                >
                  Transactions
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  to="/dashboard/analytics"
                  className="px-4 py-2 font-medium hover:text-[#e0aaff] transition"
                >
                  Analytics
                </Link>
              </motion.div>

              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="px-4 py-2 font-medium"
              >
                Welcome 👋
              </motion.span>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="px-5 py-2 rounded-lg bg-[#c1121f] hover:bg-[#9d0d19] transition text-white font-semibold shadow-md"
              >
                Logout
              </motion.button>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
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
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden flex flex-col mt-4 bg-[#5e0a96] rounded-lg overflow-hidden"
          >
            {!user ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="px-6 py-3 hover:bg-[#7209b7] transition text-white font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  className="px-6 py-3 hover:bg-[#7209b7] transition text-white font-medium"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="px-6 py-3 hover:bg-[#7209b7] transition text-white font-medium"
                >
                  Dashboard
                </Link>
                <Link
                  to="/dashboard/exchange"
                  onClick={() => setMobileOpen(false)}
                  className="px-6 py-3 hover:bg-[#7209b7] transition text-white font-medium"
                >
                  Exchange Rate
                </Link>
                <Link
                  to="/dashboard/transactions"
                  onClick={() => setMobileOpen(false)}
                  className="px-6 py-3 hover:bg-[#7209b7] transition text-white font-medium"
                >
                  Transactions
                </Link>
                <Link
                  to="/dashboard/analytics"
                  onClick={() => setMobileOpen(false)}
                  className="px-6 py-3 hover:bg-[#7209b7] transition text-white font-medium"
                >
                  Analytics
                </Link>
                <span className="px-6 py-3 text-white font-medium">
                  Welcome 👋
                </span>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileOpen(false);
                  }}
                  className="px-6 py-3 hover:bg-[#7209b7] transition text-white font-medium text-left w-full"
                >
                  Logout
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;
