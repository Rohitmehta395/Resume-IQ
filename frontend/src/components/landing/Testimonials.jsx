import Card from "../ui/Card";
import { Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Software Engineering Student",
      text: "I was applying for months with zero callbacks. After using ResumeIQ to optimize for specific job descriptions, I landed 3 interviews in two weeks.",
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
    <section className="py-24 px-4 bg-[#090D16] border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-400 mb-2">Success Stories</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">Trusted by High-Performing Candidates</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <Card key={idx} hover className="p-8 relative">
              <Quote className="absolute top-6 right-8 w-8 h-8 text-indigo-500/15" />
              <p className="text-sm text-slate-300 mb-8 italic relative z-10 leading-relaxed font-sans">
                "{t.text}"
              </p>
              <div className="flex items-center gap-4">
                <img src={t.avatar} alt={t.name} className="w-11 h-11 rounded-full border border-indigo-500/30 object-cover" />
                <div>
                  <h5 className="font-bold text-white text-sm">{t.name}</h5>
                  <p className="text-xs text-slate-400">{t.role}</p>
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
