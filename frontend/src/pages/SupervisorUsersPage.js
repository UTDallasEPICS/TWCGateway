import React from 'react';
import Navbar from '../components/Navbar';

const SupervisorPage = () => {
  return (
    <>
      <div className="flex">
        <Navbar />
        <div className="flex-grow mt-2 mr-2 ml-20">Hello from SupervisorUsersPage</div>
      </div>
    </>
  );
};

export default SupervisorPage;
