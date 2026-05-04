import React from 'react';
import Button from './Button';

const EmptyState = ({ icon: Icon, title, description, actionText, onAction }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center glass-card rounded-[2rem] border-white/5 shadow-2xl">
      {Icon && (
        <div className="p-5 bg-white/5 text-primary/60 rounded-2xl mb-6 backdrop-blur-sm border border-white/5">
          <Icon className="h-10 w-10" />
        </div>
      )}
      <h3 className="text-2xl font-bold text-on-surface mb-3 tracking-tight">{title}</h3>
      <p className="text-on-surface-variant/70 body-md max-w-sm mb-8">{description}</p>
      {actionText && onAction && (
        <Button onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
