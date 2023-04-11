import ProjectTables from "../components/dashboard/ProjectTable";
import checkMark from '../assets/images/logos/checkmark.svg';
import { Row, Col, Table, Card, CardTitle, CardBody } from "reactstrap";
//import TaskForm from "../components/TaskForm"; only use if planning to create new tasks in the display
import {useState, useEffect} from 'react';
import axios from 'axios';
//Chage hardcoded here
const accountID = 16;
const depName = "Basic Onboarding";
var numEmployee = 4;
var numTasks = 38;
var sup = false;


class Task{
  constructor(number, description, department,
     deadline, confirmationDate, employee, member_assigned, assigned_employee_id, task_num){
      this.number = number;
      this.description = description;
      this.department = department;
      this.deadline = deadline;
      this.confirmationDate = confirmationDate;
      this.employee = employee;
      this.member_assigned = member_assigned;
      this.assigned_employee_id = assigned_employee_id;
      this.task_num = task_num;
     }
}; 

var task ={
  number: 0,
  description: 'hi',
  department: 'hi',
  deadline: 'hi',
  confirmationDate: 'hi',
  employee: 'hi',
  member_assigned: 'hi',
  assigned_employee_id: 0,
  task_num: 0
};



const CurrentOnboarding = () => {

  const [dataBase, setDb] = useState([]);
  const [employeeDisplayName, setEmpName] = useState("");


  useEffect( () => {
    fetchDB();
  }, [])

  const fetchDB = async () => {
    
    const response = await fetch("http://localhost:5001/displayEmployeeTaskGroup/"+accountID);
  
    
    const response2 = await fetch("http://localhost:5001/displayDepartmentTaskGroups/"+depName);

    const response3 = await fetch("http://localhost:5001/Employee");

    const data = await response.json();
    const data2 = await response2.json();
    const data3 = await response3.json();

    if(sup){
      setDb(data);
    }
    else{
      setDb(data2);
    }
  }



  var elements = [];
  if(typeof dataBase.rowCount !== "undefined"){
    console.log(dataBase.rowCount/numTasks);
    var taskList = taskFillerForMultipleEmployees(dataBase, dataBase.rowCount/numTasks);


    var elements = displayFillerMultipleEmployees(taskList, dataBase);
  }
 /*
  else if (typeof dataBase.rowCount !== "undefined" && !sup){
    var taskList = taskFillerForSingleEmployee()
  }
*/

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



async function confirm(emp_name, emp_num, task_num){
  try{
    console.log("trying to confirm task " + task_num + " to employee id " + emp_num);

    var date = new Date();
    
    var date = date.getUTCFullYear() +"-"+ (date.getUTCMonth()+1) +"-"+ date.getUTCDate();

    const url = "http://localhost:5001/confirmTask/"+date+"/"+emp_name+"/"+task_num+"/"+emp_num;


    const fin = await axios.put(url);

    window.location.reload();    

    console.log(date);
    console.log("I have confirmed task " + task_num);
  }catch(e){
    console.log("there was an error");
    console.log(e);
    return e;
  }
};

async function getTaskOwnerName(emp_id){
  try{
    console.log("try get name");
    const results = await fetch ("http://localhost:5001/getEmployeeName/"+emp_id);
    const name = await results.rows[0].name;
    console.log(name);
    setEmpName(name);
  }catch(e){
    console.log("there was an error in getTaskOwnerName");
    console.log(e);
    return e;
  }
}

function displayFillerSingleEmployee(taskList, emp_num){
  try{
    var elements = Array(taskList.length).fill(<tr>hello</tr>);
    for(let i = 0; i < elements.length; i++){
          elements[i]=<tr>
                  <th scope="row">{i + 1}</th>
                  <td>{taskList[i].description}</td>
                  <td>{taskList[i].department}</td>
                  <td>{taskList[i].deadline}</td>
                  <td><button type ="button" onClick={() => confirm("Gabriel",taskList[i].assigned_employee_id,taskList[i].task_num)}><img src={checkMark} alt =""/></button></td>
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
    //console.log(results.rows[0]);
    for(var i = empNum*numTasks; i < (empNum+1)*numTasks; i++){
      task.number = results.rows[i].task_num;
      task.description = String(results.rows[i].task_description);
      task.department = String(results.rows[i].department_name);
      const d = new Date(results.rows[i].deadline);
      task.deadline = String(d.toDateString());
      //BELOW HERE change the null date to not Dec. 1969 or wtv
      const dConfirm = new Date(results.rows[i].confirm_date);
      if (! results.rows[i].confirm_date) {
        task.confirmationDate = results.rows[i].confirm_data;
      }
      else{
        task.confirmationDate = String(dConfirm.toDateString())
      }
      task.employee = String(results.rows[i].employee_name);
      task.member_assigned = String(results.rows[i].member_assigned);
      task.assigned_employee_id = results.rows[i].assigned_employee_id;
      task.task_num = results.rows[i].task_num;
      const testTask = new Task(task.number, 
         task.description,
         task.department, 
         task.deadline, 
         task.confirmationDate,
         task.employee, 
         task.member_assigned, 
         task.assigned_employee_id, 
         task.task_num);
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
    //console.log("taskfiller multiple test: " + results);
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

function displayFillerMultipleEmployees(employeeTasks, results){
  try{
    // call display filler single employee for every employee
    var numEmployee = employeeTasks.length;
    var elements = Array(numEmployee).fill(<tr>hello</tr>);
    for(var i = 0; i < numEmployee; i++){
      //MY CODE BELOW HERE
      const Emp_name = getTaskOwnerName(employeeTasks[i][0].assigned_employee_id);
      elements[i] = <Col lg="12">
        <Card>
      <CardTitle tag="h6" className="border-bottom p-3 mb-0">
      <i className="bi bi-card-text me-2"> </i>
        {/* WHERE THE NAMES ARE DISPLAYED*/}
        {String(employeeDisplayName)}
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
            {displayFillerSingleEmployee(employeeTasks[i], i+1)}
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

export default CurrentOnboarding;
