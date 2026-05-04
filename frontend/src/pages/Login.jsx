import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { FiMail, FiLock, FiArrowRight, FiCheck } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login({ email, password });
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-5rem)] w-full flex flex-col md:flex-row bg-surface overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 ambient-blue-glow pointer-events-none opacity-50" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 ambient-violet-glow pointer-events-none opacity-40" />

      {/* Left Side: Branding & Info */}
      <div className="hidden md:flex flex-1 flex-col justify-center px-12 lg:px-24 z-10 animate-fade-in">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <HiSparkles className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">AI Career Intelligence</span>
          </div>
          
          <h1 className="display-xl text-on-surface mb-6 leading-tight">
            Optimize your <span className="text-primary">Professional</span> Trajectory.
          </h1>
          
          <p className="body-lg text-on-surface-variant/80 mb-10 leading-relaxed">
            Access your intelligent dashboard to analyze resumes, track applications, and unlock personalized career insights powered by advanced AI.
          </p>

          <div className="space-y-4">
            {[
              "Real-time ATS Compatibility Analysis",
              "AI-Powered Keyword Optimization",
              "Smart Career Progression Insights"
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 text-on-surface-variant/70">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-tertiary/10 border border-tertiary/20 flex items-center justify-center">
                  <FiCheck className="w-3 h-3 text-tertiary" />
                </div>
                <span className="text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-12 z-10">
        <div className="w-full max-w-sm animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="md:hidden text-center mb-6">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 mb-3">
              <HiSparkles className="w-5 h-5 text-primary animate-pulse-soft" />
            </div>
            <h2 className="headline-md text-on-surface">Welcome Back</h2>
          </div>

          <Card className="premium-glass p-6 md:p-8">
            <div className="hidden md:block mb-6">
              <h2 className="headline-md text-on-surface mb-1">Sign In</h2>
              <p className="text-xs text-on-surface-variant font-medium">Enter your credentials to continue.</p>
            </div>

            <form onSubmit={onSubmit} className="space-y-5">
              <Input
                label="Email Address"
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                required
                placeholder="name@company.com"
                icon={FiMail}
                className="border-white/10"
              />
              
              <Input
                label="Password"
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                required
                placeholder="••••••••••••"
                icon={FiLock}
                className="border-white/10"
              />

              <Button
                type="submit"
                loading={loading}
                className="w-full h-14 text-xs font-black uppercase tracking-[0.25em] mt-4"
              >
                Sign In
                <FiArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>

            <div className="mt-8 text-center border-t border-white/5 pt-6">
              <p className="text-sm text-on-surface-variant">
                New to the platform?{" "}
                <Link
                  to="/register"
                  className="text-secondary font-bold hover:text-primary transition-all uppercase tracking-widest text-[11px] ml-1"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </Card>
          
          <p className="mt-6 text-center text-[9px] text-on-surface-variant/40 uppercase tracking-[0.3em] font-medium">
            © 2026 ResumeMatch AI Intelligence
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
