const Textarea = ({
  label,
  error,
  helperText,
  className = "",
  rows = 5,
  id,
  ...props
}) => {
  const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider"
        >
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        rows={rows}
        className={`w-full px-4 py-3 bg-white dark:bg-[#090D16] border ${
          error
            ? "border-rose-400 dark:border-rose-500/60 focus:border-rose-500 focus:ring-rose-500/20"
            : "border-slate-300 hover:border-slate-400 dark:border-white/[0.09] dark:hover:border-white/[0.18] focus:border-indigo-600 dark:focus:border-indigo-500/70 focus:ring-indigo-500/15 dark:focus:ring-indigo-500/20"
        } rounded-xl text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-4 transition-all duration-200 resize-y leading-relaxed font-sans`}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">{helperText}</p>
      )}
    </div>
  );
};

export default Textarea;
