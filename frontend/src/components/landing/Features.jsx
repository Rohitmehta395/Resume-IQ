import React from "react";
import { Target, Sparkles, BarChart3, Shield, Clock, Users } from "lucide-react";
import Card from "../ui/Card";

const Features = () => {
  const features = [
    {
      icon: Target,
      title: "ATS Simulation",
      description: "Our proprietary algorithm mimics top-tier Applicant Tracking Systems to identify exactly why your resume might be filtered out.",
      color: "violet"
    },
    {
      icon: Sparkles,
      title: "AI-Powered Rewrites",
      description: "Receive specific, contextual suggestions to rewrite bullet points using high-impact action verbs and industry-specific keywords.",
      color: "sky"
    },
    {
      icon: BarChart3,
      title: "Real-time Scoring",
      description: "Track your optimization progress with a dynamic match score that updates as you refine your skills and experience descriptions.",
      color: "green"
    }
  ];

  const highlights = [
    { icon: Shield, title: "Data Security", text: "Your professional data is encrypted and never shared with third parties." },
    { icon: Clock, title: "Instant Feedback", text: "Get comprehensive ATS analysis and improvement tips in less than 30 seconds." },
    { icon: Users, title: "Student Focused", text: "Specifically designed to help students transition from academia to industry." }
  ];

  return (
    <section className="py-24 px-4 bg-surface-variant/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="label-sm text-primary mb-4">Core Capabilities</h2>
          <h3 className="headline-lg text-on-surface mb-6">Built for the Modern Job Market</h3>
          <p className="body-md text-on-surface-variant">
            Stop guessing what recruiters want. Use advanced AI to align your experience with the exact requirements of your dream roles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, idx) => (
            <Card key={idx} hover className="p-8 group relative overflow-hidden border-white/5">
              {/* Subtle background glow on hover */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors"></div>
              
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 glass-card border-white/10 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-7 h-7 ${idx === 0 ? 'text-primary' : idx === 1 ? 'text-secondary' : 'text-tertiary'}`} />
              </div>
              
              <h4 className="headline-md text-on-surface mb-4">{feature.title}</h4>
              <p className="body-md text-on-surface-variant leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-16 border-t border-white/5">
          {highlights.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="w-10 h-10 rounded-xl glass-card flex items-center justify-center mb-6 border-white/5">
                <item.icon className="w-5 h-5 text-secondary" />
              </div>
              <h5 className="text-sm font-bold text-on-surface mb-2 tracking-wide uppercase">{item.title}</h5>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
