import ProjectTables from "../components/dashboard/ProjectTable";
import checkMark from '../assets/images/logos/checkmark.svg';
import { Row, Col, Table, Card, CardTitle, CardBody, CardSubtitle, CardHeader, CardText } from "reactstrap";
//import TaskForm from "../components/TaskForm"; only use if planning to create new tasks in the display
import { useState, useEffect } from "react";
import axios from "axios";
import { useUserStore } from "../globalState";

//import { useAuth0 } from "@auth0/auth0-react";

//import React from "react";
//import { Auth0provider } from "@auth0/auth0-react";

const accountID = 16;
const depName = "Basic Onboarding";
//HARDCODED here change below
//var numTasks = 38;
var sup = false;



class Task {
  constructor(
    number,
    description,
    department,
    deadline,
    confirmationDate,
    employee,
    member_assigned,
    assigned_employee_id,
    task_num
  ) {
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

var task = {
  number: 0,
  description: "hi",
  department: "hi",
  deadline: "hi",
  confirmationDate: "hi",
  employee: "hi",
  member_assigned: "hi",
  assigned_employee_id: 0,
  task_num: 0,
};

const CurrentOnboarding = () => {
  const [dataBase, setDb] = useState([]);
  const [employeeNewHireNames, setNewHire] = useState([]);  //have to declare global variable  and the function to change it here
  const [numTasksToDisplay, setTasksArray] = useState([]);  //have to declare global variable  and the function to change it here

  const { user } = useUserStore();
  

  //console.log("***** user", user);

  useEffect(() => {
    fetchDB();
    fetchEmployees();
  }, [])

  const fetchDB = async () => {
    
    //below: important to properly display
    const numTaskResponse = await fetch("http://localhost:5010/getTaskCounts");
    const numTaskResults = await numTaskResponse.json();
    const taskArr = numTaskResults?.rows?.map(item => [item.assigned_employee_id, item.count]);
    setTasksArray(taskArr);

    // let tempArr = [];
    // let data = undefined;
    // for(let i = 0; i < taskArr.length; i++){
    //   console.log("IN DATA");
    //   let response = await fetch("http://localhost:5010/displayEmployeeTaskGroup/"+parseInt(numTaskResults.rows[i].assigned_employee_id));
    //   data = await response.json();
    //   console.log("DATA: ", i, ": ", data);
    //   const dataArr = data?.rows?.map(item => [item]);
    //   tempArr.push(dataArr);
    // }

    let response = await fetch("http://localhost:5010/displayEmployeeTaskGroup/"+ accountID);//+parseInt(numTaskResults.rows[i].assigned_employee_id));
    let data = await response.json();
    //probably dont need below 4 lines, double check response 2.
    const response2 = await fetch("http://localhost:5010/displayDepartmentTaskGroups/"+depName);
    const response3 = await fetch("http://localhost:5010/Employee");
    const data2 = await response2.json();
    const data3 = await response3.json();
    // console.log("TEMPARRY====: ", tempArr)
    // const finalArr = tempArr;
    if (sup) {
      setDb(data);
    } else {
      setDb(data2);
    }
  }


    //function name to be called later
    const fetchEmployees = async() =>{ 
      const results = await fetch("http://localhost:5010/EmployeeNewHire");
      const data = await results.json();
  
      console.log("data", data)
      //fill the array with data gotten from our database call
      const nameArr = data?.rows?.map(item => [item.name, item.accountid]);
      //This globally sets the array
      setNewHire(nameArr)
    };


  var elements = [];
  if(typeof numTasksToDisplay.length !== "undefined"){
    console.log(numTasksToDisplay.length);
    var taskList = taskFillerForMultipleEmployees(dataBase, numTasksToDisplay);


    var elements = displayFillerMultipleEmployees(taskList, employeeNewHireNames);
  }


 /*
  else if (typeof dataBase.rowCount !== "undefined" && !sup){
    var taskList = taskFillerForSingleEmployee()
  }
*/

  return (
    <Row>
      <Col lg="12">
        <ProjectTables/>
      </Col>
      {/* --------------------------------------------------------------------------------*/}
      {/* table-3*/}
      {/* --------------------------------------------------------------------------------*/}

      {elements}
    </Row>
  );
};

async function confirm(emp_name, emp_num, task_num) {
  try {
    console.log(
      "trying to confirm task " + task_num + " to employee id " + emp_num
    );

    var date = new Date();

    var date =
      date.getUTCFullYear() +
      "-" +
      (date.getUTCMonth() + 1) +
      "-" +
      date.getUTCDate();

    const url =
      "http://localhost:5010/confirmTask/" +
      date +
      "/" +
      emp_name +
      "/" +
      task_num +
      "/" +
      emp_num;

    const fin = await axios.put(url);

    window.location.reload();

    console.log(date);
    console.log("I have confirmed task " + task_num);
  } catch (e) {
    console.log("there was an error");
    console.log(e);
    return e;
  }
};


async function getTaskOwnerName(emp_id){
  try{
    console.log(emp_id);
    const results = await fetch ("http://localhost:5010/getEmployeeName/");
    const name = await results.name;
    //console.log(name);
    return name;
  }catch(e){
    console.log("error id: " + emp_id);
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

function taskFillerForSingleEmployee(results, empNum, numTasks){
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
    if(!results.rows[i].employee_name){
      task.employee = results.rows[i].employee_name
    }
    else{
      task.employee = String(results.rows[i].employee_name);
    }
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

function taskFillerForMultipleEmployees(results, numTasksArray){
try{
  
  // call taskFiller for single employee for every employee in 
  var employeeTasks = [];
  var tempList = [];
  var numEmployee = numTasksArray.length
  var employeesTasks = []

  // for(let i = 0; i < results.rowCount; i++){
  //   console.log("IDNUMBERAHHHH: ",numTasksArray[i][0])
  //   if(results.rows[i].assigned_employee_id == numTasksArray[i][0]){
  //     console.log("in here")
  //     employeesTasks.push(results.rows[i]);
  //   }
  // }

  //console.log("taskfiller multiple test: " + results);
  for(var i = 0; i < numEmployee; i++){
    //console.log("Employee RESULST: ", employeesTasks)
    tempList = taskFillerForSingleEmployee(results, i, parseInt(numTasksArray[i][1]));
    employeeTasks.push(tempList);

  }

  return employeeTasks
}
catch(e){
  console.log(e);
}
}

function displayFillerMultipleEmployees(employeeTasks, nameArray){
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
      {/* WHERE THE NAMES ARE DISPLAYED. This complex function means search the array for the touple (Name, id) where the id matches and return name*/console.log(nameArray)}
      {nameArray.find(el => el[1] == employeeTasks[i][0].assigned_employee_id)[0]}
      {/* Employee Name{employeeDisplayName && employeeDisplayName.map((item => <CardSubtitle key="{i}">{item}</CardSubtitle>)) } */}
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
