import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';

function AdminArchivePage() {

  useEffect(() => {
    
  }, []);  


  return (
    <div>
      <div className="flex">
        <Navbar />
      </div>

      <div className="flex-grow mt-2 mr-2 ml-20">
        {/*Users*/}
        <div className="ml-15 mr-2 mt-2 p-6 rounded-lg bg-gray-900">
          {/*Section Heading*/}
          <h1 className="mb-4 text-white text-2xl font-bold">Users</h1>
        </div>

        {/*Departments*/}
        <div className="ml-15 mr-2 mt-2 p-6 rounded-lg bg-gray-900">
          {/*Section Heading*/}
          <h1 className="mb-4 text-white text-2xl font-bold">Departments</h1>
        </div>
      </div>
    </div>
  );
}

export default AdminArchivePage;
