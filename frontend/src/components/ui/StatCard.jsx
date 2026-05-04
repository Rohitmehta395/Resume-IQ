import React from 'react';
import Card from './Card';

const StatCard = ({ label, value, icon: Icon, trend, color = 'blue' }) => {
  const colors = {
    blue: 'bg-secondary/10 text-secondary',
    emerald: 'bg-tertiary/10 text-tertiary',
    violet: 'bg-primary/10 text-primary',
    amber: 'bg-amber-500/10 text-amber-500',
    red: 'bg-red-500/10 text-red-500',
    indigo: 'bg-primary/10 text-primary',
  };

  return (
    <Card className="flex items-center justify-between border-white/5 bg-white/[0.02]">
      <div>
        <p className="text-[10px] font-bold text-on-surface-variant/50 uppercase tracking-widest mb-2">{label}</p>
        <h3 className="text-3xl font-black text-on-surface tracking-tight">{value}</h3>
        {trend && (
          <p className={`text-[10px] mt-2 font-bold uppercase tracking-wider ${trend.positive ? 'text-tertiary' : 'text-red-500'}`}>
            {trend.positive ? '▲' : '▼'} {trend.value}
          </p>
        )}
      </div>
      {Icon && (
        <div className={`p-3.5 rounded-xl glass-card border-white/10 ${colors[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
      )}
    </Card>
  );
};

export default StatCard;
