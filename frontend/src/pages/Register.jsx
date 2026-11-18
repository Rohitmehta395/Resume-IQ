import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import {
  User,
  Mail,
  Lock,
  ArrowRight,
  CheckCircle2,
  Shield,
  Zap,
} from "lucide-react";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const { name, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      await register({ name, email, password });
      toast.success("Account created successfully! Welcome to ResumeIQ.");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4.5rem)] w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#080C14]">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Side: Pitch & Value Points */}
        <div className="hidden lg:flex lg:col-span-6 flex-col justify-center pr-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 w-fit mb-6">
            <Zap className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
              Join 15,000+ Job Seekers
            </span>
          </div>

          <h1 className="text-4xl xl:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
            Supercharge your job search with <span className="text-indigo-400">ResumeIQ</span>.
          </h1>

          <p className="text-base text-slate-400 leading-relaxed mb-8">
            Create your account to unlock precision ATS matching, detailed keyword diagnostics, and instant high-impact bullet rewriting.
          </p>

          <div className="space-y-4 mb-8">
            {[
              {
                title: "ATS Algorithm Simulation",
                desc: "Emulates screening logic used by Workday, Taleo, Greenhouse, and Lever.",
              },
              {
                title: "Precision Keyword Gap Analysis",
                desc: "Identifies the exact technical skills and keywords missing from your resume.",
              },
              {
                title: "Executive Bullet Optimization",
                desc: "Turn weak duty descriptions into metric-driven accomplishment statements.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05]"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-200">{item.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Shield className="w-4 h-4 text-indigo-400" />
            <span>100% Secure &amp; Confidential. Your resume data is never sold or shared.</span>
          </div>
        </div>

        {/* Right Side: Register Card */}
        <div className="lg:col-span-6 w-full max-w-md mx-auto animate-fade-in">
          <Card className="p-7 sm:p-9 shadow-2xl">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white tracking-tight mb-2">
                Create your account
              </h2>
              <p className="text-sm text-slate-400">
                Start scanning and optimizing your resume in seconds.
              </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <Input
                label="Full Name"
                type="text"
                name="name"
                value={name}
                onChange={onChange}
                required
                placeholder="Jane Doe"
                icon={User}
              />

              <Input
                label="Email Address"
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                required
                placeholder="jane@example.com"
                icon={Mail}
              />

              <Input
                label="Password"
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                required
                placeholder="Minimum 6 characters"
                icon={Lock}
                helperText="Must be at least 6 characters long."
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={loading}
                className="w-full h-12 text-sm uppercase tracking-wider font-bold mt-3"
              >
                Create Account
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-white/[0.08] text-center">
              <p className="text-sm text-slate-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Register;
