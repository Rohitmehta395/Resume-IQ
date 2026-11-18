import { useState } from "react";
import {
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Button from "../ui/Button";

const Hero = ({ onStart }) => {
  const [activeTab, setActiveTab] = useState("after"); // 'before' | 'after'

  return (
    <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-slate-50 dark:bg-[#080C14] transition-colors">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-gradient-to-b from-indigo-200/50 via-sky-100/30 to-transparent dark:from-indigo-500/10 dark:via-sky-500/5 dark:to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Left Column: Heading & Value Proposition */}
          <div className="flex-1 text-center lg:text-left z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 dark:bg-indigo-500/10 dark:border-indigo-500/25 mb-6 animate-fade-in shadow-xs">
              <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 font-mono">
                ATS Screening Intelligence 2026
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-6 font-sans">
              Bypass the ATS algorithm.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-sky-600 to-emerald-600 dark:from-indigo-400 dark:via-sky-400 dark:to-emerald-400">
                Land more interviews.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              75% of resumes are discarded before a human recruiter ever sees them.
              ResumeIQ simulates enterprise ATS screening engines, uncovers hidden keyword gaps, and rewrites weak bullets into interview-winning achievements.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
              <Button
                size="lg"
                onClick={onStart}
                className="w-full sm:w-auto h-13 px-8 text-sm font-bold uppercase tracking-wider shadow-md shadow-indigo-600/25"
              >
                Scan Your Resume Free
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
              <Button
                size="lg"
                variant="secondary"
                onClick={() =>
                  document
                    .getElementById("how-it-works")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="w-full sm:w-auto h-13 px-6 text-sm font-bold shadow-xs"
              >
                See How It Works
              </Button>
            </div>

            {/* Trust Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-200 dark:border-white/[0.08] text-left">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
                  3.4x
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                  Interview Rate
                </p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
                  &lt;30s
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                  Full ATS Audit
                </p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
                  100%
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                  Data Privacy
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive ATS Simulator Terminal */}
          <div className="flex-1 w-full max-w-lg lg:max-w-xl animate-fade-in">
            <div className="rounded-2xl border border-slate-200 dark:border-white/[0.12] bg-white dark:bg-[#0F172A] shadow-xl dark:shadow-2xl dark:shadow-black/80 overflow-hidden transition-colors">
              {/* Terminal Titlebar */}
              <div className="px-5 py-3.5 bg-slate-100 dark:bg-[#162032] border-b border-slate-200 dark:border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-mono text-slate-600 dark:text-slate-400 font-semibold ml-2">
                    ResumeIQ // ATS Engine Simulator
                  </span>
                </div>

                {/* State Toggle Tabs */}
                <div className="flex items-center gap-1 bg-slate-200/80 dark:bg-[#090D16] p-1 rounded-lg border border-slate-300 dark:border-white/[0.08]">
                  <button
                    onClick={() => setActiveTab("before")}
                    className={`px-2.5 py-1 text-xs font-mono font-semibold rounded transition-colors cursor-pointer ${
                      activeTab === "before"
                        ? "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300 border border-rose-300 dark:border-rose-500/30"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    Raw Resume
                  </button>
                  <button
                    onClick={() => setActiveTab("after")}
                    className={`px-2.5 py-1 text-xs font-mono font-semibold rounded transition-colors cursor-pointer ${
                      activeTab === "after"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    Optimized
                  </button>
                </div>
              </div>

              {/* Terminal Body */}
              <div className="p-6 space-y-6">
                {/* Score Dial & Match Status */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-[#090D16] border border-slate-200 dark:border-white/[0.06]">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                      Target Role // Senior Software Engineer
                    </span>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      Google / Stripe ATS Benchmark
                    </h4>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-extrabold font-mono text-slate-900 dark:text-white flex items-baseline justify-end gap-1">
                      <span
                        className={
                          activeTab === "after"
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-rose-600 dark:text-rose-400"
                        }
                      >
                        {activeTab === "after" ? "91" : "54"}
                      </span>
                      <span className="text-sm font-semibold text-slate-400">
                        /100
                      </span>
                    </div>
                    <span
                      className={`text-[10px] font-mono font-extrabold uppercase px-2 py-0.5 rounded border ${
                        activeTab === "after"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/20"
                          : "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:border-rose-500/20"
                      }`}
                    >
                      {activeTab === "after" ? "HIGH MATCH (PASS)" : "SCREENED OUT (FAIL)"}
                    </span>
                  </div>
                </div>

                {/* Real-time Keyword Breakdown */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                    Core Competency Breakdown
                  </span>
                  
                  <div className="space-y-2">
                    {[
                      {
                        label: "System Design & Architecture",
                        before: 40,
                        after: 95,
                        color: "bg-indigo-600 dark:bg-indigo-500",
                      },
                      {
                        label: "React, TypeScript & Next.js",
                        before: 65,
                        after: 100,
                        color: "bg-sky-600 dark:bg-sky-500",
                      },
                      {
                        label: "High-Scale Distributed Systems",
                        before: 30,
                        after: 88,
                        color: "bg-emerald-600 dark:bg-emerald-500",
                      },
                    ].map((row, i) => {
                      const val = activeTab === "after" ? row.after : row.before;
                      return (
                        <div key={i} className="space-y-1">
                          <div className="flex justify-between text-xs font-mono">
                            <span className="text-slate-600 dark:text-slate-400">{row.label}</span>
                            <span className="font-bold text-slate-800 dark:text-slate-200">{val}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-200 dark:bg-white/[0.06] rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${row.color}`}
                              style={{ width: `${val}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Sample Bullet Diff */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#090D16] border border-slate-200 dark:border-white/[0.06]">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                    {activeTab === "after"
                      ? "✓ AI Executive Rewrite (Quantified Impact):"
                      : "✗ Original Bullet (Lacks Metric & Keywords):"}
                  </span>
                  <p
                    className={`text-xs leading-relaxed font-sans ${
                      activeTab === "after"
                        ? "text-slate-900 dark:text-slate-100 font-medium"
                        : "text-slate-400 line-through"
                    }`}
                  >
                    {activeTab === "after"
                      ? "• Architected microservices with React & Node.js, reducing API p99 latency by 38% and supporting 1.2M daily active requests with 99.98% uptime."
                      : "• Worked on frontend features and helped the backend team improve API speed and fix bugs in our web application."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
