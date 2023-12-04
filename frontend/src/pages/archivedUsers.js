import React, { useEffect, useState, useRef } from 'react';
import { 
    Button, 
    Flex, 
    IconButton, 
    Spacer, 
    Input, 
    InputGroup, 
    InputLeftElement, 
    Table, 
    Thead, 
    Tbody, 
    Tr, 
    Th, 
    Td, 
    TableContainer, 
    Collapse,  
    AlertDialog, 
    AlertDialogBody, 
    AlertDialogFooter, 
    AlertDialogHeader, 
    AlertDialogContent, 
    AlertDialogOverlay 
} from '@chakra-ui/react';
import { RepeatClockIcon, DeleteIcon, SearchIcon } from '@chakra-ui/icons';
import axios from 'axios';

function ArchivedUsers() {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [users, setUsers] = React.useState([]);
    const [openId, setOpenId] = React.useState(null);
    const [isOpen, setIsOpen] = React.useState(false);
    const onClose = () => setIsOpen(false);
    const cancelRef = React.useRef();
    const searchInputRef = useRef();

    useEffect(() => {
        fetchUsers();
        if (searchInputRef.current) {
            searchInputRef.current.focus();
          }
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5010/users/archived');
            setUsers(response.data);
        } catch (error) {
            console.log("Error in fetchUsers: ", error);
        }
    };

    const handleRowClick = (id) => {
        if (openId === id) {
            setOpenId(null);
        } else {
                setOpenId(id);
            }
    }

    const handleRestoreClick = async (id) => {
        try {
            const response = await axios.put(`http://localhost:5010/user/archived/${id}`, {archived: false});
            fetchUsers();
        } catch (error) {
            console.log("Error in handleRestoreClick: ", error)
        }
    }

    const handleRestoreAllClick = async () => {
        try {
            const response = await axios.put(`http://localhost:5010/users/archived`, {archived: false});
            fetchUsers();
        } catch (error) {
            console.log("Error in handleRestoreAllClick: ", error)
        }
    }

    const handleDeleteAllClick = async () => {
        setIsOpen(true);
    }

    const handleDeleteAllConfirmClick = async () => {
        console.log("handleDeleteAllConfirmClick is getting called");
        try {
            const response = await axios.delete(`http://localhost:5010/users/archived`);
            fetchUsers();
        } catch (error) {
            console.log("Error in handleDeleteAllConfirmClick: ", error)
        }
        onClose();
    }

    return (
        <>
            {/* Top Buttons*/}
            <Flex>

                {/*Restore All Users*/}
                <Button 
                    leftIcon={<RepeatClockIcon />} 
                    colorScheme='teal' 
                    variant='solid'
                    onClick={(e) => {
                        handleRestoreAllClick(); 
                    }}
                >
                    Restore All Users
                </Button>

                <Spacer />

                {/*Delete All Users*/}
                <Button 
                    leftIcon={<DeleteIcon />} 
                    colorScheme='red' 
                    variant='solid'
                    onClick={handleDeleteAllClick}
                >
                    Permanently Delete All Users
                </Button>
                {/*Delete All Users - Confirmation Dialog*/}
                <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Are you sure?
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        This will delete all users permanently. This action cannot be undone.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                        Cancel
                        </Button>
                        <Button colorScheme="red" onClick={handleDeleteAllConfirmClick} ml={3}>
                        Delete
                        </Button>
                    </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
                </AlertDialog>

            </Flex>

            {/*Search Bar*/}
            <Flex p={4}>
                <InputGroup>

                    {/*Search Icon*/}
                    <InputLeftElement 
                        pointerEvents="none"
                    >
                        <SearchIcon 
                            color="gray.300" 
                        />
                    </InputLeftElement>

                    {/*Search Input*/}
                    <Input 
                        type="text" 
                        placeholder="Search" 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={(event) => event.target.select()}
                    />

                </InputGroup>
            </Flex>

            {/*Table*/}
            <TableContainer>
                <Table 
                    variant='striped'
                    size='sm'
                    colorScheme='gray'
                >

                    {/*Column Names - 6 columns*/}
                    <Thead>
                        <Tr>
                            <Th>#</Th>
                            <Th>Name</Th>
                            <Th>Department</Th>
                            <Th>Role</Th>
                            <Th>Status</Th>
                            <Th></Th> {/* Restore */}
                        </Tr>
                    </Thead>

                    {/*Table Body - rows of table generated from database*/}
                    <Tbody>
                    
                        <>  
                            {users.filter(
                                            user => user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                                    user.roleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                    user.departmentName.some(departmentName => departmentName.toLowerCase().includes(searchTerm.toLowerCase()))
                                ).map((user, index) => 
                                    (

                                        <>
                                            {/*User row*/}
                                            <Tr 
                                                key={index} 
                                                onClick={() => handleRowClick(user.id)} 
                                                style={{
                                                    cursor:'pointer',
                                                    //height: `${user.departmentName.length * 30}px`
                                                }}
                                            >

                                                {/*#*/}
                                                <Td>
                                                    {index + 1}
                                                </Td>

                                                {/*Name*/}
                                                <Td>
                                                    {user.name}
                                                </Td>

                                                {/*Department*/}
                                                
                                                <Td>
                                                    {user.departmentName && user.departmentName.length > 0 ? user.departmentName.join(', ') : 'NA'}
                                                </Td>

                                                {/*Role*/}
                                                <Td>
                                                    {user.roleName}
                                                </Td>

                                                {/*Status*/}
                                                <Td>
                                                    Null
                                                </Td>

                                                {/* Restore */} 
                                                <Td>
                                                    <IconButton
                                                        icon={<RepeatClockIcon />}
                                                        colorScheme='teal'
                                                        variant='solid'
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleRestoreClick(user.id);
                                                        }}
                                                    />
                                                </Td>

                                                {/* Delete */}
                                                <Td>
                                                    <IconButton
                                                        icon={<DeleteIcon />}
                                                        colorScheme='red'
                                                        variant='solid'
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setIsOpen(true);
                                                        }}
                                                    />
                                                </Td>
                                
                                            </Tr>

                                            {/*User page*/}
                                            <Tr>

                                                <Td colSpan={7}>
                                                    <Collapse in={openId === user.id} animateOpacity>
                                                        {/* <Box p="40px" color="white" mt="4" bg="teal.500" rounded="md" shadow="md">
                                                            <p>Null</p>
                                                        </Box> */}
                                                        <p>[TO BE IMPLEMENTED]</p>
                                                    </Collapse>
                                                </Td>

                                            </Tr>
                                        </>
                                    ))
                            }
                        </>
                        
                    </Tbody>
                    
                </Table>
            </TableContainer>
        </>
    );
}

export default ArchivedUsers;