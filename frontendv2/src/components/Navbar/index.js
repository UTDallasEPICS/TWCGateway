import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UsersIcon from '../../icons/UsersIcon';
import DepartmentsIcon from '../../icons/DepartmentsIcon';
import ProfileIcon from '../../icons/ProfileIcon';
import MenuIcon from '../../icons/MenuIcon';
import CrossIcon from '../../icons/CrossIcon';
import ArchiveBoxIcon from '../../icons/ArchiveBoxIcon';
import { animated, useSpring } from 'react-spring';
import ProfileModal from '../ProfileModal';

const Navbar = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const iconTransition = useSpring({
    transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
    config: {
      tension: 0, // Adjust tension for rotation speed
      friction: 5, // Adjust friction for rotation speed
    },
  });

  const handleMenuClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`flex flex-col items-start fixed h-full bg-warrenBlueDark bg-opacity-30 text-white justify-between p-5 group overflow-hidden`}
      style={{
        backgroundColor: '#0c3f4f',
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.3' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
      }}
    >
      {/* Menu */}
      <button
        onClick={handleMenuClick}
        className={`flex flex-row items-center active:bg-gray-700 rounded`}

      >
        <animated.div
          style={iconTransition}
          className="transition-transform"
        >
          {isExpanded ? (
            <CrossIcon className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </animated.div>
      </button>

      <div className="flex flex-col items-start gap-y-10">
        {/* Users */}
        {/* Expanded Button */}
        <div
          className={`flex items-center px-1 ${
            isExpanded
              ? 'button w-25 h-8 bg-blue-500 rounded-lg cursor-pointer select-none active:translate-y-2  active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841] active:border-b-[0px] transition-all duration-100 [box-shadow:0_10px_0_0_#1b6ff8,0_15px_0_0_#1b70f841] border-b-[1px] border-blue-400'
              : 'hidden'
          }`}
        >
          <UsersIcon className="h-6 w-6" />
          <span className="ml-3 inline-block whitespace-nowrap">Users</span>
        </div>
        {/* Collapsed Button */}
        <div
          className={`flex items-center px-1 ${
            isExpanded
              ? 'hidden'
              : 'button w-8 h-8 bg-blue-500 rounded-lg cursor-pointer select-none active:translate-y-2  active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841] active:border-b-[0px] transition-all duration-100 [box-shadow:0_10px_0_0_#1b6ff8,0_15px_0_0_#1b70f841] border-b-[1px] border-blue-400'
          }`}
        >
          <UsersIcon className="h-6 w-6" />
        </div>

        {/* Departments */}
        {/* Expanded Button */}
        <div
          className={`flex items-center px-1 ${
            isExpanded
              ? 'button w-30 h-8 bg-blue-500 rounded-lg cursor-pointer select-none active:translate-y-2  active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841] active:border-b-[0px] transition-all duration-100 [box-shadow:0_10px_0_0_#1b6ff8,0_15px_0_0_#1b70f841] border-b-[1px] border-blue-400'
              : 'hidden'
          }`}
        >
          <DepartmentsIcon className="h-6 w-6" />
          <span className="ml-3 inline-block whitespace-nowrap">Departments</span>
        </div>
        {/* Collapsed Button */}
        <div
          className={`flex items-center px-1 ${
            isExpanded
              ? 'hidden'
              : 'button w-8 h-8 bg-blue-500 rounded-lg cursor-pointer select-none active:translate-y-2  active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841] active:border-b-[0px] transition-all duration-100 [box-shadow:0_10px_0_0_#1b6ff8,0_15px_0_0_#1b70f841] border-b-[1px] border-blue-400'
          }`}
        >
          <DepartmentsIcon className="h-6 w-6" />
        </div>

        {/* Archive */}
        {/* Expanded Button */}
        <div
          className={`flex items-center px-1 ${
            isExpanded
              ? 'button w-25 h-8 bg-blue-500 rounded-lg cursor-pointer select-none active:translate-y-2  active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841] active:border-b-[0px] transition-all duration-100 [box-shadow:0_10px_0_0_#1b6ff8,0_15px_0_0_#1b70f841] border-b-[1px] border-blue-400'
              : 'hidden'
          }`}
        >
          <ArchiveBoxIcon className="h-6 w-6" />
          <span className="ml-3 inline-block whitespace-nowrap">Archive</span>
        </div>
        {/* Collapsed Button */}
        <div
          className={`flex items-center px-1 ${
            isExpanded
              ? 'hidden'
              : 'button w-8 h-8 bg-blue-500 rounded-lg cursor-pointer select-none active:translate-y-2  active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841] active:border-b-[0px] transition-all duration-100 [box-shadow:0_10px_0_0_#1b6ff8,0_15px_0_0_#1b70f841] border-b-[1px] border-blue-400'
          }`}
        >
          <ArchiveBoxIcon className="h-6 w-6" />
        </div>
      </div>

      {/* Profile */}
      {/* Expanded Button */}
      {/* <div
          className={`flex items-center px-1 ${
            isExpanded
              ? 'button w-25 h-8 bg-blue-500 rounded-lg cursor-pointer select-none active:translate-y-2  active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841] active:border-b-[0px] transition-all duration-100 [box-shadow:0_10px_0_0_#1b6ff8,0_15px_0_0_#1b70f841] border-b-[1px] border-blue-400'
              : 'hidden'
          }`}
          onClick={() => {
            console.log("Button clicked");
          }}
        >
          <ProfileIcon className="h-6 w-6" />
          <span className="ml-3 inline-block whitespace-nowrap">Profile</span>
      </div> */}
      {/* Collapsed Button */}
      {/* <div
          className={`flex items-center px-1 ${
            isExpanded
              ? 'hidden'
              : 'button w-8 h-8 bg-blue-500 rounded-lg cursor-pointer select-none active:translate-y-2  active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841] active:border-b-[0px] transition-all duration-100 [box-shadow:0_10px_0_0_#1b6ff8,0_15px_0_0_#1b70f841] border-b-[1px] border-blue-400'
          }`}
          onClick={() => {
            console.log("Button clicked");
          }}
        >
          <ProfileIcon className="h-6 w-6" />
      </div> */}
      <ProfileModal isExpanded={isExpanded}/>
    </div>
  );
};

export default Navbar;