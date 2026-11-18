const Card = ({
  children,
  className = "",
  hover = false,
  padding = true,
  elevation = "default",
  ...props
}) => {
  const elevations = {
    default:
      "bg-white border-slate-200 shadow-sm text-slate-900 dark:bg-[#0F172A] dark:border-white/[0.08] dark:shadow-xl dark:shadow-black/40 dark:text-slate-100",
    elevated:
      "bg-slate-50 border-slate-200 shadow text-slate-900 dark:bg-[#162032] dark:border-white/[0.1] dark:shadow-2xl dark:text-slate-100",
    subtle:
      "bg-slate-50/70 border-slate-200/80 text-slate-900 dark:bg-white/[0.02] dark:border-white/[0.06] dark:text-slate-100",
  };

  const hoverStyles = hover
    ? "transition-all duration-300 hover:border-indigo-400 hover:-translate-y-0.5 hover:shadow-lg dark:hover:border-indigo-500/40 dark:hover:shadow-xl dark:hover:shadow-black/50"
    : "";

  return (
    <div
      className={`rounded-2xl border transition-colors ${elevations[elevation] || elevations.default} ${hoverStyles} ${
        padding ? "p-6 sm:p-7" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
