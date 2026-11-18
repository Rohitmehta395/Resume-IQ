import { Upload, FileText, Cpu, CheckCircle2, ArrowRight } from "lucide-react";
import Card from "../ui/Card";
import Badge from "../ui/Badge";

const HowItWorks = () => {
  const steps = [
    {
      step: "01",
      icon: Upload,
      title: "Upload Your Resume",
      description:
        "Drop your PDF or DOCX file. Our secure text extractor analyzes your formatting, contact details, and career chronology.",
    },
    {
      step: "02",
      icon: FileText,
      title: "Paste Job Description",
      description:
        "Paste the posting for your target role. The engine parses the company profile, primary responsibilities, and non-negotiable qualifications.",
    },
    {
      step: "03",
      icon: Cpu,
      title: "Neural ATS Audit",
      description:
        "Within seconds, our algorithm calculates your overall match percentage, maps matched vs. missing competencies, and tests formatting compliance.",
    },
    {
      step: "04",
      icon: CheckCircle2,
      title: "Apply Executive Fixes",
      description:
        "Review AI-suggested bullet point rewrites, fill detected keyword gaps, export your audit summary, and apply with confidence.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#080C14] transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="sky" size="md" className="mb-4">
            Workflow Process
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-4 font-sans">
            How ResumeIQ secures your interview.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            From raw resume to an ATS-optimized application in four streamlined steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, idx) => (
            <Card
              key={idx}
              hover
              className="flex flex-col justify-between p-7 relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-600 dark:bg-indigo-500/10 dark:border-indigo-500/25 dark:text-indigo-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-extrabold font-mono text-slate-400 dark:text-slate-600 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {item.step}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/[0.06] flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
                <span>Phase {idx + 1}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
