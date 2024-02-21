import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState, useEffect, useRef } from 'react';
import { Listbox } from '@headlessui/react';
import CheckIcon from '../../icons/CheckIcon';
import ChevronUpDownIcon from '../../icons/ChevronUpDownIcon';
import CrossIcon from '../../icons/CrossIcon';
import AddUserIcon from '../../icons/AddUserIcon';
import Button from '../Button';
import axios from 'axios';

const AddUserButton = ({userRole}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [departments, setDepartments] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [roles, setRoles] = useState(['Employee', 'Supervisor', 'Admin']);
  const [open, setOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:5010/departments/`).then(response => {
      setDepartments(response.data.map(dept => dept.name));
    });
  }, []);

  const checkEmailExists = async email => {
    let emailExists = false;
    await axios
      .post(`http://localhost:5010/checkEmail/`, {
        email: email,
      })
      .then(response => {
        console.log('response: ', response);
        console.log('response.data: ', response.data);
        if (response.data) {
          console.log('Email already exists');
          emailExists = true;
        }
      })
      .catch(error => {
        console.log('error: ', error);
        if (error.response && error.response.status === 404) {
          console.log('Email does not exist');
          emailExists = false;
        }
      });
    console.log('emailExists: ', emailExists);
    return emailExists;
  };

  const resetForm = () => {
    setName('');
    setSelectedDepartments([]);
    setFormErrors({});
  };

  const handleSubmit = async e => {
    const errors = {};

    if (!name) {
      errors.name = 'Name is required';
    }

    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    } else {
      try {
        const emailExists = await checkEmailExists(email);
        if (emailExists) {
          errors.email = 'Email already exists';
        }
      } catch (error) {
        console.error('Error checking if email exists', error);
      }
    }

    console.log('errors: ', errors);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const upperCaseRole = userRole.toUpperCase();

    try {
      const response = await axios.post(`http://localhost:5010/user`, {
        name: name,
        email: email,
        departmentName: selectedDepartments,
        role: upperCaseRole,
      });
      console.log(response);
    } catch (error) {
      console.error('Error creating user', error);
    }

    setOpen(false);
    resetForm();
    window.location.reload();
  };

  return (
    <>
      <Button
        extraStyling={`py-3 px-3 mb-1`}
        onClick={() => {
          setOpen(true);
        }}
        tooltip={`Add ${userRole}`}
        color="green"
      >
        <div className="flex items-center space-x-2 px-2">
          <AddUserIcon />
        </div>
      </Button>
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
                Add {userRole}
              </Dialog.Title>

              <div className="mt-2">
                <form>
                  {/* Name */}
                  <label className="block">
                    <span className="text-gray-700">Name</span>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full rounded-md border-2 shadow-md" />
                    {formErrors.name && <p style={{ color: 'red' }}>{formErrors.name}</p>}
                  </label>

                  {/* Email */}
                  <label className="block mt-5">
                    <span className="text-gray-700">Email</span>
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 block w-full rounded-md border-2 shadow-md" />
                    {formErrors.email && <p style={{ color: 'red' }}>{formErrors.email}</p>}
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

                  {/* Submit */}
                  {/* <div className="flex justify-center items-center"> */}
                  <div
                    className="flex text-white justify-center items-center mt-10 w-20 h-7 bg-green-500 rounded-lg cursor-pointer select-none active:translate-y-2  active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841] active:border-b-[0px] transition-all duration-100 [box-shadow:0_10px_0_0_#28a745,0_15px_0_0_#28a74541] border-b-[1px] border-green-400"
                    onClick={() => {
                      handleSubmit();
                      //window.location.reload(); tried didn't work
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
