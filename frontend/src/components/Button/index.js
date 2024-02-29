import React from 'react';

const colorClasses = {
  blue: 'bg-blue-500 hover:bg-blue-700',
  red: 'bg-red-500 hover:bg-red-700',
  green: 'bg-green-500 hover:bg-green-700',
  gray: 'bg-gray-500 hover:bg-gray-700',
};

const Button = ({ children, onClick, extraStyling, tooltip, color = 'blue' }) => {
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