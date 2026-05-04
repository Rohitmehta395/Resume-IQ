import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQ = () => {
  const faqs = [
    {
      question: "How does the ATS matching score work?",
      answer: "Our AI analyzes your resume against the job description using similar algorithms to major Applicant Tracking Systems like Workday and Greenhouse. We look for keyword density, skill matching, formatting compliance, and job-specific requirements."
    },
    {
      question: "Is my personal data secure?",
      answer: "Absolutely. We use industry-standard encryption for all data transfers. Your resume is parsed and analyzed in a secure environment, and we never sell your personal information to recruiters or third parties."
    },
    {
      question: "Does it work for all industries?",
      answer: "Yes! Our AI is trained on hundreds of thousands of job descriptions across tech, finance, healthcare, marketing, and more. It understands industry-specific jargon and the unique ATS requirements for different sectors."
    },
    {
      question: "What formats can I upload?",
      answer: "We currently support PDF and .DOCX formats. For the most accurate parsing, we recommend using clean, standard layouts without complex graphics or multi-column grids."
    }
  ];

  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-4 pb-16 px-4 bg-surface">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="label-sm text-secondary mb-4">Support</h2>
          <h3 className="headline-lg text-on-surface">Frequently Asked Questions</h3>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="glass-card border-white/5 rounded-xl overflow-hidden transition-all duration-300">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                className="w-full p-6 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
              >
                <span className="font-bold text-on-surface">{faq.question}</span>
                {openIndex === idx ? (
                  <ChevronUp className="w-5 h-5 text-primary" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-on-surface-variant" />
                )}
              </button>
              
              {openIndex === idx && (
                <div className="px-6 pb-6 animate-fade-in">
                  <p className="body-md text-on-surface-variant">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
