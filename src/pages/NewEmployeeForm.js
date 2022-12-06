import {
  Card,
  Row,
  Col,
  CardTitle,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { useState } from "react";



const NewEmployeeForm = () =>  {
const [firstname, setFname] = useState('');
const [lastname, setLname] = useState('');
const [email, setEmail] = useState('');
const [jobTitle, setjobTitle] = useState('');
const [startDate, setstartDate] = useState('');
const [valuedept, setValuedept]= useState('');
const [valueoffice, setValueoffice]= useState('');
const handleSubmit = (e) => { 
  e.preventDefault(); 
  //console.log(data);
  fetchDB();
  fetchDB2(); 
};

const fetchDB = async() =>{ 
  const name = firstname + " " + lastname; 
  const data = {name, email, jobTitle, startDate, valuedept, valueoffice}
  try{
    await fetch("http://localhost:5001/insertEmployee/" + name +"/"+ email +"/"+ 'NewHire' +"/"+ valuedept, {
      method: "POST",
    });
  }
  catch(e)
  {
    console.log(e); 
    console.log("there was an error"); 
  }
};

const fetchDB2 = async() =>{ 
  try{
    const response = await fetch("http://localhost:5001/getEmployeedata/"+email);
    const data = await response.json();
  
    
    delete data.fields; 
    delete data._parsers;
    delete data._types;
    delete data.RowCtor;
    delete data.rowAsArray;
    delete data.command;
    delete data.rowCount;
    delete data.oid;
    try{
      await fetch("http://localhost:5001/insertNewTaskGroup/" + data.rows[0].accountid +"/"+ startDate, {
        method: "POST",
      });
      window.location.reload(false);
      alert("The new employee has been added"); 
    }
    catch(e)
    {
      console.log(e); 
      console.log("there was an error"); 
    }
  }
  catch(e)
  {
    console.log(e); 
    console.log("there was an error"); 
  }
};





return (
  <Row>
    <Col>
      {/* --------------------------------------------------------------------------------*/}
      {/* Card-1*/}
      {/* --------------------------------------------------------------------------------*/}
      <Card>
        <CardTitle tag="h6" className="border-bottom p-3 mb-0">
          <i className="bi bi-bell me-2"> </i>
          New Employee Form
        </CardTitle>
        <CardBody>
          <Form  >
            <Row>
              <Col xs="6">
                <FormGroup>
                  <Label htmlFor="EmployeeFirstName">First Name</Label>
                  <Input
                    required
                    id="employeeFirstName"
                    name="FirstName"
                    placeholder=""
                    type="text"
                    value = {firstname}
                    onChange = {(e) => setFname(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col xs="6">
              <FormGroup>
                <Label htmlFor="EmployeeLastName">Last Name</Label>
                <Input
                   required
                   id="employeeLastName"
                   name="LastName"
                   placeholder=""
                   type="text"
                   value = {lastname}
                   onChange = {(e) => setLname(e.target.value)}
                />
              </FormGroup>
              </Col>
            </Row>
            <Row>
            <Col xs="6">
            <FormGroup>
              <Label htmlFor="exampleEmail">Email</Label>
              <Input
                required
                id="exampleEmail"
                name="email"
                placeholder=""
                type="email"
                value = {email}
                onChange = {(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            </Col>
            <Col xs="6">
            <FormGroup>
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="jobTitle"
                name="jobTitle"
                placeholder=""
                type="text"
                value = {jobTitle}
                onChange = {(e) => setjobTitle(e.target.value)}
              />
            </FormGroup>
            </Col>
            </Row>

            <FormGroup>
              <Label htmlFor="startdate">Start Date</Label>
              <Input
                required
                id="startdate"
                name="startdate"
                placeholder=""
                type="date"
                value = {startDate}
                onChange = {(e) => setstartDate(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="selectDepartment">Department</Label>
                <Input  required type="select"  name= "Department" value = {valuedept}
                onChange = {(e) => setValuedept(e.target.value)}>


                    <option>Basic Onboarding</option>
                    <option>Department 2</option>
                    <option>Department 3</option>
                    <option>Department 4</option>
                    <option>Department 5</option>
                    <option>Department 5</option>
              </Input>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="selectoffice">Office</Label>
              <Input  required id="selectoffice" name="selectoffice" type="select" value = {valueoffice}
                onChange = {(e) => setValueoffice(e.target.value)}>
                <option>Select Office</option>
                <option>Central</option>
                <option>East</option>
                <option>West</option>
              </Input>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="selectStaff">Assign Onboarding Staff</Label>
              <Input  required id="selectStaff" multiple name="selectStaff" type="select">
                <option>Staff member</option>
                <option>Staff member</option>
                <option>Staff member</option>
                <option>Staff member</option>
                <option>Staff member</option>
              </Input>
            </FormGroup>
            {/*
            <FormGroup>
              <Label htmlFor="exampleText">Comments</Label>
              <Input id="exampleText" name="text" type="textarea" />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="exampleFile">File</Label>
              <Input id="exampleFile" name="file" type="file" />
              <FormText>
                Optional: add CV or other files
              </FormText>
            </FormGroup>
            */}
            <Button type="submit" onClick={handleSubmit} id="button">Submit</Button>
          </Form>
        </CardBody>
      </Card>
    </Col>
  </Row>
  
);
};

export default NewEmployeeForm;
