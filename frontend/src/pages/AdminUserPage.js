import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Section from '../components/Section';
import axios from 'axios';
import { TaskTable } from '../components/Table';
import Button from '../components/Button';
import EmployeeAddTask from '../components/EmployeeAddTask';
import EmployeeDeleteTask from '../components/EmployeeDeleteTask';

function UserPage() {
  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTaskIds, setSelectedTaskIds] = useState([]);
  const [completedDate, setCompletedDate] = useState('');
  const [page, setPage] = useState(() => {
    const savedPage = localStorage.getItem('page');
    return savedPage ? JSON.parse(savedPage) : 1;
  });

  useEffect(() => {
    setIsLoading(true);
    localStorage.setItem('page', JSON.stringify(page));
    Promise.all([
      axios.get(`http://localhost:5010/user/${id}`),
      axios.get(
        `http://localhost:5010/tasks/user-employee/${id}?page=${page}&pageSize=9`
      ),
    ])
      .then(([userResponse, tasksResponse]) => {
        setUserData(userResponse.data);
        console.log('userResponse', userResponse.data);
        setTasks(tasksResponse.data);
        console.log('tasksResponse', tasksResponse.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.log('error: ', error);
      });
  }, [page]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const columns = [
    {
      Header: 'Description',
      accessor: 'description',
    },
    {
      Header: 'Completed?',
      id: 'completed',
      Cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.original.completed}
          onChange={event => {
            handleToggleCompleted(row.original.id, event);
            window.location.reload();
          }}
        />
      ),
    },
    {
      Header: 'Completed On',
      accessor: 'dateCompleted',
      Cell: ({ value }) => {
        if (!value) {
          return '-';
        }
        const date = new Date(value);
        const cstDate = date.toLocaleString('en-US', {
          timeZone: 'America/Chicago',
        });
        return cstDate;
      },
    },
    {
      Header: 'Supervisor',
      accessor: task => task.supervisor.name,
      id: 'supervisor',
    },
  ];

  const handleToggleCompleted = (taskId, event) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      axios
        .patch(
          `http://localhost:5010/task/complete-task/`,
          {
            taskId: taskId,
            userId: userData.id,
          },
          {
            headers: {
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem(localStorage.key(1))).id_token
              }`,
            },
          }
        )
        .then(response => {})
        .catch(error => {
          console.log(error);
        });
    } else {
      axios
        .patch(
          `http://localhost:5010/task/uncomplete-task/`,
          {
            taskId: taskId,
            userId: userData.id,
          },
          {
            headers: {
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem(localStorage.key(1))).id_token
              }`,
            },
          }
        )
        .then(response => {})
        .catch(error => {
          console.log(error);
        });
    }
  };

  const handlePrevClick = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextClick = () => {
    if (page < tasks[0].totalPages) {
      setPage(page + 1);
    }
  };

  const data = tasks
    .filter(task => {
      if (searchTerm === '') {
        return task;
      } else if (
        task.description &&
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return task;
      }
    })
    .flat();

  return (
    <>
      <div className="flex">
        <Navbar />
        <div className="flex flex-col flex-grow">
          <Section extraStyling="sticky top-2 z-10 ">
            <div className="flex items-center">
              <div>
                <EmployeeAddTask userId={id} />
              </div>
              <Section>
                <div className="flex space-x-2">
                  <Button
                    color="indigo"
                    extraStyling="p-1"
                    onClick={handlePrevClick}
                  >
                    Prev
                  </Button>
                  <h1>
                    {page}/{tasks[0].totalPages}
                  </h1>
                  <Button
                    color="indigo"
                    extraStyling="p-1"
                    onClick={handleNextClick}
                  >
                    Next
                  </Button>
                </div>
              </Section>
              <div className="flex-grow flex justify-center">
                <input
                  className="w-5/6 text-center border-2 border-gray-300 focus:outline-none focus:border-warrenBlue rounded"
                  type="text"
                  placeholder="Search Tasks"
                  onChange={handleSearch}
                />
              </div>
              <div>
                <EmployeeDeleteTask selectedTaskIds={selectedTaskIds} />
              </div>
            </div>
          </Section>
          <Section>
            <div className="flex justify-between items-end mb-2">
              <div className="flex-col ">
                <h1 className="text-2xl text-warrenBlue font-bold">
                  {userData.name}
                </h1>
                <h1 className="font-semibold">{userData.email}</h1>
                <h1 className="font-semibold">
                  {userData.departmentName.join(', ')}
                </h1>
              </div>
            </div>
            <TaskTable
              columns={columns}
              data={data}
              setSelectedTaskIds={setSelectedTaskIds}
            />
          </Section>
        </div>
      </div>
    </>
  );
}

export default UserPage;
