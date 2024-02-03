import React from 'react';
import logo from '../images/twcgatewaylogoname.svg';
import '../styles/LoginPage.css';
import { useAuth0 } from '@auth0/auth0-react';

const LoginPage = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <>
      <div className="flex flex-col h-screen justify-center items-center login-gradient-background">
        <img src={logo} alt="" style={{ width: '1920px', height: '200px' }} />
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

export default LoginPage;
