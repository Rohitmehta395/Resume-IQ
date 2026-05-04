import React from "react";
import { ArrowRight, Sparkles, CheckCircle, Zap, Target } from "lucide-react";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import { Link } from "react-router-dom";

const Hero = ({ onStart }) => {
  return (
    <section className="relative py-10 lg:pt-10 lg:pb-10 px-4 overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse-soft"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[150px] -z-10"></div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">
          {/* Left Side: Text Content */}
          <div className="flex-1 text-center lg:text-left relative z-10">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full glass-card border-white/10 mb-8 animate-fade-in">
              <Badge variant="violet" className="mr-3">
                AI 2.0
              </Badge>
              <span className="text-sm font-bold text-on-surface-variant flex items-center tracking-wide uppercase">
                The Future of Job Applications
                <Sparkles className="w-4 h-4 ml-2 text-primary animate-pulse" />
              </span>
            </div>

            <h1 className="headline-lg text-on-surface mb-8 animate-fade-in [animation-delay:200ms]">
              Land Your Dream Job with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                AI-Powered
              </span>{" "}
              Resume Optimization
            </h1>

            <p className="body-medium text-on-surface-variant mb-10 max-w-2xl mx-auto lg:mx-0 animate-fade-in [animation-delay:400ms]">
              Don't let Applicant Tracking Systems (ATS) hide your talent. Our
              AI analyzes your resume against any job description, providing
              instant scores and rewrite suggestions to get you noticed.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6 animate-fade-in [animation-delay:600ms]">
              <Button
                size="lg"
                onClick={onStart}
                className="w-full sm:w-auto min-w-50 h-14 shadow-xl shadow-primary/20 cursor-pointer"
              >
                Analyze My Resume
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="secondary"
                onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
                className="w-full sm:w-auto min-w-[200px] h-14 cursor-pointer"
              >
                How it Works
              </Button>
            </div>
          </div>

          {/* Right Side: Score Ring Visual */}
          <div className="flex-1 relative animate-fade-in [animation-delay:600ms] w-full max-w-md mx-auto lg:max-w-[420px] pt-12">
            {/* Ambient Glows */}
            <div className="absolute -right-32 -top-20 w-[400px] h-[400px] ambient-blue-glow -z-10 animate-pulse-soft"></div>
            <div className="absolute -left-32 -bottom-20 w-[400px] h-[400px] ambient-violet-glow -z-10"></div>

            <div className="relative group">
              {/* Floating Skill Chips (Outside the glass card to avoid clipping) */}
              <div className="hidden lg:block">
                <div className="absolute -top-6 -left-12 floating-pill floating-pill-violet animate-[bounce_3s_ease-in-out_infinite] rotate-[-6deg]">
                  React.js
                </div>
                <div className="absolute bottom-16 -left-16 floating-pill floating-pill-blue animate-[bounce_4s_ease-in-out_infinite] rotate-[4deg]">
                  JavaScript
                </div>
                <div className="absolute top-1/2 -right-12 -translate-y-1/2 floating-pill floating-pill-emerald animate-[bounce_3.5s_ease-in-out_infinite] rotate-[8deg]">
                  Next.js
                </div>
              </div>

              <div className="relative premium-glass p-8 md:p-10 rounded-[2.5rem] border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
                {/* Subtle inner highlight */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-20 rounded-[2.5rem] pointer-events-none"></div>

                <div className="relative flex flex-col items-center">
                  {/* Score Ring Section */}
                  <div className="relative w-36 h-36 md:w-44 md:h-44 flex items-center justify-center mb-8 shrink-0">
                    {/* Blurred background glow for the ring */}
                    <div className="absolute inset-2 rounded-full score-inner-glow"></div>
                    
                    <svg className="w-full h-full transform -rotate-90 score-glow-ring">
                      <circle
                        cx="50%"
                        cy="50%"
                        r="42%"
                        stroke="currentColor"
                        strokeWidth="11"
                        fill="transparent"
                        className="text-white/5"
                      />
                      <circle
                        cx="50%"
                        cy="50%"
                        r="42%"
                        stroke="currentColor"
                        strokeWidth="11"
                        fill="transparent"
                        strokeDasharray="480"
                        strokeDashoffset="72"
                        strokeLinecap="round"
                        className="text-tertiary transition-all duration-1000 ease-out"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <div className="flex items-baseline">
                        <span className="text-4xl md:text-5xl font-semibold text-on-surface tracking-tighter">
                          82
                        </span>
                        <span className="text-base font-semibold text-on-surface ml-0.5">%</span>
                      </div>
                      <span className="text-[10px] font-bold text-tertiary uppercase tracking-[0.25em] mt-1">
                        EXCELLENT
                      </span>
                    </div>
                  </div>

                  {/* Text Details */}
                  <div className="text-center w-full">
                    <h4 className="text-lg md:text-xl font-bold text-on-surface mb-1 tracking-tight">
                      Senior Product Designer
                    </h4>
                    <p className="text-[12px] text-on-surface/40 mb-8 font-medium">
                      Analyzing match against{" "}
                      <span className="text-on-surface/70 font-semibold">
                        Google • Design Systems
                      </span>
                    </p>

                    <div className="grid grid-cols-3 gap-3 w-full">
                      {[
                        { label: "Keywords", value: "92%" },
                        { label: "Skills", value: "88%" },
                        { label: "Impact", value: "76%" },
                      ].map((metric, i) => (
                        <div key={i} className="metric-box py-2.5 px-1 rounded-2xl">
                          <p className="text-[8px] uppercase font-bold text-on-surface/30 tracking-widest mb-1">
                            {metric.label}
                          </p>
                          <p className="text-[15px] font-black text-on-surface/90">
                            {metric.value}
                          </p>
                        </div>
                      ))}
                    </div>
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
