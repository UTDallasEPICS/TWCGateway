import * as React from 'react';
import { Dialog } from '@headlessui/react';
import Button from '../Button';
import EditIcon from '../../icons/EditIcon';
import CrossIcon from '../../icons/CrossIcon';
import axios from 'axios';
import Select from 'react-select';
import Section from '../Section';

const EditEmployee = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [employees, setEmployees] = React.useState([]);
  const [selectedEmployee, setSelectedEmployee] = React.useState(null);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [departments, setDepartments] = React.useState([]);
  const [selectedDepartments, setSelectedDepartments] = React.useState([]);
  const [departmentsOptions, setDepartmentsOptions] = React.useState([]);
  const [formErrors, setFormErrors] = React.useState({});
  const [formValid, setFormValid] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    departments: [],
  });

  const handleInputChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDepartmentsChange = selectedOptions => {
    setFormData({
      ...formData,
      departments: selectedOptions,
    });
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedEmployee(null);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  React.useEffect(() => {
    axios
      .get(`http://localhost:5010/users/employees`)
      .then(res => {
        setEmployees(
          res.data.map((employee, index) => ({
            value: employee.id || index,
            label: employee.name,
          }))
        );
      })
      .catch(err => {
        console.log(err);
      });
    axios
      .get(`http://localhost:5010/departments`)
      .then(res => {
        setDepartmentsOptions(
          res.data.map((department, index) => ({
            value: department.id || index,
            label: department.name,
          }))
        );
      })
      .catch(err => {
        console.log(err);
      });
    if (selectedEmployee) {
      setIsLoading(true);
      axios
        .get(`http://localhost:5010/user/${selectedEmployee.value}`)
        .then(res => {
          setFormData({
            name: res.data.name,
            email: res.data.email,
            departments: res.data.departmentName.map(name => ({
              label: name,
              value: departmentsOptions.find(option => option.label === name)
                .value,
            })),
          });
          setIsLoading(false);
        })
        .catch(err => {
          console.log(err);
          setIsLoading(false);
        });
    }
  }, [selectedEmployee]);

  const handleSelectChange = selectedOption => {
    setSelectedEmployee(selectedOption);
    console.log('Selected employee ID:', selectedOption.value);
  };

  return (
    <>
      <Button color="green" extraStyling="py-3 px-3 mb-1" onClick={openModal}>
        <EditIcon />
      </Button>

      <Dialog
        open={isOpen}
        onClose={closeModal}
        className="fixed z-10 inset-0 overflow-y-auto"
      >
        <div className="flex items-start justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <Button
              color="gray"
              extraStyling="absolute top-0 right-0 m-2"
              onClick={closeModal}
            >
              <CrossIcon />
            </Button>

            <Dialog.Title className="text-lg leading-6 font-medium text-gray-900 p-6">
              Edit Employee
            </Dialog.Title>

            <div className="p-6">
              <Select
                options={employees}
                onChange={handleSelectChange}
                menuPortalTarget={document.body}
                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
              />
              {selectedEmployee && (
                <Section>
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      const errors = {};
                      // if (!name) {
                      //   errors.name = 'Name is required';
                      // }
                      // if (!email) {
                      //   errors.email = 'Email is required';
                      // }
                      // if (departments.length === 0) {
                      //   errors.departments = 'Departments are required';
                      // }
                      // if (Object.keys(errors).length === 0) {
                      //   setFormValid(true);
                      //   console.log(
                      //     'selectedDepartments',
                      //     selectedDepartments.map(
                      //       department => department.value
                      //     )
                      //   );
                        axios
                          .put(
                            `http://localhost:5010/user/update-user-employee/${selectedEmployee.value}`,
                            {
                              name: formData.name,
                              email: formData.email,
                              departmentId: selectedDepartments.map(
                                department => department.value
                              ),
                            },
                            {
                              headers: {
                                Authorization: `Bearer ${
                                  JSON.parse(
                                    localStorage.getItem(localStorage.key(1))
                                  ).id_token
                                }`,
                              },
                            }
                          )
                          .then(res => {
                            console.log(res);
                            window.location.reload();
                          })
                          .catch(err => {
                            console.log(err);
                          });
                      // } else {
                      //   setFormErrors(errors);
                      // }
                    }}
                  >
                    <div className="flex flex-col">
                      <label>Name</label>
                      <input
                        className="h-9 rounded border-2 hover:border-blue-400"
                        placeholder="  Type..."
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                      {formErrors.name && (
                        <p style={{ color: 'red' }}>{formErrors.name}</p>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <label>Email</label>
                      <input
                        className="h-9 rounded border-2 hover:border-blue-400"
                        placeholder="  Type..."
                        type="text"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                      {formErrors.email && (
                        <p style={{ color: 'red' }}>{formErrors.email}</p>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <p className="text-md mt-1 mb-1">Role - Employee</p>
                    </div>
                    {console.log('departments', departments)}
                    <div className="flex flex-col">
                      <label>Departments</label>
                      {isLoading ? (
                        <p>Loading...</p>
                      ) : (
                        <Select
                          options={departmentsOptions}
                          isMulti
                          defaultValue={formData.departments}
                          onChange={handleDepartmentsChange}
                          menuPortalTarget={document.body}
                          styles={{
                            menuPortal: base => ({ ...base, zIndex: 9999 }),
                          }}
                        />
                      )}
                      {formErrors.departments && (
                        <p style={{ color: 'red' }}>{formErrors.departments}</p>
                      )}
                    </div>
                    <div className="flex justify-center mt-6">
                      <Button
                        type="submit"
                        color="green"
                        extraStyling="py-2 px-4 mb-1 mr-2 bg-green-500 text-white rounded hover:bg-green-700"
                      >
                        Update
                      </Button>
                    </div>
                  </form>
                </Section>
              )}
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default EditEmployee;
