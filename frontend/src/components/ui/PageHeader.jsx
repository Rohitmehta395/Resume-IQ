import React from 'react';

const PageHeader = ({ title, subtitle, actions }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 gap-6">
      <div>
        <h1 className="headline-lg text-on-surface">{title}</h1>
        {subtitle && <p className="mt-2 text-on-surface-variant body-md">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-4">{actions}</div>}
    </div>
  );
};

export default PageHeader;
