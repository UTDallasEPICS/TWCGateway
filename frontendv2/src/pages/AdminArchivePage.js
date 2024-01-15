import React from 'react';
import Navbar from '../components/Navbar';

function AdminArchivePage() {
  return (
    <div>
      <div className="flex">
        <Navbar />
      </div>

      <div className="flex-grow mt-2 mr-2 ml-20">
        <p>Admin Archive Page</p>
      </div>
    </div>
  );
}

export default AdminArchivePage;
