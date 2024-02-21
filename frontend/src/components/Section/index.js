import React from 'react';

const Section = ({ children }) => {
  return (
    <div className="flex flex-col ml-2 lg:ml-20 mr-2 mt-2 mb-2 p-2 bg-white bg-opacity-20 backdrop-filter backdrop-blur-md border-2 border-white border-opacity-10 rounded-lg shadow-lg">
      {children}
    </div>
  );
}

export default Section;