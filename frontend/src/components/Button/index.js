import React from 'react';

const Button = ({ children, onClick, extraStyling, tooltip, color = 'blue' }) => {
  return (
    <button 
      onClick={onClick}
      className={`bg-${color}-500 hover:bg-${color}-700 text-white font-bold rounded shadow-lg ${extraStyling}`}
      title={tooltip}
    >
      {children}
    </button>
  );
}

export default Button;