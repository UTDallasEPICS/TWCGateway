import React from 'react';

function Popup({ trigger, setTrigger, children }) {
  return (
    trigger ? (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-lg mx-4">
          <button 
            className="absolute top-2 right-3 text-gray-600 hover:text-red-600 focus:outline-none" 
            onClick={() => setTrigger(false)}>
            ✕
          </button>
          {children}
        </div>
      </div>
    ) : ""
  );
}

export default Popup;
