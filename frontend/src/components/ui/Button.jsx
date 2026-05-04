import React from "react";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  loading = false,
  icon: Icon,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-primary text-white hover:brightness-110 shadow-lg shadow-primary/20 focus:ring-primary",
    secondary:
      "glass-card text-on-surface border-primary/20 hover:bg-white/10 hover:border-primary/40 focus:ring-primary/30",
    outline:
      "bg-transparent text-primary border border-primary/50 hover:bg-primary/10 focus:ring-primary",
    ghost:
      "bg-transparent text-secondary hover:bg-secondary/10 focus:ring-secondary/20",
    danger:
      "bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20 focus:ring-red-500",
    success:
      "bg-tertiary/10 text-tertiary border border-tertiary/20 hover:bg-tertiary/20 focus:ring-tertiary",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-7 py-3.5 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
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
      ) : Icon ? (
        <Icon className={`${children ? "mr-2" : ""} h-5 w-5`} />
      ) : null}
      {children}
    </button>
  );
};

export default Button;
