import Navbar from '../../components/Navbar';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import axios from 'axios';
import SearchBar from '../../components/SearchBar';
import {
  Table,
  Checkbox,
  Loader,
  Modal,
  ActionIcon,
  Tooltip,
  Tabs,
  Button,
  TextInput,
  Select,
  TagsInput,
} from '@mantine/core';
import LeftAngle from '../../assets/icons/LeftAngle';
import RightAngle from '../../assets/icons/RightAngle';
import SendToArchiveIcon from '../../assets/icons/SendToArchiveIcon';
import PlusIcon from '../../assets/icons/PlusIcon';
import CheckIcon from '../../assets/icons/CheckIcon';
import CancelIcon from '../../assets/icons/CancelIcon';
import EditIcon from '../../assets/icons/EditIcon';
import DeleteIcon from '../../assets/icons/DeleteIcon'

export function ArchiveTasks({
  selectedRows,
  setSelectedRows,
  setReload,
  deptId,
  token,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [opened, { open, close }] = useDisclosure();

  const handleClick = async () => {
    try {
      setIsLoading(true);
      await axios.patch(
        `${
          import.meta.env.VITE_APP_EXPRESS_BASE_URL
        }/archiveTasksForDepartment/`,
        { allSelectedTasks: selectedRows, deptId: deptId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsLoading(false);
      setReload(true);
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
          color="red"
          disabled={selectedRows.length === 0 ? true : false}
          loading={isLoading}
          onClick={open}
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
        <span>Are you sure you want to </span>
        <span className="font-bold">delete </span>
        <span>all selected tasks?</span>
        <div className="flex mt-3 justify-between">
          <Button onClick={handleClick} color="red">
            Yes
          </Button>
          <Button onClick={close}>No</Button>
        </div>
      </Modal>
    </div>
  );
}

export function TaskTable({
  setTasks,
  tasks,
  searchTerm,
  selectedRows,
  setSelectedRows,
  setReloadData,
  token,
}) {
  const [editMode, setEditMode] = useState([]);
  const [updatedTasks, setUpdatedTasks] = useState(tasks.tasks);
  const [supervisors, setSupervisors] = useState([]);
  const [reload, setReload] = useState(0);
  console.log('tasks.tasks', tasks.tasks);
  const handleDescriptionChange = (taskId, newDesc) => {
    setEditMode({ ...editMode, [taskId]: true });

    const updatedTasksCopy = updatedTasks.map(t => {
      if (t.id === taskId) {
        return { ...t, task: { ...t.task, desc: newDesc } };
      }
      return t;
    });

    setUpdatedTasks(updatedTasksCopy);
  };

  const handleSupervisorChange = (taskId, newSup) => {
    setEditMode({ ...editMode, [taskId]: true });

    newSup = parseInt(newSup, 10);

    const updatedTasksCopy = updatedTasks.map(t => {
      if (t.id === taskId) {
        return { ...t, supervisor: { ...t.supervisor, id: newSup } };
      }
      return t;
    });

    setUpdatedTasks(updatedTasksCopy);
  };

  const handleCancel = taskId => {
    const ogDesc = tasks.tasks.find(x => x.task.id === taskId).task.desc;
    const ogSup = tasks.tasks.find(x => x.task.id === taskId).supervisor.id;

    setUpdatedTasks(
      updatedTasks.map(t =>
        t.task.id === taskId
          ? {
              ...t,
              supervisor: { ...t.supervisor, id: ogSup },
              task: { ...t.task, desc: ogDesc },
            }
          : t
      )
    );
  };

  const handleSave = async (taskId, newDesc, sameTag, newSupId, deptId) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_APP_EXPRESS_BASE_URL}/updateTask`,
        {
          id: taskId,
          desc: newDesc,
          tag: sameTag,
          superId: newSupId,
          departmentId: deptId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReloadData(true);
    } catch (error) {
      console.error('Error updating task', error);
      console.log(taskId, newDesc, sameTag, newSupId, deptId);
    }
  };

  useEffect(() => {
    const fetchSups = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_EXPRESS_BASE_URL}/getAllSupervisors`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSupervisors(response.data);
    };
    fetchSups();
  }, [token]);

  const rows =
updatedTasks.length > 0 ? (
      updatedTasks
        // .filter(task =>
        //   task.task.desc.toLowerCase().includes(searchTerm.toLowerCase())
        // )
        .map(task => (
          <Table.Tr key={task.id}>
            <Table.Td className="w-1/12">
              <div>
                <Checkbox
                  onChange={event => {
                    setSelectedRows(
                      event.currentTarget.checked
                        ? [...selectedRows, task.id]
                        : selectedRows.filter(id => id !== task.id)
                    );
                  }}
                  checked={selectedRows.includes(task.id)}
                />
              </div>
            </Table.Td>
            <Table.Td
              onDoubleClick={() => {
                setEditMode({ ...editMode, [task.task.id]: true });
              }}
              // onClick={() => {
              //   //setSelectedRows(
              //     selectedRows.includes(task.id) || editMode[task.task.id]
              //       ? selectedRows.filter(id => id !== task.id)
              //       : [...selectedRows, task.id]
              //   );
              // }}
              className="hover:cursor-pointer"
            >
              {editMode[task.task.id] ? (
                <textarea
                  type="text"
                  value={task.task.desc}
                  className="w-full"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}
                  onChange={e => {
                    handleDescriptionChange(
                      task.task.id,
                      e.target.value,
                      task.task.desc
                    );
                  }}
                />
              ) : (
                task.task.desc
              )}
            </Table.Td>
            <Table.Td
              onDoubleClick={() => {
                setEditMode({ ...editMode, [task.task.id]: true });
              }}
              className="hover:cursor-pointer"
            >
              {editMode[task.task.id] ? (
                <Select
                  defaultSearchValue={task.supervisor.name}
                  nothingFoundMessage="No supervisors found. Create one in the Users page."
                  withAsterisk
                  data={supervisors.map(supervisor => ({
                    value: supervisor.id.toString(),
                    label: supervisor.name,
                  }))}
                  onChange={selectedValue =>
                    handleSupervisorChange(task.task.id, selectedValue)
                  }
                />
              ) : (
                task.supervisor.name
              )}
            </Table.Td>

            <Table.Td style={{ backgroundColor: '#DBEAFE', border: 0 }}>
              <div>
                {editMode[task.task.id] ? (
                  <div className="flex justify-center">
                    <Button
                      onClick={() => {
                        handleCancel(task.task.id);
                        setEditMode({ ...editMode, [task.task.id]: false });
                      }}
                      size="xs"
                      style={{ backgroundColor: 'red', marginRight: '5px' }}
                    >
                      <CancelIcon />
                    </Button>
                    <Button
                      onClick={() => {
                        console.log(task);
                        handleSave(
                          task.task.id,
                          task.task.desc,
                          task.task.tag,
                          task.supervisor.id,
                          task.departmentId
                        );
                        setEditMode({ ...editMode, [task.task.id]: false });
                      }}
                      size="xs"
                      style={{ backgroundColor: 'green' }}
                    >
                      <CheckIcon />
                    </Button>
                  </div>
                ) : (
                  console.log('editMode is false')
                )}
              </div>
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

  const handleSelectAll = event => {
    if (event.currentTarget.checked) {
      setSelectedRows(updatedTasks.map(task => task.id));
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
                checked={selectedRows.length === updatedTasks.length}
                onChange={handleSelectAll}
              />
            </Table.Th>
            <Table.Th style={{ textAlign: 'center' }}>Task</Table.Th>
            <Table.Th style={{ textAlign: 'center' }}>Supervisor</Table.Th>
            <Table.Th style={{ backgroundColor: '#DBEAFE' }} />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody className="text-center">{rows}</Table.Tbody>
      </Table>
    </div>
  );
}

export function AddTask({ token, setReload, deptId, tags }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [formData, setFormData] = useState({
    deptId: deptId,
    desc: '',
    tag: '',
    superId: 0,
  });
  const [supervisors, setSupervisors] = useState([]);

  useEffect(() => {
    const fetchSups = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_EXPRESS_BASE_URL}/getAllSupervisors`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSupervisors(response.data);
    };
    fetchSups();
  }, [token]);

  const handleChange = (e, field) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  };

  const handleTagChange = newTag => {
    setFormData({
      ...formData,
      tag: newTag[0] || '',
    });
  };

  const handleSupervisorChange = selectedOptions => {
    setFormData({
      ...formData,
      superId: parseInt(selectedOptions) || 0,
    });
  };

  const handleSubmit = async () => {
    console.log(formData);
    if (formData.desc === '' || formData.tag === '' || formData.superId === 0) {
      alert('Please fill out all the fields.');
      return;
    }
    try {
      await axios.post(
        `${import.meta.env.VITE_APP_EXPRESS_BASE_URL}/addTaskForDepartment`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error(`Failed adding task to department.\n ${error}`);
      alert(`Failed adding task to department.\n ${error}`);
      return;
    }
    setFormData({
      ...formData,
      desc: '',
      tag: '',
      superId: 0,
    });
    close();
    setReload(true);
  };

  return (
    <>
      <Tooltip label="Add Task" openDelay="700">
        <ActionIcon variant="filled" color="green" size="xl" onClick={open}>
          <PlusIcon />
        </ActionIcon>
      </Tooltip>
      <Modal title="Add Task" centered opened={opened} onClose={() => close()}>
        <form>
          <TextInput
            label="Task Description"
            withAsterisk
            onChange={e => handleChange(e, 'desc')}
          />
          <TagsInput
            label="Tag"
            placeholder={formData.tag === '' ? 'Enter Tag' : ''}
            withAsterisk
            maxTags={1}
            data={
              formData.tag === ''
                ? tags.map(tag => ({ value: tag, label: tag }))
                : []
            }
            onChange={handleTagChange}
          />
          <Select
            label="Supervisor"
            placeholder="Choose Supervisor"
            nothingFoundMessage="No supervisors found. Create one in the Users page."
            withAsterisk
            searchable
            data={supervisors.map(supervisor => ({
              value: supervisor.id.toString(),
              label: supervisor.name,
            }))}
            onChange={handleSupervisorChange}
          />
          <div className="flex justify-center mt-10">
            <Button onClick={handleSubmit}>Submit</Button>
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
  const [pageSize, setPageSize] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [selectedTab, setSelectedTab] = useState(
    tags && tags.length > 0 ? `${tags[0]}` : ''
  );
  const [reloadData, setReloadData] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

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
          `${
            import.meta.env.VITE_APP_EXPRESS_BASE_URL
          }/getAllTaskTagsForDepartment/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTags(response2.data);
        console.log('selectedTab', response2.data);

        const response3 = await axios.post(
          `${
            import.meta.env.VITE_APP_EXPRESS_BASE_URL
          }/getAllTasksForDepartment/${id}?page=${page}&pageSize=${pageSize}`,
          {
            tag: selectedTab,
            searchTerm,
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
  }, [id, selectedTab, page, reload, searchTerm]);

  useEffect(() => {
    setPage(1);
  }, [selectedTab]);

  return (
    <div>
      {/* ---------- */}
      <Navbar />
      {/* ---------- */}
      <div>
        {department && (
          <div
            key={department.id}
            className="flex-col bg-white bg-opacity-50 rounded-lg border-2 border-gray-100 p-2 ml-5 m-5"
          >
            <div className="md:flex-col md:items-center md:space-x-5 md:space-y-1 mb-10">
              <div className="text-2xl font-bold">
                {department.name}
              </div>
            </div>
            <div>
              <SearchBar
                setSearchTerm={setSearchTerm}
                leftComp1={
                  <AddTask
                    token={token}
                    setReload={setReload}
                    deptId={department.id}
                    tags={tags}
                  />
                }
                leftComp2={
                  <ArchiveTasks
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                    setReload={setReload}
                    deptId={department.id}
                    token={token}
                  />
                }
                //leftComp3={<EditTask token={token} setReload={setReload} deptId={department.id} taskId={tasks.tasks} tags={tags}/>}
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
                  onChange={e => {
                    setSelectedTab(e);
                    setPage(1);
                  }}
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
                          setTasks={setTasks}
                          tasks={tasks}
                          searchTerm={searchTerm}
                          selectedRows={selectedRows}
                          setSelectedRows={setSelectedRows}
                          setReloadData={setReload}
                          token={token}
                        />
                      )}
                      <div className="flex justify-center mt-10 items-center bg-white bg-opacity-50 p-2 ">
                        <ActionIcon
                          onClick={() => setPage(page - 1)}
                          disabled={page - 1 === 0}
                        >
                          <LeftAngle />
                        </ActionIcon>
                        <span className="font-mono mr-2 ml-2">
                          {page}/{tasks.totalPages}
                        </span>
                        <ActionIcon
                          onClick={() => setPage(page + 1)}
                          disabled={
                            page === tasks.totalPages || tasks.totalPages === 0
                          }
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
        )}
      </div>
      {/* ---------- */}
    </div>
  );
}
