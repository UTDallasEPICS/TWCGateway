//import ProjectTables from "../components/dashboard/ProjectTable";
import { Row, Col, Table, Card, CardTitle, CardBody } from "reactstrap";
import TaskForm from "./TaskForm";
import checkMark from '../assets/images/logos/checkmark.svg';

import { useState } from 'react'

const DefaultTasks = function () {
  // LINK BACKEND RIGHT HERE
  const INITIAL_STATE = [
    { num: 1, task: 'Generates Written Offer letter for CEO to sign.', department: 'Basic Onboarding', deadline: '2+ weeks before hire', confirm: <button><img src={checkMark} alt =""/></button>, 'date': 'NA', employee: 'NA', assigned: 'COO'},
    { num: 2, task: 'Sends candidate welcome email (offer letter, I-9 and first day paperwork).	', department: 'Basic Onboarding', deadline: '10 business days before start', confirm: <button><img src={checkMark} alt =""/></button>, 'date': 'NA', employee: 'NA', assigned: 'COO'},
    { num: 3, task: 'Submits New User Creation Form to Mednetworx.' ,department: 'Basic Onboarding', deadline: '10 business days before start', confirm: <button><img src={checkMark} alt =""/></button>, 'date': 'NA', employee: 'NA', assigned: 'Office Manager'}
  ]


  const addNewItem = function (input)  {
    const num = INITIAL_STATE.length + 1;
    const task = input;
    const department ='Basic Onboarding';
    const deadline =  'Now';
    const confirm = <button><img src={checkMark} alt =""/></button>;
    const date = 'NA';
    const employee = 'NA';
    const assigned = 'COO'
    //const NEW_STATE =  [this.INITIAL_STATE, {num, task, department, deadline, confirm, date, employee, assigned}] 
    //this.INITIAL_STATE = NEW_STATE;

    setTasks(INITIAL_STATE => [...INITIAL_STATE, {num, task, department, deadline, confirm, date, employee, assigned}]);
    console.log(INITIAL_STATE.length);
  }

  const [tasks, setTasks] = useState(INITIAL_STATE)

  const renderUsers = () => {
    return tasks.map(({ num, task, department, deadline, confirm, date, employee, assigned }) => {
      return <tr key={task} >
        <td style={{ padding: '20px', border: '1px solid gainsboro' }}>{num}</td>
        <td style={{ padding: '20px', border: '1px solid gainsboro' }}>{task}</td>
        <td style={{ padding: '20px', border: '1px solid gainsboro' }}>{department}</td>
        <td style={{ padding: '20px', border: '1px solid gainsboro' }}>{deadline}</td>
        <td style={{ padding: '20px', border: '1px solid gainsboro' }}>{confirm}</td>
        <td style={{ padding: '20px', border: '1px solid gainsboro' }}>{date}</td>
        <td style={{ padding: '20px', border: '1px solid gainsboro' }}>{employee}</td>
        <td style={{ padding: '20px', border: '1px solid gainsboro' }}>{assigned}</td>
    </tr>
    })
  }

  return (
    <Row>
      {/* --------------------------------------------------------------------------------*/}
      {/* table-3                                                                         */}
      {/* --------------------------------------------------------------------------------*/}
      <Col lg="12">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-card-text me-2"> </i>
            Default Tasks
          </CardTitle>
          <CardBody className="">
            <TaskForm/>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Task</th>
                  <th>Department</th>
                  <th>Deadline</th>
                  <th>Confirm</th>
                  <th>Confirmation Date</th>
                  <th>Employee</th>
                  <th>Member Assigned</th>
                </tr>
              </thead>
              <tbody>
                {renderUsers()}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
    </Row>
    
  );
};

export default DefaultTasks;