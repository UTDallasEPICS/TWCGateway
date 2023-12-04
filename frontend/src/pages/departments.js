import  React, {useState, useEffect}  from 'react';
import { 
    Button, 
    Spacer, 
    Flex, 
    TableContainer, 
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,   
    TableCaption,
    Input,
    Search,
    InputGroup,
    InputLeftElement,
    Collapse,
    IconButton,

} from '@chakra-ui/react';
import { 
    AddIcon, 
    DeleteIcon, 
    SearchIcon, 
    ChevronDownIcon,
    ChevronUpIcon,
    EditIcon,
    CheckIcon,
} from '@chakra-ui/icons';
import axios from 'axios';


const Departments = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const searchInputRef = React.useRef();
    const [departments, setDepartments] = useState([]);
    const [openId, setOpenId] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [editId, setEditId] = useState(null);
    const [departmentName, setDepartmentName] = useState("");

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = () => {
        fetch('http://localhost:5010/departments')
        .then(res => res.json())
        .then(data => {
            setDepartments(data);
        })
        .catch(err => {
            console.log(err);
        })
    }

    const handleRowClick = (id) => {
        if (openId === id) {
            setOpenId(null);
        } else {
            setOpenId(id);
        }

        if (selectedRow === id) {
            setSelectedRow(null);
        } else {
            setSelectedRow(id);
        }
    }

    const handleEditClick = (department) => {
        setEditId(department.id);
        setDepartmentName(department.name);
    }

    const handleNameChange = (e) => {
        setDepartmentName(e.target.value);
    }

    const handleCheckClick = async (departmentName) => {
        try {
            await axios.put(`http://localhost:5010/department/${editId}`, {name: departmentName});
            fetchDepartments();
            setEditId(null);
        } catch (error) {
            console.error(error);
        }
    }

    const handleDeleteClick = (id) => {
        try {
            axios.put(`http://localhost:5010/department/archive/${id}`);
            fetchDepartments();
        } catch (error) {
            console.error(error);
        }
    }


    // const handleDeleteClick = async (id) => {
    //     try {
    //         await axios.delete(`http://localhost:5010/department/${id}`);
    //         fetchDepartments();
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

//////////////////////////////////////////////////////////////////////////  
    
    return (
        <>
            <Flex p={4}>
                <Button
                    leftIcon={<AddIcon />}
                    colorScheme="teal"
                    variant="solid"
                >
                    Add Department
                </Button>
                
                <Spacer />

                <Button
                    leftIcon={<DeleteIcon />}
                    colorScheme="red"
                    variant="solid"
                >
                    Delete All Departments
                </Button>
            </Flex>
            
            {/*Search Bar*/}
            <Flex p={1}>
                <InputGroup>

                    {/*Search Icon*/}
                    <InputLeftElement pointerEvents="none">
                        <SearchIcon color="gray.300" />
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

            <TableContainer>
                <Table variant="striped" size="sm" colorScheme="gray">
                    <Thead>
                        <Tr>
                            <Th></Th>
                            <Th>Department Name</Th>
                            <Th># of Tasks</Th>
                            <Th># of Employees</Th>
                            <Th>Edit Name</Th> {/*Edit*/}
                            <Th>Delete</Th> {/*Delete*/}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {departments.filter(department => 
                            department.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            department.tasks.length.toString().includes(searchTerm) ||
                            department.users.length.toString().includes(searchTerm)
                        ).map((department) => (
                            <>
                            <Tr key={department.id} onClick={() => handleRowClick(department.id)} style={{cursor:'pointer'}}>
                                <Td>
                                    {selectedRow === department.id ? <ChevronUpIcon boxSize={6} /> : <ChevronDownIcon boxSize={6} />}
                                </Td>
                                <Td>
                                    {editId === department.id ? (
                                        <Input 
                                            type="text" 
                                            value={departmentName} 
                                            onChange={handleNameChange} 
                                            onClick={(e) => {e.stopPropagation();}}
                                        />
                                    ) : (
                                        department.name
                                    )}
                                </Td>
                                <Td>{department.tasks.length}</Td>
                                <Td>{department.users.length}</Td>
                                <Td>
                                    <IconButton 
                                        icon={editId === department.id ? <CheckIcon /> : <EditIcon />} 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (editId === department.id){
                                                handleCheckClick(departmentName);
                                            } else {
                                                handleEditClick(department);
                                            }
                                        }} 
                                    />
                                </Td>
                                <Td>
                                    <IconButton 
                                        icon={<DeleteIcon />}
                                        colorScheme='red'
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteClick(department.id);
                                        }} 
                                    />
                                </Td>
                            </Tr>

                            <Tr>

                                <Td colSpan={7}>

                                    <Collapse in={openId === department.id} animateOpacity>
                                        {/* This box makes it look pretty */}
                                        {/* <Box p="40px" color="white" mt="4" bg="teal.500" rounded="md" shadow="md">
                                            <p>Null</p>
                                        </Box> */}
                                        <p>[TO BE IMPLEMENTED]</p>
                                    </Collapse>

                                </Td>

                            </Tr>
                            </>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    );  
}

export default Departments;