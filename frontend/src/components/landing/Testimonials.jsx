import React from "react";
import Card from "../ui/Card";
import { Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Software Engineering Student",
      text: "I was applying for months with zero callbacks. After using ResumeMatch AI to optimize for specific job descriptions, I landed 3 interviews in two weeks.",
      avatar: "https://i.pravatar.cc/100?img=12"
    },
    {
      name: "Sarah Chen",
      role: "Recent UX Design Grad",
      text: "The keyword gap analysis is a game changer. It showed me exactly what was missing from my experience section that recruiters were looking for.",
      avatar: "https://i.pravatar.cc/100?img=44"
    },
    {
      name: "Michael Ross",
      role: "MBA Candidate",
      text: "The AI rewrite suggestions are actually good—not just generic filler. It helped me quantify my achievements in a way that resonates with ATS.",
      avatar: "https://i.pravatar.cc/100?img=33"
    }
  ];

  return (
    <section className="py-24 px-4 bg-surface-variant/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="label-sm text-primary mb-4">Success Stories</h2>
          <h3 className="headline-lg text-on-surface">Trusted by Future Leaders</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <Card key={idx} className="p-8 border-white/5 relative">
              <Quote className="absolute top-6 right-8 w-10 h-10 text-primary/10" />
              <p className="body-md text-on-surface-variant mb-8 italic relative z-10">
                "{t.text}"
              </p>
              <div className="flex items-center gap-4">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border border-primary/20" />
                <div>
                  <h5 className="font-bold text-on-surface">{t.name}</h5>
                  <p className="text-xs text-on-surface-variant">{t.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
