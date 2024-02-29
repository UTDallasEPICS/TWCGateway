import React from 'react';

const Section = ({ children, title }) => {
  return (
    <div 
      className="flex flex-col ml-2 lg:ml-20 mr-2 mt-2 mb-2 p-2 bg-white bg-opacity-20 backdrop-filter backdrop-blur-md border-2 border-white border-opacity-10 rounded-lg shadow-lg"
      
    >
      <h1 className="mb-4 text-white text-2xl font-bold">{title}</h1>
      {children}
    </div>
  );
}

export default Section;