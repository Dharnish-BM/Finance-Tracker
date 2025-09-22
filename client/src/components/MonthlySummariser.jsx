// src/components/MonthlySummariser.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function MonthlySummariser() {
  const [monthlySummary, setMonthlySummary] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMonthlySummary = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.post(
          "http://localhost:8000/month-summariser",
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMonthlySummary(res.data.month_summary);
      } catch (error) {
        console.error(error);
        toast.error(
          error.response?.data?.error || "Failed to fetch monthly summary"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlySummary();
  }, []);

  if (loading) return <p>Loading monthly summary...</p>;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-2 text-gray-900">Monthly Summary</h2>
      <p className="text-gray-800 whitespace-pre-line">{monthlySummary}</p>
    </div>
  );
}

export default MonthlySummariser;
