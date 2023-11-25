import React, {useState, useEffect, useCallback} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, ButtonGroup, Stack } from '@chakra-ui/react'
import {DeleteIcon, AddIcon, Search2Icon} from '@chakra-ui/icons'
import { Container } from '@chakra-ui/react'
import { Flex, Spacer } from '@chakra-ui/react'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import { SearchIcon, CheckIcon, EditIcon} from '@chakra-ui/icons';
import {Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer} from '@chakra-ui/react'
import { Collapse, IconButton} from '@chakra-ui/react';
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
  } from '@chakra-ui/react'
import Select, {components} from 'react-select';
import {Select as SelectChakra } from '@chakra-ui/react'
import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from "@chakra-ui/react"
import {useRef} from 'react';
import {Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverFooter, PopoverArrow, PopoverCloseButton} from '@chakra-ui/react'
import { FormControl, FormLabel } from "@chakra-ui/react";
import {debounch} from 'lodash';
import { useControllableState } from "@chakra-ui/react";
import InputModal from '../components/Modal/index.js';


const Users = () => {

    //const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [departments, setDepartments] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');

    const [openId, setOpenId] = useState(null);

    const [editId, setEditId] = useState(null);
    const [editData, setEditData] = useState({});

    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => setIsOpen(false);
    const cancelRef = React.useRef();

    const searchInputRef = useRef();

    //const [isAdding, setIsAdding] = useState(false);
    //const [formData, setFormData] = useState({name: '', email: '', departmentName: '', roleName: ''});
    
     useEffect(() => {
        fetchUsers();
        fetchRoles();
        fetchDepartments();

        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, []);

    const fetchUsers = async () => {
        try {
            console.log("fetchUsers")
            const response = await axios.get(`http://localhost:5010/users`);
            setUsers(response.data);
        } catch (error) {
            console.log("Error in fetchUsers: ", error);
        }
    };

    const fetchRoles = async () => {
        try {
            const response = await axios.get(`http://localhost:5010/roles`);
            setRoles(response.data);
        } catch (error) {
            console.log("Error in fetchRoles" + error);
        }
    };

    const fetchDepartments = async () => {
        try{
            const response = await axios.get(`http://localhost:5010/departments`);
            setDepartments(response.data);
        } catch (error) {
            console.log("Error in fetchDepartments" + error);
        }
    };

    const handleRowClick = (id) => {
        setOpenId(openId === id ? null : id);
    };

    const handleEditClick = (user) => {
        setEditId(user.id);
        setEditData({name: user.name, departmentName: user.departmentName, roleName: user.roleName});
    };

    const handleCheckClick = async () => {
        //console.log(editData);
        try{
            await axios.put(`http://localhost:5010/user/${editId}`, editData);
            //console.log("editData: " + editData);
            setUsers(prevUsers => {
                const index = prevUsers.findIndex(user => user.id === editId);
                if (index > -1) {
                    return [...prevUsers.slice(0, index), editData, ...prevUsers.slice(index + 1)];
                }
                return prevUsers;
            });
            setEditId(null);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteClick = async (id) => {
        try{
            await axios.delete(`http://localhost:5010/user/${id}`);
            //setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
            fetchUsers();
        } catch (error) {
            console.log(error);
        }
        onClose();
    }

    const handleDeleteAllClick = async () => {
        setIsOpen(true);
    }

    const handleDeleteAllConfirmClick = async () => {
        try{
            await axios.delete(`http://localhost:5010/users`);
            fetchUsers();
        } catch (error) {
            console.log(error);
        }
        onClose();
    }

    const handleDeleteAllAlert = () => {
        return (
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
                        This will delete all the users.
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
        )
    }

    const handleAddUser = async () => {
        let response;
        try {
            console.log("before post")
            response = await axios.post(`http://localhost:5010/user`, {});
            console.log("after post")
        } catch (error) {
            console.log("Error during post", error);
        }
        try {
            const newUser = await axios.get(`http://localhost:5010/user/${response.data.id}`);
            setUsers([newUser.data, ...users])
            setEditId(newUser.data.id);
        } catch (error) {
            console.log("Error during get", error);
        }
    }

    return (
        <>

        {/*Add and Delete Buttons*/}
        <Flex>

            <InputModal 
                roles={roles}
                departments={departments}
            />

            <Spacer />

            <Button 
                leftIcon={<DeleteIcon />} 
                colorScheme='red' 
                variant='solid'
                onClick={(e) => {
                    handleDeleteAllClick();
                }}
            >
                Delete All Users
            </Button>
            {handleDeleteAllAlert()}
            
        
        </Flex>

        {/*Search Bar*/}
        <Flex 
            p={4}
        >
            <InputGroup>

                <InputLeftElement 
                    pointerEvents="none"
                >
                    <SearchIcon 
                        color="gray.300" 
                    />
                </InputLeftElement>

                <Input 
                    ref={searchInputRef}
                    type="text" 
                    placeholder="Search" 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={(event) => event.target.select()}
                />
            </InputGroup>
        </Flex>

        {/*Table of all Users*/}
        <TableContainer>
            <Table 
                variant='striped'
                size='sm'
                colorScheme='gray'
            >

                {/*Column Names - 7 columns*/}
                <Thead>
                    <Tr>
                        <Th>#</Th>
                        <Th>Name</Th>
                        <Th>Department</Th>
                        <Th>Role</Th>
                        <Th>Status</Th>
                        <Th></Th> {/* Edit */}
                        <Th></Th> {/* Delete */}
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
                                        <Tr 
                                            key={index} 
                                            onClick={() => handleRowClick(user.id)} 
                                            style={{
                                                cursor:'pointer',
                                            }}
                                        >

                                            {/*#*/}
                                            <Td>
                                                {index + 1}
                                            </Td>

                                            {/*Name*/}
                                            <Td>
                                                {editId === user.id ? 
                                                    (
                                                        <Input 
                                                            type="text" 
                                                            value={editData.name} 
                                                            onClick={(e) => e.stopPropagation()}
                                                            onChange={(e) => setEditData({...editData, name:e.target.value})} 
                                                        />
                                                    ) 
                                                    : 
                                                    (
                                                        user.name
                                                    )
                                                }
                                            </Td>

                                            {/*Department*/}
                                            <Td>
                                                {editId === user.id ? 
                                                    (
                                                        <div onClick={e => e.stopPropagation()}>
                                                            <Select 
                                                            isMulti
                                                            value={editData.departmentName?.map(name => ({ label: name, value: name })) || []}
                                                            options={departments.map(department => ({ label: department.name, value: department.name }))}
                                                            className="basic-multi-select"
                                                            classNamePrefix="select"
                                                            onChange={(selectedOptions) => {
                                                                const selectedDepartments = selectedOptions.map(option => option.value);
                                                                setEditData({...editData, departmentName:selectedDepartments});
                                                            }}
                                                            />
                                                        </div>
                                                    ) 
                                                    : 
                                                    (
                                                        user.departmentName && user.departmentName.length > 0 ? user.departmentName.join(', ') : 'NA'
                                                    )
                                                }
                                            </Td>

                                            {/*Role*/}
                                            <Td>
                                                {editId === user.id ? 
                                                    (
                                                        <SelectChakra 
                                                            value={editData.roleName} 
                                                            onClick={(e) => e.stopPropagation()}
                                                            onChange={(e) => setEditData({ ...editData, roleName:e.target.value })} 
                                                        >

                                                            {roles.map((role) => (
                                                                <option 
                                                                    key={role.id} 
                                                                    value={role.roleName}
                                                                >

                                                                    {role.roleName}

                                                                </option>
                                                            ))}

                                                        </SelectChakra>
                                                    ) 
                                                    : 
                                                    (
                                                        user.roleName
                                                    )
                                                }
                                            </Td>

                                            {/*Status*/}
                                            <Td>
                                                Null
                                            </Td>

                                            {/* Edit */}
                                            <Td>
                                                <IconButton 
                                                    icon={editId === user.id ? <CheckIcon /> : <EditIcon />} 
                                                    onClick={
                                                        (e) => {
                                                            e.stopPropagation();
                                                            if (editId === user.id){
                                                                handleCheckClick();
                                                            } else {
                                                                handleEditClick(user);
                                                            }
                                                        }
                                                    } 
                                                />
                                            </Td>

                                            {/* Delete */} 
                                            <Td>
                                                <IconButton 
                                                    icon={<DeleteIcon />}
                                                    colorScheme='red'
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDeleteClick(user.id);
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

export default Users;