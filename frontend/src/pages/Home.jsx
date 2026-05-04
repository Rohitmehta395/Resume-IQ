import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import HowItWorks from "../components/landing/HowItWorks";
import Testimonials from "../components/landing/Testimonials";
import FAQ from "../components/landing/FAQ";
import Footer from "../components/landing/Footer";
import Button from "../components/ui/Button";

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
    <div className="flex flex-col min-h-screen bg-surface">
      <Hero onStart={handleStart} />

      <Features />

      <HowItWorks />

      {/* <Testimonials /> */}

      <FAQ />

      {/* Final CTA Section */}
      {!user && (
        <section className="py-24 px-4 bg-linear-to-b from-surface to-surface-variant relative overflow-hidden">
          {/* Background Decorative elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] -z-10"></div>

          <div className="max-w-4xl mx-auto glass-card border-white/10 rounded-xl p-12 text-center shadow-ai-glow">
            <h2 className="headline-lg text-on-surface mb-6">
              Ready to Land Your Dream Interview?
            </h2>
            <p className="body-lg text-on-surface-variant mb-10 max-w-2xl mx-auto">
              Join thousands of students who have successfully bypassed the ATS
              filters and started their careers at top-tier companies.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" onClick={handleStart} className="h-14 px-10">
                Get Started for Free
              </Button>
              <Button
                size="lg"
                variant="secondary"
                onClick={() => navigate("/login")}
                className="h-14 px-10"
              >
                Sign In
              </Button>
            </div>
            <p className="mt-8 text-xs text-on-surface-variant/40">
              No credit card required.
            </p>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default Home;
