// import { Dialog, Transition } from '@headlessui/react';
// import React, { Fragment, useState, useEffect, useRef } from 'react';
// import { Listbox } from '@headlessui/react';
// import CheckIcon from '../../icons/CheckIcon';
// import ChevronUpDownIcon from '../../icons/ChevronUpDownIcon';
// import CrossIcon from '../../icons/CrossIcon';
// import AddUserIcon from '../../icons/AddUserIcon';
// import Button from '../Button';
// import axios from 'axios';

// const AddUserButton = ({userRole}) => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [departments, setDepartments] = useState([]);
//   const [selectedDepartments, setSelectedDepartments] = useState([]);
//   const [roles, setRoles] = useState(['Employee', 'Supervisor', 'Admin']);
//   const [open, setOpen] = useState(false);
//   const [formErrors, setFormErrors] = useState({});

//   useEffect(() => {
//     axios.get(`http://localhost:5010/departments/`).then(response => {
//       setDepartments(response.data.map(dept => dept.name));
//     });
//   }, []);

//   const checkEmailExists = async email => {
//     let emailExists = false;
//     await axios
//       .post(`http://localhost:5010/checkEmail/`, {
//         email: email,
//       })
//       .then(response => {
//         console.log('response: ', response);
//         console.log('response.data: ', response.data);
//         if (response.data) {
//           console.log('Email already exists');
//           emailExists = true;
//         }
//       })
//       .catch(error => {
//         console.log('error: ', error);
//         if (error.response && error.response.status === 404) {
//           console.log('Email does not exist');
//           emailExists = false;
//         }
//       });
//     console.log('emailExists: ', emailExists);
//     return emailExists;
//   };

//   const resetForm = () => {
//     setName('');
//     setSelectedDepartments([]);
//     setFormErrors({});
//   };

//   const handleSubmit = async e => {
//     const errors = {};

//     if (!name) {
//       errors.name = 'Name is required';
//     }

//     if (!email) {
//       errors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       errors.email = 'Email is invalid';
//     } else {
//       try {
//         const emailExists = await checkEmailExists(email);
//         if (emailExists) {
//           errors.email = 'Email already exists';
//         }
//       } catch (error) {
//         console.error('Error checking if email exists', error);
//       }
//     }

//     console.log('errors: ', errors);
//     if (Object.keys(errors).length > 0) {
//       setFormErrors(errors);
//       return;
//     }

//     const upperCaseRole = userRole.toUpperCase();

//     try {
//       const response = await axios.post(`http://localhost:5010/user/new-${userRole.toLowerCase()}-user`, {
//         name: name,
//         email: email,
//         departmentName: selectedDepartments,
//         role: upperCaseRole,
//       }, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });
//       console.log(response);
//     } catch (error) {
//       console.error('Error creating user', error);
//     }

//     setOpen(false);
//     resetForm();
//     window.location.reload();
//   };

//   return (
//     <>
//       <Button
//         extraStyling={`py-3 px-3 mb-1`}
//         onClick={() => {
//           setOpen(true);
//         }}
//         tooltip={`Add ${userRole}`}
//         color="green"
//       >
//         <div className="flex items-center space-x-2 px-2">
//           <AddUserIcon />
//         </div>
//       </Button>
//       <Transition appear show={open} as={Fragment}>
//         <Dialog
//           as="div"
//           className="fixed inset-0 z-10 overflow-y-auto"
//           onClose={() => {
//             setOpen(false);
//             resetForm();
//           }}
//         >
//           <div className="min-h-screen px-4 text-center">
//             <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

//             <span className="inline-block h-screen align-middle" aria-hidden="true">
//               &#8203;
//             </span>

//             {/* <Draggable nodeRef={draggableRef}> */}
//             <div
//               /*ref={draggableRef}*/ className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl border-2 border-gray-800 border-opacity-50"
//             >
//               <button
//                 className="absolute top-3 right-3 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//                 onClick={() => {
//                   setOpen(false);
//                   resetForm();
//                 }}
//               >
//                 <CrossIcon className="h-6 w-6" />
//               </button>
//               <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
//                 Add {userRole}
//               </Dialog.Title>

//               <div className="mt-2">
//                 <form>
//                   {/* Name */}
//                   <label className="block">
//                     <span className="text-gray-700">Name</span>
//                     <input type="text" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full rounded-md border-2 shadow-md" />
//                     {formErrors.name && <p style={{ color: 'red' }}>{formErrors.name}</p>}
//                   </label>

//                   {/* Email */}
//                   <label className="block mt-5">
//                     <span className="text-gray-700">Email</span>
//                     <input type="text" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 block w-full rounded-md border-2 shadow-md" />
//                     {formErrors.email && <p style={{ color: 'red' }}>{formErrors.email}</p>}
//                   </label>

//                   {/* Department */}
//                   <label className="block mt-5">
//                     <span className="text-gray-700">Department</span>
//                     <Listbox value={selectedDepartments} onChange={setSelectedDepartments} multiple>
//                       <div className="relative mt-1">
//                         <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
//                           <span className="block truncate">{selectedDepartments.join(', ')}</span>
//                           <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
//                             <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
//                           </span>
//                         </Listbox.Button>
//                         <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
//                           <Listbox.Options className="relative z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
//                             {departments.map((dept, deptIdx) => (
//                               <Listbox.Option
//                                 key={deptIdx}
//                                 className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'}`}
//                                 value={dept}
//                               >
//                                 {({ selected }) => (
//                                   <>
//                                     <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{dept}</span>
//                                     {selected ? (
//                                       <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
//                                         <CheckIcon className="h-5 w-5" aria-hidden="true" />
//                                       </span>
//                                     ) : null}
//                                   </>
//                                 )}
//                               </Listbox.Option>
//                             ))}
//                           </Listbox.Options>
//                         </Transition>
//                       </div>
//                     </Listbox>
//                     {formErrors.departments && <p style={{ color: 'red' }}>{formErrors.departments}</p>}
//                   </label>

//                   {/* Submit */}
//                   {/* <div className="flex justify-center items-center"> */}
//                   <div
//                     className="flex text-white justify-center items-center mt-10 w-20 h-7 bg-green-500 rounded-lg cursor-pointer select-none active:translate-y-2  active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841] active:border-b-[0px] transition-all duration-100 [box-shadow:0_10px_0_0_#28a745,0_15px_0_0_#28a74541] border-b-[1px] border-green-400"
//                     onClick={() => {
//                       handleSubmit();
//                       //window.location.reload(); tried didn't work
//                     }}
//                   >
//                     <CheckIcon />
//                   </div>
//                   {/* </div> */}
//                 </form>
//               </div>
//             </div>
//             {/* </Draggable> */}
//           </div>
//         </Dialog>
//       </Transition>
//     </>
//   );
// };

// export default AddUserButton;

import * as React from 'react';
import Button from '../Button';
import AddUserIcon from '../../icons/AddUserIcon';
import Section from '../Section';
import axios from 'axios';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Cookies from 'js-cookie';

const AddUserButton = () => {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [role, setRole] = React.useState('');
  const [departments, setDepartments] = React.useState([]);
  const [selectedDepartments, setSelectedDepartments] = React.useState([]);
  const [formErrors, setFormErrors] = React.useState({});
  const [supervisorTasks, setSupervisorTasks] = React.useState([]);

  React.useEffect(() => {
    axios
      .get('http://localhost:5010/departments/')
      .then(response => {
        console.log('departments', response);
        setDepartments(response.data.map(dept => dept));
        // Create an array of promises
        const promises = response.data.map(dept => {
          return axios.get(`http://localhost:5010/tasks/department/${dept.id}`);
        });
        // Wait for all promises to resolve
        Promise.all(promises)
          .then(results => {
            // Combine all tasks into a single array
            const allTasks = results.flatMap(result => result.data);
            console.log('tasks', allTasks);
            setSupervisorTasks(allTasks);
          })
          .catch(error => {
            console.error('Error getting tasks', error);
          });
      })
      .catch(error => {
        console.error('Error getting departments', error);
      });
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    const errors = {};

    if (!name) {
      errors.name = 'Name is required';
    }

    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }

    if (!role) {
      errors.role = 'Role is required';
    }

    if (role.value === 'EMPLOYEE' && selectedDepartments.length === 0) {
      errors.departments = 'Department is required';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    if (role.value === 'EMPLOYEE') {
      axios
        .post(
          'http://localhost:5010/user/new-employee-user',
          {
            name: name,
            email: email,
            departmentName: selectedDepartments.map(dept => dept.value),
            role: role.value,
          },
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem(localStorage.key(1))).id_token}`,
            },
          }
        )
        .then(response => {
          console.log('response', response);
          setFormErrors({});
          setSelectedDepartments([]);
        })
        .catch(error => {
          console.error('Error creating employee', error);
        });
    } else if (role.value === 'SUPERVISOR') {
      console.log('sd', selectedDepartments);
      console.log(
        'selectedDepartments',
        selectedDepartments.map(task => task.value)
      );
      axios
        .post(
          'http://localhost:5010/user/new-supervisor-user',
          {
            name: name,
            email: email,
            role: role.value,
            assignedTaskIds: selectedDepartments.map(task => task.value),
          },
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem(localStorage.key(1))).id_token}`,
            },
          }
        )
        .then(response => {
          console.log('response', response);
          setFormErrors({});
        })
        .catch(error => {
          console.error('Error creating supervisor', error);
        });
    } else {
      axios.post(
        'http://localhost:5010/user/new-admin-user',
        {
          name: name,
          email: email,
          role: role.value,
        },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem(localStorage.key(1))).id_token}`,
          },
        }
      );
    }

    setOpen(false);
    setName('');
    setEmail('');
    setRole('');
    window.location.reload();
  };

  const animatedComponents = makeAnimated();

  return (
    <>
      <Button
        extraStyling={`py-3 px-3 mb-1`}
        onClick={() => {
          setOpen(!open);
        }}
        tooltip={`Add User`}
        color="green"
      >
        <div className="flex items-center space-x-2 px-2">
          <AddUserIcon />
        </div>
      </Button>

      {open && (
        <Section>
          <form className="flex-col space-x-2" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label>Name</label>
              <input className="h-9 rounded border-2 hover:border-blue-400" placeholder="  Type..." type="text" value={name} onChange={e => setName(e.target.value)} />
              {formErrors.name && <p style={{ color: 'red' }}>{formErrors.name}</p>}
            </div>
            <div className="flex flex-col">
              <label>Email</label>
              <input className="h-9 rounded border-2 hover:border-blue-400" placeholder="  Type..." type="text" value={email} onChange={e => setEmail(e.target.value)} />
              {formErrors.email && <p style={{ color: 'red' }}>{formErrors.email}</p>}
            </div>
            <div className="flex flex-col">
              <label>
                Role
                <Select
                  value={role}
                  onChange={newRole => {
                    setRole(newRole);
                    if (newRole.value !== 'EMPLOYEE') {
                      setSelectedDepartments([]);
                    }
                  }}
                  options={[
                    { value: 'EMPLOYEE', label: 'Employee' },
                    { value: 'SUPERVISOR', label: 'Supervisor' },
                    { value: 'ADMIN', label: 'Admin' },
                  ]}
                />
              </label>
              {formErrors.role && <p style={{ color: 'red' }}>{formErrors.role}</p>}
            </div>

            <div>
              {role.value === 'EMPLOYEE' && (
                <>
                  <label>
                    Departments
                    <Select
                      className="w-52"
                      closeMenuOnSelect={false}
                      isMulti
                      options={departments.map(dept => ({ value: dept.name, label: dept.name }))}
                      value={selectedDepartments}
                      onChange={setSelectedDepartments}
                      components={animatedComponents}
                    />
                  </label>
                  {formErrors.departments && <p style={{ color: 'red' }}>{formErrors.departments}</p>}
                </>
              )}
            </div>

            <div>
              {role.value === 'SUPERVISOR' && (
                <>
                  <label>Tasks</label>
                  <Select
                    className="w-52"
                    closeMenuOnSelect={false}
                    isMulti
                    options={supervisorTasks.map(task => ({ value: task.task.id, label: task.task.description }))}
                    value={selectedDepartments}
                    onChange={setSelectedDepartments}
                    components={animatedComponents}
                  />
                </>
              )}
            </div>

            <div className="flex flex-col mt-6">
              <Button type="submit" extraStyling={`py-2 px-3`} color="green">
                Submit
              </Button>
            </div>
          </form>
        </Section>
      )}
    </>
  );
};
export default AddUserButton;
