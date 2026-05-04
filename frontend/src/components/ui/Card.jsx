import React from "react";

const Card = ({ children, className = "", hover = false, padding = true }) => {
  return (
    <div
      className={`glass-card rounded-xl border border-white/5 shadow-premium ${hover ? "transition-all duration-300 hover:shadow-premium-hover hover:border-white/10 hover:-translate-y-1" : ""} ${padding ? "p-6" : ""} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
