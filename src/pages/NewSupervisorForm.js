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
  import { useState, setState} from "react";
  
  
  
  const NewSupervisorForm = () => {
    const [supervisorfirstname, setsuperFname] = useState('');
    const [supervisorlastname, setsuperLname] = useState('');
    const [supervisoremail, setsuperEmail] = useState('');
    const [jobsupervisorTitle, setsuperjobTitle] = useState('');
    const [valuesupervisordept, setsuperValuedept]= useState('');
    const [valuesupervisoroffice, setsuperValueoffice]= useState('');
    const [valueaccess, setaccesslevel]= useState('');
    const [posted, isposted] = useState('');
  
    const handleSubmit = (e) => { 
      const data = {supervisorfirstname, supervisorlastname, supervisoremail, jobsupervisorTitle, valuesupervisordept, valuesupervisoroffice}
      console.log(data);  
      fetchDB();
      alert("The supervisor has been added");
      
  

    }
    
    const fetchDB = async() =>{ 
      const name = supervisorfirstname + " " + supervisorlastname; 
      const data = {supervisorfirstname, supervisorlastname, supervisoremail, jobsupervisorTitle, valuesupervisordept, valuesupervisoroffice, valueaccess}
      try{
        await fetch("http://localhost:5001/insertEmployee/" + name +"/"+ supervisoremail +"/"+ valuesupervisordept +"/"+ valueaccess, {
          method: "POST"
        });
        
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
              New Supervisor Form
            </CardTitle>
            <CardBody>
              <Form >
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
                        value = {supervisorfirstname}
                        onChange = {(e) => setsuperFname(e.target.value)}
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
                       value = {supervisorlastname}
                       onChange = {(e) => setsuperLname(e.target.value)}
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
                    value = {supervisoremail}
                    onChange = {(e) => setsuperEmail(e.target.value)}
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
                    value = {jobsupervisorTitle}
                    onChange = {(e) => setsuperjobTitle(e.target.value)}
                  />
                </FormGroup>
                </Col>
                </Row>
  
                <Row>
                <Col xs="6">
                <FormGroup>
                  <Label htmlFor="selectacess">Acess Level</Label>
                    <Input  required type="select"  name= "Department" value = {valueaccess}
                    onChange = {(e) => setaccesslevel(e.target.value)}>

                        <option>Admin</option>
                        <option>Supervisor</option>
                  </Input>
                </FormGroup>
                </Col>
                <Col xs="6">
                <FormGroup>
                  <Label htmlFor="selectDepartment">Department</Label>
                    <Input  required type="select"  name= "Department" value = {valuesupervisordept}
                    onChange = {(e) => setsuperValuedept(e.target.value)}>
  
  
                        <option >Department 1</option>
                        <option>Department 2</option>
                        <option>Department 3</option>
                        <option>Department 4</option>
                        <option>Department 5</option>
                        <option>Department 5</option>
                  </Input>
                </FormGroup>
                </Col>
                </Row>
  
                
  
                <FormGroup>
                  <Label htmlFor="selectoffice">Office</Label>
                  <Input  required id="selectoffice" name="selectoffice" type="select" value = {valuesupervisoroffice}
                    onChange = {(e) => setsuperValueoffice(e.target.value)}>
                    <option>Select Office</option>
                    <option>Central</option>
                    <option>East</option>
                    <option>West</option>
                  </Input>
                </FormGroup>


                <Button type="submit" onClick={handleSubmit} id="button">Submit</Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
      
    );
  };
  
  export default NewSupervisorForm;
  