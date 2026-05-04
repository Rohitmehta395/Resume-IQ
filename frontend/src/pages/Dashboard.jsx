import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Trash2,
  Eye,
  Calendar,
  Building2,
  Plus,
  AlertCircle,
  Zap,
  Target,
  Sparkles,
  History,
  Search,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import api from "../api/axios";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import EmptyState from "../components/ui/EmptyState";

/* ─── micro helpers ───────────────────────────────────────────────── */
const ScoreArc = ({ score, size = 56 }) => {
  const r = 22;
  const circ = 2 * Math.PI * r;
  const offset = circ - (circ * score) / 100;
  const color =
    score >= 80
      ? "#10b981"
      : score >= 60
        ? "#8b5cf6"
        : score >= 40
          ? "#0ea5e9"
          : "#ef4444";
  return (
    <svg
      width={size}
      height={size}
      className="-rotate-90"
      style={{ flexShrink: 0 }}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="3.5"
        fill="none"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke={color}
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        style={{ filter: `drop-shadow(0 0 5px ${color}50)` }}
      />
    </svg>
  );
};

const BarRow = ({ label, value, color }) => (
  <div className="flex items-center gap-3">
    <span className="text-xs font-semibold text-on-surface-variant/50 w-20 shrink-0">
      {label}
    </span>
    <div className="flex-1 h-1 bg-white/[0.06] rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${value}%`, backgroundColor: color }}
      />
    </div>
    <span className="text-xs font-bold w-8 text-right" style={{ color }}>
      {value}
    </span>
  </div>
);
/* ──────────────────────────────────────────────────────────────────── */

const Dashboard = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/checks");
        setReports(res.data.data);
      } catch (err) {
        const msg = err.response?.data?.message || "Failed to load history.";
        setError(msg);
        toast.error(msg);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this report? This cannot be undone.")) return;
    setDeletingId(id);
    const tid = toast.loading("Deleting…");
    try {
      await api.delete(`/checks/${id}`);
      setReports((prev) => prev.filter((r) => r._id !== id));
      toast.success("Deleted", { id: tid });
    } catch {
      toast.error("Failed to delete", { id: tid });
    } finally {
      setDeletingId(null);
    }
  };

  const getScoreMeta = (s) => {
    if (s >= 80)
      return {
        label: "Excellent",
        color: "#10b981",
        bg: "rgba(16,185,129,0.1)",
        border: "rgba(16,185,129,0.2)",
      };
    if (s >= 60)
      return {
        label: "High Match",
        color: "#8b5cf6",
        bg: "rgba(139,92,246,0.1)",
        border: "rgba(139,92,246,0.2)",
      };
    if (s >= 40)
      return {
        label: "Average",
        color: "#0ea5e9",
        bg: "rgba(14,165,233,0.1)",
        border: "rgba(14,165,233,0.2)",
      };
    return {
      label: "Needs Work",
      color: "#ef4444",
      bg: "rgba(239,68,68,0.1)",
      border: "rgba(239,68,68,0.2)",
    };
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <LoadingSpinner size="lg" />
        <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant/40">
          Loading…
        </p>
      </div>
    );
  }

  const avgScore = reports.length
    ? Math.round(
        reports.reduce((a, r) => a + r.score.overallScore, 0) / reports.length,
      )
    : 0;
  const topScore = reports.length
    ? Math.max(...reports.map((r) => r.score.overallScore))
    : 0;

  const filtered = reports.filter(
    (r) =>
      r.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.companyName &&
        r.companyName.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10 animate-fade-in">
        {/* ══ PAGE HEADER ══ */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary/70 mb-2">
              AI Career Accelerator
            </p>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-on-surface leading-none">
              Your Dashboard
            </h1>
          </div>
          <button
            onClick={() => navigate("/analyze")}
            className="self-start sm:self-auto flex items-center gap-2 px-5 py-3 rounded-2xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 active:scale-95 transition-all shadow-lg shadow-primary/25 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            New Analysis
          </button>
        </div>

        {/* ══ STAT CARDS ══ */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: "Total Reports",
              value: reports.length,
              unit: "",
              icon: FileText,
              color: "#0ea5e9",
            },
            {
              label: "Avg. Score",
              value: avgScore,
              unit: "%",
              icon: Target,
              color: "#10b981",
            },
            {
              label: "Top Score",
              value: topScore,
              unit: "%",
              icon: Sparkles,
              color: "#8b5cf6",
            },
            {
              label: "Credits Used",
              value: reports.length,
              unit: "/50",
              icon: Zap,
              color: "#f59e0b",
            },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 sm:p-6 relative overflow-hidden hover:border-white/[0.12] transition-all"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                style={{
                  backgroundColor: `${s.color}15`,
                  border: `1px solid ${s.color}25`,
                }}
              >
                <s.icon className="w-5 h-5" style={{ color: s.color }} />
              </div>
              <p className="text-4xl font-semibold tracking-tight text-on-surface leading-none mb-2">
                {s.value}
                <span className="text-xl font-bold text-on-surface-variant/40">
                  {s.unit}
                </span>
              </p>
              <p className="text-sm font-semibold text-on-surface-variant/60">
                {s.label}
              </p>
              <div
                className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-20"
                style={{ backgroundColor: s.color }}
              />
            </div>
          ))}
        </div>

        {/* ══ SCORE OVERVIEW BANNER ══ */}
        {reports.length > 0 && (
          <div
            className="rounded-3xl border border-white/[0.07] overflow-hidden relative"
            style={{
              background:
                "linear-gradient(135deg, rgba(139,92,246,0.08) 0%, rgba(11,19,38,0) 60%)",
            }}
          >
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
            <div className="relative z-10 p-7 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center gap-8 sm:gap-12">
              <div className="text-center sm:text-left shrink-0">
                <p className="text-7xl sm:text-8xl font-semibold tracking-tighter text-on-surface leading-none">
                  {avgScore}
                  <span className="text-4xl font-bold text-on-surface-variant/30">
                    {"  "}%
                  </span>
                </p>
                <p className="text-sm font-semibold text-on-surface-variant/50 mt-2">
                  Portfolio average
                </p>
              </div>

              <div className="w-px h-20 bg-white/[0.07] hidden sm:block" />

              <div className="flex-1 w-full space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant/40 mb-4">
                  Latest report breakdown
                </p>
                <BarRow
                  label="Keywords"
                  value={reports[0]?.score.breakdown.keywordScore}
                  color="#8b5cf6"
                />
                <BarRow
                  label="Skills"
                  value={reports[0]?.score.breakdown.skillScore}
                  color="#10b981"
                />
                <BarRow
                  label="Experience"
                  value={reports[0]?.score.breakdown.experienceScore}
                  color="#0ea5e9"
                />
                <BarRow
                  label="Formatting"
                  value={reports[0]?.score.breakdown.formatScore}
                  color="#f59e0b"
                />
              </div>

              <div className="hidden lg:flex flex-col items-end gap-2 shrink-0">
                <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant/30 mb-1">
                  Best match
                </p>
                <p
                  className="text-5xl font-black tracking-tighter"
                  style={{ color: "#10b981" }}
                >
                  {topScore}%
                </p>
                <div className="flex items-center gap-1.5 text-sm font-semibold text-emerald-400/70">
                  <TrendingUp className="w-3.5 h-3.5" />
                  Top performance
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══ REPORTS LIST ══ */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                <History className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-on-surface leading-none">
                  Analysis History
                </h2>
                {reports.length > 0 && (
                  <p className="text-sm text-on-surface-variant/50 mt-0.5">
                    {reports.length} report{reports.length !== 1 ? "s" : ""}
                  </p>
                )}
              </div>
            </div>

            {reports.length > 0 && (
              <div className="relative w-full sm:w-64 group">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/30 group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  placeholder="Search reports…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white/[0.04] border border-white/[0.07] rounded-xl text-sm text-on-surface placeholder:text-on-surface-variant/25 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                />
              </div>
            )}
          </div>

          {error && (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <p className="text-sm font-semibold text-red-400">{error}</p>
            </div>
          )}

          {reports.length === 0 ? (
            <EmptyState
              icon={FileText}
              title="No reports yet"
              description="Upload your resume and a job description to generate your first ATS performance report."
              actionText="Run First Analysis"
              onAction={() => navigate("/analyze")}
            />
          ) : filtered.length === 0 ? (
            <EmptyState
              icon={Search}
              title="Nothing found"
              description={`No reports match "${searchQuery}".`}
              actionText="Clear Search"
              onAction={() => setSearchQuery("")}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((report) => {
                const meta = getScoreMeta(report.score.overallScore);
                return (
                  <div
                    key={report._id}
                    className="group flex flex-col rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden hover:border-white/[0.13] hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <div
                      className="h-[3px]"
                      style={{ backgroundColor: meta.color, opacity: 0.7 }}
                    />

                    <div className="p-6 flex-1 space-y-5">
                      {/* title row */}
                      <div className="flex items-start gap-4">
                        <div className="relative shrink-0">
                          <ScoreArc
                            score={report.score.overallScore}
                            size={56}
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span
                              className="text-[13px] font-black"
                              style={{ color: meta.color }}
                            >
                              {report.score.overallScore}
                            </span>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0 pt-0.5">
                          <h3
                            className="text-base font-bold text-on-surface truncate group-hover:text-primary transition-colors leading-snug mb-1"
                            title={report.jobTitle}
                          >
                            {report.jobTitle}
                          </h3>
                          <p className="text-sm text-on-surface-variant/50 flex items-center gap-1.5 truncate">
                            <Building2 className="w-3.5 h-3.5 shrink-0" />
                            {report.companyName || "Confidential"}
                          </p>
                        </div>
                      </div>

                      {/* mini bars */}
                      <div className="space-y-2.5 py-4 border-y border-white/[0.05]">
                        <BarRow
                          label="Keywords"
                          value={report.score.breakdown.keywordScore}
                          color="#8b5cf6"
                        />
                        <BarRow
                          label="Skills"
                          value={report.score.breakdown.skillScore}
                          color="#10b981"
                        />
                        <BarRow
                          label="Experience"
                          value={report.score.breakdown.experienceScore}
                          color="#0ea5e9"
                        />
                      </div>

                      {/* status + date */}
                      <div className="flex items-center justify-between">
                        <span
                          className="text-xs font-bold px-3 py-1 rounded-lg border"
                          style={{
                            color: meta.color,
                            borderColor: meta.border,
                            backgroundColor: meta.bg,
                          }}
                        >
                          {meta.label}
                        </span>
                        <span className="text-xs text-on-surface-variant/40 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(report.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* footer actions */}
                    <div className="flex items-center gap-2 px-4 py-3 border-t border-white/[0.05] bg-white/[0.02]">
                      <button
                        onClick={() => navigate(`/report?id=${report._id}`)}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.07] text-sm font-semibold text-on-surface-variant hover:bg-white/[0.09] hover:text-on-surface hover:border-white/[0.12] transition-all group/btn"
                      >
                        <Eye className="w-4 h-4" />
                        View Report
                        <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover/btn:opacity-60 transition-opacity" />
                      </button>
                      <button
                        onClick={() => handleDelete(report._id)}
                        disabled={deletingId === report._id}
                        className="flex items-center justify-center w-10 h-10 rounded-xl border border-white/[0.06] text-on-surface-variant/30 hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-400 transition-all disabled:opacity-40"
                      >
                        {deletingId === report._id ? (
                          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* footer */}
        <div className="pt-6 border-t border-white/[0.05] flex items-center justify-center gap-3 text-xs font-semibold text-on-surface-variant/20">
          <Sparkles className="w-3.5 h-3.5" />
          ResumeMatch AI Intelligence Engine
          <Sparkles className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
