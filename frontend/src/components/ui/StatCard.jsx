import Card from "./Card";

const StatCard = ({
  label,
  value,
  unit = "",
  icon: Icon,
  description,
  trend,
  color = "indigo",
}) => {
  const colorStyles = {
    indigo: {
      bg: "bg-indigo-500/10",
      border: "border-indigo-500/20",
      text: "text-indigo-400",
    },
    sky: {
      bg: "bg-sky-500/10",
      border: "border-sky-500/20",
      text: "text-sky-400",
    },
    emerald: {
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      text: "text-emerald-400",
    },
    amber: {
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
      text: "text-amber-400",
    },
    rose: {
      bg: "bg-rose-500/10",
      border: "border-rose-500/20",
      text: "text-rose-400",
    },
    blue: {
      bg: "bg-sky-500/10",
      border: "border-sky-500/20",
      text: "text-sky-400",
    },
  };

  const scheme = colorStyles[color] || colorStyles.indigo;

  return (
    <Card hover className="relative overflow-hidden flex flex-col justify-between">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
            {label}
          </p>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono">
              {value}
            </span>
            {unit && (
              <span className="text-lg font-bold text-slate-400">
                {unit}
              </span>
            )}
          </div>
        </div>
        {Icon && (
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${scheme.bg} ${scheme.border} ${scheme.text}`}
          >
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {(description || trend) && (
        <div className="flex items-center justify-between text-xs pt-3 border-t border-white/[0.06]">
          {description && <span className="text-slate-400">{description}</span>}
          {trend && (
            <span
              className={`font-semibold ml-auto flex items-center gap-1 ${
                trend.positive ? "text-emerald-400" : "text-rose-400"
              }`}
            >
              {trend.positive ? "↑" : "↓"} {trend.value}
            </span>
          )}
        </div>
      )}
    </Card>
  );
};

export default StatCard;
