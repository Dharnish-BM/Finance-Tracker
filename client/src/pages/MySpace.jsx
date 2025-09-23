// src/pages/MySpace.jsx
import React from "react";
import UploadStatement from "../components/UploadStatement";
import SpeakWithStatement from "../components/SpeakWithStatement";
import WeeklySummariser from "../components/WeeklySummariser";
import MonthlySummariser from "../components/MonthlySummariser";

function MySpace() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0c3fc] to-[#8ec5fc] pt-24 px-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">
        MySpace - Finance Dashboard
      </h1>

      {/* Upload + Chat Row */}
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        {/* Upload widget */}
        <div className="flex-shrink-0">
          <UploadStatement />
        </div>

        {/* Chat window expands */}
        <div className="flex-1">
          <SpeakWithStatement />
        </div>
      </div>

      {/* Weekly & Monthly Summaries */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <WeeklySummariser />
        <MonthlySummariser />
      </div>
    </div>
  );
}

export default MySpace;
