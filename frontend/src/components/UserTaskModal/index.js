import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState, useEffect } from 'react';
import CrossIcon from '../../icons/CrossIcon';
import Cookies from 'js-cookie';
import axios from 'axios';
import Table from '../Table';

const UserTaskModal = ({ isOpen, setIsOpen, row, userData }) => {
  //make table using faux data
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTasks();
  }, [])

  const getTasks = () => {
    axios.get(`https://dummyjson.com/todos`).then(response => {
      console.log(response.data);
      setTasks(response.data.todos);
      setIsLoading(false);
    });
  };

  const tableHeadings = ['Task', 'Status'];
  const tableData = isLoading ? [] : tasks.map(task => [task.todo, task.completed ? 'Completed' : 'Incomplete']);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={() => setIsOpen(false)}>
          <div className="min-h-screen px-5 text-center">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>

            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl border-2 border-gray-800 border-opacity-50">
              <button className="absolute top-3 right-3 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onClick={() => setIsOpen(false)}>
                <CrossIcon className="h-6 w-6" />
              </button>
              <Dialog.Title as="h3" className="text-lg leading-6 font-medium">
                User Tasks
              </Dialog.Title>

              <div className="mt-2 flex justify-center">
                {row.Name} | {userData.email}
              </div>
              <Table data={tableData} headings={tableHeadings} isLoading={isLoading} />
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default UserTaskModal;
