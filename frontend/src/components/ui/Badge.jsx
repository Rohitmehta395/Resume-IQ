const Badge = ({ children, variant = "indigo", size = "sm", className = "", dot = false }) => {
  const variants = {
    indigo: "bg-indigo-500/10 text-indigo-300 border-indigo-500/25",
    sky: "bg-sky-500/10 text-sky-300 border-sky-500/25",
    emerald: "bg-emerald-500/10 text-emerald-300 border-emerald-500/25",
    amber: "bg-amber-500/10 text-amber-300 border-amber-500/25",
    rose: "bg-rose-500/10 text-rose-300 border-rose-500/25",
    slate: "bg-white/[0.04] text-slate-300 border-white/[0.08]",
    violet: "bg-indigo-500/10 text-indigo-300 border-indigo-500/25",
    blue: "bg-sky-500/10 text-sky-300 border-sky-500/25",
    red: "bg-rose-500/10 text-rose-300 border-rose-500/25",
    gray: "bg-white/[0.04] text-slate-300 border-white/[0.08]",
  };

  const dotColors = {
    indigo: "bg-indigo-400",
    sky: "bg-sky-400",
    emerald: "bg-emerald-400",
    amber: "bg-amber-400",
    rose: "bg-rose-400",
    slate: "bg-slate-400",
    violet: "bg-indigo-400",
    blue: "bg-sky-400",
    red: "bg-rose-400",
    gray: "bg-slate-400",
  };

  const sizes = {
    sm: "px-2.5 py-0.5 text-xs font-semibold",
    md: "px-3 py-1 text-xs font-bold",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border transition-colors ${
        variants[variant] || variants.indigo
      } ${sizes[size] || sizes.sm} ${className}`}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            dotColors[variant] || dotColors.indigo
          }`}
        />
      )}
      {children}
    </span>
  );
};

export default Badge;
