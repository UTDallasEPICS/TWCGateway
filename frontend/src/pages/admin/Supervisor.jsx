import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import SearchBar from '../../components/SearchBar';
import PropTypes from 'prop-types';
import {
  Table,
  Loader,
  ActionIcon,
  Tooltip,
  Modal,
  TextInput,
  Checkbox,
  Select,
  CheckIcon,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import LeftAngle from '../../assets/icons/LeftAngle';
import RightAngle from '../../assets/icons/RightAngle';
import EditIcon from '../../assets/icons/EditIcon';
import Cookies from 'js-cookie';

TaskTable.propTypes = {
  tasks: PropTypes.array,
  searchTerm: PropTypes.string,
};

export function TaskTable({ tasks, searchTerm }) {
  console.log('tasks in tastable', tasks);
  const rows = tasks ? (
    tasks.map(task => (
      <Table.Tr key={task.task.id}>
        <Table.Td>{task.task.desc}</Table.Td>
        <Table.Td>{task.department.name}</Table.Td>
        <Table.Td>{task.task.tag}</Table.Td>
      </Table.Tr>
    ))
  ) : (
    <Table.Tr>
      <Table.Td colSpan={3} className="text-center">
        No tasks found
      </Table.Td>
    </Table.Tr>
  );
  return (
    <div className="bg-white">
      <Table withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ textAlign: 'center' }}>Description</Table.Th>
            <Table.Th style={{ textAlign: 'center' }}>Department</Table.Th>
            <Table.Th style={{ textAlign: 'center' }}>Tag</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
  );
}

export default function Supervisor() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState(null);
  // const token = JSON.parse(localStorage.getItem(localStorage.key(1))).id_token;
  const token = Cookies.get('token');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUser();
  }, [searchTerm, page]);
  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  const getUser = async () => {
    setIsLoading(true);
    try {
      const fetchUser = await axios.get(
        `${import.meta.env.VITE_APP_EXPRESS_BASE_URL}/getUser/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const fetchPaginatedTasks = await axios.post(
        `${
          import.meta.env.VITE_APP_EXPRESS_BASE_URL
        }/getAllTasksForSupervisor/${id}?page=${page}&pageSize=10`,
        {
          searchTerm: searchTerm,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(fetchUser.data);
      setTotalPages(fetchPaginatedTasks.data.totalPages);
      setTasks(
        Object.values(fetchPaginatedTasks.data).filter(
          item => typeof item === 'object' && item !== null
        )
      );
      document.title = `${fetchUser.data.name}'s Tasks | TWCGateway`;
      console.log('supervisor', fetchUser.data);
      console.log('tasks', fetchPaginatedTasks.data);
    } catch (error) {
      console.error('fetch user error', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      {/* ----------- */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex justify-center bg-white bg-opacity-50 rounded-lg border-2 border-gray-100 p-2 ml-5 m-5">
          <div className="md:flex md:items-center md:space-x-5 md:space-y-1">
            <div className="text-2xl font-bold text-white">
              {user && user.name}
            </div>
            <div>{user && user.email}</div>
          </div>
        </div>
        <div>
          <SearchBar
            setSearchTerm={setSearchTerm}
            // leftComp1={<EditAssignment superId={user && user.id} />}
          />
        </div>
      </div>
      {/* ----------- */}
      <div className="flex-col bg-white bg-opacity-50 rounded-lg border-2 border-gray-100 p-2 ml-5 m-5 md:flex">
        <div className="md:flex md:justify-center">
          <div className="md:w-3/4 border-white border-2 rounded-lg p-2 bg-blue-100 font-mono ">
            {isLoading ? (
              <div className="flex justify-center items-center">
                <Loader />
              </div>
            ) : (
              <TaskTable tasks={tasks} searchTerm={searchTerm} />
            )}
          </div>
        </div>
        <div className="flex justify-center mt-3  items-center bg-white bg-opacity-50 p-2 ">
          <ActionIcon
            onClick={() => setPage(page - 1)}
            disabled={page - 1 === 0}
          >
            <LeftAngle />
          </ActionIcon>
          <span className="font-mono mr-2 ml-2">
            {page}/{totalPages}
          </span>
          <ActionIcon
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages || totalPages === 0}
          >
            <RightAngle />
          </ActionIcon>
        </div>
      </div>
    </>
  );
}
