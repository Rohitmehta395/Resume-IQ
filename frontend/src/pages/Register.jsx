import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import {
  FiMail,
  FiLock,
  FiUser,
  FiArrowRight,
  FiCheckCircle,
  FiCheck,
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
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
    setLoading(true);
    try {
      await register({ name, email, password });
      toast.success("Account created successfully!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-5rem)] w-full flex flex-col md:flex-row bg-surface overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 ambient-violet-glow pointer-events-none opacity-40" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 ambient-blue-glow pointer-events-none opacity-50" />

      {/* Left Side: Info */}
      <div className="hidden md:flex flex-1 flex-col justify-center px-12 lg:px-24 z-10 animate-fade-in">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 mb-8">
            <FiCheckCircle className="w-4 h-4 text-secondary" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">
              Join 10k+ Professionals
            </span>
          </div>

          <h1 className="display-xl text-on-surface mb-6 leading-tight">
            Start your <span className="text-secondary">Intelligence</span>{" "}
            Journey today.
          </h1>

          <p className="body-lg text-on-surface-variant/80 mb-10 leading-relaxed">
            Create your account to unlock advanced AI tools that analyze,
            optimize, and accelerate your career path with data-driven
            precision.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Unlimited AI Scanning",
              "Precision Keywords",
              "Industry Benchmarking",
              "Data Privacy Guaranteed",
            ].map((feature, i) => (
              <div
                key={i}
                className="flex items-center gap-3 text-on-surface-variant/70"
              >
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <FiCheck className="w-3 h-3 text-primary" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-12 z-10">
        <div
          className="w-full max-w-sm animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="md:hidden text-center mb-6">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 mb-3">
              <HiSparkles className="w-5 h-5 text-primary animate-pulse-soft" />
            </div>
            <h2 className="headline-md text-on-surface">Create Account</h2>
          </div>

          <Card className="premium-glass p-6 md:p-8">
            <div className="hidden md:block mb-6">
              <h2 className="headline-md text-on-surface mb-1">Get Started</h2>
              <p className="text-xs text-on-surface-variant font-medium">
                Join our ecosystem of AI-powered careers.
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
                placeholder="John Doe"
                icon={FiUser}
                className="border-white/10"
              />

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
                label="Secure Password"
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                required
                minLength="6"
                placeholder="Min. 6 characters"
                icon={FiLock}
                className="border-white/10"
              />

              <Button
                type="submit"
                loading={loading}
                className="w-full h-14 text-xs font-black uppercase tracking-[0.25em] mt-4"
              >
                Create Account
                <FiArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>

            <div className="mt-8 text-center border-t border-white/5 pt-6">
              <p className="text-sm text-on-surface-variant">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-secondary font-bold hover:text-primary transition-all uppercase tracking-widest text-[11px] ml-1"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </Card>

          <p className="mt-6 text-center text-[9px] text-on-surface-variant/40 uppercase tracking-[0.3em] font-medium">
            Protected by Cloud-Native Security Protocols
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
