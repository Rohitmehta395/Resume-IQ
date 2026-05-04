import React from "react";
import { Upload, Search, Zap, CheckCircle } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Upload,
      title: "Upload Resume",
      description: "Drop your current PDF or Word resume. Our parser extracts every detail with precision."
    },
    {
      icon: Search,
      title: "Add Job Link",
      description: "Paste the job description you're targeting. We'll analyze it for core requirements and hidden keywords."
    },
    {
      icon: Zap,
      title: "AI Analysis",
      description: "Our AI compares your profile against the role, identifying gaps and providing rewrite suggestions."
    },
    {
      icon: CheckCircle,
      title: "Apply with Confidence",
      description: "Optimize until you hit a high match score, then download your ATS-ready resume and apply."
    }
  ];

  return (
    <section id="how-it-works" className="py-12 px-4 bg-surface relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="label-sm text-secondary mb-4">The Process</h2>
          <h3 className="headline-lg text-on-surface">Your Path to the Interview</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {steps.map((step, idx) => (
            <div key={idx} className="relative flex flex-col items-center text-center group">
              {/* Connector line for desktop */}
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-[1px] bg-gradient-to-r from-primary/30 to-transparent -z-10"></div>
              )}
              
              <div className="w-20 h-20 rounded-full glass-card border-white/10 flex items-center justify-center mb-8 relative z-10 group-hover:border-primary/50 transition-colors duration-500 shadow-ai-glow">
                <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary text-white text-xs font-bold flex items-center justify-center border-2 border-surface">
                    {idx + 1}
                </span>
                <step.icon className="w-8 h-8 text-on-surface" />
              </div>

              <h4 className="headline-md text-on-surface mb-4">{step.title}</h4>
              <p className="body-md text-on-surface-variant max-w-[240px]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-20 p-8 glass-card border-white/5 rounded-xl flex flex-col md:flex-row items-center justify-between gap-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-tertiary/20 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-8 h-8 text-tertiary" />
                </div>
                <div>
                    <h5 className="font-bold text-on-surface">92% Average Score Increase</h5>
                    <p className="text-sm text-on-surface-variant">Users typically double their match rate after just one round of AI suggestions.</p>
                </div>
            </div>
            <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-surface bg-surface-variant flex items-center justify-center text-[10px] font-bold text-on-surface-variant overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                    </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-surface bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
                    +2k
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
