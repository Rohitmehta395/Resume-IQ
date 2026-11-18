import React, { useState } from "react";
import {
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  X,
} from "lucide-react";
import api from "../api/axios";
import Button from "./ui/Button";
import Card from "./ui/Card";

const ResumeUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [dragOver, setDragOver] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        setMessage({ type: "error", text: "File size exceeds 5MB limit." });
        return;
      }
      setFile(selectedFile);
      setMessage({ type: "", text: "" });
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const selectedFile = e.dataTransfer.files[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        setMessage({ type: "error", text: "File size exceeds 5MB limit." });
        return;
      }
      setFile(selectedFile);
      setMessage({ type: "", text: "" });
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage({ type: "error", text: "Please select a file first." });
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

      setMessage({ type: "success", text: res.data.message || "Upload successful!" });
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
        <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">
          Upload Resume (PDF or DOCX)
        </label>
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 ${
            file
              ? "border-emerald-500/40 bg-emerald-500/[0.05]"
              : dragOver
              ? "border-indigo-500 bg-indigo-500/[0.06]"
              : "border-white/[0.1] hover:border-indigo-500/40 bg-[#090D16]"
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
                <div className="w-14 h-14 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 rounded-2xl flex items-center justify-center mb-4">
                  <FileText className="w-7 h-7" />
                </div>
                <span className="text-emerald-300 font-bold truncate max-w-xs text-sm">
                  {file.name}
                </span>
                <span className="text-slate-400 text-xs mt-1 font-mono">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </span>
              </>
            ) : (
              <>
                <div className="w-14 h-14 bg-white/[0.04] border border-white/[0.08] text-slate-400 rounded-2xl flex items-center justify-center mb-4">
                  <Upload className="w-7 h-7" />
                </div>
                <span className="text-slate-200 font-bold text-sm">
                  Click to browse or drag and drop
                </span>
                <span className="text-slate-500 text-xs mt-1">
                  PDF or DOCX format (Max 5MB)
                </span>
              </>
            )}
          </label>

          {file && (
            <button
              type="button"
              onClick={() => setFile(null)}
              className="mt-3 inline-flex items-center gap-1 text-xs text-slate-400 hover:text-rose-400 transition-colors"
            >
              <X className="w-3.5 h-3.5" /> Remove file
            </button>
          )}
        </div>
      </div>

      {message.text && (
        <div
          className={`mb-6 p-4 rounded-xl flex items-center gap-3 text-sm font-semibold border ${
            message.type === "success"
              ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/25"
              : "bg-rose-500/10 text-rose-300 border-rose-500/25"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle className="w-5 h-5 shrink-0 text-emerald-400" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
          )}
          {message.text}
        </div>
      )}

      <Button
        onClick={handleUpload}
        loading={uploading}
        disabled={!file}
        className="w-full h-11"
      >
        Upload Resume
      </Button>
    </Card>
  );
};

export default ResumeUpload;
