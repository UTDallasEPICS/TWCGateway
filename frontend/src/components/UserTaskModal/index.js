import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState, useEffect } from 'react';
import CrossIcon from '../../icons/CrossIcon';
import Cookies from 'js-cookie';
import axios from 'axios';
import Table from '../Table';
import TableRowSkeleton from '../TableRowSkeleton';
import '../../styles/Table.css';
import AddUserIcon from '../../icons/AddUserIcon';

const UserTaskModal = ({ isOpen, setIsOpen, row, userData }) => {
  //make table using faux data
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get(`https://dummyjson.com/todos`).then(response => {
      console.log(response.data);
      setTasks(response.data.todos);
      setIsLoading(false);
    });
  }, []);

  const handleSearchTermChange = e => {
    setSearchTerm(e.target.value);
  };

  const tableHeadings = ['Task', 'Status'];
  console.log(isLoading);
  const tableData = isLoading ? (
    <TableRowSkeleton />
  ) : (
    tasks.filter(task => task.todo.toLowerCase().includes(searchTerm.toLowerCase())).map(task => ({ Task: task.todo, Status: task.completed ? 'Completed' : 'Incomplete' }))
  );

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={() => setIsOpen(false)}>
          <div className="min-h-screen px-5 text-center">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>

            <div
              className="inline-block w-full p-6 my-8 overflow-auto text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl border-2 border-gray-800 border-opacity-50"
              style={{ width: '90vw', height: '80vh', scrollbarWidth: 'thin', scrollbarColor: 'rgba(155, 155, 155, 0.7) transparent', overflowX: 'auto' }}
            >
              <button className="absolute top-3 right-3 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onClick={() => setIsOpen(false)}>
                <CrossIcon className="h-6 w-6" />
              </button>
              <Dialog.Title as="h3" className="text-lg leading-6 font-medium">
                User Tasks
              </Dialog.Title>

              <div className="flex flex-row justify-between">
                <button className="flex mb-8 w-48 h-10 text-white justify-center items-center bg-green-500 rounded-lg cursor-pointer select-none active:translate-y-2  active:[box-shadow:0_0px_0_0_#1db004,0_0px_0_0_#1db00441] active:border-b-[0px] transition-all duration-100 [box-shadow:0_10px_0_0_#1db004,0_15px_0_0_#1db00441] border-b-[1px] border-green-400">
                  Add Task
                </button>
              </div>

              {/*Search Bar*/}
              <div className=" mt-2 mr-2 p-2 rounded-lg bg-gray-900">
                <input
                  className="w-full border-2 border-gray-300 focus:outline-none focus:border-warrenBlue rounded"
                  type="text"
                  placeholder=" Search Users"
                  onFocus={e => e.target.select()}
                  onChange={handleSearchTermChange}
                />
              </div>

              <div className="mt-2 flex justify-center">
                {row.Name} | {userData.email}
              </div>
              <div style={{ overflowX: 'auto' }}>
                <Table data={tableData} headings={tableHeadings} isLoading={isLoading} />
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default UserTaskModal;
