import {
  Card,
  Row,
  Col,
  CardTitle,
  CardBody,
  Button
} from "reactstrap";
import {useState, useEffect} from 'react';

const accountID = 81;

 
class Task{
  constructor( name, email, accountid, account_role,account_department ){
      this.name = name;
      this.email = email;
      this.accountid = accountid;
      this.account_role = account_role;
      this.account_department = account_department;
     }
}; 

var task ={
  name: '',
  email: '',
  accountid: 0,
  account_role: '',
  account_department: '',
};


function taskFillerVersion2(results){
  try{
    let taskList = [];
      task.name = String(results.rows[0].name);
      task.email = String(results.rows[0].email);
      task.accountid = String(results.rows[0].accountid);
      task.account_role = String(results.rows[0].account_role);
      task.account_department = String(results.rows[0].account_department);
      const testTask = new Task(task.name, task.email,
         task.accountid, task.account_role, task.account_department);
      taskList.push(testTask);    
    return taskList;
  }catch(e){
    console.log(e);
  }

}
 
const  Account = () => {
  const [dataBase, setDb] = useState([])

  useEffect( () => {
    fetchDB();
  }, [])

  const fetchDB = async () => {
    const response = await fetch("http://localhost:5001/displayEmployeedata/"+accountID);
    const data = await response.json();
    delete data.fields; 
    delete data._parsers;
    delete data._types;
    delete data.RowCtor;
    delete data.rowAsArray;
    delete data.command;
    delete data.rowCount;
    delete data.oid;
    //task.name = data.rows[0].name; 
    //console.log("fetch test" + data.rowCount + data.rows[0].name);
    setDb(data);
  }
  const taskList = taskFillerVersion2(dataBase);

  
  return (
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            Information
          </CardTitle>
          <CardBody>
            <Row>
            <Col  style={{ color: "rgb(99,100,102)", fontFamily: 'Times', borderSpacing: 100}}>
                <h5 style ={{height: 50}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16" style={{padding: "10px"}}>
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                </svg>
                {"\t   Employee Name:"} {task.name}</h5>
                <h5 style ={{height: 50}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-envelope-at-fill" viewBox="0 0 16 16" style={{padding: "10px"}}>
                    <path d="M2 2A2 2 0 0 0 .05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2H2Zm-2 9.8V4.698l5.803 3.546L0 11.801Zm6.761-2.97-6.57 4.026A2 2 0 0 0 2 14h6.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586l-1.239-.757ZM16 9.671V4.697l-5.803 3.546.338.208A4.482 4.482 0 0 1 12.5 8c1.414 0 2.675.652 3.5 1.671Z"/>
                    <path d="M15.834 12.244c0 1.168-.577 2.025-1.587 2.025-.503 0-1.002-.228-1.12-.648h-.043c-.118.416-.543.643-1.015.643-.77 0-1.259-.542-1.259-1.434v-.529c0-.844.481-1.4 1.26-1.4.585 0 .87.333.953.63h.03v-.568h.905v2.19c0 .272.18.42.411.42.315 0 .639-.415.639-1.39v-.118c0-1.277-.95-2.326-2.484-2.326h-.04c-1.582 0-2.64 1.067-2.64 2.724v.157c0 1.867 1.237 2.654 2.57 2.654h.045c.507 0 .935-.07 1.18-.18v.731c-.219.1-.643.175-1.237.175h-.044C10.438 16 9 14.82 9 12.646v-.214C9 10.36 10.421 9 12.485 9h.035c2.12 0 3.314 1.43 3.314 3.034v.21Zm-4.04.21v.227c0 .586.227.8.581.8.31 0 .564-.17.564-.743v-.367c0-.516-.275-.708-.572-.708-.346 0-.573.245-.573.791Z"/>
                </svg>
                {"\t Email:"} {task.email}</h5>
                <h5 style ={{height: 50}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-person-fill-lock" viewBox="0 0 16 16" style={{padding: "10px"}}>
                    <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 8c0 1 1 1 1 1h5v-1a1.9 1.9 0 0 1 .01-.2 4.49 4.49 0 0 1 1.534-3.693C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Zm7 0a1 1 0 0 1 1-1v-1a2 2 0 1 1 4 0v1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2Zm3-3a1 1 0 0 0-1 1v1h2v-1a1 1 0 0 0-1-1Z"/>
                </svg>
                {"\t Account Role:"} {task.account_role}</h5>
                <h5 style ={{height: 50}}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-collection-fill" viewBox="0 0 16 16" style={{padding: "10px"}}>
                      <path d="M0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6v7zM2 3a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 2 3zm2-2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7A.5.5 0 0 0 4 1z"/>
                  </svg>{"\t Department: "} 
                  {task.account_department}</h5>

                </Col>
              </Row>
              <Row md={4}>
                <Col>
                    <a href="/admin/Account/ChangePassword">
                    Change Password
                    </a>
                  
                  </Col>
                  <Col>
                  <a href="/admin/Account/EditInformation">
                    Edit Information
                  </a>
                </Col>
                </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default  Account;
