import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0c3fc] to-[#8ec5fc] px-6">
      <div className="max-w-2xl w-full text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-[#2b2d42] tracking-tight"
        >
          Welcome to Finance Tracker
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mt-4 text-lg md:text-xl text-[#2b2d42]/80"
        >
          Track your expenses, save more, and stay in control.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-10"
        >
          <button
            onClick={() => navigate("/login")}
            className="px-8 py-3 rounded-xl text-white font-semibold shadow-lg bg-gradient-to-r from-[#7209b7] to-[#9d4edd] hover:shadow-xl transition"
          >
            Go to Login
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default HomePage;


