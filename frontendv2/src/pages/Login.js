import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/wcgateway-logo.png';
import './Login.css';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import Cookies from 'js-cookie';

const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      axios
        .post(`http://localhost:5010/checkEmail/`, { email: user.email })
        .then(response => {
          console.log(response);
          console.log(response.data.roleName);
          Cookies.set('role', response.data.roleName);
          if (response.data.roleName === 'Admin') navigate('/admin/users');
          else if (response.data.roleName === 'Supervisor')
            navigate('/supervisor');
          else if (response.data.roleName === 'Employee') navigate('/employee');
          else navigate('/login');
        })
        .catch(error => {
          console.log(error);
          navigate('/login');
        });
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <>
      <div className="flex flex-col h-screen justify-center items-center login-gradient-background">
        <img src={logo} alt="logo" className="w-1/4" />
        <div
          className="flex button my-10 text-white justify-center items-center w-20 h-10 bg-blue-500 rounded-lg cursor-pointer select-none active:translate-y-2  active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841] active:border-b-[0px] transition-all duration-100 [box-shadow:0_10px_0_0_#1b6ff8,0_15px_0_0_#1b70f841] border-b-[1px] border-blue-400"
          onClick={() => loginWithRedirect()}
        >
          Login
        </div>
      </div>
    </>
  );
};

export default Login;
