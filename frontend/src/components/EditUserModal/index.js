import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState, useEffect, useRef } from 'react';
import { Listbox } from '@headlessui/react';
import CheckIcon from '../../icons/CheckIcon';
import ChevronUpDownIcon from '../../icons/ChevronUpDownIcon';
import CrossIcon from '../../icons/CrossIcon';
import EditIcon from '../../icons/EditIcon';
import axios from 'axios';
// import Draggable from 'react-draggable';

const EditUserModal = ({ user }) => {
  // const draggableRef = useRef(null);
  const [name, setName] = useState(user.name);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [role, setRole] = useState(user.roleName);
  const [roles, setRoles] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5010/departments/`).then(response => {
      setDepartments(response.data.map(dept => dept.name));
      setSelectedDepartments(user.departmentName);
    });
    axios.get(`http://localhost:5010/roles/`).then(response => {
      setRoles(response.data.map(role => role.roleName));
    });
  }, [user]);

  const handleSubmit = e => {
    console.log(name, selectedDepartments, role);
  };

  return (
    <>
      <button
        className="flex text-white justify-center items-center w-10 h-7 bg-blue-500 rounded-lg cursor-pointer select-none active:translate-y-2  active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841] active:border-b-[0px] transition-all duration-100 [box-shadow:0_10px_0_0_#1b6ff8,0_15px_0_0_#1b70f841] border-b-[1px] border-blue-400"
        onClick={() => setOpen(true)}
      >
        <EditIcon />
      </button>
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

            {/* <Draggable nodeRef={draggableRef}> */}
            <div
              /*ref={draggableRef}*/ className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl border-2 border-gray-800 border-opacity-50"
            >
              <button
                className="absolute top-3 right-3 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => setOpen(false)}
              >
                <CrossIcon className="h-6 w-6" />
              </button>
              <Dialog.Title
                as="h3"
                className="text-lg leading-6 font-medium text-gray-900"
              >
                Edit User
              </Dialog.Title>

              <div className="mt-2">
                <form>
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
                  {/* <div className="flex justify-center items-center"> */}
                  <div
                    className="flex text-white justify-center items-center mt-10 w-20 h-7 bg-green-500 rounded-lg cursor-pointer select-none active:translate-y-2  active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841] active:border-b-[0px] transition-all duration-100 [box-shadow:0_10px_0_0_#28a745,0_15px_0_0_#28a74541] border-b-[1px] border-green-400"
                    onClick={() => {
                      handleSubmit();
                      setOpen(false);
                    }}
                  >
                    <CheckIcon />
                  </div>
                  {/* </div> */}
                </form>
              </div>
            </div>
            {/* </Draggable> */}
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default EditUserModal;
