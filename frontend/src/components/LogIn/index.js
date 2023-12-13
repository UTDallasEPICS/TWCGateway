import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@chakra-ui/react';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Button
      colorScheme="teal"
      className="btn btn-primary btn-block"
      onClick={() => loginWithRedirect()}
      size="lg"
      border="2px solid white"
    >
      Log In
    </Button>
  );
};

export default LoginButton;