import Navbar from '../../components/Navbar';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from '../../components/SearchBar';
import { Table, Checkbox } from '@mantine/core';

export default function Department() {
  const { id } = useParams();
  const [department, setDepartment] = useState({});
  const token = JSON.parse(localStorage.getItem(localStorage.key(1))).id_token;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);


  useEffect(() => {
    const getTasksForDepartment = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_APP_EXPRESS_BASE_URL
          }/getAllTasksForDepartment/${id}?page=${page}&pageSize=${pageSize}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTasks(response.data);
        setTasks(
          Object.values(response.data).filter(
            task =>
              typeof task === 'object' &&
              task !== null &&
              !Object.prototype.hasOwnProperty.call(task, 'totalPages') &&
              !Object.prototype.hasOwnProperty.call(task, 'totalTasks')
          )
        );

        console.log('tasks', response.data);
      } catch (error) {
        console.error('Error in fetching tasks in Task page', error);
      }
    };
    getTasksForDepartment();

    const getDepartment = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_EXPRESS_BASE_URL}/getDepartment/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDepartment(response.data);
        console.log('department', response.data);
      } catch (error) {
        console.error('Error in fetching department in Task page', error);
      }
    };
    getDepartment();
  }, []);

  const handleAllRowSelect = () => {};

  return (
    <div>
      <Navbar />
      <SearchBar setSearchTerm={setSearchTerm} />
      <div className="flex flex-col bg-white bg-opacity-50 m-5 rounded-lg p-2">
        <div className="text-white font-bold font-mono text-2xl">
          {department.name}
        </div>
        <div className="mt-5 flex justify-center">
          <div className="w-3/4">
            <Table withTableBorder withColumnBorders className="bg-slate-100">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th className="w-1/12">
                    <Checkbox
                      checked={selectedRows.length === tasks.length}
                      onChange={handleAllRowSelect}
                    />
                  </Table.Th>
                  <Table.Th className="w-1/3">
                    <div className="text-center">Tag</div>
                  </Table.Th>
                  <Table.Th className="w-1/3">
                    <div className="text-center">Description</div>
                  </Table.Th>
                  <Table.Th className="w-1/3">
                    <div className="text-center">Supervisor</div>
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {tasks.map(task => (
                  <Table.Tr key={task.task.id}>
                    <Table.Td className="w-1/12">
                      <Checkbox
                        checked={selectedRows.includes(task.task.id)}
                        onChange={() => {
                          if (selectedRows.includes(task.task.id)) {
                            setSelectedRows(
                              selectedRows.filter(
                                selectedRow => selectedRow !== task.task.id
                              )
                            );
                          } else {
                            setSelectedRows([...selectedRows, task.task.id]);
                          }
                        }}
                      />
                    </Table.Td>
                    <Table.Td className="w-1/2">{task.task.desc}</Table.Td>
                    <Table.Td className="w-1/2">{task.task.tag}</Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
