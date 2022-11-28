import ProjectTables from "../components/dashboard/ProjectTable";
import checkMark from '../assets/images/logos/checkmark.svg';
import { Row, Col, Table, Card, CardTitle, CardBody } from "reactstrap";
//import TaskForm from "../components/TaskForm"; only use if planning to create new tasks in the display
import {useState, useEffect} from 'react';

const accountID = 6;
const depName = "Basic Onboarding";
var sup = false;

class Task{
  constructor(number, description, department,
     deadline, confirmationDate, employee, member_assigned){
      this.number = number;
      this.description = description;
      this.department = department;
      this.deadline = deadline;
      this.confirmationDate = confirmationDate;
      this.employee = employee;
      this.member_assigned = member_assigned;
     }
}; 

var task ={
  number: 0,
  description: 'hi',
  department: 'hi',
  deadline: 'hi',
  confirmationDate: 'hi',
  employee: 'hi',
  member_assigned: 'hi'
};

function displayFillerSingleEmployee(taskList){
  try{
    var elements = Array(taskList.length).fill(<tr>hello</tr>);
    for(let i = 0; i < elements.length; i++){
          elements[i]=<tr>
                  <th scope="row">{i + 1}</th>
                  <td>{taskList[i].description}</td>
                  <td>{taskList[i].department}</td>
                  <td>{taskList[i].deadline}</td>
                  <td><button><img src={checkMark} alt =""/></button></td>
                  <td>{taskList[i].confirmationDate}</td>
                  <td>{taskList[i].employee}</td>
                  <td>{taskList[i].member_assigned}</td>
                  </tr>;
    }
    return elements;
  }catch(e){
    console.log("there was an error");
    console.log(e);
    return e;
  }
};

function taskFillerForSingleEmployee(results, empNum){
  try{
    let taskList = [];
    console.log(results.rowCount);
    for(var i = empNum*38; i < (empNum+1)*38; i++){
      task.number = results.rows[i].task_num;
      task.description = String(results.rows[i].task_description);
      task.department = String(results.rows[i].department_name);
      task.deadline = String(results.rows[i].deadline);
      task.confirmationDate = String(results.rows[i].confrim_date);
      task.employee = String(results.rows[i].employee_name);
      task.member_assigned = String(results.rows[i].member_assigned);
      const testTask = new Task(task.number, task.description,
         task.department, task.deadline, task.confirmationDate,
         task.employee, task.member_assigned);
      taskList.push(testTask);    
    }
    return taskList;
  }catch(e){
    console.log(e);
  }
}

function taskFillerForMultipleEmployees(results, numEmployee){
  try{
    // call taskFiller for single employee for every employee in 
    var employeeTasks = [];
    var tempList = [];

    for(var i = 0; i < numEmployee; i++){
   
      tempList = taskFillerForSingleEmployee(results, i);
      employeeTasks.push(tempList);

    }

    return employeeTasks
  }
  catch(e){
    console.log(e);
  }
}

function displayFillerMultipleEmployees(employeeTasks){
  try{
    // call display filler single employee for every employee
    var numEmployee = employeeTasks.length;
    var elements = Array(numEmployee).fill(<tr>hello</tr>);
    for(var i = 0; i < numEmployee; i++){
      elements[i] = <Col lg="12">
        <Card>
      <CardTitle tag="h6" className="border-bottom p-3 mb-0">
      <i className="bi bi-card-text me-2"> </i>
        Employee Name {i+1}
      </CardTitle>
      <CardBody className="">
        <Table bordered striped>
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
            {displayFillerSingleEmployee(employeeTasks[i])}
          </tbody>
        </Table>
      </CardBody>
    </Card>
    </Col>
    }
    return elements;
  }
  catch(e){
    console.log(e);
  }
}

const CurrentOnboarding = () => {

  const [dataBase, setDb] = useState([]);

  useEffect( () => {
    fetchDB();
  }, [])

  const fetchDB = async () => {
    
    const response = await fetch("http://localhost:5001/displayEmployeeTaskGroup/"+accountID);
  
    
    const response2 = await fetch("http://localhost:5001/displayDepartmentTaskGroups/"+depName);
    
    const data = await response.json();
    const data2 = await response2.json();
    if(sup){
    setDb(data);
    }
    else{
      setDb(data2);
    }
  }

//const taskList = taskFillerForSingleEmployee(dataBase, 0);
//const elements = displayFillerSingleEmployee(taskList);


  const taskList = taskFillerForMultipleEmployees(dataBase, 4);
  const elements = displayFillerMultipleEmployees(taskList);

  return (
    <Row>
     
      <Col lg="12">
        <ProjectTables />
      </Col>
      {/* --------------------------------------------------------------------------------*/}
      {/* table-3*/}
      {/* --------------------------------------------------------------------------------*/}
     
                {elements}

    </Row>
  );
};

export default CurrentOnboarding;
