/* eslint-disable react-hooks/exhaustive-deps */
//Imports
import Navbar from '@/components/Navbar';
import {
  ActionIcon,
  Tooltip,
  TextInput,
  Button,
  MultiSelect,
  Select,
  Modal,
  LoadingOverlay,
  Box,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import AddUserIcon from '@/assets/icons/AddUserIcon';
import SendToArchiveIcon from '@/assets/icons/SendToArchiveIcon';
import EditIcon from '@/assets/icons/EditIcon';
import SearchBar from '@/components/SearchBar';
import OnboardingEmployees from '@/components/OnboardingEmployees';
import Supervisors from '@/components/Supervisors';
import Admins from '@/components/Admins';
// ------------------------------------------------------------- //
//AddUser
AddUser.propTypes = {
  token: PropTypes.string.isRequired,
  setReloadData: PropTypes.func,
};

export function AddUser({ token, setReloadData }) {
  const [opened, { open, close }] = useDisclosure();
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    departments: [],
    tasks: [],
  });

  useEffect(() => {
    const fetchDeps = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_EXPRESS_BASE_URL}/getAllDepartments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDepartments(response.data);
      // console.log('response', response.data);
    };
    fetchDeps();
  }, [token]);

  const handleChange = (e, field) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  };

  const handleRoleChange = (_value, option) => {
    if (option) {
      setFormData({
        ...formData,
        role: option.value,
      });
    } else {
      setFormData({
        ...formData,
        role: '',
      });
    }
  };

  const handleDepartmentChange = (selectedOptions) => {
    setFormData({
      ...formData,
      departments: selectedOptions
        ? selectedOptions.map((option) => option)
        : [],
    });
  };

  const handleTaskChange = (selectedOptions) => {
    console.log('selectedOptions', selectedOptions);
    setFormData({
      ...formData,
      tasks: selectedOptions ? selectedOptions.map((option) => option) : [],
    });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.role) {
      alert('Please fill out all the fields.');
      return;
    }

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    const checkEmail = await axios.post(
      `${import.meta.env.VITE_APP_EXPRESS_BASE_URL}/checkEmail`,
      { email: formData.email }
    );
    if (checkEmail.data.email === formData.email) {
      alert('This email is already in use.');
      return;
    }

    if (formData.role === 'EMPLOYEE') {
      try {
        await axios.post(
          `${import.meta.env.VITE_APP_EXPRESS_BASE_URL}/addEmployee`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.error(`Failed adding employee to the database.\n ${error}`);
        alert(`Failed adding onboarding employee to the database.\n ${error}`);
        return;
      }
    }

    if (formData.role === 'SUPERVISOR' && formData.tasks.length === 0) {
      alert('Please select tasks for Supervisor');
      return;
    }
    console.log('formData', formData);

    if (formData.role === 'SUPERVISOR') {
      try {
        await axios.post(
          `${import.meta.env.VITE_APP_EXPRESS_BASE_URL}/addSupervisor`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.error(`Failed adding supervisor to the database. \n ${error}`);
        alert(`Failed adding supervisor to the database. \n ${error}`);
        return;
      }
    }

    if (formData.role === 'ADMIN') {
      try {
        await axios.post();
      } catch (error) {
        console.error(`Failed adding admin to the database. \n ${error}`);
        alert(`Failed adding admin to the database. \n ${error}`);
        return;
      }
    }

    close();
    setFormData({ name: '', email: '', role: '', departments: [], tasks: [] });
    setReloadData(true);
  };

  return (
    <>
      <Tooltip
        label="Add User"
        openDelay="700"
        onClick={open}
      >
        <ActionIcon
          variant="filled"
          size="xl"
          color="green"
        >
          <AddUserIcon />
        </ActionIcon>
      </Tooltip>
      <Modal
        opened={opened}
        onClose={close}
        title="Add User"
        centered
        size="auto"
        trapFocus
        closeOnEscape
        closeOnClickOutside={false}
      >
        <TextInput
          label="Name"
          withAsterisk
          onChange={(e) => handleChange(e, 'name')}
        />
        <TextInput
          label="Email"
          withAsterisk
          onChange={(e) => handleChange(e, 'email')}
        />
        <Select
          label="Role"
          placeholder="Pick value"
          data={[
            { value: 'EMPLOYEE', label: 'Onboarding Employee' },
            { value: 'SUPERVISOR', label: 'Supervisor' },
            { value: 'ADMIN', label: 'Admin' },
          ]}
          clearable
          withAsterisk
          onChange={handleRoleChange}
        />
        {formData.role === 'EMPLOYEE' ? (
          <MultiSelect
            label="Departments"
            withAsterisk
            searchable
            nothingFoundMessage="No such department. Create one in the Departments page."
            hidePickedOptions
            clearable
            data={departments.map((department) => {
              return {
                value: department.id.toString(),
                label: department.name,
              };
            })}
            onChange={handleDepartmentChange}
          />
        ) : formData.role === 'SUPERVISOR' ? (
          <MultiSelect
            label="Tasks"
            withAsterisk
            searchable
            nothingFoundMessage="No such task. Create one in the Departments page."
            hidePickedOptions
            clearable
            data={departments.map((department) => {
              return {
                group: department.name,
                items: department.DepartmentTaskMapping.map((taskMapping) => {
                  return {
                    value: taskMapping.task.id.toString(),
                    label: taskMapping.task.desc,
                  };
                }),
              };
            })}
            onChange={handleTaskChange}
          />
        ) : null}
        {formData.departments.length !== 0 || formData.tasks.length !== 0 ? (
          <div className="flex justify-center mt-10">
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        ) : null}
      </Modal>
    </>
  );
}
// ------------------------------------------------------------- //
//EditUser
EditUser.propTypes = {
  token: PropTypes.string.isRequired,
  setReloadData: PropTypes.func,
};

export function EditUser({ token }) {
  const [opened, { open, close }] = useDisclosure();
  const [allUsers, setAllUsers] = useState([]);
  const [allDeps, setAllDeps] = useState([]);
  const [isFetchingUsers, setIsFetchingUsers] = useState(false);
  const [isFetchingDeps, setIsFetchingDeps] = useState(false);
  const [isFetchingUser, setIsFetchingUser] = useState(false);
  const [userData, setUserData] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: null,
    departments: [],
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    role: '',
    departments: '',
  });

  useEffect(() => {
    console.log('useeffect formData', formData);
  }, [formData]);

  const fetchUsersAndDeps = async () => {
    try {
      setIsFetchingUsers(true);
      const responseUsers = await axios.get(
        `${import.meta.env.VITE_APP_EXPRESS_BASE_URL}/getAllUsers`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAllUsers(responseUsers.data);
      console.log('responseUsers.data', responseUsers.data);
      setIsFetchingUsers(false);
      setIsFetchingDeps(true);
      const responseDeps = await axios.get(
        `${import.meta.env.VITE_APP_EXPRESS_BASE_URL}/getAllDepartments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAllDeps(responseDeps.data);
      console.log('responseDeps.data', responseDeps.data);
      setIsFetchingDeps(false);
    } catch (error) {
      console.error('Error fetching all users', error);
    }
  };

  const fetchUserData = async (userId) => {
    if (userId === null) {
      setFormData({
        name: '',
        email: '',
        role: null,
        departments: [],
      });
    } else {
      try {
        setIsFetchingUser(true);
        const res = await axios.get(
          `${import.meta.env.VITE_APP_EXPRESS_BASE_URL}/getUser/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserData(res.data);
        setFormData({
          name: res.data.name,
          email: res.data.email,
          role: res.data.role,
          departments: res.data.DepartmentUserMapping.map((dep) => {
            return { value: dep.department.id.toString() };
          }),
        });
        setIsFetchingUser(false);
        console.log('usedata res.data', res.data);
      } catch (error) {
        console.error(`Error fetching user's data`, error);
        setUserData([]);
        setFormData([
          {
            name: '',
            email: '',
            role: null,
            departments: [],
          },
        ]);
        setIsFetchingUser(false);
      }
    }
  };

  const handleUpdate = async () => {
    console.log('formData', formData);
    if (!formData.name || !formData.email || !formData.role) {
      alert('Please fill out all the fields.');
      return;
    }
    if (formData.role === 'EMPLOYEE' && formData.departments.length === 0) {
      alert('Please select departments for Employee');
      return;
    }
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (formData.role === 'EMPLOYEE') {
      try {
        await axios.put(
          `${import.meta.env.VITE_APP_EXPRESS_BASE_URL}/updateEmployee/${
            userData.id
          }`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error(`Failed updating employee to the database.\n ${error}`);
        alert(
          `Failed updating onboarding employee to the database.\n ${error}`
        );
        return;
      }
    }
  };

  return (
    <>
      <Tooltip
        label="Edit User"
        openDelay="700"
      >
        <ActionIcon
          variant="filled"
          size="xl"
          color="green"
          onClick={() => {
            open();
            fetchUsersAndDeps();
            console.log('allusers', allUsers);
          }}
        >
          <EditIcon />
        </ActionIcon>
      </Tooltip>
      <Modal
        opened={opened}
        onClose={() => {
          console.log('form data', formData);
          close();
          setUserData([]);
          setFormData({
            name: '',
            email: '',
            role: null,
            departments: [],
          });
        }}
        title="Edit User"
        centered
        size="auto"
        trapFocus
        closeOnEscape
        closeOnClickOutside={false}
      >
        <Box>
          <LoadingOverlay
            visible={isFetchingUsers || isFetchingDeps || isFetchingUser}
            zIndex={1000}
            overlayProps={{ radius: 'sm', blur: 2 }}
          />
          <Select
            label="User to Edit"
            placeholder="Pick User"
            searchable
            nothingFoundMessage="No such user"
            data={allUsers.map((user) => {
              return {
                value: user.id.toString(),
                label: user.name,
              };
            })}
            onChange={(value) => fetchUserData(value)}
            clearable
          />

          <div className="flex flex-col p-2 mt-2 mb-2 rounded-md border-gray-900 border-2">
            <TextInput
              label="Name"
              defaultValue={formData.name}
              disabled={formData.name.length === 0 ? true : false}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <TextInput
              label="Email"
              defaultValue={formData.email}
              disabled={formData.email.length === 0 ? true : false}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <Select
              label="Role"
              data={[
                { value: 'EMPLOYEE', label: 'Onboarding Employee' },
                { value: 'SUPERVISOR', label: 'Supervisor' },
                { value: 'ADMIN', label: 'Admin' },
              ]}
              value={formData.role}
              clearable
              disabled={formData.role === null ? true : false}
              onChange={(_value, option) => {
                if (option) {
                  setFormData({ ...formData, role: option.value });
                } else {
                  setFormData({ ...formData, role: '' });
                }
              }}
            />
            {formData.role === 'EMPLOYEE' && formData.departments ? (
              <MultiSelect
                label="Departments"
                data={allDeps.map((dep) => {
                  return {
                    value: dep.id.toString(),
                    label: dep.name,
                  };
                })}
                defaultValue={formData.departments.map((dep) => dep.value)}
                searchable
                nothingFoundMessage="No such department. Create it in the Departments page."
                hidePickedOptions
                clearable
                disabled={formData.departments === null ? true : false}
                onChange={(selectedOptions) => {
                  setFormData({
                    ...formData,
                    departments: {
                      value: selectedOptions.map((option) => option),
                    },
                  });
                }}
              />
            ) : null}
          </div>
          <div className="flex justify-center">
            <Button
              color="green"
              onClick={handleUpdate}
            >
              Update
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}
// ------------------------------------------------------------- //
//Archive Selected Button
ArchiveSelectedUsers.propTypes = {
  allSelectedRows: PropTypes.array,
  setAllSelectedRows: PropTypes.func,
  setReloadData: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

export function ArchiveSelectedUsers({
  allSelectedRows,
  setAllSelectedRows,
  setReloadData,
  token,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [opened, { open, close }] = useDisclosure();

  const handleClick = async () => {
    try {
      setIsLoading(true);
      await axios.patch(
        `${import.meta.env.VITE_APP_EXPRESS_BASE_URL}/archiveUsers/`,
        { allSelectedUsers: allSelectedRows },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsLoading(false);
      setReloadData(true);
    } catch (error) {
      console.error('Errored archiving selected users', error);
    }
    setAllSelectedRows([]);
    close();
  };

  return (
    <div>
      <Tooltip
        label={allSelectedRows.length === 0 ? 'Select Rows' : 'Archive Users'}
        openDelay="700"
      >
        <ActionIcon
          variant="filled"
          size="xl"
          color="gray"
          disabled={allSelectedRows.length === 0 ? true : false}
          loading={isLoading}
          onClick={open}
        >
          <SendToArchiveIcon />
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
        <span>Are you sure you want to </span>
        <span className="font-bold">archive </span>
        <span>all selected users?</span>
        <div className="flex mt-3 justify-between">
          <Button
            onClick={handleClick}
            color="red"
          >
            Yes
          </Button>
          <Button onClick={close}>No</Button>
        </div>
      </Modal>
    </div>
  );
}
// ------------------------------------------------------------- //
export default function Users() {
  const [selectedAdms, setSelectedAdms] = useState([]);
  const [selectedSups, setSelectedSups] = useState([]);
  const [selectedEmps, setSelectedEmps] = useState([]);
  const [allSelectedRows, setAllSelectedRows] = useState([
    ...selectedAdms,
    ...selectedSups,
    ...selectedEmps,
  ]);
  const [reloadData, setReloadData] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const token = JSON.parse(localStorage.getItem(localStorage.key(1))).id_token;

  useEffect(() => {
    setAllSelectedRows([...selectedAdms, ...selectedSups, ...selectedEmps]);
  }, [selectedAdms, selectedSups, selectedEmps]);

  useEffect(() => {
    console.log('allSelectedRows', allSelectedRows);
  }, [allSelectedRows]);

  return (
    <div>
      {/* ----------------------------------------------------- */}
      <Navbar />
      {/* ----------------------------------------------------- */}
      <SearchBar
        setSearchTerm={setSearchTerm}
        leftComp1={
          <AddUser
            token={token}
            setReloadData={setReloadData}
          />
        }
        leftComp2={
          <EditUser
            token={token}
            setReloadData={setReloadData}
          />
        }
        leftComp3={
          <ArchiveSelectedUsers
            allSelectedRows={allSelectedRows}
            setAllSelectedRows={setAllSelectedRows}
            setReloadData={setReloadData}
            token={token}
          />
        }
        // rightComp2={
        //   <ArchiveSelectedUsers
        //     allSelectedRows={allSelectedRows}
        //     setAllSelectedRows={setAllSelectedRows}
        //     setReloadData={setReloadData}
        //     token={token}
        //   />
        // }
      />
      {/* ----------------------------------------------------- */}
      <div className="md:flex">
        <div className="md:w-1/3">
          <OnboardingEmployees
            selectedEmps={selectedEmps}
            setSelectedEmps={setSelectedEmps}
            reloadData={reloadData}
            setReloadData={setReloadData}
            token={token}
            searchTerm={searchTerm}
          />
        </div>
        <div className="md:w-1/3">
          <Supervisors
            selectedSups={selectedSups}
            setSelectedSups={setSelectedSups}
            reloadData={reloadData}
            setReloadData={setReloadData}
            token={token}
            searchTerm={searchTerm}
          />
        </div>
        <div className="md:w-1/3">
          <Admins
            selectedAdms={selectedAdms}
            setSelectedAdms={setSelectedAdms}
            reloadData={reloadData}
            setReloadData={setReloadData}
            token={token}
            searchTerm={searchTerm}
          />
        </div>
      </div>
    </div>
  );
}
// ------------------------------------------------------------- //
