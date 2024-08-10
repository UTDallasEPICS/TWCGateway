import Navbar from '../../components/Navbar';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from '../../components/SearchBar';
import { Table, Checkbox, Button, Mark } from '@mantine/core';
import CheckIcon from '../../assets/icons/CheckIcon';
import PropTypes from 'prop-types';
import CancelIcon from '../../assets/icons/CancelIcon';
import Cookies from 'js-cookie';

export default function Department() {
  const { id } = useParams();
  const [department, setDepartment] = useState({});
  // const token = JSON.parse(localStorage.getItem(localStorage.key(1))).id_token;
  const token = Cookies.get('token');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [editMode, setEditMode] = useState({});
  const [changedRows, setChangedRows] = useState([]);
  const [reload, setReload] = useState(false);

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
        //const tasksData = response.data;
        const originalDescMap = {};
        const tasksWithOriginalDesc = Object.values(response.data)
          .filter(
            task =>
              typeof task === 'object' &&
              task !== null &&
              !Object.prototype.hasOwnProperty.call(task, 'totalPages') &&
              !Object.prototype.hasOwnProperty.call(task, 'totalTasks')
          )
          .map((task) => {
            originalDescMap[task.id] = task.task.desc;
            return {
              ...task,
              task: {
                ...task.task,
                originalDesc: task.task.desc,
                ogTag: task.task.tag
              }
            };
          });
        setTasks(tasksWithOriginalDesc);
        console.log('tasks', tasksWithOriginalDesc);

      } catch (error) {
        console.error('Error in fetching tasks in Task page', error);
      }
    };
    getTasksForDepartment();

    if (reload) {
      console.log('reloading');
      getTasksForDepartment();
      setReload(false);
    }

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

  }, [reload]);

  const handleAllRowSelect = () => {};

  // handleSave.propTypes = {
  //   setReload: PropTypes.func,
  // }

  const handleSave = async (taskId, newDesc, newTag) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_APP_EXPRESS_BASE_URL}/updateTask`,
        {
          id: taskId,
          desc: newDesc,
          tag: newTag,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('response', response);
      setEditMode({ ...editMode, [taskId]: false });
      setChangedRows(changedRows.filter(rowId => rowId !== taskId));
      setReload(true);
    } catch (error) {
      console.error('Error updating task', error);
    }
  };

  const handleDescriptionChange = (taskId, newDesc, oldDesc) => {
        console.log('newDesc', newDesc);
        console.log('oldDesc', oldDesc);
        setEditMode({...editMode, [taskId]: true});
        setChangedRows([...changedRows, taskId]);
        setTasks(tasks.map(t => t.task.id === taskId ? { ...t, task: { ...t.task, desc: newDesc} } : t));
  };

  const handleTagChange = (taskId, oldTag, newTag) => {
      console.log('newTag', newTag);
      console.log('oldTag', oldTag);
      setEditMode({...editMode, [taskId]: true});
      setChangedRows([...changedRows, taskId]);
      setTasks(tasks.map(t => t.task.id === taskId ? { ...t, task: { ...t.task, tag: newTag } } : t));
  };

  const handleCancel = (taskId, ogDesc, ogTag) => {
    setTasks(tasks.map(t => t.task.id === taskId ? { ...t, task: { ...t.task, desc: ogDesc, tag: ogTag } } : t));
  }

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
                    <div className="text-center">Description</div>
                  </Table.Th>
                  <Table.Th className="w-1/3">
                    <div className="text-center">Tag</div>
                  </Table.Th>
                  <Table.Th className="w-1/3">
                    <div className="text-center">Supervisor</div>
                  </Table.Th>
                  <Table.Th className="w-1/3">
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
                    <Table.Td className="w-1/2">
                      <input
                        type="text"
                        value={task.task.desc}
                        className="w-full"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}
                        onChange={(e) =>
                          {
                            handleDescriptionChange(task.task.id, e.target.value, task.task.originalDesc)
                          }
                        }
                      />
                    </Table.Td>
                    <Table.Td className="w-1/2">
                      <input
                        type="text"
                        value={task.task.tag}
                        className="w-full"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}
                        onChange={(e) =>
                          {
                            handleTagChange(task.task.id, task.task.ogTag, e.target.value)
                          }
                        }
                      />
                    </Table.Td>
                    <Table.Td className="w-1/12">
                    </Table.Td>
                    <Table.Td className="w-full">
                    <div>
                      {editMode[task.task.id] ? (
                        <div className="flex">
                        <Button
                        onClick={() => {
                            handleCancel(task.task.id, task.task.originalDesc, task.task.ogTag);
                            setEditMode({...editMode, [task.task.id]: false});
                          }}
                        size= "xs"
                        style = {{backgroundColor: 'red', marginRight: '5px'}}
                      >
                        <CancelIcon />
                      </Button>
                        <Button
                          onClick={() => handleSave(task.task.id, task.task.desc, task.task.tag)}
                          size= "xs"
                          style = {{backgroundColor: "green"}}
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
                ))}
              </Table.Tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
)}
