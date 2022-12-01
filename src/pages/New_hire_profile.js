import {
    Card,
    Row,
    Col,
    CardTitle,
    CardBody,
    Button
  } from "reactstrap";
import {useState, useEffect} from 'react';
  const accountID = 7;

 
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
  const  New_hire_profile = () => {

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
              <h2 style={{  color: "rgb(99,100,102)", fontFamily: 'Times'}}>Personal Information</h2>
            </CardTitle>
            <CardBody>
              <Row>
              <Col  style={{ color: "rgb(99,100,102)", fontFamily: 'Times', borderSpacing: 100}}>
                <h5 style ={{height: 50}}>Employee Name: {task.name}</h5>
                <h5 style ={{height: 50}}>Email: {task.email}</h5>
                <h5 style ={{height: 50}}>Account Role: {task.account_role}</h5>
                <h5 style ={{bheight: 50}}>Department: {task.account_department}</h5>

                </Col>
                </Row>
                {/*
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
                */}
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  };
  export default  New_hire_profile;