import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState, useEffect, useRef } from 'react';
import { Listbox } from '@headlessui/react';
import CheckIcon from '../../icons/CheckIcon';
import ChevronUpDownIcon from '../../icons/ChevronUpDownIcon';
import CrossIcon from '../../icons/CrossIcon';
import AddUserIcon from '../../icons/AddUserIcon';
import axios from 'axios';

const AddUserButton = () => {
  const [name, setName] = useState('');
  const [departments, setDepartments] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [roles, setRoles] = useState([]);
  const [open, setOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:5010/departments/`).then(response => {
      setDepartments(response.data.map(dept => dept.name));
      //setSelectedDepartments(us);
    });
    axios.get(`http://localhost:5010/roles/`).then(response => {
      setRoles(response.data.map(role => role.roleName));
    });
  }, []);

  const resetForm = () => {
    setName('');
    setSelectedDepartments([]);
    setFormErrors({});
  };

  const handleSubmit = e => {
    const errors = {};

    if (!name) {
      errors.name = 'Name is required';
    }
    if (selectedRole === 'Employee' && selectedDepartments.length === 0) {
      errors.departments = 'At least one department must be selected for onboarding employees';
    }
    if (selectedRole === 'Admin' && selectedDepartments.length > 0) {
      errors.departments = 'Admins cannot be assigned to departments';
    }
    if (selectedRole === 'Supervisor' && selectedDepartments.length > 0) {
      errors.departments = 'Supervisors cannot be assigned to departments';
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    axios
      .put(`http://localhost:5010/users`, {
        name: name,
        departmentName: selectedDepartments,
        roleName: selectedRole,
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });

    setOpen(false);
    resetForm();
    window.location.reload();
  };

  return (
    <>
      <button
        className="flex mb-8 w-48 h-10 text-white justify-center items-center bg-green-500 rounded-lg cursor-pointer select-none active:translate-y-2  active:[box-shadow:0_0px_0_0_#1db004,0_0px_0_0_#1db00441] active:border-b-[0px] transition-all duration-100 [box-shadow:0_10px_0_0_#1db004,0_15px_0_0_#1db00441] border-b-[1px] border-green-400"
        onClick={() => {
          setOpen(true);
        }}
      >
        <div className="flex items-center space-x-2 px-2">
          <AddUserIcon />
          <span>Add New Supervisor</span>
        </div>
      </button>
      <Transition appear show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => {
            setOpen(false);
            resetForm();
          }}
        >
          <div className="min-h-screen px-4 text-center">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>

            {/* <Draggable nodeRef={draggableRef}> */}
            <div
              /*ref={draggableRef}*/ className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl border-2 border-gray-800 border-opacity-50"
            >
              <button
                className="absolute top-3 right-3 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                onClick={() => {
                  setOpen(false);
                  resetForm();
                }}
              >
                <CrossIcon className="h-6 w-6" />
              </button>
              <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                Add User
              </Dialog.Title>

              <div className="mt-2">
                <form>
                  {/* Name */}
                  <label className="block">
                    <span className="text-gray-700">Name</span>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full rounded-md border-2 shadow-md" />
                    {formErrors.name && <p style={{ color: 'red' }}>{formErrors.name}</p>}
                  </label>

                  {/* Department */}
                  <label className="block mt-5">
                    <span className="text-gray-700">Department</span>
                    <Listbox value={selectedDepartments} onChange={setSelectedDepartments} multiple>
                      <div className="relative mt-1">
                        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                          <span className="block truncate">{selectedDepartments.join(', ')}</span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                          </span>
                        </Listbox.Button>
                        <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                          <Listbox.Options className="relative z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                            {departments.map((dept, deptIdx) => (
                              <Listbox.Option
                                key={deptIdx}
                                className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'}`}
                                value={dept}
                              >
                                {({ selected }) => (
                                  <>
                                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{dept}</span>
                                    {selected ? (
                                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
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
                    {formErrors.departments && <p style={{ color: 'red' }}>{formErrors.departments}</p>}
                  </label>

                  {/* Role */}
                  <label className="block mt-5">
                    <span className="text-gray-700">Role</span>
                    <Listbox value={selectedRole} onChange={setSelectedRole}>
                      <div className="relative mt-1">
                        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                          <span className="block truncate">{selectedRole}</span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                          </span>
                        </Listbox.Button>
                        <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                          <Listbox.Options className="relative z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                            {roles.map((role, roleIdx) => (
                              <Listbox.Option
                                key={roleIdx}
                                className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'}`}
                                value={role}
                              >
                                {({ selected }) => (
                                  <>
                                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{role}</span>
                                    {selected ? (
                                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
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
                    {formErrors.selectedRole && <p style={{ color: 'red' }}>{formErrors.selectedRole}</p>}
                  </label>

                  {/* Submit */}
                  {/* <div className="flex justify-center items-center"> */}
                  <div
                    className="flex text-white justify-center items-center mt-10 w-20 h-7 bg-green-500 rounded-lg cursor-pointer select-none active:translate-y-2  active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841] active:border-b-[0px] transition-all duration-100 [box-shadow:0_10px_0_0_#28a745,0_15px_0_0_#28a74541] border-b-[1px] border-green-400"
                    onClick={() => {
                      handleSubmit();
                      //window.location.reload();
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

export default AddUserButton;
