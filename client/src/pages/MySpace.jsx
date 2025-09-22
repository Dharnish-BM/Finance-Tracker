// src/pages/MySpace.jsx
import React, { useState, useEffect } from "react";
import UploadStatement from "../components/UploadStatement";
import SpeakWithStatement from "../components/SpeakWithStatement";

function MySpace() {
  const [message, setMessage] = useState("Welcome to your Finance Dashboard!");
  const [weeklySummary, setWeeklySummary] = useState(null);
  const [monthlySummary, setMonthlySummary] = useState(null);
  const [recentTransactions, setRecentTransactions] = useState([]);

  useEffect(() => {
    // Placeholder for future API calls
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0c3fc] to-[#8ec5fc] pt-24 px-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">MySpace - Finance Dashboard</h1>
      <p className="mb-6 text-gray-700">{message}</p>

      {/* Upload Statement Component */}
      <div className="mb-6">
        <UploadStatement />
      </div>

      {/* Speak With Statement Component */}
      <div className="mb-6">
        <SpeakWithStatement />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-gray-900">Weekly Summary</h2>
          {weeklySummary ? (
            <pre className="text-gray-800">{JSON.stringify(weeklySummary, null, 2)}</pre>
          ) : (
            <p className="text-gray-600">Loading weekly summary...</p>
          )}
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-gray-900">Monthly Summary</h2>
          {monthlySummary ? (
            <pre className="text-gray-800">{JSON.stringify(monthlySummary, null, 2)}</pre>
          ) : (
            <p className="text-gray-600">Loading monthly summary...</p>
          )}
        </div>
      </div>

      <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2 text-gray-900">Recent Transactions</h2>
        {recentTransactions.length > 0 ? (
          <table className="w-full border-collapse text-gray-900">
            <thead>
              <tr>
                <th className="border p-2">Date</th>
                <th className="border p-2">Type</th>
                <th className="border p-2">Category</th>
                <th className="border p-2">Amount</th>
                <th className="border p-2">Description</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((t, idx) => (
                <tr key={idx}>
                  <td className="border p-2">{t.date}</td>
                  <td className="border p-2">{t.type}</td>
                  <td className="border p-2">{t.category}</td>
                  <td className="border p-2">{t.amount}</td>
                  <td className="border p-2">{t.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600">Loading recent transactions...</p>
        )}
      </div>
    </div>
  );
}

export default MySpace;
