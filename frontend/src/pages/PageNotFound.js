import React from 'react';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <div className="bg-white p-6 rounded shadow">
        <h1 className="text-6xl font-extrabold text-blue-700 tracking-tighter">404</h1>
        <p className="mt-2 text-3xl font-medium text-gray-600 tracking-wide">Page Not Found</p>
        <div
          className="flex button my-10 text-white justify-center items-center w-20 h-10 bg-blue-500 rounded-lg cursor-pointer select-none active:translate-y-2  active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841] active:border-b-[0px] transition-all duration-100 [box-shadow:0_10px_0_0_#1b6ff8,0_15px_0_0_#1b70f841] border-b-[1px] border-blue-400 mx-auto"
          onClick={() => navigate('/login')}
        >
          Back
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
