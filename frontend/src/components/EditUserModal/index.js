import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState, useEffect} from 'react';
import { Listbox } from '@headlessui/react';
import CheckIcon from '../../icons/CheckIcon';
import ChevronUpDownIcon from '../../icons/ChevronUpDownIcon';
import axios from 'axios';

const EditUserModal = ({ user, onSubmit, open, setOpen }) => {
  const [name, setName] = useState(user.name);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [role, setRole] = useState(user.roleName);

  const roles = ['Admin', 'Manager', 'Employee'];

  useEffect(() => {
    axios.get(`http://localhost:5010/departments/`).then(response => {
      setDepartments(response.data.map(dept => dept.name));
      setSelectedDepartments(user.departmentName);
    });
  }, [user]);

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ name, department: selectedDepartments, role });
  };

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="min-h-screen px-4 text-center">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
            <Dialog.Title
              as="h3"
              className="text-lg leading-6 font-medium text-gray-900"
            >
              Edit User
            </Dialog.Title>

            <div className="mt-2">
              <form onSubmit={handleSubmit}>
                {/* Name */}
                <label className="block">
                  <span className="text-gray-700">Name</span>
                  <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="mt-1 block w-full rounded-md border-2 shadow-md"
                  />
                </label>

                {/* Department */}
                <label className="block mt-5">
                  <span className="text-gray-700">Department</span>
                  <Listbox
                    value={selectedDepartments}
                    onChange={setSelectedDepartments}
                    multiple
                  >
                    <div className="relative mt-1">
                      <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate">
                          {selectedDepartments.join(', ')}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="relative z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                          {departments.map((dept, deptIdx) => (
                            <Listbox.Option
                              key={deptIdx}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                  active
                                    ? 'bg-amber-100 text-amber-900'
                                    : 'text-gray-900'
                                }`
                              }
                              value={dept}
                            >
                              {({ selected }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected ? 'font-medium' : 'font-normal'
                                    }`}
                                  >
                                    {dept}
                                  </span>
                                  {selected ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                      <CheckIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                </label>

                {/* Role */}
                <label className="block mt-5">
                  <span className="text-gray-700">Role</span>
                  <Listbox value={role} onChange={setRole}>
                    <div className="relative mt-1">
                      <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate">{role}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="relative z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                          {roles.map((role, roleIdx) => (
                            <Listbox.Option
                              key={roleIdx}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                  active
                                    ? 'bg-amber-100 text-amber-900'
                                    : 'text-gray-900'
                                }`
                              }
                              value={role}
                            >
                              {({ selected }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected ? 'font-medium' : 'font-normal'
                                    }`}
                                  >
                                    {role}
                                  </span>
                                  {selected ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                      <CheckIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                </label>

                {/* Submit */}
                <div className="flex justify-center items-center">
                  <button
                    className="flex text-white justify-center items-center mt-10 w-20 h-7 bg-green-500 rounded-lg cursor-pointer select-none active:translate-y-2  active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841] active:border-b-[0px] transition-all duration-100 [box-shadow:0_10px_0_0_#28a745,0_15px_0_0_#28a74541] border-b-[1px] border-green-400"
                    onClick={handleSubmit}
                  >
                    <CheckIcon />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditUserModal;
