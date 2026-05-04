import React from 'react';

const Input = ({ label, error, icon: Icon, className = '', ...props }) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-semibold text-on-surface-variant mb-2 ml-1 uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="relative group">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40 group-focus-within:text-primary transition-colors">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          className={`w-full ${Icon ? 'pl-12' : 'px-4'} py-3 bg-transparent border ${
            error 
              ? 'border-red-500/50 focus:ring-red-500/20' 
              : 'border-white/10 focus:border-primary/50 hover:border-white/20'
          } rounded-xl text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:ring-4 transition-all duration-300`}
          {...props}
        />
      </div>
      {error && <p className="mt-2 text-xs font-medium text-red-500 ml-1">{error}</p>}
    </div>
  );
};

export default Input;
