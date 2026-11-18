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
  Search,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import api from "../api/axios";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import EmptyState from "../components/ui/EmptyState";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Modal from "../components/ui/Modal";
import Tabs from "../components/ui/Tabs";

/* ─── Circular Score Dial Component ─────────────────────────────────── */
const ScoreDial = ({ score, size = 56 }) => {
  const r = 22;
  const circ = 2 * Math.PI * r;
  const offset = circ - (circ * score) / 100;
  const color =
    score >= 80
      ? "#10B981" // Emerald
      : score >= 60
      ? "#6366F1" // Indigo
      : score >= 40
      ? "#0EA5E9" // Sky
      : "#EF4444"; // Rose

  return (
    <div className="relative shrink-0 flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          className="stroke-slate-200 dark:stroke-white/[0.08]"
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
          style={{ transition: "stroke-dashoffset 0.8s ease" }}
        />
      </svg>
      <span
        className="absolute inset-0 flex items-center justify-center text-xs font-extrabold font-mono"
        style={{ color }}
      >
        {score}
      </span>
    </div>
  );
};

/* ─── Score Bar Row ─────────────────────────────────────────────────── */
const BreakdownMiniBar = ({ label, value, color }) => (
  <div className="flex items-center gap-3 text-xs font-mono">
    <span className="text-slate-600 dark:text-slate-400 w-20 shrink-0 font-sans text-[11px] truncate">
      {label}
    </span>
    <div className="flex-1 h-1.5 bg-slate-200 dark:bg-white/[0.06] rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${value || 0}%`, backgroundColor: color }}
      />
    </div>
    <span className="text-[11px] font-bold w-8 text-right text-slate-800 dark:text-slate-200">
      {value || 0}%
    </span>
  </div>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Modal State for Delete
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await api.get("checks");
        setReports(res.data.data || []);
      } catch (err) {
        const msg = err.response?.data?.message || "Failed to load scan history.";
        setError(msg);
        toast.error(msg);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const confirmDelete = async () => {
    if (!deleteTargetId) return;
    setDeleting(true);
    const tid = toast.loading("Removing report…");
    try {
      await api.delete(`checks/${deleteTargetId}`);
      setReports((prev) => prev.filter((r) => r._id !== deleteTargetId));
      toast.success("Report deleted successfully.", { id: tid });
    } catch {
      toast.error("Failed to delete report.", { id: tid });
    } finally {
      setDeleting(false);
      setDeleteTargetId(null);
    }
  };

  const getScoreMeta = (s) => {
    if (s >= 80)
      return {
        label: "High Match",
        color: "emerald",
        textColor: "text-emerald-600 dark:text-emerald-400",
        borderColor: "border-emerald-500/30",
        badge: "emerald",
      };
    if (s >= 60)
      return {
        label: "Good Match",
        color: "indigo",
        textColor: "text-indigo-600 dark:text-indigo-400",
        borderColor: "border-indigo-500/30",
        badge: "indigo",
      };
    if (s >= 40)
      return {
        label: "Average",
        color: "sky",
        textColor: "text-sky-600 dark:text-sky-400",
        borderColor: "border-sky-500/30",
        badge: "sky",
      };
    return {
      label: "Needs Work",
      color: "rose",
      textColor: "text-rose-600 dark:text-rose-400",
      borderColor: "border-rose-500/30",
      badge: "rose",
    };
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <LoadingSpinner size="lg" color="primary" />
        <p className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400">
          Loading Candidate Dossiers…
        </p>
      </div>
    );
  }

  const avgScore = reports.length
    ? Math.round(
        reports.reduce((a, r) => a + (r.score?.overallScore || 0), 0) /
          reports.length
      )
    : 0;

  const topScore = reports.length
    ? Math.max(...reports.map((r) => r.score?.overallScore || 0))
    : 0;

  // Filtered reports
  const filtered = reports.filter((r) => {
    const matchesSearch =
      r.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.companyName &&
        r.companyName.toLowerCase().includes(searchQuery.toLowerCase()));

    const score = r.score?.overallScore || 0;
    if (!matchesSearch) return false;

    if (selectedFilter === "high") return score >= 80;
    if (selectedFilter === "average") return score >= 60 && score < 80;
    if (selectedFilter === "low") return score < 60;
    return true;
  });

  const filterTabs = [
    { id: "all", label: "All Scans", count: reports.length },
    {
      id: "high",
      label: "High Match (≥80%)",
      count: reports.filter((r) => (r.score?.overallScore || 0) >= 80).length,
    },
    {
      id: "average",
      label: "Average (60-79%)",
      count: reports.filter(
        (r) =>
          (r.score?.overallScore || 0) >= 60 &&
          (r.score?.overallScore || 0) < 80
      ).length,
    },
    {
      id: "low",
      label: "Needs Work (<60%)",
      count: reports.filter((r) => (r.score?.overallScore || 0) < 60).length,
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* ══ HEADER ══ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10B981]" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Candidate Command Center
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight font-sans">
            ATS Performance Overview
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Track your optimization trajectory across every job application.
          </p>
        </div>

        <Button
          onClick={() => navigate("/analyze")}
          variant="primary"
          size="md"
          className="self-start sm:self-auto gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Run New ATS Scan
        </Button>
      </div>

      {/* ══ BENCHMARK STAT CARDS ══ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[
          {
            label: "Total Scans",
            value: reports.length,
            unit: "",
            icon: FileText,
            color: "indigo",
            desc: "Resumes audited",
          },
          {
            label: "Portfolio Average",
            value: avgScore,
            unit: "%",
            icon: Target,
            color: avgScore >= 75 ? "emerald" : "indigo",
            desc: "Mean ATS score",
          },
          {
            label: "Top Performer",
            value: topScore,
            unit: "%",
            icon: TrendingUp,
            color: "emerald",
            desc: "Highest match rate",
          },
          {
            label: "Scan Quota",
            value: `${reports.length}/50`,
            unit: "",
            icon: Zap,
            color: "sky",
            desc: "Pro tier capacity",
          },
        ].map((s, i) => (
          <Card key={i} hover className="p-5 sm:p-6 relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {s.label}
                </span>
                <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 text-slate-600 dark:bg-white/[0.04] dark:border-white/[0.08] dark:text-slate-300 flex items-center justify-center">
                  <s.icon className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight">
                  {s.value}
                </span>
                {s.unit && (
                  <span className="text-lg font-bold text-slate-500 dark:text-slate-400">
                    {s.unit}
                  </span>
                )}
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-white/[0.06]">
              {s.desc}
            </p>
          </Card>
        ))}
      </div>

      {/* ══ LATEST AUDIT SHOWCASE (If reports exist) ══ */}
      {reports.length > 0 && reports[0]?.score?.breakdown && (
        <Card className="p-6 sm:p-8 bg-gradient-to-r from-white via-indigo-50/30 to-white dark:from-[#0F172A] dark:via-[#162032] dark:to-[#0F172A] border-slate-200 dark:border-white/[0.1] shadow-lg dark:shadow-2xl relative overflow-hidden transition-colors">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
            {/* Left: Score & Latest Role */}
            <div className="flex items-center gap-6">
              <ScoreDial score={reports[0].score.overallScore} size={84} />
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-300 dark:border-indigo-500/20 text-xs font-mono font-bold mb-1.5">
                  LATEST AUDIT
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                  {reports[0].jobTitle}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  {reports[0].companyName || "Target Employer"}
                </p>
              </div>
            </div>

            {/* Middle: Breakdown Bars */}
            <div className="w-full lg:w-96 space-y-2.5">
              <BreakdownMiniBar
                label="Keywords"
                value={reports[0].score.breakdown.keywordScore}
                color="#6366F1"
              />
              <BreakdownMiniBar
                label="Skills"
                value={reports[0].score.breakdown.skillScore}
                color="#10B981"
              />
              <BreakdownMiniBar
                label="Experience"
                value={reports[0].score.breakdown.experienceScore}
                color="#0EA5E9"
              />
              <BreakdownMiniBar
                label="Formatting"
                value={reports[0].score.breakdown.formatScore}
                color="#F59E0B"
              />
            </div>

            {/* Right: Quick Action */}
            <div className="self-end lg:self-center">
              <Button
                variant="primary"
                size="md"
                onClick={() => navigate(`/report?id=${reports[0]._id}`)}
                className="gap-2 shadow-sm"
              >
                Inspect Report
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* ══ TOOLBAR: SEARCH & TABS ══ */}
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <Tabs
            tabs={filterTabs}
            activeTab={selectedFilter}
            onChange={setSelectedFilter}
            size="sm"
          />

          <div className="relative w-full lg:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by role or company…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-[#0F172A] border border-slate-300 dark:border-white/[0.08] hover:border-slate-400 dark:hover:border-white/[0.15] focus:border-indigo-600 dark:focus:border-indigo-500 rounded-xl text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/15 dark:focus:ring-indigo-500/20 transition-all font-sans"
            />
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 dark:bg-rose-500/10 dark:border-rose-500/20 dark:text-rose-300 text-sm font-semibold">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* ══ REPORTS GRID ══ */}
        {reports.length === 0 ? (
          <EmptyState
            icon={FileText}
            title="No ATS Reports Generated Yet"
            description="Upload your resume and a target job description to run your first algorithmic compatibility scan."
            actionText="Start Your First Scan"
            onAction={() => navigate("/analyze")}
            actionIcon={Plus}
          />
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={Search}
            title="No Matching Reports Found"
            description={`No analysis matches the current query "${searchQuery}" or filter selection.`}
            actionText="Clear Filters"
            onAction={() => {
              setSearchQuery("");
              setSelectedFilter("all");
            }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((report) => {
              const overall = report.score?.overallScore || 0;
              const meta = getScoreMeta(overall);
              return (
                <Card
                  key={report._id}
                  hover
                  padding={false}
                  className="flex flex-col justify-between overflow-hidden group"
                >
                  <div className="p-6 space-y-5">
                    {/* Header Row */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <Badge variant={meta.badge} size="sm" className="mb-2">
                          {meta.label}
                        </Badge>
                        <h3
                          className="text-lg font-bold text-slate-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
                          title={report.jobTitle}
                        >
                          {report.jobTitle}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-1 truncate">
                          <Building2 className="w-3.5 h-3.5 shrink-0" />
                          {report.companyName || "Confidential"}
                        </p>
                      </div>

                      <ScoreDial score={overall} size={54} />
                    </div>

                    {/* Breakdown bars */}
                    <div className="space-y-2 py-3 border-y border-slate-100 dark:border-white/[0.06]">
                      <BreakdownMiniBar
                        label="Keywords"
                        value={report.score?.breakdown?.keywordScore}
                        color="#6366F1"
                      />
                      <BreakdownMiniBar
                        label="Skills"
                        value={report.score?.breakdown?.skillScore}
                        color="#10B981"
                      />
                      <BreakdownMiniBar
                        label="Experience"
                        value={report.score?.breakdown?.experienceScore}
                        color="#0EA5E9"
                      />
                    </div>

                    {/* Date stamp */}
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(report.createdAt).toLocaleDateString()}
                      </span>
                      <span className="text-slate-500 dark:text-slate-400 font-sans">
                        Score: <strong className="text-slate-800 dark:text-slate-200">{overall}%</strong>
                      </span>
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="flex items-center gap-2 p-3.5 bg-slate-50 border-t border-slate-100 dark:bg-[#090D16] dark:border-white/[0.06] transition-colors">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => navigate(`/report?id=${report._id}`)}
                      className="flex-1 text-xs gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      View Dossier
                    </Button>
                    <button
                      type="button"
                      onClick={() => setDeleteTargetId(report._id)}
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:text-rose-400 dark:hover:bg-rose-500/10 border border-transparent hover:border-rose-200 dark:hover:border-rose-500/20 transition-colors cursor-pointer"
                      title="Delete Report"
                      aria-label="Delete report"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* ══ DELETE CONFIRMATION MODAL ══ */}
      <Modal
        isOpen={!!deleteTargetId}
        onClose={() => setDeleteTargetId(null)}
        title="Delete Scan Report"
        description="Are you sure you want to delete this ATS analysis? This action cannot be undone and will permanently remove all breakdown metrics and AI rewrite suggestions."
        confirmText="Delete Report"
        confirmVariant="danger"
        onConfirm={confirmDelete}
        loading={deleting}
      />
    </div>
  );
};

export default Dashboard;
