import React from 'react';

const Textarea = ({ label, error, className = '', rows = 4, ...props }) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-semibold text-on-surface-variant mb-2 ml-1 uppercase tracking-wider">
          {label}
        </label>
      )}
      <textarea
        rows={rows}
        className={`w-full px-4 py-3 bg-white/5 border ${error ? 'border-red-500/50 focus:ring-red-500/20' : 'border-white/10 focus:ring-primary/20 focus:border-primary/50'} rounded-xl text-on-surface placeholder:text-on-surface-variant/20 focus:outline-none focus:ring-4 transition-all duration-200 resize-none`}
        {...props}
      />
      {error && <p className="mt-2 text-xs font-medium text-red-500 ml-1">{error}</p>}
    </div>
  );
};

export default Textarea;
