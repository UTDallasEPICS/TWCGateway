// if no user is being returned, check if the auth0 configuration is for a single page application (SPA).
// Right now, the profile shows the name from the email. However, this should be the name from our database.

import React, { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import {
    Box,
    Heading,
    Text,
    Spinner,
    VStack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Image,
} from '@chakra-ui/react'
import LogoutButton from '../Logout'
import LoginButton from '../LogIn'

const Profile = ({ isOpen, onClose, userRole }) => {
    console.log('userRole from Profile', userRole)
    const { user, isAuthenticated, isLoading } = useAuth0()
    const [profile, setProfile] = useState(null)

    useEffect(() => {
        if (isAuthenticated && user) {
            setProfile(user)
        }
    }, [isAuthenticated, user])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Profile</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack
                        spacing={2}
                        align="center"
                    >
                        {profile ? (
                            <>
                                <Image
                                    src={profile.picture}
                                    alt="Profile Picture"
                                    boxSize="150px"
                                    borderRadius="full"
                                />
                                <Box p={5}>
                                    <Text
                                        fontSize="xl"
                                        fontWeight="bold"
                                    >
                                        Welcome, {profile.name}!
                                    </Text>
                                    <Text
                                        fontSize="md"
                                        color="gray.500"
                                    >
                                        Email: {profile.email}
                                    </Text>
                                    <Text
                                        fontSize="md"
                                        color="gray.500"
                                    >
                                        Role: {userRole}
                                    </Text>
                                </Box>
                                <Box p={5}>
                                    <LogoutButton />
                                </Box>
                            </>
                        ) : (
                            <>
                                <Box>Please log in to view your profile.</Box>
                                <LoginButton />
                            </>
                        )}
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default Profile
