import Navbar from '../../components/Navbar';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from '../../components/SearchBar';
import {Table,Checkbox,Loader,Modal,ActionIcon,Tooltip,Tabs} from '@mantine/core';
import LeftAngle from '../../assets/icons/LeftAngle';
import RightAngle from '../../assets/icons/RightAngle';

export function TaskTable({tasks, searchTerm, setReload}){
  const rows =
    tasks.length > 0 ? (
      tasks
        .filter(task =>
          task.task.desc.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map(task => (
          <Table.Tr key={task.id}>
            <Table.Td>{task.task.desc}</Table.Td>
            <Table.Td>{task.supervisor.name}</Table.Td>
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
            <Table.Th style={{ textAlign: 'center' }}>Task</Table.Th>
            <Table.Th style={{ textAlign: 'center' }}>Supervisor</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody className="text-center">{rows}</Table.Tbody>
      </Table>
    </div>
  );
}

export default function Department() {
  const { id } = useParams();
  const [department, setDepartment] = useState({});
  const token = JSON.parse(localStorage.getItem(localStorage.key(1))).id_token;
  const [searchTerm, setSearchTerm] = useState('');
  const [tasks, setTasks] = useState([]);
  const [tags, setTags] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [selectedTab, setSelectedTab] = useState(
    tags && tags.length > 0 ? `${tags[0]}` : ''
  );

  useEffect(() => {
    const getDepartment = async () => {
      setIsLoading(true);
      try {
        const response1 = await axios.get(
          `${import.meta.env.VITE_APP_EXPRESS_BASE_URL}/getDepartment/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDepartment(response1.data);
        console.log('department', response1.data);

        const response2 = await axios.get(
          `${import.meta.env.VITE_APP_EXPRESS_BASE_URL}/getAllTaskTagsForDepartment/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTags(response2.data);
        console.log('selectedTab', response2.data);

        const response3 = await axios.post(
          `${import.meta.env.VITE_APP_EXPRESS_BASE_URL
          }/getAllTasksForDepartment/${id}?page=${page}&pageSize=${pageSize}`,
          {
            tag: selectedTab
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTasks(response3.data);
        console.log('tasks', response3.data);

      } catch (error) {
        console.error('Error in fetching department in Task page', error);
      }
      setIsLoading(false);
    };
    getDepartment();
    setReload(false);
  }, [id, selectedTab, page, reload]);

  useEffect(() => {
    setPage(1);
  }, [selectedTab]);
  
  return (
    <div>
      {/* ---------- */}
      <Navbar />
      {/* ---------- */}
      <div>
        {
          department && (
            <div
              key={department.id}
              className="flex-col bg-white bg-opacity-50 rounded-lg border-2 border-gray-100 p-2 ml-5 m-5"
            >
              <div className="md:flex-col md:items-center md:space-x-5 md:space-y-1 mb-10">
                <div className="text-2xl font-bold text-white">
                  {department.name}
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
        }
      </div>
      {/* ---------- */}
    </div>
  );


}
