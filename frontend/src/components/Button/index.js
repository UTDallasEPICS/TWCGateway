import React from 'react';

const colorClasses = {
  blue: 'bg-blue-500 hover:bg-blue-700',
  cyan: 'bg-cyan-500 hover:bg-cyan-700',
  indigo: 'bg-indigo-500 hover:bg-indigo-700',
  purple: 'bg-purple-500 hover:bg-purple-700',
  red: 'bg-red-500 hover:bg-red-700',
  rose: 'bg-rose-500 hover:bg-rose-700',
  green: 'bg-green-500 hover:bg-green-700',
  gray: 'bg-gray-500 hover:bg-gray-700',
};

const Button = ({ children, onClick, extraStyling, tooltip, color }) => {
  const colorClass = colorClasses[color] || colorClasses.blue; // Default to blue if color prop is not recognized

  return (
    <button 
      onClick={onClick}
      className={`${colorClass} text-white font-bold rounded shadow-lg ${extraStyling}`}
      title={tooltip}
    >
      {children}
    </button>
  );
}

export default Button;