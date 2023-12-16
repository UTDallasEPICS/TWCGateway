import React from 'react'
import { Box, Text, Heading, Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import LogoutButton from '../Logout'

function Unauthorized() {
    const navigate = useNavigate()

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100vh"
            bgGradient="linear(to-r, teal.500,green.500)"
            color="white"
        >
            <Heading mb={4}>Unauthorized Access</Heading>
            <Text mb={8}>You do not have permission to access this page.</Text>
            {/* <Button colorScheme="teal" onClick={() => navigate('/')}>
                Go to Home
            </Button> */}
            <LogoutButton />
        </Box>
    )
}

export default Unauthorized
