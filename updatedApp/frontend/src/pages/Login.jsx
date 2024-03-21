import '@/styles/Login.css';
import { Button } from '@mantine/core';
import { useAuth0 } from '@auth0/auth0-react';
import logo from '@/assets/twcglogo.svg';

export default function Login() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="flex flex-col space-y-4 h-screen justify-center items-center gradient-background">
      <div className="bg-white bg-opacity-30 rounded-lg showdow-lg">
        <img
          src={logo}
          alt="TWCGateway Logo"
          width="700"
          draggable="false"
        />
      </div>
      <Button
        variant="filled"
        color="violet"
        onClick={loginWithRedirect}
      >
        Login
      </Button>
    </div>
  );
}
