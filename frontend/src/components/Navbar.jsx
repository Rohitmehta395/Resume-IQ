import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  User,
  LogOut,
  Menu,
  X,
  LayoutDashboard,
  Target,
  UserRoundSearch,
  House,
} from "lucide-react";
import Button from "./ui/Button";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsMenuOpen(false);
  };

  const navLinks = [
    {
      name: "Home",
      path: "/",
      icon: House,
    },
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
      protected: true,
    },
    { name: "Analyze", path: "/analyze", icon: Target, protected: true },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-br from-primary to-secondary p-2 rounded-xl group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-primary/30">
              <UserRoundSearch className="w-6 h-6 text-white fill-white/20" />
            </div>
            <div className="flex flex-col">
                <span className="text-xl font-black text-on-surface tracking-tighter leading-none">
                RESUME <span className="text-secondary">IQ</span>
                </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {user &&
              navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                    isActive(link.path)
                      ? "bg-primary/10 text-primary shadow-sm shadow-primary/5"
                      : "text-on-surface-variant hover:text-on-surface hover:bg-white/5"
                  }`}
                >
                  <link.icon
                    className={`w-4 h-4 mr-2.5 ${isActive(link.path) ? "text-primary" : "text-on-surface-variant/50"}`}
                  />
                  {link.name}
                </Link>
              ))}

            {user ? (
              <div className="flex items-center ml-4 pl-4 border-l border-white/10">
                <div className="flex flex-col items-end mr-4">
                  <span className="text-sm font-semibold text-on-surface leading-none">
                    {user.name}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-on-surface-variant hover:text-red-500 hover:bg-red-500/10"
                  icon={LogOut}
                />
              </div>
            ) : (
              <div className="flex items-center space-x-3 ml-4">
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="text-on-surface-variant">
                    Log In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>


          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-xl text-slate-500 hover:bg-slate-50"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden glass-nav border-t border-white/5 px-4 py-6 space-y-4 shadow-2xl animate-fade-in">
          {user ? (
            <div className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center px-4 py-3 rounded-2xl text-base font-semibold ${
                    isActive(link.path)
                      ? "bg-primary/10 text-primary"
                      : "text-on-surface-variant"
                  }`}
                >
                  <link.icon className="w-5 h-5 mr-3" />
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 mt-4 border-t border-white/10">
                <div className="flex items-center justify-between px-4 mb-4">
                  <div>
                    <p className="text-[10px] font-bold text-on-surface-variant/50 uppercase tracking-widest">
                      Logged in as
                    </p>
                    <p className="text-sm font-bold text-on-surface">
                      {user.name}
                      <User className="w-5 h-5 mr-3" />
                    </p>
                  </div>
                </div>
                <Button
                  variant="danger"
                  className="w-full justify-start"
                  onClick={handleLogout}
                  icon={LogOut}
                >
                  Logout
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full"
              >
                <Button variant="secondary" className="w-full">
                  Log In
                </Button>
              </Link>
              <Link
                to="/register"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full"
              >
                <Button className="w-full">Get Started Free</Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
