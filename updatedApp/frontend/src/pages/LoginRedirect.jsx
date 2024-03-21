import '@/styles/Login.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import Cookies from 'js-cookie';
import logo from '@/assets/twcglogo.svg';

export default function LoginRedirect() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_EXPRESS_BASE_URL}/auth`,
        { email: user.email }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      console.error('Errored out in LoginRedirect -> fetchUser');
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently().then(async (token) => {
        Cookies.set('token', token);
        const loggedinUser = await fetchUser();
        if (loggedinUser.role === 'ADMIN') {
          navigate('/admin/users');
        } else if (loggedinUser.role === 'SUPERVISOR') {
          navigate('/supervisor/placeholder');
        } else if (loggedinUser.role === 'EMPLOYEE') {
          navigate('/employee/placeholder');
        } else {
          console.error(
            'Errored in LoginRedirect -> useEffect (Neither admin, supervisor, nor employee)'
          );
        }
      });
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  return (
    <div className="flex flex-col h-screen justify-center items-center gradient-background">
      <div className="bg-white bg-opacity-30 rounded-lg showdow-lg redirect-grow-shrink">
        <img
          src={logo}
          alt="TWCGateway Logo"
          width="700"
          draggable="false"
        />
      </div>
    </div>
  );
}
