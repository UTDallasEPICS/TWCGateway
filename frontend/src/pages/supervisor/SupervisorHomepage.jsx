import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import {
  ActionIcon,
  Modal,
  Tooltip,
  Button,
  Table,
  Checkbox,
  TextInput,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import UserIcon from '../../assets/icons/UserIcon';
import CollapseAllIcon from '../../assets/icons/CollapseAllIcon';
import ExpandAllIcon from '../../assets/icons/ExpandAllIcon';

export default function SupervisorHomepage() {
  const { user, logout } = useAuth0();
  const [opened, { open, close }] = useDisclosure();
  const [localUser, setLocalUser] = useState(null);
  const [localUserTasks, setLocalUserTasks] = useState([]);
  const [expandAll, setExpandAll] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const token = JSON.parse(localStorage.getItem(localStorage.key(1))).id_token;
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setExpandAll(true);
    const getSupervisor = async () => {
      try {
        const res = await axios.post(
          `${
            import.meta.env.VITE_APP_EXPRESS_BASE_URL
          }/supervisor/getUserByEmail`,
          {
            email: user.email,
          }
        );
        console.log('res.data: ', res.data);
        setLocalUser(res.data);
        return res.data;
      } catch (error) {
        console.error(error);
        console.error('Errored out in SupervisorHomepage -> getSupervisor');
      }
    };
    const getSupervisorTasks = async supervisor => {
      try {
        const res2 = await axios.post(
          `${
            import.meta.env.VITE_APP_EXPRESS_BASE_URL
          }/supervisor/getSupervisorTasks`,
          {
            id: supervisor.id,
            searchTerm: searchTerm,
          }
        );
        console.log('res2.data: ', res2.data);
        setLocalUserTasks(res2.data);
      } catch (error) {
        console.error(error);
        console.error(
          'Errored out in SupervisorHomepage -> getSupervisorTasks'
        );
      }
    };
    if (user) {
      getSupervisor().then(supervisor => {
        getSupervisorTasks(supervisor);
      });
    }
  }, [user, refresh, searchTerm]);

  const completeTask = async (userId, taskId) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_APP_EXPRESS_BASE_URL}/completeTask`,
        {
          userId: userId,
          taskId: taskId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRefresh(refresh + 1);
    } catch {
      console.error('Errored out in SupervisorHomepage -> completeTask');
    }
  };

  const uncompleteTask = async (userId, taskId) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_APP_EXPRESS_BASE_URL}/uncompleteTask`,
        {
          userId: userId,
          taskId: taskId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRefresh(refresh + 1);
    } catch {
      console.error('Errored out in SupervisorHomepage -> uncompleteTask');
    }
  };

  return (
    <div>
      <Modal
        opened={opened}
        onClose={close}
        title="Profile"
        centered
        size="auto"
      >
        <div className="mt-4 flex justify-center">
          {user && (
            <img
              className="h-20 w-20 rounded-full"
              src={user.picture}
              alt={'Profile Picture'}
            />
          )}
        </div>
        <div className="mt-4 flex-col">
          <div>
            <span className="font-bold">Name</span>
            <span className="ml-1 font-bold">-</span>
            <span className="ml-2">{localUser && localUser.name}</span>
          </div>
          <div>
            <span className="font-bold">Email</span>
            <span className="ml-2 font-bold">-</span>
            <span className="ml-2">{localUser && localUser.email}</span>
          </div>
          <div>
            <span className="font-bold">Role</span>
            <span className="ml-4 font-bold">-</span>
            <span className="ml-2">
              {localUser &&
                localUser.role.substring(0, 1) +
                  localUser.role.substring(1).toLowerCase()}
            </span>
          </div>
        </div>
        <div className="mt-4 flex justify-center">
          <Button variant="filled" color="red" onClick={logout}>
            Logout
          </Button>
        </div>
      </Modal>
      <div className="flex justify-between items-center bg-white bg-opacity-50 rounded-lg p-3 m-3">
        <Tooltip label="Profile" openDelay={700}>
          <ActionIcon size="xl" onClick={open}>
            <UserIcon />
          </ActionIcon>
        </Tooltip>
        <input
          className="rounded-lg px-56 text-center py-2 focus:outline-none hover:border-2 hover:border-gray-300 focus:border-2 focus:border-pink-400 focus:shadow-2xl"
          placeholder="Search"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <Tooltip
          label={!expandAll ? 'Expand All' : 'Collapse All'}
          openDelay={700}
        >
          <ActionIcon onClick={() => setExpandAll(!expandAll)} size="xl">
            {expandAll === false ? <ExpandAllIcon /> : <CollapseAllIcon />}
          </ActionIcon>
        </Tooltip>
      </div>
      {/* <div className="flex flex-col p-3 m-3 bg-white bg-opacity-50 rounded-lg"> */}
      {localUser &&
      localUserTasks &&
      localUserTasks.tasks &&
      localUserTasks.tasks.length > 0 ? (
        localUserTasks.tasks.map((task, index) => (
          <details
            key={task.id}
            className="flex bg-white p-2 m-2 rounded-lg"
            open={expandAll}
          >
            <summary className="bg-pink-200 rounded-lg p-2 hover:cursor-pointer">
              {task.task.desc}
            </summary>
            <Table
              withColumnBorders
              withRowBorders
              withTableBorder
              className="mt-1 rounded-lg"
            >
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Completed?</Table.Th>
                  <Table.Th>Date Completed</Table.Th>
                  <Table.Th>Name</Table.Th>
                  <Table.Th>Email</Table.Th>
                  <Table.Th>Department</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {localUser &&
                localUserTasks &&
                localUserTasks.employees &&
                localUserTasks.employees[index].length > 0 ? (
                  localUserTasks.employees[index].map(employee => (
                    <>
                      {console.log('employee: ', employee)}
                      <Table.Tr key={employee.id}>
                        <Table.Td className="">
                          {/* {employee.completed ? 'Yes' : 'No'} */}
                          <Checkbox
                            checked={employee.taskCompleted}
                            onChange={() => {
                              employee.taskCompleted
                                ? uncompleteTask(
                                    employee.userId,
                                    employee.taskId
                                  )
                                : completeTask(
                                    employee.userId,
                                    employee.taskId
                                  );
                            }}
                          />
                        </Table.Td>
                        <Table.Td>
                          {/* {employee.dateCompleted !== null
                              ? employee.dateCompleted
                              : 'N/A'} */}
                          {employee.dateCompleted
                            ? (() => {
                                const date = new Date(employee.dateCompleted);
                                const formattedDate = date.toLocaleDateString(
                                  'en-US',
                                  {
                                    year: 'numeric',
                                    month: 'numeric',
                                    day: 'numeric',
                                    // hour: '2-digit',
                                    // minute: '2-digit',
                                    // timeZoneName: 'short',
                                  }
                                );
                                console.log('formattedDate', formattedDate);
                                return formattedDate;
                              })()
                            : '-'}
                        </Table.Td>
                        <Table.Td>{employee.user.name}</Table.Td>
                        <Table.Td>{employee.user.email}</Table.Td>
                        <Table.Td>
                          {employee.user.DepartmentUserMapping.department.name}
                        </Table.Td>
                      </Table.Tr>
                    </>
                  ))
                ) : (
                  <Table.Tr>
                    <Table.Td colSpan={5} className="text-center">
                      No Onboarding Employees Assigned to this Task
                    </Table.Td>
                  </Table.Tr>
                )}
              </Table.Tbody>
            </Table>
          </details>
        ))
      ) : (
        <div className="flex justify-center items-center bg-white bg-opacity-50 rounded-lg p-3 m-3">
          <h1>No Tasks Assigned</h1>
        </div>
      )}
      {/* </div> */}
    </div>
  );
}
