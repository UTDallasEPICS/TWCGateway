import React from 'react';
import { Button } from '@chakra-ui/react';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
    const { logout } = useAuth0();
    return (
        

        <Button
            colorScheme="red"
            size="lg"
            onClick={() => logout({ returnTo: window.location.origin })}
        >
            Log Out
        </Button>
    );
};

export default LogoutButton;