import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import HowItWorks from "../components/landing/HowItWorks";
import FAQ from "../components/landing/FAQ";
import Footer from "../components/landing/Footer";
import Button from "../components/ui/Button";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleStart = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/register");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#080C14]">
      {/* Hero Section */}
      <Hero onStart={handleStart} />

      {/* Capabilities Section */}
      <Features />

      {/* How it Works Section */}
      <HowItWorks />

      {/* FAQ Section */}
      <FAQ />

      {/* Final Action Banner */}
      {!user && (
        <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-[#090D16] border-t border-white/[0.08] relative overflow-hidden">
          <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-b from-[#111827] to-[#0B0F1A] border border-white/[0.1] p-8 sm:p-14 text-center shadow-2xl relative">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-7 h-7" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4 font-sans">
              Ready to pass the ATS filter?
            </h2>

            <p className="text-base sm:text-lg text-slate-300 mb-8 max-w-xl mx-auto leading-relaxed">
              Upload your resume now to run your first diagnostic scan and generate tailored AI rewrites in less than 30 seconds.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                variant="primary"
                onClick={handleStart}
                className="w-full sm:w-auto h-13 px-8 text-sm uppercase tracking-wider font-bold shadow-lg shadow-indigo-600/30"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
              <Button
                size="lg"
                variant="secondary"
                onClick={() => navigate("/login")}
                className="w-full sm:w-auto h-13 px-8 text-sm font-bold"
              >
                Sign In
              </Button>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>No credit card required. Free instant analysis.</span>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
