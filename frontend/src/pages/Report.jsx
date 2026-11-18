import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ArrowLeft,
  Download,
  Share2,
  Building2,
  Calendar,
  Zap,
  Target,
  Sparkles,
  MessageSquare,
  Info,
  BarChart3,
  Lightbulb,
  Copy,
  Check,
  FileCheck,
  Plus,
} from "lucide-react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import api from "../api/axios";
import toast from "react-hot-toast";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import Tabs from "../components/ui/Tabs";
import { useTheme } from "../context/ThemeContext";

/* ─── Metric Progress Bar ───────────────────────────────────────────── */
const ScoreMetricBar = ({ label, value, color }) => (
  <div className="space-y-1.5 font-mono">
    <div className="flex justify-between items-center text-xs">
      <span className="text-slate-600 dark:text-slate-300 font-sans text-xs">{label}</span>
      <span className="font-bold text-slate-900 dark:text-slate-100">{value}%</span>
    </div>
    <div className="h-2 w-full bg-slate-200 dark:bg-white/[0.06] rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-700 ease-out"
        style={{ width: `${value}%`, backgroundColor: color }}
      />
    </div>
  </div>
);

/* ─── Quick Stat Pill ───────────────────────────────────────────────── */
const QuickStatPill = ({ label, value, colorClass, icon: Icon }) => (
  <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 dark:bg-[#090D16] dark:border-white/[0.08] transition-colors">
    {Icon && (
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${colorClass}`}>
        <Icon className="w-4 h-4" />
      </div>
    )}
    <div>
      <span className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-mono block leading-none">
        {value}
      </span>
      <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-1 block">
        {label}
      </span>
    </div>
  </div>
);

const Report = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const reportRef = useRef(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [copiedIndex, setCopiedIndex] = useState(null);

  const queryParams = new URLSearchParams(location.search);
  const reportId = queryParams.get("id");

  useEffect(() => {
    const fetchReport = async () => {
      if (!reportId) {
        setError("No report ID provided in URL parameters.");
        setLoading(false);
        return;
      }
      try {
        const res = await api.get(`checks/${reportId}`);
        setReport(res.data.data);
      } catch (err) {
        console.error("Failed to fetch report", err);
        setError(
          err.response?.data?.message ||
            "Unable to retrieve report. It may have been removed or requires re-authentication."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [reportId]);

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const downloadPdf = async () => {
    if (!reportRef.current) return;
    setIsGeneratingPdf(true);
    const toastId = toast.loading("Rendering printable PDF report…");
    try {
      await new Promise((r) => setTimeout(r, 600));
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: isDark ? "#080C14" : "#F8FAFC",
        windowWidth: 1200,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      const safeTitle = (report.jobTitle || "Report").replace(/[^a-zA-Z0-9]/g, "-");
      const date = new Date(report.createdAt).toISOString().split("T")[0];
      pdf.save(`ResumeIQ-ATS-Report-${safeTitle}-${date}.pdf`);
      toast.success("PDF Downloaded successfully!", { id: toastId });
    } catch (err) {
      console.error(err);
      toast.error("PDF generation failed. Please try again.", { id: toastId });
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  /* ── Loading State ── */
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <LoadingSpinner size="lg" color="primary" />
        <p className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400">
          Generating Comprehensive Dossier…
        </p>
      </div>
    );
  }

  /* ── Error State ── */
  if (error || !report) {
    return (
      <div className="max-w-lg mx-auto py-20 px-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 dark:bg-rose-500/15 dark:border-rose-500/30 dark:text-rose-400 flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Report Unavailable
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
          {error || "The requested analysis report could not be found."}
        </p>
        <div className="flex justify-center gap-3">
          <Button onClick={() => navigate("/dashboard")} variant="secondary">
            Back to Dashboard
          </Button>
          <Button onClick={() => navigate("/analyze")} variant="primary">
            Run New Analysis
          </Button>
        </div>
      </div>
    );
  }

  /* ── Data Mapping ── */
  const { overallScore, breakdown } = report.score;
  const {
    matchedSkills = [],
    missingSkills = [],
    matchedKeywords = [],
    missingKeywords = [],
    formatIssues = [],
    suggestions = [],
    aiFeedback = {},
  } = report.result || {};

  const radarData = [
    { subject: "Keywords", score: breakdown.keywordScore || 0, fullMark: 100 },
    { subject: "Skills", score: breakdown.skillScore || 0, fullMark: 100 },
    { subject: "Experience", score: breakdown.experienceScore || 0, fullMark: 100 },
    { subject: "Formatting", score: breakdown.formatScore || 0, fullMark: 100 },
    { subject: "Sections", score: breakdown.sectionScore || 0, fullMark: 100 },
    { subject: "Contact", score: breakdown.contactScore || 0, fullMark: 100 },
  ];

  const breakdownRows = [
    { label: "Keyword Density", value: breakdown.keywordScore || 0, color: "#6366F1" },
    { label: "Hard Skills Parity", value: breakdown.skillScore || 0, color: "#10B981" },
    { label: "Experience Alignment", value: breakdown.experienceScore || 0, color: "#0EA5E9" },
    { label: "Parser Formatting", value: breakdown.formatScore || 0, color: "#F59E0B" },
    { label: "Header Structure", value: breakdown.sectionScore || 0, color: "#8B5CF6" },
    { label: "Contact Information", value: breakdown.contactScore || 0, color: "#EC4899" },
  ];

  const getStatus = (s) => {
    if (s >= 80)
      return {
        label: "High Match",
        badge: "emerald",
        color: "#10B981",
        summary: "Excellent candidate profile. Meets major ATS screening thresholds.",
      };
    if (s >= 60)
      return {
        label: "Good Match",
        badge: "indigo",
        color: "#6366F1",
        summary: "Solid potential. Adding targeted missing keywords will guarantee callbacks.",
      };
    if (s >= 40)
      return {
        label: "Moderate Match",
        badge: "sky",
        color: "#0EA5E9",
        summary: "Partial alignment. Needs experience bullet optimization and skill additions.",
      };
    return {
      label: "Needs Work",
      badge: "rose",
      color: "#EF4444",
      summary: "High risk of ATS rejection. Major keyword gaps and missing core qualifications.",
    };
  };

  const status = getStatus(overallScore);
  const circ = 2 * Math.PI * 64;
  const strokeOffset = circ - (circ * overallScore) / 100;

  const tabs = [
    { id: "overview", label: "Overview & Matrix", icon: BarChart3 },
    {
      id: "skills",
      label: "Skills & Keywords",
      icon: Target,
      count: matchedSkills.length + missingSkills.length,
    },
    {
      id: "rewrites",
      label: "AI Rewrite Studio",
      icon: Sparkles,
      count: aiFeedback?.rewriteSuggestions?.length || 0,
    },
    {
      id: "audit",
      label: "Structure & Audit",
      icon: FileCheck,
      count: formatIssues.length,
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* ══ TOP ACTION BAR ══ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-white/[0.08]">
        <button
          onClick={() => navigate("/dashboard")}
          className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => navigate("/analyze")}
            variant="ghost"
            size="sm"
            className="text-xs gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            New Scan
          </Button>

          <Button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              toast.success("Report permalink copied to clipboard!");
            }}
            variant="secondary"
            size="sm"
            className="text-xs gap-1.5"
          >
            <Share2 className="w-3.5 h-3.5" />
            Share
          </Button>

          <Button
            onClick={downloadPdf}
            disabled={isGeneratingPdf}
            variant="primary"
            size="sm"
            className="text-xs gap-1.5 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            {isGeneratingPdf ? "Generating…" : "Export PDF"}
          </Button>
        </div>
      </div>

      {/* ══ PRINTABLE REPORT DOSSIER CONTAINER ══ */}
      <div ref={reportRef} className="space-y-8">
        {/* ── EXECUTIVE HERO DOSSIER ── */}
        <Card className="p-7 sm:p-10 bg-gradient-to-r from-white via-indigo-50/30 to-white dark:from-[#0F172A] dark:via-[#141C2E] dark:to-[#0F172A] border-slate-200 dark:border-white/[0.1] shadow-xl dark:shadow-2xl relative overflow-hidden transition-colors">
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 sm:gap-12 relative z-10">
            {/* Left: Score Gauge */}
            <div className="flex flex-col items-center shrink-0">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg width="144" height="144" className="-rotate-90">
                  <circle
                    cx="72"
                    cy="72"
                    r="64"
                    className="stroke-slate-200 dark:stroke-white/[0.08]"
                    strokeWidth="9"
                    fill="none"
                  />
                  <circle
                    cx="72"
                    cy="72"
                    r="64"
                    stroke={status.color}
                    strokeWidth="9"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={circ}
                    strokeDashoffset={strokeOffset}
                    style={{ transition: "stroke-dashoffset 1s ease" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center font-mono">
                  <span className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white leading-none">
                    {overallScore}
                  </span>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-1">
                    MATCH SCORE
                  </span>
                </div>
              </div>
              <Badge variant={status.badge} size="md" className="mt-3">
                {status.label}
              </Badge>
            </div>

            {/* Middle: Job Position & Summary */}
            <div className="flex-1 text-center lg:text-left space-y-3">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                <span className="text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider">
                  ATS AUDIT REPORT
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(report.createdAt).toLocaleDateString()}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                {report.jobTitle}
              </h1>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 flex items-center justify-center lg:justify-start gap-2">
                <Building2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  {report.companyName || "Target Employer"}
                </span>
              </p>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed pt-1">
                {status.summary}
              </p>

              {/* Quick Metrics Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100 dark:border-white/[0.08]">
                <QuickStatPill
                  label="Matched Skills"
                  value={matchedSkills.length}
                  colorClass="bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20"
                  icon={CheckCircle2}
                />
                <QuickStatPill
                  label="Missing Skills"
                  value={missingSkills.length}
                  colorClass="bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20"
                  icon={AlertTriangle}
                />
                <QuickStatPill
                  label="Keywords"
                  value={matchedKeywords.length}
                  colorClass="bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20"
                  icon={Target}
                />
                <QuickStatPill
                  label="Format Traps"
                  value={formatIssues.length}
                  colorClass={
                    formatIssues.length === 0
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20"
                      : "bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20"
                  }
                  icon={FileCheck}
                />
              </div>
            </div>
          </div>
        </Card>

        {/* ── TAB SEGMENTED NAVIGATION ── */}
        <div className="flex justify-center sm:justify-start">
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            onChange={setActiveTab}
            size="md"
          />
        </div>

        {/* ── TAB 1: OVERVIEW & PERFORMANCE MATRIX ── */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Radar Chart (Span 6) */}
              <Card className="lg:col-span-6 p-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                      Dimensional Performance Radar
                    </h3>
                    <Badge variant="indigo" size="sm">
                      6 Vectors
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-6">
                    Multi-dimensional algorithmic screening comparison against target role specifications.
                  </p>
                </div>

                <div className="h-[320px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                      <PolarGrid stroke={isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)"} />
                      <PolarAngleAxis
                        dataKey="subject"
                        tick={{
                          fill: isDark ? "#94A3B8" : "#475569",
                          fontSize: 11,
                          fontWeight: 600,
                          fontFamily: "Plus Jakarta Sans, sans-serif",
                        }}
                      />
                      <PolarRadiusAxis
                        angle={30}
                        domain={[0, 100]}
                        tick={false}
                        axisLine={false}
                      />
                      <Radar
                        name="Candidate Match"
                        dataKey="score"
                        stroke="#6366F1"
                        fill="#6366F1"
                        fillOpacity={0.25}
                        strokeWidth={2}
                      />
                      <Tooltip
                        contentStyle={
                          isDark
                            ? {
                                backgroundColor: "#0F172A",
                                borderColor: "rgba(255, 255, 255, 0.1)",
                                borderRadius: "12px",
                                color: "#F8FAFC",
                                fontSize: "12px",
                                fontFamily: "JetBrains Mono, monospace",
                              }
                            : {
                                backgroundColor: "#FFFFFF",
                                borderColor: "#E2E8F0",
                                borderRadius: "12px",
                                color: "#0F172A",
                                fontSize: "12px",
                                fontFamily: "JetBrains Mono, monospace",
                                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                              }
                        }
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Breakdown Metric Bars (Span 6) */}
              <Card className="lg:col-span-6 p-7 space-y-5">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight mb-1">
                    Heuristic Vector Breakdown
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
                    Individual scoring weights evaluated by enterprise ATS filters.
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  {breakdownRows.map((row, i) => (
                    <ScoreMetricBar
                      key={i}
                      label={row.label}
                      value={row.value}
                      color={row.color}
                    />
                  ))}
                </div>
              </Card>
            </div>

            {/* AI Executive Assessment Summary */}
            {aiFeedback?.overallFeedback && (
              <Card className="p-7 sm:p-8 bg-gradient-to-br from-white to-indigo-50/40 dark:from-[#0F172A] dark:to-[#141C2E] border-indigo-200 dark:border-indigo-500/25 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-600 dark:bg-indigo-500/15 dark:border-indigo-500/30 dark:text-indigo-400 flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      AI Strategic Executive Assessment
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Tailored diagnostic summary based on role requirements
                    </p>
                  </div>
                </div>

                <blockquote className="p-5 rounded-xl bg-slate-50 border border-slate-200 dark:bg-[#090D16] dark:border-white/[0.08] text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-sans mb-6 italic transition-colors">
                  "{aiFeedback.overallFeedback}"
                </blockquote>

                {aiFeedback.topIssues?.length > 0 && (
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-3">
                      Top Action Items for Immediate Fix:
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {aiFeedback.topIssues.map((issue, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 dark:bg-white/[0.02] dark:border-white/[0.06] transition-colors"
                        >
                          <span className="w-5 h-5 rounded bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          <span className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                            {issue}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            )}
          </div>
        )}

        {/* ── TAB 2: SKILLS & KEYWORDS ── */}
        {activeTab === "skills" && (
          <div className="space-y-8 animate-fade-in">
            {/* Technical Skills: Matched vs Missing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Matched Skills */}
              <Card className="p-7">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/[0.08] mb-5">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      Matched Skills
                    </h3>
                  </div>
                  <Badge variant="emerald" size="sm">
                    {matchedSkills.length} Detected
                  </Badge>
                </div>

                {matchedSkills.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {matchedSkills.map((s, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/25 text-xs font-mono font-semibold"
                      >
                        <Check className="w-3.5 h-3.5" />
                        {s}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                    No exact technical skill matches detected in resume text.
                  </p>
                )}
              </Card>

              {/* Missing Skills */}
              <Card className="p-7">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/[0.08] mb-5">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      Missing Target Skills
                    </h3>
                  </div>
                  <Badge variant="rose" size="sm">
                    {missingSkills.length} Missing
                  </Badge>
                </div>

                {missingSkills.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {missingSkills.map((s, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:border-rose-500/25 text-xs font-mono font-semibold"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        {s}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-400 font-semibold p-4 rounded-xl bg-emerald-50 border border-emerald-200 dark:bg-emerald-500/10 dark:border-emerald-500/20">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>All critical technical skills are present!</span>
                  </div>
                )}
              </Card>
            </div>

            {/* Keyword Density: Matched vs Missing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Keywords Detected */}
              <Card className="p-7">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/[0.08] mb-5">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      Keywords Found in Resume
                    </h3>
                  </div>
                  <Badge variant="indigo" size="sm">
                    {matchedKeywords.length} Found
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-2">
                  {matchedKeywords.map((kw, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700 dark:bg-white/[0.04] dark:border-white/[0.08] dark:text-slate-300 text-xs font-mono"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </Card>

              {/* Keywords to Add */}
              <Card className="p-7">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/[0.08] mb-5">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      Recommended Keywords to Add
                    </h3>
                  </div>
                  <Badge variant="amber" size="sm">
                    {missingKeywords.length} Recommended
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-2">
                  {missingKeywords.map((kw, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-700 dark:bg-amber-500/10 dark:border-amber-500/25 dark:text-amber-300 text-xs font-mono font-medium"
                    >
                      + {kw}
                    </span>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* ── TAB 3: AI REWRITE STUDIO ── */}
        {activeTab === "rewrites" && (
          <div className="space-y-6 animate-fade-in">
            <div className="p-6 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-indigo-500/20 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                  Google X-Y-Z Bullet Point Optimization Studio
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                  Replace passive task descriptions with quantified accomplishments: Accomplished [X], measured by [Y], by doing [Z].
                </p>
              </div>
              <Badge variant="indigo" size="md">
                {aiFeedback?.rewriteSuggestions?.length || 0} Blueprints Available
              </Badge>
            </div>

            {aiFeedback?.rewriteSuggestions?.length > 0 ? (
              <div className="space-y-6">
                {aiFeedback.rewriteSuggestions.map((item, idx) => (
                  <Card key={idx} className="p-6 sm:p-7 space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 pb-3 border-b border-slate-100 dark:border-white/[0.06]">
                      <span className="font-bold text-indigo-600 dark:text-indigo-400">
                        OPTIMIZATION BLUEPRINT #{idx + 1}
                      </span>
                      <button
                        onClick={() => copyToClipboard(item.improved, idx)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 dark:bg-indigo-500/10 dark:hover:bg-indigo-500/20 dark:text-indigo-300 dark:border-indigo-500/25 transition-colors cursor-pointer text-xs font-mono"
                      >
                        {copiedIndex === idx ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Improved Bullet</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {/* Original / Before */}
                      <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200 dark:bg-rose-500/[0.04] dark:border-rose-500/20 relative">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400 block mb-2">
                          ✗ Original Resume Bullet (Weak Impact)
                        </span>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans line-through opacity-85">
                          "{item.original}"
                        </p>
                      </div>

                      {/* Improved / After */}
                      <div className="p-4 rounded-xl bg-indigo-50/80 border border-indigo-200 dark:bg-indigo-500/[0.08] dark:border-indigo-500/30 relative">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 block mb-2">
                          ✓ AI Optimized (Quantified Result &amp; Keywords)
                        </span>
                        <p className="text-xs sm:text-sm text-slate-900 dark:text-white font-medium leading-relaxed font-sans">
                          "{item.improved}"
                        </p>
                      </div>
                    </div>

                    {item.reason && (
                      <div className="flex items-start gap-2 pt-2 text-xs text-slate-600 dark:text-slate-400 font-sans">
                        <Info className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-slate-800 dark:text-slate-300">Why this works: </strong>
                          {item.reason}
                        </span>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center text-slate-500 dark:text-slate-400 text-sm">
                No specific bullet rewrite suggestions generated for this scan.
              </Card>
            )}
          </div>
        )}

        {/* ── TAB 4: STRUCTURE & FORMATTING AUDIT ── */}
        {activeTab === "audit" && (
          <div className="space-y-8 animate-fade-in">
            {/* Format Traps Check */}
            <Card className="p-7">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/[0.08] mb-5">
                <div className="flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    ATS Format &amp; Parsing Integrity Check
                  </h3>
                </div>
                <Badge
                  variant={formatIssues.length === 0 ? "emerald" : "amber"}
                  size="sm"
                >
                  {formatIssues.length === 0
                    ? "100% Compliant"
                    : `${formatIssues.length} Formatting Traps Detected`}
                </Badge>
              </div>

              {formatIssues.length === 0 ? (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-300 text-sm font-semibold">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>
                    Your resume structure passed all standard parser guidelines (clear headings, single-column layout, and standard font encoding).
                  </span>
                </div>
              ) : (
                <ul className="space-y-3">
                  {formatIssues.map((issue, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-800 dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-200 leading-relaxed"
                    >
                      <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Card>

            {/* Section-by-section Feedback */}
            {aiFeedback?.sectionFeedback && (
              <Card className="p-7 space-y-5">
                <div className="pb-4 border-b border-slate-100 dark:border-white/[0.08]">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                    Section-by-Section Diagnostic Audit
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Neural evaluation of individual resume components.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(aiFeedback.sectionFeedback).map(([sec, text]) => (
                    <div
                      key={sec}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-200 dark:bg-[#090D16] dark:border-white/[0.06] space-y-1.5 transition-colors"
                    >
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block">
                        {sec} Section
                      </span>
                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Strategic Recommendations */}
            {suggestions.length > 0 && (
              <Card className="p-7 sm:p-8 bg-gradient-to-br from-white to-slate-50 border-slate-200 dark:from-[#0F172A] dark:to-[#141C2E] dark:border-white/[0.08] transition-colors">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-white/[0.08]">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-600 dark:bg-indigo-500/15 dark:border-indigo-500/30 dark:text-indigo-400 flex items-center justify-center">
                    <Lightbulb className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      Actionable Recommendations
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Step-by-step improvements to boost your ATS match score
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {suggestions.map((tip, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-100/80 border border-slate-200 dark:bg-white/[0.02] dark:border-white/[0.05] transition-colors"
                    >
                      <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                        {tip}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Report;
