import {
  Target,
  Sparkles,
  BarChart3,
  FileSearch,
} from "lucide-react";
import Card from "../ui/Card";
import Badge from "../ui/Badge";

const Features = () => {
  return (
    <section id="features" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-[#090D16] border-y border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="indigo" size="md" className="mb-4">
            Engine Capabilities
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4 font-sans">
            Engineered to beat every ATS filter.
          </h2>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Applicant Tracking Systems use strict semantic parsing. Here is how ResumeIQ reverse-engineers recruiter algorithms to maximize your callback rate.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: ATS Screening Simulation (Span 7) */}
          <Card hover className="md:col-span-7 flex flex-col justify-between p-8 relative overflow-hidden group">
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
                Enterprise ATS Engine Simulation
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-lg">
                Our parsing engine runs the exact heuristic and TF-IDF semantic rules applied by Workday, Taleo, Lever, and Greenhouse. Know immediately if your resume will be categorized or rejected.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#090D16] border border-white/[0.08] grid grid-cols-3 gap-3 text-center text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-white/[0.02]">
                <span className="text-slate-400 block text-[10px] uppercase">Parser Check</span>
                <span className="text-emerald-400 font-bold">100% OCR Clean</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/[0.02]">
                <span className="text-slate-400 block text-[10px] uppercase">Heuristic Score</span>
                <span className="text-indigo-300 font-bold">92.4 / 100</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/[0.02]">
                <span className="text-slate-400 block text-[10px] uppercase">Format Trap</span>
                <span className="text-sky-300 font-bold">0 Detected</span>
              </div>
            </div>
          </Card>

          {/* Card 2: AI Keyword Gap Analysis (Span 5) */}
          <Card hover className="md:col-span-5 flex flex-col justify-between p-8 group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-sky-500/15 border border-sky-500/30 text-sky-400 flex items-center justify-center mb-6">
                <FileSearch className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
                Keyword Gap Diagnostics
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Extracts required technical competencies, software proficiencies, and contextual verbs from the job description and tells you exactly what is missing.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-semibold">
                  ✓ TypeScript
                </span>
                <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-semibold">
                  ✓ React.js
                </span>
                <span className="px-2.5 py-1 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20 font-semibold">
                  ✗ Docker Containerization
                </span>
                <span className="px-2.5 py-1 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20 font-semibold">
                  ✗ CI/CD Pipelines
                </span>
              </div>
            </div>
          </Card>

          {/* Card 3: Executive Bullet Point Rewriter (Span 5) */}
          <Card hover className="md:col-span-5 flex flex-col justify-between p-8 group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
                Contextual AI Bullet Rewrites
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Applies the Google X-Y-Z formula: Accomplished [X], measured by [Y], by doing [Z]. Transforms passive job duties into quantifiable achievement bullets.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#090D16] border border-white/[0.08] text-xs text-slate-300 font-sans leading-relaxed">
              <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase block mb-1">
                Suggested Replacement:
              </span>
              "Spearheaded database query indexing, cutting API response times by 42% across 250,000 monthly active users."
            </div>
          </Card>

          {/* Card 4: Multi-dimensional Scoring (Span 7) */}
          <Card hover className="md:col-span-7 flex flex-col justify-between p-8 group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
                6-Vector Performance Matrix
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-lg">
                Never settle for a simple percentage. ResumeIQ evaluates 6 distinct vectors: Keyword Density, Hard Skills Parity, Experience Relevance, Formatting Compliance, Section Structure, and Contact Discoverability.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { name: "Keyword Density", score: "94%" },
                { name: "Hard Skills", score: "88%" },
                { name: "Experience Alignment", score: "82%" },
                { name: "Parser Formatting", score: "100%" },
                { name: "Header Structure", score: "96%" },
                { name: "Action Verb Impact", score: "85%" },
              ].map((m, i) => (
                <div key={i} className="p-3 rounded-xl bg-[#090D16] border border-white/[0.06]">
                  <span className="text-[11px] text-slate-400 block truncate">{m.name}</span>
                  <span className="text-base font-extrabold text-white font-mono">{m.score}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Features;
