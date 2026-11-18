const LoadingSpinner = ({ size = "md", color = "primary", className = "" }) => {
  const sizes = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-2",
    lg: "h-12 w-12 border-3",
  };

  const colors = {
    primary: "border-indigo-500 border-t-transparent",
    secondary: "border-sky-500 border-t-transparent",
    white: "border-white border-t-transparent",
    muted: "border-slate-500 border-t-transparent",
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`animate-spin rounded-full ${sizes[size] || sizes.md} ${
          colors[color] || colors.primary
        }`}
      />
    </div>
  );
};

export default LoadingSpinner;
