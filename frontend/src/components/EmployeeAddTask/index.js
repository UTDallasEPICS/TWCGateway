import * as React from 'react';
import Button from '../Button';
import PlusIcon from '../../icons/PlusIcon';
import Section from '../Section';
import Select from 'react-select';
import axios from 'axios';

const EmployeeAddTask = userId => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [supervisors, setSupervisors] = React.useState([{}]);
  const [formErrors, setFormErrors] = React.useState({});
  const [form, setForm] = React.useState({
    description: '',
    supervisor: '',
  });

  React.useEffect(() => {
    axios
      .get(`http://localhost:5010/users/supervisors`)
      .then(res => {
        setSupervisors(res.data);
      })
      .catch(error => {
        console.log('error: ', error);
      });
  }, []);

  const validateForm = () => {
    let errors = {};
    if (!form.description) errors.description = "Description is required";
    if (!form.supervisor) errors.supervisor = "Supervisor is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  return (
    <>
      <Button
        extraStyling="py-3 px-3"
        color="green"
        tooltip="Add Task"
        onClick={() => setIsOpen(!isOpen)}
      >
        <PlusIcon />
      </Button>
      {isOpen && (
        <Section extraStyling="z-10 absolute top-0 left-0" opacity={100}>
          <div className="flex flex-col items-center justify-center">
            <form
              className="flex flex-col"
              onSubmit={e => {
                e.preventDefault();
                if (!validateForm()) return;
                setIsOpen(!isOpen);
                axios
                  .post(`http://localhost:5010/task/new-task-user`, {
                    description: form.description,
                    supervisorId: form.supervisor,
                    employeeId: userId.userId,
                  }, {
                    headers: {
                      Authorization: `Bearer ${
                        JSON.parse(localStorage.getItem(localStorage.key(1))).id_token
                      }`,
                    },
                  })
                  .then(response => {
                    setForm({
                      description: '',
                      supervisor: '',
                    })
                    console.log(response);
                    window.location.reload();
                  })
                  .catch(error => {
                    console.log(error);
                  });
              }}
            >
              <div className="flex flex-col justify-start">
                <label>Task Description</label>
                <input
                  type="text"
                  placeholder="Type..."
                  className="border-2 border-gray-300 focus:outline-none focus:border-warrenBlue rounded p-2"
                  value={form.description}
                  onChange={e =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
                {formErrors.description && <div className="text-red-500">{formErrors.description}</div>}
              </div>
              <div className="flex flex-col justify-start mt-1">
                <label>Choose Supervisor</label>
                <Select
                  options={supervisors}
                  getOptionLabel={option => `${option.name}`}
                  getOptionValue={option => option.id}
                  onChange={e => setForm({ ...form, supervisor: e.id })}
                />
                {formErrors.supervisor && <div className="text-red-500">{formErrors.supervisor}</div>}
              </div>
              <Button type="submit" color="green" extraStyling="mt-4">
                Save
              </Button>
            </form>
          </div>
        </Section>
      )}
    </>
  );
};

export default EmployeeAddTask;