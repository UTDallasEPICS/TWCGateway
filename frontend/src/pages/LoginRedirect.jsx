import '@/styles/Login.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import Cookies from 'js-cookie';
import logo from '@/assets/twcglogo.svg';

export default function LoginRedirect({ event }) {
  const { user, isAuthenticated, getAccessTokenSilently, getIdTokenClaims } =
    useAuth0();
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_EXPRESS_BASE_URL}/auth`,
        { email: user.email }
      );
      console.log('response', response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      console.error('Errored out in LoginRedirect -> fetchUser');
    }
  };

  async function handleLogin(token) {
    if (token) {
      console.log('token from login-redirect', token);
      const loggedinUser = await fetchUser();
      console.log('loggedinUser', loggedinUser);
      if (loggedinUser.role === 'ADMIN') {
        navigate('/admin/users');
      } else if (loggedinUser.role === 'SUPERVISOR') {
        navigate('/supervisor');
      } else if (loggedinUser.role === 'EMPLOYEE') {
        navigate(`/onboarding-employee`);
      } else {
        console.error(
          'Errored in LoginRedirect -> useEffect (Neither admin, supervisor, nor employee)'
        );
      }
      Cookies.set('token', token);
      Cookies.set('user', JSON.stringify(loggedinUser));
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      getIdTokenClaims()
        .then(token => {
          handleLogin(token.__raw);
        })
        .catch(error => {
          console.error(
            'Errored out in LoginRedirect -> useEffect -> getAccessTokenSilently',
            error
          );
        });
    } else {
      // console.log('Not authenticated');
      // Cookies.remove('token');
      // Cookies.remove('user');
      // navigate('/');
    }
  }, [isAuthenticated]);

  return (
    <div className="flex flex-col h-screen justify-center items-center gradient-background">
      <div className="bg-white bg-opacity-30 rounded-lg showdow-lg redirect-grow-shrink">
        <img src={logo} alt="TWCGateway Logo" width="700" draggable="false" />
      </div>
    </div>
  );
}
