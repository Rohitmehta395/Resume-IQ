import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  LogOut,
  Menu,
  X,
  LayoutDashboard,
  Target,
  Sparkles,
  Plus,
  ArrowRight,
} from "lucide-react";
import Button from "./ui/Button";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll state for enhanced border
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsMenuOpen(false);
  };

  const navLinks = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
      protected: true,
    },
    {
      name: "Scan Resume",
      path: "/analyze",
      icon: Target,
      protected: true,
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#080C14]/90 backdrop-blur-md border-b border-white/[0.08] shadow-lg shadow-black/40"
          : "bg-[#080C14]/75 backdrop-blur-sm border-b border-white/[0.05]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          {/* Brand Logo */}
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-sky-500 p-0.5 shadow-md shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all duration-300">
              <div className="w-full h-full bg-[#090D16] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1 font-sans">
                Resume<span className="text-indigo-400">IQ</span>
                <span className="text-[10px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 ml-1 font-semibold">
                  PRO
                </span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1.5">
            {user ? (
              <>
                {navLinks.map((link) => {
                  const active = isActive(link.path);
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        active
                          ? "bg-indigo-500/15 text-indigo-300 border border-indigo-500/30"
                          : "text-slate-300 hover:text-white hover:bg-white/[0.05]"
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${active ? "text-indigo-400" : "text-slate-400"}`} />
                      {link.name}
                    </Link>
                  );
                })}
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    if (location.pathname !== "/") {
                      navigate("/#features");
                    } else {
                      document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  Capabilities
                </button>
                <button
                  onClick={() => {
                    if (location.pathname !== "/") {
                      navigate("/#how-it-works");
                    } else {
                      document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  How It Works
                </button>
                <button
                  onClick={() => {
                    if (location.pathname !== "/") {
                      navigate("/#faq");
                    } else {
                      document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  FAQ
                </button>
              </>
            )}
          </div>

          {/* Desktop Right User / Actions */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <Link to="/analyze">
                  <Button size="sm" variant="primary" className="gap-2">
                    <Plus className="w-4 h-4" />
                    New Scan
                  </Button>
                </Link>

                <div className="flex items-center gap-3 pl-3 border-l border-white/10">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.07]">
                    <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center text-xs font-bold border border-indigo-500/30">
                      {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </div>
                    <span className="text-sm font-semibold text-slate-200 max-w-[120px] truncate">
                      {user.name || "Member"}
                    </span>
                  </div>

                  <button
                    onClick={handleLogout}
                    title="Log Out"
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors border border-transparent hover:border-rose-500/20 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm" className="gap-1.5">
                    Start Free
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.06] border border-white/[0.08] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-b border-white/[0.08] bg-[#0A0E1A]/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-4 animate-fade-in">
          {user ? (
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] mb-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold border border-indigo-500/30">
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white">{user.name}</span>
                  <span className="text-xs text-slate-400">{user.email}</span>
                </div>
              </div>

              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                      active
                        ? "bg-indigo-500/15 text-indigo-300 border border-indigo-500/30"
                        : "text-slate-300 hover:text-white hover:bg-white/[0.05]"
                    }`}
                  >
                    <Icon className="w-4 h-4 text-indigo-400" />
                    {link.name}
                  </Link>
                );
              })}

              <div className="pt-3 border-t border-white/[0.08] flex gap-2">
                <Link to="/analyze" onClick={() => setIsMenuOpen(false)} className="flex-1">
                  <Button variant="primary" size="md" className="w-full gap-2">
                    <Plus className="w-4 h-4" />
                    New Scan
                  </Button>
                </Link>
                <Button
                  variant="danger"
                  size="md"
                  onClick={handleLogout}
                  className="px-3"
                  title="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="grid grid-cols-1 gap-2 text-slate-300">
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-left px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-white/[0.05]"
                >
                  Capabilities
                </button>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-left px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-white/[0.05]"
                >
                  How It Works
                </button>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-left px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-white/[0.05]"
                >
                  FAQ
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/[0.08]">
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="w-full">
                  <Button variant="secondary" size="md" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)} className="w-full">
                  <Button variant="primary" size="md" className="w-full">
                    Start Free
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
