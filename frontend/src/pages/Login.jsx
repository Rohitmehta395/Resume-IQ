import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import {
  Mail,
  Lock,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
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
    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      await login({ email, password });
      toast.success("Welcome back to ResumeIQ!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4.5rem)] w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-slate-50 dark:bg-[#080C14] transition-colors">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Side: Product Value & Live ATS Teaser */}
        <div className="hidden lg:flex lg:col-span-6 flex-col justify-center pr-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 dark:bg-indigo-500/10 dark:border-indigo-500/20 w-fit mb-6">
            <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
              Next-Gen Career Intelligence
            </span>
          </div>

          <h1 className="text-4xl xl:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-6">
            Land more interviews with <span className="text-indigo-600 dark:text-indigo-400">precision ATS</span> scoring.
          </h1>

          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
            Stop sending resumes into the black hole. Scan against real job descriptions, discover hidden keyword gaps, and get instant executive rewrites.
          </p>

          {/* Interactive Simulation Preview Card */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-white/[0.08] shadow-md dark:shadow-xl relative overflow-hidden mb-8 transition-colors">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/[0.06] mb-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_#10B981]" />
                <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                  ATS_SCAN_TARGET // Senior Fullstack Engineer
                </span>
              </div>
              <span className="text-xs font-mono font-extrabold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-500/20">
                88% MATCH
              </span>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>Keyword Density:</span>
                <span className="text-indigo-600 dark:text-indigo-300 font-semibold">94% Optimal</span>
              </div>
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>Critical Hard Skills:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">12 Matched, 2 Missing</span>
              </div>
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>Format Parser Compliance:</span>
                <span className="text-sky-600 dark:text-sky-300 font-semibold">100% Clean Structure</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Instant AI Bullet Rewrites</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Bank-Grade Data Privacy</span>
            </div>
          </div>
        </div>

        {/* Right Side: Clean Login Card */}
        <div className="lg:col-span-6 w-full max-w-md mx-auto animate-fade-in">
          <Card className="p-7 sm:p-9 shadow-xl">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
                Sign in to ResumeIQ
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Access your dashboard, saved reports, and ATS scans.
              </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-5">
              <Input
                label="Email Address"
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                required
                placeholder="you@domain.com"
                icon={Mail}
              />

              <Input
                label="Password"
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                required
                placeholder="••••••••••••"
                icon={Lock}
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={loading}
                className="w-full h-12 text-sm uppercase tracking-wider font-bold mt-2 shadow-md shadow-indigo-600/25"
              >
                Sign In
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/[0.08] text-center">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
