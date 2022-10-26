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
  FormText,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import { useState } from "react";


const NewEmployeeForm = () => {
  const [firstname, setFname] = useState('');
  const [lastname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [jobTitle, setjobTitle] = useState('');
  const [startDate, setstartDate] = useState('');
  const [dropdownOpen, setDropdownOpen]= useState(false); 
  const toggle = () => setDropdownOpen((prevState) => !prevState);

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
            <Form>
              <Row>
                <Col xs="6">
                  <FormGroup>
                    <Label for="EmployeeFirstName">First Name</Label>
                    <Input
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
                  <Label for="EmployeeLastName">Last Name</Label>
                  <Input
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
                <Label for="exampleEmail">Email</Label>
                <Input
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
                <Label for="jobTitle">Job Title</Label>
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
                <Label for="startdate">Start Date</Label>
                <Input
                  id="startdate"
                  name="startdate"
                  placeholder=""
                  type="date"
                  value = {startDate}
                  onChange = {(e) => setstartDate(e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <Label for="selectDepartment">Department</Label>
                  <Dropdown  isOpen ={dropdownOpen}  toggle = {function noRefCheck(){}}>
                    <DropdownToggle caret>Select Department</DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick = {function noRefCheck(){}}>Department 1</DropdownItem>
                      <DropdownItem>Department 2</DropdownItem>
                      <DropdownItem>Department 3</DropdownItem>
                      <DropdownItem>Department 4</DropdownItem>
                      <DropdownItem>Department 5</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
              </FormGroup>

              <FormGroup>
                <Label for="selectoffice">Office</Label>
                <Input id="selectoffice" name="selectoffice" type="select">
                  <option hidden value="">Select Office</option>
                  <option>Central</option>
                  <option>East</option>
                  <option>West</option>
                </Input>
              </FormGroup>

              <FormGroup>
                <Label for="selectStaff">Assign Onboarding Staff</Label>
                <Input id="selectStaff" multiple name="selectStaff" type="select">
                  <option>Staff member</option>
                  <option>Staff member</option>
                  <option>Staff member</option>
                  <option>Staff member</option>
                  <option>Staff member</option>
                </Input>
              </FormGroup>
              {/*
              <FormGroup>
                <Label for="exampleText">Comments</Label>
                <Input id="exampleText" name="text" type="textarea" />
              </FormGroup>
              
              <FormGroup>
                <Label for="exampleFile">File</Label>
                <Input id="exampleFile" name="file" type="file" />
                <FormText>
                  Optional: add CV or other files
                </FormText>
              </FormGroup>
              */}
              <Button>Submit</Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
    
  );
};

export default NewEmployeeForm;
