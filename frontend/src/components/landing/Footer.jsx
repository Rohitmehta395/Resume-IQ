import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-100 dark:bg-[#080C14] border-t border-slate-200 dark:border-white/[0.08] transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          {/* Brand info (Span 5) */}
          <div className="md:col-span-5">
            <Link to="/" className="flex items-center gap-2.5 mb-5 group w-fit">
              <img
                src="/favicon.png"
                alt="ResumeIQ"
                className="w-9 h-9 rounded-xl object-contain shadow-xs group-hover:scale-105 transition-transform duration-200"
              />
              <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white font-sans">
                Resume<span className="text-indigo-600 dark:text-indigo-400">IQ</span>
              </span>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm mb-6">
              Precision ATS algorithm simulation and AI career intelligence. Built to help students and high-performing professionals secure top-tier interviews.
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              ENGINE VERSION 2.8.4 // RELEASE
            </p>
          </div>

          {/* Product Links (Span 3) */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-200 uppercase tracking-widest mb-4 font-mono">
              Platform
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/analyze"
                  className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors flex items-center gap-1 group"
                >
                  <span>Scan Resume</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors flex items-center gap-1 group"
                >
                  <span>Candidate Dashboard</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                >
                  Create Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources & Support (Span 4) */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-200 uppercase tracking-widest mb-4 font-mono">
              ATS Compliance
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Our system adheres to standard parsing schemas used by modern hiring platforms including Workday, Greenhouse, Lever, and iCIMS.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10B981]" />
              <span>All Systems Operational // Privacy Encrypted</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} ResumeIQ. All rights reserved.</p>
          <p className="font-mono text-slate-500 dark:text-slate-400">
            Designed for future-proof engineering and executive careers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
