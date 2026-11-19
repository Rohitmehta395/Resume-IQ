import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Lock,
  Check,
  X,
  ChevronDown,
  Layers,
} from "lucide-react";
import toast from "react-hot-toast";

const Hero = ({ onStart }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFileSelected = (file) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be under 5MB.");
      return;
    }
    toast.success("Resume loaded! Proceeding to target role…");
    navigate("/analyze", { state: { file } });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    handleFileSelected(file);
  };

  return (
    <section className="relative pt-12 pb-20 lg:pt-10 lg:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-slate-50 dark:bg-[#080C14] transition-colors">
      {/* ── Soft Atmospheric Ambient Mesh Gradients (like the reference image) ── */}
      <div className="absolute top-0 right-0 w-[650px] h-[550px] bg-gradient-to-bl from-emerald-200/40 via-teal-100/30 to-transparent dark:from-emerald-500/10 dark:via-teal-500/5 dark:to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[450px] bg-gradient-to-t from-indigo-200/40 via-purple-100/25 to-transparent dark:from-indigo-500/10 dark:via-purple-500/5 dark:to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-gradient-to-r from-sky-100/40 to-transparent dark:from-sky-500/5 dark:to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* ══════════════ LEFT COLUMN ══════════════ */}
          <div className="lg:col-span-6 text-center lg:text-left z-10 max-w-xl mx-auto lg:mx-0">
            {/* Tag / Category Eyebrow */}
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-mono block mb-4">
              AI-Powered ATS Scanner
            </span>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.12] mb-6 font-sans">
              Is your resume good enough?
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8 font-sans">
              An AI-powered resume analyzer that benchmarks your resume against any target job description. Detect missing keywords, verify ATS formatting compliance, and get actionable recommendations with tailored bullet rewrites to help you land more interviews.
            </p>

            {/* In-Hero Upload Dropzone Card */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              className={`rounded-2xl border-2 border-dashed transition-all duration-200 p-6 sm:p-7 text-center backdrop-blur-sm ${
                dragOver
                  ? "border-emerald-500 bg-emerald-50/60 dark:bg-emerald-500/10"
                  : "border-indigo-200/90 hover:border-emerald-400/80 bg-white/80 dark:bg-[#0F172A]/80 dark:border-white/15"
              } shadow-sm dark:shadow-xl`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx"
                className="hidden"
                onChange={(e) => handleFileSelected(e.target.files?.[0])}
              />

              <p className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-100 mb-1">
                Drop your resume here or choose a file.
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
                PDF &amp; DOCX only. Max 5MB file size.
              </p>

              {/* Prominent Upload Action Button */}
              <button
                type="button"
                onClick={() => {
                  if (fileInputRef.current) {
                    fileInputRef.current.click();
                  } else if (onStart) {
                    onStart();
                  } else {
                    navigate("/analyze");
                  }
                }}
                className="inline-flex items-center justify-center font-bold text-sm px-8 py-3 rounded-xl text-white bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 shadow-md shadow-emerald-500/25 transition-all duration-200 cursor-pointer transform hover:-translate-y-0.5"
              >
                Upload Your Resume
              </button>

              {/* Privacy Guarantee Note */}
              <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-4">
                <Lock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
                <span>We never share your data with 3rd parties or use it for AI model training.</span>
              </div>
            </div>
          </div>

          {/* ══════════════ RIGHT COLUMN: SAAS APP PREVIEW MOCKUP ══════════════ */}
          <div className="lg:col-span-6 relative w-full max-w-xl mx-auto lg:max-w-none">
            {/* Window Container */}
            <div className="rounded-3xl border border-slate-200/90 dark:border-white/10 bg-white dark:bg-[#0F172A] shadow-2xl shadow-indigo-950/10 dark:shadow-black/70 overflow-hidden transition-colors">
              {/* Top Window Bar */}
              <div className="px-5 py-3 border-b border-slate-100 dark:border-white/[0.08] flex items-center justify-between bg-slate-50/50 dark:bg-[#121A2D]">
                <div className="flex items-center gap-2">
                  <img
                    src="/favicon.png"
                    alt="ResumeIQ"
                    className="w-5 h-5 rounded-md object-contain"
                  />
                  <span className="text-xs font-extrabold tracking-tight text-slate-800 dark:text-white font-sans">
                    Resume<span className="text-emerald-500">IQ</span>
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-200 dark:bg-white/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-200 dark:bg-white/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-200 dark:bg-white/20" />
                </div>
              </div>

              {/* Main Content Area Split into Left Sidebar & Right Inspection Canvas */}
              <div className="grid grid-cols-12 min-h-[380px] bg-slate-50/30 dark:bg-[#090D16]/50">
                {/* ── Left Sidebar Inside Mockup (38% width) ── */}
                <div className="col-span-5 p-4 border-r border-slate-100 dark:border-white/[0.08] bg-white dark:bg-[#0F172A] flex flex-col justify-between">
                  {/* Resume Score Semicircle Gauge */}
                  <div className="p-3.5 rounded-xl border border-slate-100 dark:border-white/[0.06] bg-slate-50/60 dark:bg-white/[0.02] text-center mb-4">
                    <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Resume Score
                    </span>

                    {/* Semicircle Speedometer SVG Gauge */}
                    <div className="relative w-28 h-15 mx-auto">
                      <svg viewBox="0 0 100 55" className="w-full h-full overflow-visible">
                        {/* Background track arc */}
                        <path
                          d="M 12 50 A 38 38 0 0 1 88 50"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="7"
                          strokeLinecap="round"
                          className="text-slate-200 dark:text-white/10"
                        />
                        {/* Gradient filled arc */}
                        <path
                          d="M 12 50 A 38 38 0 0 1 88 50"
                          fill="none"
                          stroke="url(#heroGaugeGrad)"
                          strokeWidth="7"
                          strokeLinecap="round"
                          strokeDasharray="119.38"
                          strokeDashoffset="28" // approx 76% filled
                        />
                        <defs>
                          <linearGradient id="heroGaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#FB7185" />
                            <stop offset="50%" stopColor="#FBBF24" />
                            <stop offset="100%" stopColor="#34D399" />
                          </linearGradient>
                        </defs>
                        {/* Center pivot point & needle indicator */}
                        <circle cx="50" cy="50" r="3" className="fill-slate-700 dark:fill-white" />
                        <line
                          x1="50"
                          y1="50"
                          x2="68"
                          y2="28"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          className="text-slate-700 dark:text-white"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Checklist Categories Navigation */}
                  <div className="space-y-3 font-sans text-xs">
                    {/* Active Group: Content */}
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                        <span>Content</span>
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                      <div className="space-y-1.5 pl-1 text-[11px]">
                        <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-200 font-medium">
                          <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span>ATS Parse Rate</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-200 font-medium">
                          <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span>Quantifying Impact</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-rose-500 font-medium">
                          <X className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                          <span>Repetition</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <Lock className="w-3 h-3 text-slate-400 shrink-0" />
                          <span>Spelling &amp; Grammar</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <Lock className="w-3 h-3 text-slate-400 shrink-0" />
                          <span>Summarize Resume</span>
                        </div>
                      </div>
                    </div>

                    {/* Collapsed Category Items */}
                    <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-white/[0.06] text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      <div className="flex items-center justify-between">
                        <span>Format &amp; Brevity</span>
                        <ChevronDown className="w-3 h-3 text-slate-400" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Style</span>
                        <ChevronDown className="w-3 h-3 text-slate-400" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Sections</span>
                        <ChevronDown className="w-3 h-3 text-slate-400" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Skills</span>
                        <ChevronDown className="w-3 h-3 text-slate-400" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── Right Panel Inside Mockup (62% width) ── */}
                <div className="col-span-7 p-5 bg-white/70 dark:bg-[#090D16]/40 flex flex-col justify-start space-y-4">
                  {/* Purple Content Header Badge */}
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 font-bold text-[10px] uppercase tracking-wider w-fit border border-indigo-200/60 dark:border-indigo-500/20">
                    <Layers className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                    <span>Content</span>
                  </div>

                  {/* Subsection Header */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider font-mono">
                      ] ATS Parse Rate
                    </h4>
                  </div>

                  {/* Wireframe Placeholder Lines (Simulating document scanning) */}
                  <div className="space-y-2 pt-1">
                    <div className="h-2 w-full rounded bg-slate-200/80 dark:bg-white/[0.08]" />
                    <div className="h-2 w-4/5 rounded bg-slate-200/70 dark:bg-white/[0.06]" />
                    <div className="h-2 w-11/12 rounded bg-slate-200/60 dark:bg-white/[0.05]" />
                  </div>

                  {/* Gradient Slider Bar with Location Pin (matching the image) */}
                  <div className="relative pt-6 pb-2 my-2">
                    {/* Background Track */}
                    <div className="h-2.5 w-full rounded-full bg-slate-100 dark:bg-white/[0.06] overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-rose-400 via-amber-400 to-emerald-400 w-[68%]" />
                    </div>

                    {/* Glowing Location Pin Marker */}
                    <div className="absolute top-0 left-[68%] -translate-x-1/2 flex flex-col items-center">
                      <div className="w-5 h-5 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center shadow-md">
                        <div className="w-2 h-2 rounded-full bg-white shadow-xs" />
                      </div>
                      <div className="w-0.5 h-2 bg-amber-400" />
                    </div>
                  </div>

                  {/* Wireframe Placeholder Lines Below Bar */}
                  <div className="space-y-2 pt-2">
                    <div className="h-2 w-full rounded bg-slate-200/70 dark:bg-white/[0.06]" />
                    <div className="h-2 w-3/4 rounded bg-slate-200/60 dark:bg-white/[0.05]" />
                    <div className="h-2 w-5/6 rounded bg-slate-200/50 dark:bg-white/[0.04]" />
                  </div>
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
