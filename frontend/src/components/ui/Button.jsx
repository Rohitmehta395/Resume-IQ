const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  loading = false,
  icon: Icon,
  iconPosition = "left",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#080C14] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none";

  const variants = {
    primary:
      "bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white shadow-sm shadow-indigo-600/25 hover:shadow-indigo-600/40 focus-visible:ring-indigo-500",
    secondary:
      "bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 dark:bg-[#162032] dark:hover:bg-[#1E293B] dark:text-slate-200 dark:hover:text-white dark:border-white/[0.08] dark:hover:border-white/[0.15] focus-visible:ring-slate-400",
    outline:
      "bg-transparent text-indigo-600 hover:text-indigo-700 border border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50/50 dark:text-indigo-400 dark:hover:text-indigo-300 dark:border-indigo-500/40 dark:hover:border-indigo-500/70 dark:hover:bg-indigo-500/10 focus-visible:ring-indigo-500",
    ghost:
      "bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/[0.06] focus-visible:ring-slate-400",
    danger:
      "bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 dark:bg-rose-500/15 dark:text-rose-300 dark:hover:bg-rose-500/25 dark:border-rose-500/30 dark:hover:border-rose-500/50 focus-visible:ring-rose-500",
    success:
      "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300 dark:hover:bg-emerald-500/25 dark:border-emerald-500/30 dark:hover:border-emerald-500/50 focus-visible:ring-emerald-500",
  };

  const sizes = {
    sm: "px-3.5 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-6 py-3.5 text-base gap-2.5",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <svg
          className="animate-spin h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : Icon && iconPosition === "left" ? (
        <Icon className="h-4 w-4 shrink-0" />
      ) : null}

      {children}

      {!loading && Icon && iconPosition === "right" && (
        <Icon className="h-4 w-4 shrink-0" />
      )}
    </button>
  );
};

export default Button;
