import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import SearchBar from '../../components/SearchBar';

export default function Supervisor() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState(null);
  const token = JSON.parse(localStorage.getItem(localStorage.key(1))).id_token;
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const fetchUser = await axios.get(
        `${import.meta.env.VITE_APP_EXPRESS_BASE_URL}/getUser/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const fetchPaginatedTasks = await axios.get(
        `${
          import.meta.env.VITE_APP_EXPRESS_BASE_URL
        }/getAllTasksForSupervisor/${id}?page=${page}&pageSize=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(fetchUser.data);
      setTasks(fetchPaginatedTasks.data);
      document.title = `${fetchUser.data.name}'s Tasks | TWCGateway`;
      console.log('supervisor', fetchUser.data);
      console.log('tasks', fetchPaginatedTasks.data);
    } catch (error) {
      console.error('fetch user error', error);
    }
  };

  return (
    <div>
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
          <SearchBar setSearchTerm={setSearchTerm} />
        </div>
      </div>
      {/* ----------- */}
    </div>
  );
}
