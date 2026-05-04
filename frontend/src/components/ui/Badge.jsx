import React from "react";

const Badge = ({ children, variant = "gray", className = "" }) => {
  const variants = {
    blue: "bg-secondary/10 text-secondary border-secondary/20",
    emerald: "bg-tertiary/10 text-tertiary border-tertiary/20",
    red: "bg-red-500/10 text-red-500 border-red-500/20",
    amber: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    violet: "bg-primary/10 text-primary border-primary/20",
    gray: "bg-white/5 text-on-surface-variant border-white/10",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
