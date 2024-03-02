import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Section from '../components/Section';
import axios from 'axios';
// import Table from '../components/Table';

function UserPage() {
  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:5010/user/${id}`)
      .then(response => {
        setUserData(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.log('error: ', error);
      });
    axios
      .get(`https://dummyjson.com/todos`)
      .then(response => {
        if (response.data.todos && Array.isArray(response.data.todos)) {
          setTasks(response.data.todos);
          console.log('response.data.todos: ', response.data.todos);
        } else {
          console.error('Data from API is not an array');
        }
        setIsLoading(false);
      })
      .catch(error => {
        console.log('error: ', error);
      });
  }, []);

  const data = isLoading
    ? [{}]
    : tasks
        // .filter(task => task.description.toLowerCase().includes(searchTerm))
        .map(task => ({
          id: task.id,
          description: task.todo,
        }));
  const headings = ['Description', '', 'Date Completed', 'Supervisor'];

  const handleSearchTermChange = event => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <div className="flex">
        <Navbar />
        <div className="flex flex-col flex-grow">
          {/*Search Bar*/}
          <Section>
            <input
              className="w-full border-2 border-gray-300 focus:outline-none focus:border-warrenBlue rounded"
              type="text"
              placeholder=" Search Tasks"
              onFocus={e => e.target.select()}
              onChange={handleSearchTermChange}
            />
          </Section>
          <Section>
            <div className="flex items-center">
              <h1 className="mb-2 text-white text-2xl font-bold">{userData.name}</h1>
              <span className="ml-4 mb-2 text-black font-bold">{userData.email}</span>
            </div>
            {/* <Table data={data} headings={headings} isLoading={isLoading} /> */}
          </Section>
        </div>
      </div>
    </>
  );
}

export default UserPage;
