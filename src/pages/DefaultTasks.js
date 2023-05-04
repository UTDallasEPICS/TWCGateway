//import ProjectTables from "../components/dashboard/ProjectTable";
import { Row, Col, Table, Card, CardTitle, CardBody } from "reactstrap";
import TaskForm from "../components/TaskForm";
import checkMark from '../assets/images/logos/checkmark.svg';

import { useState, useEffect} from 'react'
const INITIAL_STATE = [];

const DefaultTasks = function () {
  
  // LINK BACKEND RIGHT HERE
  // const INITIAL_STATE = [
  //   { num: 1, task: 'Generates Written Offer letter for CEO to sign.', department: 'Basic Onboarding', deadline: '2+ weeks before hire', assigned: 'COO'},
  //   { num: 2, task: 'Sends candidate welcome email (offer letter, I-9 and first day paperwork).	', department: 'Basic Onboarding',  assigned: 'COO'},
  //   { num: 3, task: 'Submits New User Creation Form to Mednetworx.' ,department: 'Basic Onboarding', deadline: '10 business days before start', assigned: 'Office Manager'}
  // ] 

  // const [tasks, setTasks] = useState(INITIAL_STATE)

  const [dataBase, setDb] = useState([]);

  useEffect( () => {
    fetchDB();
  }, [])

  const fetchDB = async () => {
    const response = await fetch("http://localhost:5001/DefaultTasks/");
    const data = await response.json();
    setDb(data);
  }

  

  console.log(dataBase.rows[0]);
  console.log(dataBase.rows[1]);
  for (let i=0; i<dataBase.length; i++){
    INITIAL_STATE[i] = dataBase.rows[i];
  }

  const [tasks, setTasks] = useState(INITIAL_STATE)

  const renderUsers = () => {
    ///return tasks.map(({ num, task, department, deadline, confirm, date, employee, assigned }) => {
      return tasks.map(({ num, task, department, deadline, member_assigned }) => {
      return <tr key={task} >
        <td style={{ padding: '20px', border: '1px solid gainsboro' }}>{num}</td>
        <td style={{ padding: '20px', border: '1px solid gainsboro' }}>{task}</td>
        <td style={{ padding: '20px', border: '1px solid gainsboro' }}>{department}</td>
        <td style={{ padding: '20px', border: '1px solid gainsboro' }}>{deadline}</td>
        <td style={{ padding: '20px', border: '1px solid gainsboro' }}>{member_assigned}</td>
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