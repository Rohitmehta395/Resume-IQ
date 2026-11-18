const Card = ({
  children,
  className = "",
  hover = false,
  padding = true,
  elevation = "default",
  ...props
}) => {
  const elevations = {
    default: "bg-[#0F172A] border-white/[0.08]",
    elevated: "bg-[#162032] border-white/[0.1]",
    subtle: "bg-white/[0.02] border-white/[0.06]",
  };

  const hoverStyles = hover
    ? "transition-all duration-300 hover:border-indigo-500/40 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/50"
    : "";

  return (
    <div
      className={`rounded-2xl border ${elevations[elevation] || elevations.default} ${hoverStyles} ${
        padding ? "p-6 sm:p-7" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
