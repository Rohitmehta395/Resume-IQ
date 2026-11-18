const Tabs = ({
  tabs = [],
  activeTab,
  onChange,
  className = "",
  size = "md",
}) => {
  const sizeStyles = {
    sm: "p-1 gap-1 text-xs",
    md: "p-1.5 gap-1.5 text-sm",
  };

  const itemSizeStyles = {
    sm: "px-3 py-1.5 rounded-lg",
    md: "px-4 py-2 rounded-xl",
  };

  return (
    <div
      className={`inline-flex items-center rounded-2xl bg-slate-100 border border-slate-200 dark:bg-[#090D16] dark:border-white/[0.08] transition-colors ${
        sizeStyles[size] || sizeStyles.md
      } ${className}`}
      role="tablist"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={`flex items-center gap-2 font-semibold transition-all duration-200 cursor-pointer ${
              itemSizeStyles[size] || itemSizeStyles.md
            } ${
              isActive
                ? "bg-white text-indigo-600 shadow-sm dark:bg-indigo-600 dark:text-white dark:shadow-md dark:shadow-indigo-600/30"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/[0.04]"
            }`}
          >
            {Icon && <Icon className="w-4 h-4 shrink-0" />}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={`text-[11px] font-mono font-bold px-1.5 py-0.5 rounded-md ${
                  isActive
                    ? "bg-indigo-100 text-indigo-700 dark:bg-white/20 dark:text-white"
                    : "bg-slate-200 text-slate-700 dark:bg-white/[0.08] dark:text-slate-400"
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
