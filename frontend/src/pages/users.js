import React, {useState, useEffect, useRef} from 'react';
import { SearchIcon, CheckIcon, EditIcon, DeleteIcon} from '@chakra-ui/icons';
import { 
    Flex, 
    Spacer, 
    Input, 
    InputGroup, 
    InputLeftElement, 
    Collapse, 
    IconButton, 
    Table, 
    Thead, 
    Tbody, 
    Tr, 
    Th, 
    Td, 
    TableContainer, 
    Button, 
    Select as SelectChakra, 
    AlertDialog, 
    AlertDialogBody, 
    AlertDialogFooter, 
    AlertDialogHeader, 
    AlertDialogContent, 
    AlertDialogOverlay 
} from '@chakra-ui/react';
import Select from 'react-select';
import axios from 'axios';
import InputModal from '../components/Modal/index.js';


const Users = () => {
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

    return (
        <>

            {/*Add and Delete Buttons*/}
            <Flex>

                {/*Add Button*/}
                <InputModal 
                    roles={roles}
                    departments={departments}
                />

                <Spacer />

                {/*Delete All Button*/}
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
                            {/*All results run through this search filter*/}
                            {users.filter(
                                            user => user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                                    user.roleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                    user.departmentName.some(departmentName => departmentName.toLowerCase().includes(searchTerm.toLowerCase()))
                                ).map((user, index) => 
                                    (
                                        <>

                                            {/*
                                                This map is required to generate both Tr elements for each user.

                                                Each row has 2 Tr elements: 
                                                    1. User row
                                                    2. User Task List
                                                        A Tr element that is only visible when the user clicks on the User row.
                                            */}

                                            {/*User row*/}
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
                                                    {/* This will need to implemented with the Task List*/}
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

                                            {/*User Task List*/}
                                            <Tr>

                                                <Td colSpan={7}>

                                                    <Collapse in={openId === user.id} animateOpacity>
                                                        {/* This box makes it look pretty */}
                                                        {/* <Box p="40px" color="white" mt="4" bg="teal.500" rounded="md" shadow="md">
                                                            <p>Null</p>
                                                        </Box> */}
                                                        <p>[TO BE IMPLEMENTED]</p>
                                                    </Collapse>

                                                </Td>

                                            </Tr>

                                        </>
                                    )
                                )
                            }
                        </>
                    </Tbody>
                </Table>
            </TableContainer>

        </>
    );  
}

export default Users;