/* eslint-disable no-unused-vars */
import Navbar from '@/components/Navbar';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Table,
  Checkbox,
  ActionIcon,
  Tooltip,
  Modal,
  Select,
  TextInput,
  Button,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import SearchBar from '../../components/SearchBar';
import EditIcon from '../../assets/icons/EditIcon';
import CheckIcon from '../../assets/icons/CheckIcon';
import PlusIcon from '../../assets/icons/PlusIcon';
import SendToArchiveIcon from '../../assets/icons/SendToArchiveIcon';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '../../assets/icons/DeleteIcon';
import Cookies from 'js-cookie';

EditDepartment.propTypes = {
  setRefresh: PropTypes.func.isRequired,
};

export function EditDepartment({ setRefresh }) {
  // const token = JSON.parse(localStorage.getItem(localStorage.key(1))).id_token;
  const token = Cookies.get('token');
  const [opened, { open, close }] = useDisclosure(false);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedDepartmentName, setSelectedDepartmentName] = useState('');
  useEffect(() => {
    document.title = 'Departments | TWCGateway';
    const getDepartments = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_EXPRESS_BASE_URL}/getAllDepartments`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDepartments(response.data);
        console.log('departments', response.data);
      } catch (error) {
        console.error(
          'Error in fetching departments in Departments page',
          error
        );
      }
    };
    getDepartments();
  }, [opened]);

  const handleSubmit = async () => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_APP_EXPRESS_BASE_URL}/updateDepartmentName`,
        {
          departmentId: selectedDepartment.value,
          newDepartmentName: selectedDepartment.label,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('response', response.data);
      setRefresh(true);
      close();
    } catch (error) {
      console.error('Error in updating department', error);
    }
  };

  return (
    <>
      <Tooltip label="Edit Department Name" openDelay="700">
        <ActionIcon variant="filled" size="xl" color="green" onClick={open}>
          <EditIcon />
        </ActionIcon>
      </Tooltip>
      <Modal
        opened={opened}
        onClose={() => {
          close();
          setSelectedDepartment(null);
          setSelectedDepartmentName('');
        }}
        title="Edit Department"
        centered
      >
        <Select
          label="Choose department"
          data={
            departments.length !== 0 &&
            departments.map(department => ({
              value: String(department.id),
              label: department.name,
            }))
          }
          value={selectedDepartment ? selectedDepartment.value : null}
          onChange={(_value, option) => setSelectedDepartment(option)}
        />
        {selectedDepartment && (
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="mt-5 p-2 bg-gray-200 rounded-lg flex items-end space-x-2">
              <div className="flex-grow">
                <TextInput
                  label="Department Name"
                  value={selectedDepartment ? selectedDepartment.label : ''}
                  onChange={event => {
                    setSelectedDepartment({
                      ...selectedDepartment,
                      label: event.currentTarget.value,
                    });
                    console.log('selectedDepartment', selectedDepartment);
                  }}
                />
              </div>
              <div>
                <ActionIcon type="submit" color="green">
                  <CheckIcon />
                </ActionIcon>
              </div>
            </div>
          </form>
        )}
      </Modal>
    </>
  );
}

AddDepartment.propTypes = {
  setRefresh: PropTypes.func.isRequired,
};

export function AddDepartment({ setRefresh }) {
  // const token = JSON.parse(localStorage.getItem(localStorage.key(1))).id_token;
  const token = Cookies.get('token');
  const [opened, { open, close }] = useDisclosure(false);
  const [departmentName, setDepartmentName] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_EXPRESS_BASE_URL}/addDepartment`,
        {
          name: departmentName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('response', response.data);
      setRefresh(true);
      close();
    } catch (error) {
      console.error('Error in adding department', error);
    }
  };

  return (
    <>
      <Tooltip label="Add Department" openDelay="700">
        <ActionIcon variant="filled" color="green" size="xl" onClick={open}>
          <PlusIcon />
        </ActionIcon>
      </Tooltip>
      <Modal
        title="Add Department"
        centered
        opened={opened}
        onClose={() => {
          close();
          setDepartmentName('');
        }}
      >
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="flex items-end space-x-2 bg-gray-200 p-2 rounded-lg">
            <div className="flex-grow">
              <TextInput
                label="Department Name"
                value={departmentName}
                onChange={event => setDepartmentName(event.currentTarget.value)}
              />
            </div>
            <ActionIcon size="md" color="green" type="submit">
              <CheckIcon />
            </ActionIcon>
          </div>
        </form>
      </Modal>
    </>
  );
}

ArchiveDepartment.propTypes = {
  setRefresh: PropTypes.func.isRequired,
  selectedRows: PropTypes.array.isRequired,
  setSelectedRows: PropTypes.func.isRequired,
};

export function ArchiveDepartment({
  setRefresh,
  selectedRows,
  setSelectedRows,
  departmentId,
}) {
  // const token = JSON.parse(localStorage.getItem(localStorage.key(1))).id_token;
  const token = Cookies.get('token');
  const [isLoading, setIsLoading] = useState(false);
  const [opened, { open, close }] = useDisclosure();
  const [employeesCheck, setEmployeesCheck] = useState(null);

  const handleClick = async () => {
    try {
      setIsLoading(true);
      await axios.patch(
        `${import.meta.env.VITE_APP_EXPRESS_BASE_URL}/archiveDepartments/`,
        { departmentIds: selectedRows },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsLoading(false);
      setRefresh(true);
    } catch (error) {
      console.error('Errored archiving selected users', error);
    }
    setSelectedRows([]);
    close();
  };

  const checkEmployees = async () => {
    try {
      const num = await axios.post(
        `${
          import.meta.env.VITE_APP_EXPRESS_BASE_URL
        }/getDepartmentEmployeesNumber`,
        {
          selectedRows,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('num', num.data.isOkay);
      if (num.data.isOkay === false) {
        setEmployeesCheck(true);
      }
      console.log('ffal;kdjflakdsfj', num.data.isOkay === false);
    } catch (error) {
      console.log('errored checkingEmployees', error);
    }
  };

  return (
    <div>
      <Tooltip
        label={
          selectedRows.length === 0
            ? 'Select Departments to Archive'
            : 'Archive Department'
        }
        openDelay="700"
      >
        <ActionIcon
          variant="filled"
          size="xl"
          color="red"
          disabled={selectedRows.length === 0 ? true : false}
          loading={isLoading}
          onClick={() => {
            open();
            checkEmployees();
          }}
        >
          {/* <SendToArchiveIcon /> */}
          <DeleteIcon />
        </ActionIcon>
      </Tooltip>
      <Modal
        opened={opened}
        onClose={close}
        title="Confirmation"
        centered
        size="auto"
        padding="md"
      >
        {employeesCheck ? (
          // console.log("checkEmployees",checkEmployees)
          <div>
            Cannot Delete! Please remove all assigned employees from the
            department before deleting.
          </div>
        ) : (
          <div>
            <span>Are you sure you want to </span>
            <span className="font-bold">delete </span>
            <span>all selected departments?</span>
            <div className="flex mt-3 justify-between">
              <Button onClick={handleClick} color="red">
                Yes
              </Button>
              <Button onClick={close}>No</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default function Departments() {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  // const token = JSON.parse(localStorage.getItem(localStorage.key(1))).id_token;
  const token = Cookies.get('token');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const getDepartments = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_EXPRESS_BASE_URL}/getAllDepartments`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (
          response.data.message ===
          'No Department Found or All Departments Archived'
        ) {
          setDepartments([]);
          return;
        }
        setDepartments(response.data);
        console.log('departments', response.data);
      } catch (error) {
        console.error(
          'Error in fetching departments in Departments page',
          error
        );
      }
    };
    getDepartments();
    setRefresh(false);
    console.log('selectedRows', selectedRows);
  }, [selectedRows, refresh]);

  const handleRowSelect = departmentId => {
    setSelectedRows(prevState => {
      if (prevState.includes(departmentId)) {
        return prevState.filter(id => id !== departmentId);
      } else {
        return [...prevState, departmentId];
      }
    });
  };

  const handleAllRowSelect = () => {
    if (selectedRows.length === departments.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(departments.map(department => department.id));
    }
  };

  const filteredDepartments =
    departments &&
    departments.filter(department =>
      department.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleNameClick = departmentId => {
    navigate(`/admin/department/${departmentId}`);
  };

  return (
    <div>
      <Navbar />
      <SearchBar
        setSearchTerm={setSearchTerm}
        leftComp1={<EditDepartment setRefresh={setRefresh} />}
        leftComp2={<AddDepartment setRefresh={setRefresh} />}
        leftComp3={
          <ArchiveDepartment
            setRefresh={setRefresh}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
          />
        }
      />
      <div className="flex justify-center bg-white bg-opacity-50 border-2 border-gray-100 p-2 m-5 rounded-lg">
        <div className="w-1/2">
          <Table withTableBorder withColumnBorders className="bg-slate-100">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>
                  <Checkbox
                    checked={selectedRows.length === departments.length}
                    onChange={handleAllRowSelect}
                  />
                </Table.Th>
                <Table.Th>Name</Table.Th>
                <Table.Th>Users</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {filteredDepartments &&
                filteredDepartments.map(department => (
                  <Table.Tr key={department.id}>
                    <Table.Td className="w-1/12">
                      <Checkbox
                        checked={selectedRows.includes(department.id)}
                        onChange={() => handleRowSelect(department.id)}
                      />
                    </Table.Td>
                    <Table.Td
                      className="w-1/2 hover:cursor-pointer hover:bg-purple-500 hover:text-white"
                      onClick={() => {
                        handleNameClick(department.id);
                      }}
                    >
                      {department.name}
                    </Table.Td>
                    <Table.Td className="w-1/2">
                      {department.DepartmentUserMapping.length}
                    </Table.Td>
                  </Table.Tr>
                ))}
            </Table.Tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}
