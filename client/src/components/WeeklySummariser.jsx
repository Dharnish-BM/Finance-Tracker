// src/components/WeeklySummariser.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function WeeklySummariser() {
  const [weeklySummary, setWeeklySummary] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeeklySummary = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.post(
          "http://localhost:8000/week-summariser",
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setWeeklySummary(res.data.week_summary);
      } catch (error) {
        console.error(error);
        toast.error(
          error.response?.data?.error || "Failed to fetch weekly summary"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchWeeklySummary();
  }, []);

  if (loading) return <p>Loading weekly summary...</p>;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-2 text-gray-900">Weekly Summary</h2>
      <p className="text-gray-800 whitespace-pre-line">{weeklySummary}</p>
    </div>
  );
}

export default WeeklySummariser;
