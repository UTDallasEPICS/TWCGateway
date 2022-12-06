import ProjectTables from "../components/dashboard/ProjectTable";
import checkMark from '../assets/images/logos/checkmark.svg';
import { Row, Col, Table, Card, CardTitle, CardBody } from "reactstrap";
import TaskForm from "../components/TaskForm";
import {useState, useEffect} from 'react';

const accountID = 88;

class Task{
  constructor(number, description, department,
     deadline, confirm, confirmationDate, employee, member_assigned){
      this.number = number;
      this.description = description;
      this.department = department;
      this.deadline = deadline;
      this.confirm = confirm; 
      this.confirmationDate = confirmationDate;
      this.employee = employee;
      this.member_assigned = member_assigned;
     }
}; 

var task ={
  number: 0,
  description: 'hi',
  department: 'hi',
  deadline: '0000-00-00T00:00:00.000Z',
  confirm :'nope',
  confirmationDate: 'hi',
  employee: 'Not Completed',
  member_assigned: 'hi'
};

const testarray = [10,20,30,40];
function displayFiller(taskList){
  try{
    var elements = Array(taskList.length).fill(<tr>hello</tr>);
    for(let i = 0; i < elements.length; i++){
          elements[i]=<tr>
                  <th scope="row">{i + 1}</th>
                  <td>{taskList[i].description}</td>
                  <td>{taskList[i].department}</td>
                  <td>{taskList[i].deadline}</td>
                  <td>{taskList[i].confirm}</td>
                  <td>{taskList[i].confirmationDate}</td>
                  <td>{taskList[i].employee}</td>
                  <td>{taskList[i].member_assigned}</td>
                  </tr>;
    }
    console.log(elements);
    return elements;
  }catch(e){
    console.log("there was an error");
    console.log(e);
    return e;
  }
};

function taskFillerVersion2(results){
  try{
    let taskList = [];
    for(var i = 0; i < results.rowCount; i++){
      task.number = i+1;
      task.description = String(results.rows[i].task_description);
      task.department = String(results.rows[i].department_name);
      task.deadline = results.rows[i].deadline.substring(0, results.rows[i].deadline.indexOf('T'));
      if(String(results.rows[i].confirm_status) === "true")
      {
        task.confirm = "DONE!";
        task.confirmationDate = String(results.rows[i].confirm_date);
        task.employee = String(results.rows[i].employee_name);
      }
      else
      {
        task.confirm = "NOT COMPLETED";
        task.confirmationDate = "";
        task.employee = "";
      }
      task.member_assigned = String(results.rows[i].member_assigned);
      const testTask = new Task(task.number, task.description,
         task.department, task.deadline, task.confirm, task.confirmationDate,
         task.employee, task.member_assigned);
      taskList.push(testTask);  
    }
        {return taskList}
  }catch(e){
    console.log(e);
  }

}



const Newhirechecklist = () => {

  const [dataBase, setDb] = useState([])

  useEffect( () => {
    fetchDB();
  }, [])

  const fetchDB = async () => {
    const response = await fetch("http://localhost:5001/displayEmployeeTaskGroup/"+accountID);
    const data = await response.json();
    //console.log("fetch test" + data.rowCount + data.rows[0].task_description);
    setDb(data);
  }


const taskList = taskFillerVersion2(dataBase);
const elementstrue = displayFiller(taskList);

  return (
    <Row>
     
      <Col lg="12">
       { /*<ProjectTables />*/}
      </Col>
      {/* --------------------------------------------------------------------------------*/}
      {/* table-3*/}
      {/* --------------------------------------------------------------------------------*/}
      <Col lg="12">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-card-text me-2"> </i>
            Hello! This is your Onboarding Checklist
          </CardTitle>
          <CardBody className="">
          { /* <TaskForm/>*/}
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
                {elementstrue}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
      
     
    </Row>
  );
};

export default Newhirechecklist;
