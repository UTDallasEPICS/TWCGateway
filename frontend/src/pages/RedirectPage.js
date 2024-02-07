import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const RedirectPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();
  const role = Cookies.get('role');
  return (
    <div className={`flex `}>
      ...Redirecting
      {isAuthenticated && role === 'Admin' ? navigate('/admin/users') : role === 'Supervisor' ? navigate('/supervisor/users') : role === 'Employee' ? navigate('/employee') : navigate('/login')}
    </div>
  );
};

export default RedirectPage;
