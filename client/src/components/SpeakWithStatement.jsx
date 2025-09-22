// src/components/SpeakWithStatement.jsx
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function SpeakWithStatement() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) {
      toast.error("Please enter a question");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      // Update port if your FastAPI runs on a different one (default 8000)
      const res = await axios.post(
        "http://localhost:8000/chat-statement",
        { question },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.answer) {
        setAnswer(res.data.answer);
      } else {
        setAnswer("No answer found for your question.");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.error || "Failed to get response from statement."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-2 text-gray-900">
        Ask About Your Statement
      </h2>

      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask something about your uploaded statement..."
          className="flex-1 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <button
          onClick={handleAsk}
          disabled={loading}
          className={`${
            loading ? "bg-purple-400 cursor-not-allowed" : "bg-[#7209b7] hover:bg-[#9d4edd]"
          } text-white px-4 py-2 rounded-lg transition`}
        >
          {loading ? "Processing..." : "Ask"}
        </button>
      </div>

      {answer && (
        <div className="mt-4 p-3 bg-gray-100 rounded-lg border">
          <strong>Answer:</strong> {answer}
        </div>
      )}
    </div>
  );
}

export default SpeakWithStatement;
