import React, { useState } from "react";
import {
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import api from "../api/axios";
import Button from "./ui/Button";
import Card from "./ui/Card";

const ResumeUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setMessage({ type: "", text: "" });
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage({ type: "error", text: "Please select a file first" });
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    setUploading(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await api.post("/resume/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage({ type: "success", text: res.data.message });
      if (onUploadSuccess) {
        onUploadSuccess(res.data.data);
      }
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Upload failed. Please try again.",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="mb-6">
        <label className="block text-slate-700 font-semibold mb-2 ml-1">
          Upload Resume (PDF or DOCX)
        </label>
        <div
          className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
            file
              ? "border-emerald-400 bg-emerald-50/30"
              : "border-slate-200 hover:border-blue-400 bg-white"
          }`}
        >
          <input
            type="file"
            id="resume-upload"
            className="hidden"
            accept=".pdf,.docx"
            onChange={handleFileChange}
          />
          <label
            htmlFor="resume-upload"
            className="cursor-pointer flex flex-col items-center"
          >
            {file ? (
              <>
                <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                  <FileText className="w-7 h-7 text-emerald-600" />
                </div>
                <span className="text-emerald-700 font-bold truncate max-w-xs">
                  {file.name}
                </span>
                <span className="text-slate-500 text-xs mt-1 font-medium">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </span>
              </>
            ) : (
              <>
                <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center mb-4">
                  <Upload className="w-7 h-7 text-slate-400" />
                </div>
                <span className="text-slate-600 font-bold">
                  Click to browse or drag and drop
                </span>
                <span className="text-slate-400 text-xs mt-1 font-medium">
                  PDF or DOCX (Max 5MB)
                </span>
              </>
            )}
          </label>
        </div>
      </div>

      {message.text && (
        <div
          className={`mb-6 p-4 rounded-xl flex items-center gap-3 text-sm font-medium ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
              : "bg-red-50 text-red-700 border border-red-100"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle className="w-5 h-5 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0" />
          )}
          {message.text}
        </div>
      )}

      <Button
        onClick={handleUpload}
        loading={uploading}
        disabled={!file}
        className="w-full h-12"
      >
        Upload Resume
      </Button>
    </Card>
  );
};

export default ResumeUpload;
