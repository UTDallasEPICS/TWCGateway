import Navbar from '../../components/Navbar';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import axios from 'axios';
import SearchBar from '../../components/SearchBar';
import {Table,Checkbox,Loader,Modal,ActionIcon,Tooltip,Tabs, Button, TextInput} from '@mantine/core';
import LeftAngle from '../../assets/icons/LeftAngle';
import RightAngle from '../../assets/icons/RightAngle';
import SendToArchiveIcon from '../../assets/icons/SendToArchiveIcon';
import PlusIcon from '../../assets/icons/PlusIcon';
import CheckIcon from '../../assets/icons/CheckIcon';

export function ArchiveTasks({selectedRows, setSelectedRows, setReload, deptId, token}){

  const [isLoading, setIsLoading] = useState(false);
  const [opened, { open, close }] = useDisclosure();

  const handleClick = async () => {
    try {
      setIsLoading(true);
      await axios.patch(
        `${import.meta.env.VITE_APP_EXPRESS_BASE_URL}/archiveTasksForDepartment/`,
        { allSelectedTasks: selectedRows, deptId : deptId},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsLoading(false);
      setReload(true)
    } catch (error) {
      console.error('Errored archiving selected tasks', error);
    }

    setSelectedRows([]);
    close();
  };


  return (
    <div>
      <Tooltip
        label={selectedRows.length === 0 ? 'Select Rows' : 'Archive Tasks'}
        openDelay="700"
      >
        <ActionIcon
          variant="filled"
          size="xl"
          color="gray"
          disabled={selectedRows.length === 0 ? true : false}
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
        <span>all selected tasks?</span>
        <div className="flex mt-3 justify-between">
          <Button onClick={handleClick} color="red">
            Yes
          </Button>
          <Button onClick={close}>No</Button>
        </div>
      </Modal>
    </div>
  )
};


export function TaskTable({tasks, searchTerm, selectedRows, setSelectedRows, setReloadData}){
  const rows =
    tasks.length > 0 ? (
      tasks
        .filter(task =>
          task.task.desc.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map(task => (
          <Table.Tr key={task.id}>
            <Table.Td className="w-1/12"> 
              <div>
                <Checkbox
                  color="green"
                  onChange={(event) => {
                    setSelectedRows(
                      event.currentTarget.checked
                        ? [...selectedRows, task.id]
                        : selectedRows.filter(id => id !== task.id)
                    )
                  }}
                  checked={selectedRows.includes(task.id)}
                />
              </div>
            </Table.Td>
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

  const handleSelectAll = (event) => {
    if (event.currentTarget.checked) {
      setSelectedRows(tasks.map((task) => task.id));
    } else {
      setSelectedRows([]);
    }
  };

  return (
    <div className="bg-white">
      <Table withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
              <Table.Th>
                <Checkbox
                  aria-label="Select all rows"
                  checked={selectedRows.length === tasks.length}
                  onChange={handleSelectAll}
                />
              </Table.Th>
            <Table.Th style={{ textAlign: 'center' }}>Task</Table.Th>
            <Table.Th style={{ textAlign: 'center' }}>Supervisor</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody className="text-center">{rows}</Table.Tbody>
      </Table>
    </div>
  );
}

export function AddTask({setReload}){
  const [opened, { open, close }] = useDisclosure(false);
  return(
    <>
      <Tooltip label="Add Task" openDelay="700">
        <ActionIcon variant="filled" color="green" size="xl" onClick={open}>
          <PlusIcon />
        </ActionIcon>
      </Tooltip>
      <Modal
      title="Add Task"
      centered
      opened={opened}
      onClose={()=>close()}>
      <form>
      <div className="flex items-end space-x-2 bg-gray-200 p-2 rounded-lg">
            <div className="flex-grow">
              <TextInput
                label="Task"
              />
            </div>
          </div>
          <div className="flex justify-center mt-10">
            <Button>Submit</Button>
          </div>
      </form>
      </Modal>
    </>
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
  const [reloadData, setReloadData] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

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
              <div>
                  <SearchBar
                    setSearchTerm={setSearchTerm}
                    leftComp1={<AddTask setReload={setReload} />}
                    leftComp2={
                      <ArchiveTasks
                        selectedRows={selectedRows}
                        setSelectedRows={setSelectedRows}
                        setReload={setReload}
                        deptId={department.id}
                        token={token}
                      />
                    }
                  />
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
                            selectedRows={selectedRows}
                            setSelectedRows={setSelectedRows}
                            setReloadData={setReloadData}
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
