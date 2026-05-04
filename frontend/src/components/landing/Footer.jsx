import { Sparkles } from "lucide-react";
import { FaGithub, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-16 px-4 bg-surface border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2.5 mb-6 group">
              <div className="bg-gradient-to-br from-primary to-secondary p-1.5 rounded-lg group-hover:scale-105 transition-transform shadow-lg shadow-primary/20">
                <Sparkles className="w-5 h-5 text-white fill-white/20" />
              </div>
              <span className="text-xl font-bold text-on-surface tracking-tight">
                ResumeMatch <span className="text-secondary font-extrabold">AI</span>
              </span>
            </Link>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
              Empowering the next generation of professionals with AI-driven career insights and ATS optimization tools.
            </p>
            {/* <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full glass-card flex items-center justify-center border-white/5 text-on-surface-variant hover:text-primary transition-colors">
                    <FaXTwitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full glass-card flex items-center justify-center border-white/5 text-on-surface-variant hover:text-primary transition-colors">
                    <FaLinkedinIn className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full glass-card flex items-center justify-center border-white/5 text-on-surface-variant hover:text-primary transition-colors">
                    <FaGithub className="w-5 h-5" />
                </a>
            </div> */}
          </div>

          <div>
            <h5 className="font-bold text-on-surface mb-6 uppercase text-xs tracking-widest">Product</h5>
            <ul className="space-y-4">
              <li><Link to="/analyze" className="text-sm text-on-surface-variant hover:text-secondary transition-colors">ATS Checker</Link></li>
              <li><Link to="/dashboard" className="text-sm text-on-surface-variant hover:text-secondary transition-colors">Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-on-surface mb-6 uppercase text-xs tracking-widest">Resources</h5>
            <ul className="space-y-4">
              <li><a href="#" className="text-sm text-on-surface-variant hover:text-secondary transition-colors">ATS Guide</a></li>
              <li><a href="#" className="text-sm text-on-surface-variant hover:text-secondary transition-colors">Resume Tips</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-on-surface mb-6 uppercase text-xs tracking-widest">Support</h5>
            <ul className="space-y-4">
              <li><a href="#" className="text-sm text-on-surface-variant hover:text-secondary transition-colors">Help Center</a></li>
              <li><a href="#" className="text-sm text-on-surface-variant hover:text-secondary transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 text-center">
          <p className="text-xs text-on-surface-variant/50">
            © 2026 Resume IQ. Built for future-proof careers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
