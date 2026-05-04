import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Building2,
  Upload,
  Sparkles,
  Target,
  Zap,
  CheckCircle2,
  Lock,
  ChevronRight,
  X,
  Briefcase,
} from "lucide-react";
import api from "../api/axios";
import toast from "react-hot-toast";
import Input from "../components/ui/Input";
import Textarea from "../components/ui/Textarea";

/* ─── Step indicator ─────────────────────────────────────────────── */
const Step = ({ number, label, done }) => (
  <div className="flex items-center gap-3">
    <div
      className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black transition-all ${
        done
          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
          : "bg-primary/15 text-primary border border-primary/25"
      }`}
    >
      {done ? <CheckCircle2 className="w-4 h-4" /> : number}
    </div>
    <span className="text-sm font-semibold text-on-surface-variant/60">
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
  const [dragOver, setDragOver] = useState(false);

  const jdWordCount = formData.jobDescription.trim()
    ? formData.jobDescription.trim().split(/\s+/).length
    : 0;

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    if (f.size > 5 * 1024 * 1024) {
      toast.error("File must be under 5MB");
      return;
    }
    setFile(f);
    toast.success("Resume uploaded");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (!f) return;
    if (f.size > 5 * 1024 * 1024) {
      toast.error("File must be under 5MB");
      return;
    }
    setFile(f);
    toast.success("Resume uploaded");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (analyzing) return;
    if (!file) {
      toast.error("Please upload your resume");
      return;
    }
    if (!formData.jobTitle) {
      toast.error("Job title is required");
      return;
    }
    if (
      !formData.jobDescription ||
      formData.jobDescription.trim().length < 50
    ) {
      toast.error("Job description is too short");
      return;
    }

    setAnalyzing(true);
    const tid = toast.loading("Analyzing your resume…");

    const fd = new FormData();
    fd.append("resume", file);
    fd.append("jobTitle", formData.jobTitle);
    fd.append("companyName", formData.companyName);
    fd.append("jobDescription", formData.jobDescription);

    try {
      const res = await api.post("/checks/analyze", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Analysis complete!", { id: tid });
      setTimeout(() => navigate(`/report?id=${res.data.data.id}`), 1000);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Analysis failed. Try again.",
        { id: tid },
      );
    } finally {
      setAnalyzing(false);
    }
  };

  const isStep1Done = !!file;
  const isStep2Done = !!formData.jobTitle;
  const isStep3Done = jdWordCount >= 50;

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 animate-fade-in">
        {/* ══ PAGE HEADER ══ */}
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-primary/70 mb-2">
            AI Resume Analyzer
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-on-surface leading-none mb-3">
            Analyze Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Career Match
            </span>
          </h1>
          <p className="text-base text-on-surface-variant max-w-xl leading-relaxed">
            Upload your resume and paste a job description. Our AI will score
            your match, surface missing skills, and give you concrete
            improvements.
          </p>
        </div>

        {/* ══ STEP TRACKER ══ */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-10 p-5 rounded-2xl border border-white/[0.07] bg-white/[0.02]">
          <Step number="01" label="Upload Resume" done={isStep1Done} />
          <ChevronRight className="w-4 h-4 text-on-surface-variant/20 hidden sm:block" />
          <Step number="02" label="Job Details" done={isStep2Done} />
          <ChevronRight className="w-4 h-4 text-on-surface-variant/20 hidden sm:block" />
          <Step number="03" label="Job Description" done={isStep3Done} />
          <ChevronRight className="w-4 h-4 text-on-surface-variant/20 hidden sm:block" />
          <div className="flex items-center gap-3 ml-auto">
            <div className="w-7 h-7 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center">
              <Target className="w-4 h-4 text-on-surface-variant/40" />
            </div>
            <span className="text-sm font-semibold text-on-surface-variant/40">
              Generate Report
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* ══ LEFT COLUMN ══ */}
            <div className="lg:col-span-4 space-y-5">
              {/* Upload zone */}
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden">
                <div className="px-6 pt-6 pb-3 border-b border-white/[0.05]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center">
                      <Upload className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-on-surface leading-none mb-0.5">
                        Resume Upload
                      </h3>
                      <p className="text-xs text-on-surface-variant/50">
                        PDF or DOCX, max 5 MB
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOver(true);
                    }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    className={`relative rounded-xl border-2 border-dashed transition-all duration-300 ${
                      file
                        ? "border-emerald-500/30 bg-emerald-500/[0.05]"
                        : dragOver
                          ? "border-primary/50 bg-primary/[0.06]"
                          : "border-white/[0.08] hover:border-primary/30 hover:bg-primary/[0.03]"
                    }`}
                  >
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf,.docx"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="p-8 text-center">
                      {file ? (
                        <>
                          <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center">
                            <FileText className="w-6 h-6 text-emerald-400" />
                          </div>
                          <p className="text-sm font-bold text-emerald-400 truncate mb-1 px-2">
                            {file.name}
                          </p>
                          <p className="text-xs text-emerald-400/50 font-semibold">
                            Ready to analyze
                          </p>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setFile(null);
                            }}
                            className="relative z-20 mt-4 flex items-center gap-1.5 mx-auto text-xs font-semibold text-on-surface-variant/40 hover:text-red-400 transition-colors"
                          >
                            <X className="w-3.5 h-3.5" /> Remove
                          </button>
                        </>
                      ) : (
                        <>
                          <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-white/[0.05] flex items-center justify-center">
                            <Upload className="w-6 h-6 text-on-surface-variant/40" />
                          </div>
                          <p className="text-sm font-bold text-on-surface mb-1">
                            Drop your resume here
                          </p>
                          <p className="text-xs text-on-surface-variant/40 font-semibold">
                            or click to browse
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Job details */}
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden">
                <div className="px-6 pt-6 pb-3 border-b border-white/[0.05]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center">
                      <Briefcase className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-on-surface leading-none mb-0.5">
                        Job Details
                      </h3>
                      <p className="text-xs text-on-surface-variant/50">
                        Role &amp; company info
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-5 space-y-4">
                  <Input
                    label="Job Title"
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    placeholder="e.g. Senior Product Designer"
                    required
                  />
                  <Input
                    label="Company Name"
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="e.g. Google  (optional)"
                  />
                </div>
              </div>

              {/* Tips */}
              <div className="rounded-2xl border border-primary/15 bg-primary/[0.05] p-5 relative overflow-hidden">
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/10 blur-2xl rounded-full -mr-16 -mb-16 pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-xl bg-primary/20 border border-primary/20 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-primary" />
                    </div>
                    <h4 className="text-sm font-bold text-on-surface">
                      Quick Tips
                    </h4>
                  </div>
                  <ul className="space-y-3">
                    {[
                      "Use PDF for best formatting results",
                      "Paste the full job description",
                      "Match skill names exactly as listed",
                    ].map((tip, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-primary/60 mt-0.5 shrink-0" />
                        <span className="text-sm text-on-surface-variant leading-relaxed">
                          {tip}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* ══ RIGHT COLUMN ══ */}
            <div className="lg:col-span-8 space-y-5">
              {/* Job description panel */}
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden flex flex-col">
                <div className="px-6 pt-6 pb-3 border-b border-white/[0.05] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-on-surface leading-none mb-0.5">
                        Job Description
                      </h3>
                      <p className="text-xs text-on-surface-variant/50">
                        Paste the full posting
                      </p>
                    </div>
                  </div>
                  {/* word count pill */}
                  <div
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                      jdWordCount === 0
                        ? "bg-white/[0.03] border-white/[0.07] text-on-surface-variant/30"
                        : jdWordCount < 50
                          ? "bg-red-500/10 border-red-500/20 text-red-400"
                          : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                    }`}
                  >
                    {jdWordCount < 50 && jdWordCount > 0 && (
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                    )}
                    {jdWordCount >= 50 && (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    )}
                    {jdWordCount} {jdWordCount === 1 ? "word" : "words"}
                    {jdWordCount > 0 && jdWordCount < 50 && (
                      <span className="text-red-400/60 font-semibold">
                        {" "}
                        · need {50 - jdWordCount} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-5">
                  <Textarea
                    name="jobDescription"
                    value={formData.jobDescription}
                    onChange={handleInputChange}
                    rows={16}
                    placeholder="Paste the full job description here. Our AI performs best with complete postings that include responsibilities, qualifications, and required skills…"
                    required
                  />
                </div>
              </div>

              {/* CTA */}
              <button
                type="submit"
                disabled={analyzing}
                className={`w-full h-16 rounded-2xl text-base font-bold uppercase  transition-all duration-300 flex cursor-pointer items-center justify-center gap-3 shadow-xl ${
                  analyzing
                    ? "bg-primary/50 text-white/60 cursor-not-allowed"
                    : "bg-primary text-white hover:bg-primary/90 active:scale-[0.99] shadow-primary/25 hover:shadow-primary/40"
                }`}
              >
                {analyzing ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Analyzing Resume…
                  </>
                ) : (
                  <>
                    <Target className="w-5 h-5" />
                    Generate AI Report
                    <ChevronRight className="w-5 h-5 opacity-60" />
                  </>
                )}
              </button>

              {/* Privacy notice */}
              <div className="flex items-start gap-4 p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                <div className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/[0.07] flex items-center justify-center shrink-0">
                  <Lock className="w-4 h-4 text-on-surface-variant/50" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-on-surface mb-1">
                    Privacy First
                  </h4>
                  <p className="text-sm text-on-surface-variant/60 leading-relaxed">
                    Your resume and job data are encrypted end-to-end and never
                    used for model training or shared with third parties.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Analyze;
