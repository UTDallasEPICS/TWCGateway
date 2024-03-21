import React from 'react';

const Section = ({ children, title, extraStyling, editButton, opacity }) => {
  if (!opacity) {
    return (
      <div
        className={`bg-opacity-20 flex flex-col ml-2 lg:ml-20 mr-3 mt-2 mb-2 p-2 bg-white  backdrop-filter backdrop-blur-md border-2 border-white border-opacity-10 rounded-lg shadow-lg ${extraStyling}`}
      >
        <div className="flex justify-between items-center">
          {title && (
            <h1 className="mb-4 text-white text-2xl font-bold">{title}</h1>
          )}
          {editButton}
        </div>
        {children}
      </div>
    );
  } else {
    return (
      <div
        className={`bg-opacity-100 flex flex-col ml-2 lg:ml-20 mr-3 mt-2 mb-2 p-2 bg-purple-500  backdrop-filter backdrop-blur-md border-2 border-white border-opacity-10 rounded-lg shadow-lg ${extraStyling}`}
      >
        <div className="flex justify-between items-center">
          {title && (
            <h1 className="mb-4 text-white text-2xl font-bold">{title}</h1>
          )}
          {editButton}
        </div>
        {children}
      </div>
    );
  }
};

export default Section;
