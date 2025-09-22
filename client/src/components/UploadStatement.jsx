import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function UploadStatement() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a PDF file to upload!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8000/upload-statement",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setLoading(false);
      toast.success(`Uploaded successfully: ${response.data.filename}`);
      console.log("OCR Output:", response.data.output);
      setFile(null);
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error("Upload failed. Please try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Upload Bank Statement</h2>

      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="mb-4"
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className="px-6 py-2 bg-gradient-to-r from-[#7209b7] to-[#9d4edd] text-white rounded-lg shadow-md hover:scale-105 transition"
      >
        {loading ? "Uploading..." : "Upload PDF"}
      </button>

      {/* Toast notifications */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default UploadStatement;
