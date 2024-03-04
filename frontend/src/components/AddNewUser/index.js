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
        <Section extraStyling="z-10 absolute top-0 left-0" opacity={100}>
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
