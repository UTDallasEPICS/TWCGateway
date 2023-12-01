
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import LogIn from '../LogIn';
import Logout from '../Logout';
import { Box, Center, Image, VStack, Input, Button, Flex, Spacer, Alert } from '@chakra-ui/react';
import logo from '../../images/wcgateway-logo.png';
import { chakra } from '@chakra-ui/react';
import axios from 'axios';
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const AnimatedBox = chakra('div', {
  baseStyle: {
    minHeight: "100vh",
    backgroundSize: "200% 200%",
    backgroundImage: "linear-gradient(45deg, teal, green)",
    animation: "Gradient 10s ease-out infinite"
  }
});

const LoginPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading, error } = useAuth0();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchRole = async (email) => {
      try {
        const response = await axios.get(`http://localhost:5010/checkEmail/${email}`);
        console.log("response.data", response.data);
        return response.data;
      } catch (error) {
        <Alert status="error">
          <p>There is no such user in the database</p>
        </Alert>
      }
    };

    if (isAuthenticated) {
      setProfile(user);
      Cookies.set('auth0', JSON.stringify(user))
      console.log("user", user);
      if (user.email) {
        fetchRole(user.email)
          .then((role) => {
            console.log("role", role.roleName);
            if (role.roleName === "Admin") {
              return(
                navigate("/users")
              )
            }
            else if (role.roleName === "Supervisor") {
              return(
                navigate("/users") //change this
              )
            }
            else if (role.roleName === "Employee") {
              return(
                navigate("/users") //change this
              )
            }
          },
        );
      }
    }
  }, [isAuthenticated, user, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AnimatedBox>
      <Center h="100vh">
        <Flex direction="column" align="center">

          <Box 
            borderWidth="3px" 
            borderColor="purple" 
            bg="" 
            p="3" 
            borderRadius="md"
          >
            <Image src={logo} alt="The-Warren-Center-Gateway-Logo" />
          </Box>

          <Box mt={4}>
            <LogIn />
          </Box>

        </Flex>
      </Center>
    </AnimatedBox>
  );
};

export default LoginPage;
