import React, {useEffect} from 'react';
import logo from '../images/twcgatewaylogoname.svg';
import '../styles/LoginPage.css';
import Button from '../components/Button';
import { useAuth0 } from '@auth0/auth0-react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';


const LoginPage = () => {
  const { loginWithRedirect } = useAuth0();
  const location = useLocation();
  const error = location.state?.error;

  useEffect(() => {
    console.log("error", error);
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <>
      <div className="flex flex-col h-screen justify-center items-center login-gradient-background">
        <img src={logo} alt="" style={{ width: '1920px', height: '200px' }} />
        <Button 
          onClick={() => loginWithRedirect()}
          extraStyling="py-2 px-4 my-10"
        >
          Login
        </Button>
      </div>
    </>
  );
};

export default LoginPage;
