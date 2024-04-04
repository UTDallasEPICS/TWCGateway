import Navbar from '@/components/Navbar';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Checkbox } from '@mantine/core';
import SearchBar from '../../components/SearchBar';

export default function User() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState('');
  const token = JSON.parse(localStorage.getItem(localStorage.key(1))).id_token;
  useEffect(() => {
    const getUser = async () => {
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
        console.log('response', response1.data);
        const response2 = await axios.get(
          `${
            import.meta.env.VITE_APP_EXPRESS_BASE_URL
          }/getAllTasksForEmployee/${response1.data.id}?page=1&pageSize=10`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTasks(response2.data);
        console.log('tasks', response2.data);
      } catch (error) {
        console.error('Error in fetching user in User page', error);
      }
    };
    getUser();
  }, [id]);

  const employeeRows =
    tasks.length > 0 ? (
      <div></div>
    ) : (
      <Table.Tr>
        <Table.Td colSpan={3} className="text-center">
          No Tasks found
        </Table.Td>
      </Table.Tr>
    );

  return (
    <div>
      {/* ---------- */}
      <Navbar />
      {/* ---------- */}
      <div className="grid grid-cols-2">
        <div className="flex justify-center bg-white bg-opacity-50 rounded-lg border-2 border-gray-100 p-2 ml-5 m-5">
          <div className="md:flex md:items-center md:space-x-5 md:space-y-1">
            <div className="text-2xl font-bold">{user.name}</div>
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
        {user &&
          user.DepartmentUserMapping &&
          user.DepartmentUserMapping.map(departmentUserMapping => (
            <div
              key={departmentUserMapping.department.id}
              className="flex bg-white bg-opacity-50 rounded-lg border-2 border-gray-100 p-2 ml-5 m-5"
            >
              <div className="md:flex md:items-center md:space-x-5 md:space-y-1">
                <div className="text-2xl font-bold text-white">
                  {departmentUserMapping.department.name}
                </div>

              </div>
            </div>
          ))}
      </div>
      {/* ---------- */}
    </div>
  );
}
