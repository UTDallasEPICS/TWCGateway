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
        console.log("token", token);
        axios
          .post(`http://localhost:5010/checkEmail/`, { email: user.email }, { headers: { Authorization: `Bearer ${token}` } })
          .then(response => {
            console.log("response in redirect-page", response);
            //wait for 2 seconds
            setTimeout(() => {
              console.log("waited for 2 seconds");
            }, 2000);
            const caseChangedRole = (response.data.role.charAt(0).toUpperCase() + response.data.role.slice(1).toLowerCase());
            Cookies.set('role', caseChangedRole);
            Cookies.set('email', response.data.email);
            if (response.data.role === 'ADMIN') navigate('/admin/users');
            else if (response.data.role === 'SUPERVISOR') navigate('/supervisor/users');
            else if (response.data.role === 'EMPLOYEE') navigate('/employee');
            else navigate('/login');
          })
          .catch(error => {
            console.log("error in redirect-page", error);
            navigate('/login' , { state: { error: error.response} });
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
