import React, { useState } from 'react';
import Button from '../Button';
import { useNavigate } from 'react-router-dom';
import UsersIcon from '../../icons/UsersIcon';
import DepartmentsIcon from '../../icons/DepartmentsIcon';
import MenuIcon from '../../icons/MenuIcon';
import CrossIcon from '../../icons/CrossIcon';
import ArchiveBoxIcon from '../../icons/ArchiveBoxIcon';
import { animated, useSpring } from 'react-spring';
import ProfileModal from '../ProfileModal';
import Cookies from 'js-cookie';
import '../../styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentPage, setCurrentPage] = useState('');

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
    <>
      <div className={`flex flex-col h-full fixed lg:justify-between p-2 navbar-styling hidden lg:block`}>
        <div className="lg:h-1/3"></div>
        <div className="flex flex-col justify-center items-center space-y-4 lg:h-1/3">
          {/* Users */}
          <Button
            extraStyling={`py-3 px-3`}
            onClick={() => {
              if (Cookies.get('role') === 'Admin') {
                navigate('/admin/users');
                setCurrentPage('/admin/users');
              } else {
                navigate('/supervisor/users');
                setCurrentPage('/supervisor/users');
              }
            }}
            tooltip="Users"
          >
            <UsersIcon />
          </Button>

          {/* Departments */}
          <Button
            extraStyling={`py-3 px-3`}
            onClick={() => {
              if (Cookies.get('role') === 'Admin') {
                navigate('/admin/departments');
                setCurrentPage('/admin/departments');
              } else {
                navigate('/supervisor/departments');
                setCurrentPage('/supervisor/departments');
              }
            }}
            tooltip="Departments"
          >
            <DepartmentsIcon className="h-6 w-6" />
          </Button>

          {/* Archive */}
          <Button
            extraStyling={`py-3 px-3`}
            onClick={() => {
              if (Cookies.get('role') === 'Admin') {
                navigate('/admin/archive');
                setCurrentPage('/admin/archive');
              } else {
                navigate('/supervisor/archive');
                setCurrentPage('/supervisor/archive');
              }
            }}
            tooltip="Archive"
          >
            <ArchiveBoxIcon className="h-6 w-6" />
          </Button>
        </div>

        {/* Profile */}
        <div className="lg:h-1/3 items-bottom flex flex-col justify-end">
          <ProfileModal isExpanded={isExpanded} />
        </div>
      </div>

      <div className={`fixed bottom-0 z-10 p-2 h-auto w-full fixed block lg:hidden navbar-styling`}>
        <div className="flex flex-row justify-between">
          <div className="lg:h-1/3"></div>
          <div className="flex flex-row justify-center space-x-4 items-center lg:h-1/3">
            {/* Users */}
            <Button
              extraStyling={`py-3 px-3`}
              onClick={() => {
                if (Cookies.get('role') === 'Admin') {
                  navigate('/admin/users');
                  setCurrentPage('/admin/users');
                } else {
                  navigate('/supervisor/users');
                  setCurrentPage('/supervisor/users');
                }
              }}
              tooltip="Users"
            >
              <UsersIcon />
            </Button>

            {/* Departments */}
            <Button
              extraStyling={`py-3 px-3`}
              onClick={() => {
                if (Cookies.get('role') === 'Admin') {
                  navigate('/admin/departments');
                  setCurrentPage('/admin/departments');
                } else {
                  navigate('/supervisor/departments');
                  setCurrentPage('/supervisor/departments');
                }
              }}
              tooltip="Departments"
            >
              <DepartmentsIcon className="h-6 w-6" />
            </Button>

            {/* Archive */}
            <Button
              extraStyling={`py-3 px-3`}
              onClick={() => {
                if (Cookies.get('role') === 'Admin') {
                  navigate('/admin/archive');
                  setCurrentPage('/admin/archive');
                } else {
                  navigate('/supervisor/archive');
                  setCurrentPage('/supervisor/archive');
                }
              }}
              tooltip="Archive"
            >
              <ArchiveBoxIcon className="h-6 w-6" />
            </Button>
          </div>

          {/* Profile */}
          <div className="lg:h-1/3 items-bottom flex flex-col justify-end">
            <ProfileModal isExpanded={isExpanded} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
