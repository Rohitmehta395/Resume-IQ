import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Badge from "../ui/Badge";

const FAQ = () => {
  const faqs = [
    {
      question: "How does the ResumeIQ ATS matching algorithm work?",
      answer:
        "Our engine applies both heuristic semantic rules and deep language model analysis to compare your resume against the target job description. We evaluate 6 critical dimensions: hard technical skills, semantic keywords, experience relevance, ATS parser formatting, section structure, and contact information discoverability.",
    },
    {
      question: "Is my personal and career information secure?",
      answer:
        "Yes, completely. We treat your personal data with bank-grade confidentiality. Resumes are parsed securely, never stored publicly, and never shared with recruiters, employers, or third-party advertisers. Your career data belongs solely to you.",
    },
    {
      question: "What file formats can I upload for analysis?",
      answer:
        "We support both PDF (.pdf) and Microsoft Word (.docx) formats up to 5MB. For optimal ATS compatibility, we recommend clean, single-column documents without embedded graphics, tables, or complex text boxes.",
    },
    {
      question: "Does ResumeIQ work across different industries?",
      answer:
        "Yes. While we excel in high-density fields like Technology, Engineering, Product Management, and Finance, our semantic parser evaluates the exact job description you provide, tailoring keyword recommendations to healthcare, marketing, operations, and academic roles as well.",
    },
    {
      question: "Can I download and export my ATS audit reports?",
      answer:
        "Absolutely. Every completed scan generates an Executive ATS Dossier with breakdown charts, keyword matrices, and AI rewrite suggestions. You can export a clean, printable PDF report or copy shareable permalinks at any time from your dashboard.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-[#090D16] border-t border-white/[0.06]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="indigo" size="md" className="mb-4">
            Questions &amp; Answers
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4 font-sans">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Everything you need to know about ATS optimization and the ResumeIQ platform.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-white/[0.08] bg-[#0F172A] overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full p-6 text-left flex justify-between items-center gap-4 hover:bg-white/[0.02] transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-white tracking-tight">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border border-white/[0.08] transition-transform duration-300 ${
                      isOpen
                        ? "rotate-180 bg-indigo-500/20 text-indigo-300 border-indigo-500/30"
                        : "bg-white/[0.04] text-slate-400"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 animate-fade-in border-t border-white/[0.04]">
                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
