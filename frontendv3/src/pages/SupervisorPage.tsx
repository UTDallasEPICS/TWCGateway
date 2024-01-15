import React from 'react';
import Navbar from '../components/Navbar'

const SupervisorPage: React.FC = () => {
  return (
    <div className="flex">
      <div>
        <Navbar />
      </div>
      <div>
        <h1 className="text-2xl text-center">Supervisor Page</h1>
      </div>
    </div>
  )
};

export default SupervisorPage;
