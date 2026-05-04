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
  TrendingUp,
  FileText,
  Award,
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
import PageHeader from "../components/ui/PageHeader";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import Footer from "../components/landing/Footer";

/* ─────────────────────────── tiny helpers ─────────────────────────── */
const ScoreBar = ({ value, color = "#8b5cf6" }) => (
  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
    <div
      className="h-full rounded-full transition-all duration-1000 ease-out"
      style={{ width: `${value}%`, backgroundColor: color }}
    />
  </div>
);

const StatPill = ({ label, value, accent }) => (
  <div className="flex flex-col gap-1.5 min-w-[80px]">
    <span
      className="text-3xl font-black tracking-tighter"
      style={{ color: accent }}
    >
      {value}
    </span>
    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">
      {label}
    </span>
  </div>
);

const SectionLabel = ({ children }) => (
  <p className="text-[9px] font-black uppercase tracking-[0.25em] text-on-surface-variant/35 mb-5 flex items-center gap-2">
    <span className="w-4 h-px bg-current inline-block" />
    {children}
  </p>
);
/* ─────────────────────────────────────────────────────────────────── */

const Report = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const reportRef = useRef(null);

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const queryParams = new URLSearchParams(location.search);
  const reportId = queryParams.get("id");

  useEffect(() => {
    const fetchReport = async () => {
      if (!reportId) {
        setError("No report ID provided");
        setLoading(false);
        return;
      }
      try {
        const res = await api.get(`/checks/${reportId}`);
        setReport(res.data.data);
      } catch (err) {
        console.error("Failed to fetch report", err);
        setError(
          "Failed to load the report. It might not exist or you might not have permission.",
        );
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [reportId]);

  const downloadPdf = async () => {
    if (!reportRef.current) return;
    setIsGeneratingPdf(true);
    const toastId = toast.loading("Preparing PDF…");
    try {
      await new Promise((r) => setTimeout(r, 800));
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#0b1326",
        windowWidth: 1200,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      const date = new Date(report.createdAt).toISOString().split("T")[0];
      pdf.save(
        `ATS-Report-${report.jobTitle.replace(/\s+/g, "-")}-${date}.pdf`,
      );
      toast.success("Downloaded!", { id: toastId });
    } catch {
      toast.error("PDF failed. Try again.", { id: toastId });
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  /* ── loading ─────────────────────────────────────────────── */
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-surface gap-4">
        <LoadingSpinner size="lg" />
        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-on-surface-variant/40">
          Loading Report
        </p>
      </div>
    );
  }

  /* ── error ───────────────────────────────────────────────── */
  if (error || !report) {
    return (
      <div className="max-w-lg mx-auto py-24 px-4">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto">
            <XCircle className="w-8 h-8 text-red-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-on-surface mb-2">
              Report Unavailable
            </h2>
            <p className="text-sm text-on-surface-variant">
              {error || "This report could not be retrieved."}
            </p>
          </div>
          <Button onClick={() => navigate("/analyze")} icon={ArrowLeft}>
            Back to Analyze
          </Button>
        </div>
      </div>
    );
  }

  /* ── data ────────────────────────────────────────────────── */
  const { overallScore, breakdown } = report.score;
  const {
    matchedSkills,
    missingSkills,
    matchedKeywords,
    missingKeywords,
    formatIssues,
    suggestions,
    aiFeedback,
  } = report.result;

  const radarData = [
    { subject: "Keywords", A: breakdown.keywordScore, fullMark: 100 },
    { subject: "Skills", A: breakdown.skillScore, fullMark: 100 },
    { subject: "Experience", A: breakdown.experienceScore, fullMark: 100 },
    { subject: "Formatting", A: breakdown.formatScore, fullMark: 100 },
    { subject: "Sections", A: breakdown.sectionScore, fullMark: 100 },
    { subject: "Contact", A: breakdown.contactScore, fullMark: 100 },
  ];

  const breakdownRows = [
    { label: "Keywords", value: breakdown.keywordScore, color: "#8b5cf6" },
    { label: "Skills", value: breakdown.skillScore, color: "#06b6d4" },
    { label: "Experience", value: breakdown.experienceScore, color: "#a78bfa" },
    { label: "Formatting", value: breakdown.formatScore, color: "#10b981" },
    { label: "Sections", value: breakdown.sectionScore, color: "#f59e0b" },
    { label: "Contact", value: breakdown.contactScore, color: "#ec4899" },
  ];

  const getStatus = (s) => {
    if (s >= 80)
      return { label: "Excellent", color: "#10b981", ring: "#10b981" };
    if (s >= 60) return { label: "Good", color: "#8b5cf6", ring: "#8b5cf6" };
    if (s >= 40) return { label: "Average", color: "#0ea5e9", ring: "#0ea5e9" };
    return { label: "Needs Work", color: "#ef4444", ring: "#ef4444" };
  };

  const status = getStatus(overallScore);

  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (circumference * overallScore) / 100;

  /* ── render ──────────────────────────────────────────────── */
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 bg-surface animate-fade-in">
      {/* ── Top action bar ── */}
      <div className="flex items-center justify-between mb-10">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-on-surface-variant/50 hover:text-on-surface transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Dashboard
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={downloadPdf}
            disabled={isGeneratingPdf}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[11px] font-black uppercase tracking-[0.15em] text-on-surface-variant hover:bg-white/10 hover:text-on-surface transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            {isGeneratingPdf ? "Generating…" : "Export PDF"}
          </button>
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              toast.success("Link copied!");
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/15 border border-primary/25 text-[11px] font-black uppercase tracking-[0.15em] text-primary hover:bg-primary/25 transition-all"
          >
            <Share2 className="w-3.5 h-3.5" />
            Share
          </button>
        </div>
      </div>

      <div ref={reportRef} className="space-y-6">
        {/* ── Hero banner ── */}
        <div className="relative rounded-3xl overflow-hidden border border-white/[0.06] bg-gradient-to-br from-surface-variant to-surface">
          {/* background grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.4) 1px,transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          {/* glow orb */}
          <div
            className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-20 blur-3xl"
            style={{ backgroundColor: status.color }}
          />

          <div className="relative z-10 p-8 sm:p-12 flex flex-col sm:flex-row items-start sm:items-center gap-10">
            {/* score ring */}
            <div className="relative shrink-0">
              <svg width="140" height="140" className="-rotate-90">
                <circle
                  cx="70"
                  cy="70"
                  r="54"
                  stroke="rgba(255,255,255,0.04)"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="70"
                  cy="70"
                  r="54"
                  stroke={status.ring}
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  style={{
                    filter: `drop-shadow(0 0 8px ${status.ring}60)`,
                    transition:
                      "stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)",
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black tracking-tighter text-on-surface">
                  {overallScore}
                  <span className="text-xl text-on-surface-variant/40">%</span>
                </span>
              </div>
            </div>

            {/* job meta + quick stats */}
            <div className="flex-1 space-y-5">
              <div>
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border mb-3"
                  style={{
                    color: status.color,
                    borderColor: `${status.color}30`,
                    backgroundColor: `${status.color}12`,
                  }}
                >
                  <Award className="w-3 h-3" />
                  {status.label} Match
                </div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-on-surface leading-none mb-1">
                  {report.jobTitle}
                </h1>
                <p className="text-sm text-on-surface-variant flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-primary/60" />
                  {report.companyName || "Confidential"}
                  <span className="w-1 h-1 rounded-full bg-white/20 inline-block" />
                  <Calendar className="w-3.5 h-3.5 text-on-surface-variant/40" />
                  {new Date(report.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* quick stats row */}
              <div className="flex flex-wrap gap-8 pt-4 border-t border-white/5">
                <StatPill
                  label="Matched Skills"
                  value={matchedSkills.length}
                  accent="#10b981"
                />
                <StatPill
                  label="Missing Skills"
                  value={missingSkills.length}
                  accent="#ef4444"
                />
                <StatPill
                  label="Keywords Found"
                  value={matchedKeywords.length}
                  accent="#8b5cf6"
                />
                <StatPill
                  label="Format Issues"
                  value={formatIssues.length}
                  accent={formatIssues.length === 0 ? "#10b981" : "#f59e0b"}
                />
              </div>
            </div>

            {/* inline breakdown bars */}
            <div className="hidden lg:block shrink-0 w-52 space-y-3">
              <SectionLabel>Score Breakdown</SectionLabel>
              {breakdownRows.map((r) => (
                <div key={r.label} className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-on-surface-variant/60">
                      {r.label}
                    </span>
                    <span
                      className="text-[10px] font-black"
                      style={{ color: r.color }}
                    >
                      {r.value}
                    </span>
                  </div>
                  <ScoreBar value={r.value} color={r.color} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Row 2: radar + AI feedback ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Radar */}
          <div className="lg:col-span-2 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
            <SectionLabel>Dimensional Matrix</SectionLabel>
            <h3 className="text-base font-bold text-on-surface mb-6">
              Performance Radar
            </h3>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart
                  cx="50%"
                  cy="50%"
                  outerRadius="75%"
                  data={radarData}
                >
                  <PolarGrid stroke="rgba(255,255,255,0.05)" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{
                      fill: "rgba(203,195,215,0.5)",
                      fontSize: 9,
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  />
                  <PolarRadiusAxis
                    angle={30}
                    domain={[0, 100]}
                    tick={false}
                    axisLine={false}
                  />
                  <Radar
                    name="Score"
                    dataKey="A"
                    stroke="#8b5cf6"
                    fill="#8b5cf6"
                    fillOpacity={0.15}
                    strokeWidth={2}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(11,19,38,0.95)",
                      borderRadius: "12px",
                      border: "1px solid rgba(255,255,255,0.08)",
                      backdropFilter: "blur(12px)",
                      color: "#dae2fd",
                      fontWeight: "bold",
                      fontSize: "12px",
                    }}
                    itemStyle={{ color: "#8b5cf6" }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* mobile breakdown (hidden on lg+) */}
            <div className="lg:hidden mt-6 pt-6 border-t border-white/5 space-y-3">
              <SectionLabel>Score Breakdown</SectionLabel>
              {breakdownRows.map((r) => (
                <div key={r.label} className="space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-[10px] font-bold text-on-surface-variant/60">
                      {r.label}
                    </span>
                    <span
                      className="text-[10px] font-black"
                      style={{ color: r.color }}
                    >
                      {r.value}
                    </span>
                  </div>
                  <ScoreBar value={r.value} color={r.color} />
                </div>
              ))}
            </div>
          </div>

          {/* AI Feedback */}
          {aiFeedback && (
            <div className="lg:col-span-3 rounded-2xl border border-primary/20 bg-primary/[0.05] p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full -mr-32 -mt-32 pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/20 rounded-xl border border-primary/20">
                    <Sparkles className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <SectionLabel>AI Strategic Analysis</SectionLabel>
                    <h3 className="text-base font-bold text-on-surface -mt-3">
                      Executive Summary
                    </h3>
                  </div>
                </div>

                <blockquote className="text-sm text-on-surface leading-relaxed border-l-2 border-primary/40 pl-5 py-1 mb-8 italic bg-primary/5 rounded-r-xl pr-4">
                  "{aiFeedback.overallFeedback}"
                </blockquote>

                <div className="space-y-3">
                  <SectionLabel>Critical Issues</SectionLabel>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {aiFeedback.topIssues.map((issue, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:border-white/15 transition-colors group"
                      >
                        <span className="w-5 h-5 shrink-0 rounded-lg bg-primary/20 text-primary text-[9px] font-black flex items-center justify-center mt-0.5">
                          {i + 1}
                        </span>
                        <p className="text-xs text-on-surface-variant group-hover:text-on-surface transition-colors leading-relaxed">
                          {issue}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Row 3: Skills + Keywords (2/3) | Side panel (1/3) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2/3 */}
          <div className="lg:col-span-2 space-y-6">
            {/* Skills card */}
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-white/5 rounded-xl border border-white/[0.08]">
                  <Target className="w-4 h-4 text-secondary" />
                </div>
                <div>
                  <SectionLabel>Skills Mapping</SectionLabel>
                  <h3 className="text-base font-bold text-on-surface -mt-3">
                    Technical Synchronization
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* matched */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-400">
                      ✓ Matched
                    </span>
                    <span className="text-[9px] font-black text-on-surface-variant/30 uppercase">
                      {matchedSkills.length}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {matchedSkills.map((s) => (
                      <span
                        key={s}
                        className="text-[11px] font-bold text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg"
                      >
                        {s}
                      </span>
                    ))}
                    {matchedSkills.length === 0 && (
                      <p className="text-xs text-on-surface-variant/40 italic">
                        No matches found.
                      </p>
                    )}
                  </div>
                </div>

                {/* missing */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-red-400">
                      ✗ Missing
                    </span>
                    <span className="text-[9px] font-black text-on-surface-variant/30 uppercase">
                      {missingSkills.length}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {missingSkills.map((s) => (
                      <span
                        key={s}
                        className="text-[11px] font-bold text-red-300 bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded-lg"
                      >
                        {s}
                      </span>
                    ))}
                    {missingSkills.length === 0 && (
                      <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="text-xs font-bold text-emerald-400">
                          Full skill parity
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Keywords card */}
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-white/5 rounded-xl border border-white/[0.08]">
                  <MessageSquare className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <SectionLabel>Semantic Analysis</SectionLabel>
                  <h3 className="text-base font-bold text-on-surface -mt-3">
                    Keyword Coverage
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981]" />
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">
                      Detected in Resume
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {matchedKeywords.map((kw) => (
                      <span
                        key={kw}
                        className="text-[11px] font-semibold text-on-surface bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 rounded-lg hover:border-primary/30 hover:text-on-surface transition-colors"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_6px_#f59e0b]" />
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">
                      Suggested to Add
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {missingKeywords.map((kw) => (
                      <span
                        key={kw}
                        className="text-[11px] font-semibold text-on-surface-variant/50 bg-white/[0.02] border border-white/[0.05] px-2.5 py-1 rounded-lg hover:text-on-surface hover:border-amber-400/20 transition-colors"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Rewrite suggestions */}
            {aiFeedback?.rewriteSuggestions?.length > 0 && (
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-white/5 rounded-xl border border-white/[0.08]">
                    <Zap className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <SectionLabel>AI Rewrites</SectionLabel>
                    <h3 className="text-base font-bold text-on-surface -mt-3">
                      Optimization Blueprints
                    </h3>
                  </div>
                </div>
                <div className="space-y-4">
                  {aiFeedback.rewriteSuggestions.map((s, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-1 md:grid-cols-2 gap-3"
                    >
                      <div className="p-4 rounded-xl bg-red-500/[0.06] border border-red-500/15 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-0.5 h-full bg-red-500/40" />
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-red-400 block mb-2">
                          Before
                        </span>
                        <p className="text-xs text-on-surface-variant italic leading-relaxed">
                          "{s.original}"
                        </p>
                      </div>
                      <div className="p-4 rounded-xl bg-primary/[0.08] border border-primary/20 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-0.5 h-full bg-primary" />
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary block mb-2">
                          Optimized
                        </span>
                        <p className="text-xs text-on-surface font-semibold leading-relaxed mb-3">
                          "{s.improved}"
                        </p>
                        <div className="flex items-start gap-2 pt-3 border-t border-white/[0.06]">
                          <Info className="w-3 h-3 text-primary/60 shrink-0 mt-0.5" />
                          <p className="text-[10px] text-on-surface-variant/50 leading-relaxed">
                            {s.reason}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right 1/3 sidebar */}
          <div className="space-y-6">
            {/* Section feedback */}
            {aiFeedback?.sectionFeedback && (
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
                <SectionLabel>Section Audit</SectionLabel>
                <h3 className="text-base font-bold text-on-surface mb-5 -mt-2">
                  Neural Review
                </h3>
                <div className="space-y-3">
                  {Object.entries(aiFeedback.sectionFeedback).map(
                    ([key, val]) => (
                      <div
                        key={key}
                        className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/10 transition-colors"
                      >
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-secondary block mb-1.5">
                          {key}
                        </span>
                        <p className="text-xs text-on-surface-variant leading-relaxed">
                          {val}
                        </p>
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}

            {/* Format issues */}
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
              <div className="flex items-center gap-2 mb-5">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <SectionLabel>Formatting</SectionLabel>
              </div>
              <h3 className="text-base font-bold text-on-surface mb-5 -mt-4">
                Structure Audit
              </h3>
              {formatIssues.length === 0 ? (
                <div className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs font-bold text-emerald-400">
                    ATS-Optimized Structure
                  </span>
                </div>
              ) : (
                <ul className="space-y-3">
                  {formatIssues.map((issue, i) => (
                    <li key={i} className="flex items-start gap-3 group">
                      <span className="w-1 h-1 rounded-full bg-red-400/60 mt-2 shrink-0 group-hover:bg-red-400 transition-colors" />
                      <span className="text-xs text-on-surface-variant group-hover:text-on-surface transition-colors leading-relaxed">
                        {issue}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Tips - Now Full Width */}
        <div className="rounded-3xl border border-primary/15 bg-primary/[0.04] p-8 sm:p-10 relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/10 blur-3xl rounded-full -mr-40 -mb-40 pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/20 rounded-xl border border-primary/20">
                <Lightbulb className="w-4 h-4 text-primary" />
              </div>
              <div>
                <SectionLabel>Recommendations</SectionLabel>
                <h3 className="text-xl font-bold text-on-surface -mt-3">
                  Expert Strategy & Tips
                </h3>
              </div>
            </div>
            <ol className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {suggestions.map((tip, i) => (
                <li
                  key={i}
                  className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] hover:border-white/10 transition-all group"
                >
                  <span className="w-7 h-7 rounded-lg bg-primary text-white text-xs font-black flex items-center justify-center shrink-0 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                    {i + 1}
                  </span>
                  <p className="text-[13px] text-on-surface-variant leading-relaxed group-hover:text-on-surface transition-colors">
                    {tip}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
      </div>
  );
};

export default Report;
