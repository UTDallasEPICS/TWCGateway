import Navbar from '@/components/Navbar';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  Checkbox,
  Loader,
  Modal,
  ActionIcon,
  Tooltip,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import SearchBar from '../../components/SearchBar';
import { Tabs } from '@mantine/core';
import PropTypes from 'prop-types';
import LeftAngle from '../../assets/icons/LeftAngle';
import RightAngle from '../../assets/icons/RightAngle';
import EditIcon from '../../assets/icons/EditIcon';
import PlusIcon from '../../assets/icons/PlusIcon';
import { useNavigate } from 'react-router-dom';

TaskTable.propTypes = {
  tasks: PropTypes.array.isRequired,
  searchTerm: PropTypes.string,
  userId: PropTypes.string.isRequired,
  setReload: PropTypes.func,
};

export function TaskTable({ tasks, searchTerm, userId, setReload }) {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem(localStorage.key(1))).id_token;

  const completeTask = async taskId => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_APP_EXPRESS_BASE_URL}/completeTask`,
        {
          taskId: taskId,
          userId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error('Error in completing task', error);
    }
  };

  const uncompleteTask = async taskId => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_APP_EXPRESS_BASE_URL}/uncompleteTask`,
        {
          taskId: taskId,
          userId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error('Error in uncompleting task', error);
    }
  };

  const rows =
    tasks.length > 0 ? (
      tasks
        .filter(task =>
          task.task.desc.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map(task => (
          <Table.Tr key={task.id}>
            <Table.Td style={{}}>
              <div>
                <Checkbox
                  color="green"
                  checked={task.taskCompleted}
                  onChange={() => {
                    setReload(true);
                    task.taskCompleted
                      ? uncompleteTask(task.id)
                      : completeTask(task.id);
                  }}
                />
              </div>
            </Table.Td>
            <Table.Td>
              {task.dateCompleted
                ? (() => {
                    const date = new Date(task.dateCompleted);
                    const formattedDate = date.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric',
                      // hour: '2-digit',
                      // minute: '2-digit',
                      // timeZoneName: 'short',
                    });
                    console.log('formattedDate', formattedDate);
                    return formattedDate;
                  })()
                : '-'}
            </Table.Td>
            <Table.Td>{task.task.desc}</Table.Td>
            <Table.Td
              className="hover:cursor-pointer hover:bg-purple-500"
              onClick={() => {
                navigate(`/admin/supervisor/${task.supervisor.id}`);
              }}
            >
              {task.supervisor.name}
            </Table.Td>
          </Table.Tr>
        ))
    ) : (
      <Table.Tr>
        <Table.Td colSpan={4} className="text-center">
          No tasks found
        </Table.Td>
      </Table.Tr>
    );

  return (
    <div className="bg-white">
      <Table withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ textAlign: 'center' }}>Completed?</Table.Th>
            <Table.Th style={{ textAlign: 'center' }}>Date Completed</Table.Th>
            <Table.Th style={{ textAlign: 'center' }}>Description</Table.Th>
            <Table.Th style={{ textAlign: 'center' }}>Supervisor</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody className="text-center">{rows}</Table.Tbody>
      </Table>
    </div>
  );
}

export default function OnboardingEmployee() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [tasks, setTasks] = useState([]);
  const [tags, setTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const token = JSON.parse(localStorage.getItem(localStorage.key(1))).id_token;
  const [selectedTab, setSelectedTab] = useState(
    tags && tags.length > 0 ? `${tags[0]}` : ''
  );
  const [isLoading, setIsLoading] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      setIsLoading(true);
      try {
        const response1 = await axios.get(
          `${import.meta.env.VITE_APP_EXPRESS_BASE_URL}/getUser/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response1.data);
        console.log('response1', response1.data);
        document.title = `${response1.data.name}'s Tasks | TWCGateway`;
        console.log('response1', response1.data.id);
        const response2 = await axios.get(
          `${
            import.meta.env.VITE_APP_EXPRESS_BASE_URL
          }/getAllTaskTagsForEmployee/${response1.data.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log('selectedTab', selectedTab);
        const response3 = await axios.post(
          `${
            import.meta.env.VITE_APP_EXPRESS_BASE_URL
          }/getAllTasksForEmployee/${
            response1.data.id
          }?page=${page}&pageSize=2`,
          {
            tag: selectedTab,
            searchTerm: searchTerm,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTags(response2.data);
        console.log('tags', response2.data);
        setTasks(response3.data);
        console.log('tasks', response3.data);
      } catch (error) {
        console.error('Error in fetching user in User page', error);
      }
      setIsLoading(false);
    };
    getUser();
    setReload(false);
  }, [id, selectedTab, page, reload, searchTerm]);

  useEffect(() => {
    setPage(1);
  }, [selectedTab]);

  return (
    <div>
      {/* ---------- */}
      <Navbar />
      {/* ---------- */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex justify-center bg-white bg-opacity-50 rounded-lg border-2 border-gray-100 p-2 ml-5 m-5">
          <div className="md:flex md:items-center md:space-x-5 md:space-y-1">
            <div className="text-2xl font-bold text-white">{user.name}</div>
            <div>{user.email}</div>
          </div>
        </div>
        <div>
          <SearchBar setSearchTerm={setSearchTerm} />
        </div>
      </div>
      {/* ---------- */}
      <div
        className={
          user &&
          user.DepartmentUserMapping &&
          user.DepartmentUserMapping.length > 1
            ? 'md:grid md:grid-cols-2'
            : ''
        }
      >
        {
          user && user.DepartmentUserMapping && (
            <div
              key={user.DepartmentUserMapping.department.id}
              className="flex-col bg-white bg-opacity-50 rounded-lg border-2 border-gray-100 p-2 ml-5 m-5"
            >
              <div className="md:flex-col md:items-center md:space-x-5 md:space-y-1 mb-10">
                <div className="text-2xl font-bold text-white">
                  {user.DepartmentUserMapping.department.name}
                </div>
              </div>
              <div className="bg-white bg-opacity-50 border-2 border-white p-2 rounded-lg md:flex md:justify-center">
                <div className="md:w-3/4 border-white border-2 rounded-lg p-2 bg-blue-100 font-mono ">
                  {console.log(tags && tags.length > 0 ? `${tags[0]}` : '')}
                  <Tabs
                    defaultValue={tags && tags.length > 0 ? `${tags[0]}` : ''}
                    variant="pills"
                    color="violet"
                    radius="xl"
                    onChange={setSelectedTab}
                  >
                    <Tabs.List grow>
                      {tags.map(tag => (
                        <Tabs.Tab value={tag} key={tag}>
                          {tag}
                        </Tabs.Tab>
                      ))}
                    </Tabs.List>
                    {tags.map(tag => (
                      <Tabs.Panel value={tag} key={tag} className="mt-3">
                        {isLoading ? (
                          <div className="flex justify-center items-center">
                            <Loader />
                          </div>
                        ) : (
                          <TaskTable
                            tasks={tasks.tasks}
                            searchTerm={searchTerm}
                            userId={id}
                            setReload={setReload}
                          />
                        )}
                        <div className="flex justify-center mt-10 items-center bg-white bg-opacity-50 p-2 ">
                          <ActionIcon
                            onClick={() =>
                              page - 1 !== 0 ? setPage(page - 1) : null
                            }
                            disabled={page - 1 === 0}
                          >
                            <LeftAngle />
                          </ActionIcon>
                          <span className="font-mono mr-2 ml-2">
                            {page}/{tasks.totalPages}
                          </span>
                          <ActionIcon
                            onClick={() =>
                              page !== tasks.totalPages
                                ? setPage(page + 1)
                                : null
                            }
                            disabled={page === tasks.totalPages}
                          >
                            <RightAngle />
                          </ActionIcon>
                        </div>
                      </Tabs.Panel>
                    ))}
                  </Tabs>
                </div>
              </div>
            </div>
          )
          // ))
        }
      </div>
      {/* ---------- */}
    </div>
  );
}
