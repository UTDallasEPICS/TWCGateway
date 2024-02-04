import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/twcgatewaylogoname.svg';
import '../styles/LoginPage.css';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import Cookies from 'js-cookie';

const LoginRedirectPage = () => {
  const navigate = useNavigate();

  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently().then(token => {
        axios
          .post(`http://localhost:5010/checkEmail/`, { email: user.email }, { headers: { Authorization: `Bearer ${token}` } })
          .then(response => {
            Cookies.set('role', response.data.roleName);
            Cookies.set('email', response.data.email);
            if (response.data.roleName === 'Admin') navigate('/admin/users');
            else if (response.data.roleName === 'Supervisor') navigate('/supervisor/users');
            else if (response.data.roleName === 'Employee') navigate('/employee');
            else navigate('/login');
          })
          .catch(error => {
            console.log(error);
            navigate('/login');
          });
      });
    }
  }, [isAuthenticated, user, navigate, getAccessTokenSilently]);
  return (
    <>
      <div className="flex flex-col h-screen justify-center items-center login-gradient-background logo-grow-shrink">
        <img src={logo} alt="logo" style={{ width: '1920px', height: '200px' }} />
      </div>
    </>
  );
};

export default LoginRedirectPage;
