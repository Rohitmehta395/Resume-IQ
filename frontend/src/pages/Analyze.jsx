import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Upload,
  Sparkles,
  Target,
  Zap,
  CheckCircle2,
  Lock,
  ChevronRight,
  X,
  Briefcase,
  FileCheck,
  Building2,
  Copy,
} from "lucide-react";
import api from "../api/axios";
import toast from "react-hot-toast";
import Input from "../components/ui/Input";
import Textarea from "../components/ui/Textarea";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";

const SAMPLE_JOB_DESCRIPTION = `We are seeking a Senior Fullstack Engineer to lead our Core Platform team. In this role, you will architect, build, and scale high-throughput web applications handling millions of daily requests.

Key Responsibilities:
• Design and maintain robust microservices using Node.js, TypeScript, and Go.
• Build responsive, accessible, and performant user interfaces with React, Next.js, and Tailwind CSS.
• Optimize PostgreSQL and Redis database performance, indexing, and schema design.
• Implement automated CI/CD deployment pipelines on AWS and Docker container environments.
• Partner with product managers and designers to deliver customer-facing capabilities with high test coverage.

Requirements:
• 4+ years of professional software engineering experience.
• Strong proficiency in React, TypeScript, Node.js, and RESTful / GraphQL API architectures.
• Solid background in distributed systems, asynchronous queues, and cloud infrastructure.
• Experience with automated testing frameworks (Jest, Playwright) and performance monitoring.
• Excellent communication skills and a data-driven approach to technical decision-making.`;

const StepItem = ({ number, label, done, active }) => (
  <div className="flex items-center gap-2.5">
    <div
      className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold transition-all ${
        done
          ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
          : active
          ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
          : "bg-white/[0.04] text-slate-400 border border-white/[0.08]"
      }`}
    >
      {done ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : number}
    </div>
    <span
      className={`text-xs font-semibold ${
        active ? "text-white" : done ? "text-slate-300" : "text-slate-400"
      }`}
    >
      {label}
    </span>
  </div>
);

const Analyze = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    jobDescription: "",
  });
  const [file, setFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [dragOver, setDragOver] = useState(false);

  const jdWords = formData.jobDescription.trim()
    ? formData.jobDescription.trim().split(/\s+/).filter(Boolean).length
    : 0;

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    if (f.size > 5 * 1024 * 1024) {
      toast.error("File size must be under 5MB.");
      return;
    }
    setFile(f);
    toast.success("Resume uploaded successfully.");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (!f) return;
    if (f.size > 5 * 1024 * 1024) {
      toast.error("File size must be under 5MB.");
      return;
    }
    setFile(f);
    toast.success("Resume uploaded successfully.");
  };

  const loadSampleJD = () => {
    setFormData({
      jobTitle: "Senior Fullstack Engineer",
      companyName: "Stripe",
      jobDescription: SAMPLE_JOB_DESCRIPTION,
    });
    toast.success("Sample Job Description loaded.");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (analyzing) return;

    if (!file) {
      toast.error("Please upload your resume file (PDF or DOCX).");
      return;
    }
    if (!formData.jobTitle.trim()) {
      toast.error("Please enter a target job title.");
      return;
    }
    if (!formData.jobDescription.trim() || jdWords < 50) {
      toast.error("Job description must contain at least 50 words for accurate ATS parsing.");
      return;
    }

    setAnalyzing(true);
    setAnalysisStep(1);

    const stepInterval = setInterval(() => {
      setAnalysisStep((prev) => (prev < 3 ? prev + 1 : prev));
    }, 2500);

    const fd = new FormData();
    fd.append("resume", file);
    fd.append("jobTitle", formData.jobTitle);
    fd.append("companyName", formData.companyName);
    fd.append("jobDescription", formData.jobDescription);

    try {
      const res = await api.post("/checks/analyze", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      clearInterval(stepInterval);
      setAnalysisStep(3);
      toast.success("ATS Analysis completed!");
      setTimeout(() => {
        navigate(`/report?id=${res.data.data.id}`);
      }, 800);
    } catch (err) {
      clearInterval(stepInterval);
      setAnalyzing(false);
      setAnalysisStep(0);
      toast.error(
        err.response?.data?.message || "Analysis failed. Please check your inputs and try again."
      );
    }
  };

  const isStep1Done = !!file;
  const isStep2Done = !!formData.jobTitle.trim();
  const isStep3Done = jdWords >= 50;

  return (
    <div className="space-y-8 animate-fade-in relative">
      {/* ══ HEADER ══ */}
      <div className="pb-6 border-b border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_8px_#6366F1]" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Heuristic ATS Audit Studio
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight font-sans">
            Scan &amp; Optimize Your Resume
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Upload your resume, add your target job posting, and receive a multi-vector ATS compliance audit.
          </p>
        </div>

        <button
          type="button"
          onClick={loadSampleJD}
          className="self-start md:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-xs font-mono font-semibold text-slate-300 border border-white/[0.08] transition-colors cursor-pointer"
        >
          <Copy className="w-3.5 h-3.5 text-indigo-400" />
          Load Sample Posting
        </button>
      </div>

      {/* ══ STEP PROGRESSION BAR ══ */}
      <div className="flex flex-wrap items-center gap-4 sm:gap-6 p-4 rounded-2xl bg-[#0F172A] border border-white/[0.08]">
        <StepItem number="1" label="Upload Resume" done={isStep1Done} active={!isStep1Done} />
        <ChevronRight className="w-4 h-4 text-slate-400 hidden sm:block" />
        <StepItem number="2" label="Role Details" done={isStep2Done} active={isStep1Done && !isStep2Done} />
        <ChevronRight className="w-4 h-4 text-slate-400 hidden sm:block" />
        <StepItem number="3" label="Job Description" done={isStep3Done} active={isStep2Done && !isStep3Done} />
        <ChevronRight className="w-4 h-4 text-slate-400 hidden sm:block" />
        <StepItem number="4" label="Generate Report" done={false} active={isStep1Done && isStep2Done && isStep3Done} />
      </div>

      {/* ══ MAIN WORKSPACE FORM ══ */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* ── LEFT PANEL: UPLOAD & ROLE METADATA (Span 5) ── */}
          <div className="lg:col-span-5 space-y-6">
            {/* 1. Resume File Dropzone */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
                    <Upload className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Resume Document</h3>
                    <p className="text-xs text-slate-400">PDF or DOCX (Max 5MB)</p>
                  </div>
                </div>

                {file && (
                  <Badge variant="emerald" size="sm">
                    Ready
                  </Badge>
                )}
              </div>

              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-2xl p-6 text-center transition-all duration-200 ${
                  file
                    ? "border-emerald-500/40 bg-emerald-500/[0.04]"
                    : dragOver
                    ? "border-indigo-500 bg-indigo-500/[0.08]"
                    : "border-white/[0.1] hover:border-indigo-500/40 bg-[#090D16]"
                }`}
              >
                <input
                  type="file"
                  id="resume-file-input"
                  onChange={handleFileChange}
                  accept=".pdf,.docx"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />

                {file ? (
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-3">
                      <FileCheck className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-bold text-emerald-300 max-w-xs truncate">
                      {file.name}
                    </span>
                    <span className="text-xs font-mono text-slate-400 mt-0.5">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB • Verified Format
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setFile(null);
                      }}
                      className="relative z-20 mt-3 inline-flex items-center gap-1 text-xs text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" /> Remove file
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center py-4">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-400 flex items-center justify-center mb-3">
                      <Upload className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-bold text-slate-200">
                      Drop your resume here
                    </span>
                    <span className="text-xs text-slate-400 mt-1">
                      or click to browse from device
                    </span>
                  </div>
                )}
              </div>
            </Card>

            {/* 2. Target Job Metadata */}
            <Card className="p-6 space-y-4">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Target Position</h3>
                  <p className="text-xs text-slate-400">Specify the role and organization</p>
                </div>
              </div>

              <Input
                label="Target Job Title"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleInputChange}
                required
                placeholder="e.g. Senior Frontend Engineer"
                icon={Briefcase}
              />

              <Input
                label="Company Name (Optional)"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder="e.g. Google, Stripe, or Stealth Startup"
                icon={Building2}
              />
            </Card>

            {/* 3. ATS Screening Rules Advice */}
            <Card className="p-5 bg-gradient-to-br from-[#0F172A] to-[#162032] border-indigo-500/20">
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-3">
                <Zap className="w-4 h-4" />
                <span>ATS Screening Rules</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Use standard section titles: Experience, Skills, Education.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Avoid multi-column tables or text boxes; single column parses 100% reliably.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Match exact keyword syntax used in the job description.</span>
                </li>
              </ul>
            </Card>
          </div>

          {/* ── RIGHT PANEL: JOB DESCRIPTION & TRIGGER (Span 7) ── */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <Card className="p-6 flex-1 flex flex-col">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Full Job Description</h3>
                    <p className="text-xs text-slate-400">
                      Paste the complete posting text for deep semantic extraction
                    </p>
                  </div>
                </div>

                {/* Word Count Meter */}
                <div className="flex items-center gap-2">
                  <div
                    className={`px-3 py-1 rounded-lg border text-xs font-mono font-bold flex items-center gap-1.5 ${
                      jdWords >= 50
                        ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/25"
                        : jdWords > 0
                        ? "bg-amber-500/10 text-amber-300 border-amber-500/25"
                        : "bg-white/[0.04] text-slate-400 border-white/[0.08]"
                    }`}
                  >
                    <span>{jdWords} words</span>
                    {jdWords < 50 && (
                      <span className="text-[10px] text-amber-400 font-sans font-medium">
                        (min 50)
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Textarea */}
              <div className="flex-1 flex flex-col">
                <Textarea
                  name="jobDescription"
                  value={formData.jobDescription}
                  onChange={handleInputChange}
                  rows={14}
                  placeholder="Paste the full job description here, including responsibilities, required qualifications, tech stack, and preferred skills…"
                  required
                  className="flex-1"
                />
              </div>

              {/* Helper Bar */}
              <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Data is processed in an encrypted sandbox.</span>
                </div>
                <span>TF-IDF Semantic Match Model</span>
              </div>
            </Card>

            {/* Launch Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={analyzing || !file || !formData.jobTitle || jdWords < 50}
              className="w-full h-14 text-sm uppercase tracking-wider font-bold shadow-xl shadow-indigo-600/25"
            >
              <Target className="w-5 h-5 mr-1" />
              Generate Comprehensive ATS Report
            </Button>
          </div>
        </div>
      </form>

      {/* ══ ACTIVE ANALYSIS MODAL / OVERLAY ══ */}
      {analyzing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <Card className="w-full max-w-md p-8 text-center bg-[#0F172A] border-indigo-500/40 shadow-2xl relative overflow-hidden">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-8 h-8 animate-pulse" />
            </div>

            <h3 className="text-xl font-extrabold text-white tracking-tight mb-2">
              Auditing ATS Compatibility
            </h3>
            <p className="text-sm text-slate-400 mb-6">
              Comparing resume experience against job requirements…
            </p>

            {/* Progress Steps */}
            <div className="space-y-3 text-left p-4 rounded-xl bg-[#090D16] border border-white/[0.06] font-mono text-xs mb-6">
              <div className="flex items-center gap-2.5">
                {analysisStep >= 1 ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin shrink-0" />
                )}
                <span className={analysisStep >= 1 ? "text-slate-200" : "text-indigo-300"}>
                  Extracting sections, skills, &amp; metrics…
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                {analysisStep >= 2 ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : analysisStep === 1 ? (
                  <div className="w-4 h-4 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full bg-white/[0.08] shrink-0" />
                )}
                <span className={analysisStep >= 2 ? "text-slate-200" : "text-slate-400"}>
                  Calculating heuristic match scores…
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                {analysisStep >= 3 ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : analysisStep === 2 ? (
                  <div className="w-4 h-4 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full bg-white/[0.08] shrink-0" />
                )}
                <span className={analysisStep >= 3 ? "text-slate-200" : "text-slate-400"}>
                  Generating Google X-Y-Z rewrites…
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs font-mono text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10B981]" />
              <span>Analyzing in secure sandbox</span>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Analyze;
