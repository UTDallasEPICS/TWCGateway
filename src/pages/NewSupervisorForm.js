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
  const [valueemployee, setvalueEmployee]= useState('');
  const [posted, isposted] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); 
    const data = {supervisorfirstname, supervisorlastname, supervisoremail, jobsupervisorTitle, valuesupervisordept, valuesupervisoroffice}
    if(!(supervisorfirstname === "") && !(supervisorlastname === "") && !(supervisoremail === ""))
    {
        fetchDB();
        window.location.reload(false);
        alert("The supervisor has been added");

    }
    else
    {
      alert("The form is missing information");
    }
    
    


  }
  
  const fetchDB = async() =>{ 
    const name = supervisorfirstname + " " + supervisorlastname; 
    const data = {supervisorfirstname, supervisorlastname, supervisoremail, jobsupervisorTitle, valuesupervisordept, valuesupervisoroffice, valueaccess}
    try{
      await fetch("http://localhost:5001/insertEmployee/" + name +"/"+ supervisoremail +"/"+ valueaccess +"/"+ valuesupervisordept, {
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

                <Col xs>
              <FormGroup>
                <Label htmlFor="selectEmployee">Select Employee</Label>
                  <Input  required type="select"  name= "Employee" value = {valueemployee}
                  onChange = {(e) => setaccesslevel(e.target.value)}>
                    {/* QUERY HERE TO PUT EMPLOYEES WHO ARE NOT SUPERVISORS HERE  */}
                    <option>Employee 1</option>
                    <option>Employee 2</option>
                    <option>Employee 3</option>
                    <option>Employee 4</option>
                  </Input>
              </FormGroup>
                 

              </Col>
              </Row>
              <Row>
              <Col xs="6">

              <FormGroup>
                <Label htmlFor="selectaccess">Access Level</Label>
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
