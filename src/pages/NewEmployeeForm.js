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
} from "reactstrap";

const NewEmployeeForm = () => {
  return (
    <Row>
      <Col>
        {/* --------------------------------------------------------------------------------*/}
        {/* Card-1*/}
        {/* --------------------------------------------------------------------------------*/}
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            New Employee
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
                />
              </FormGroup>
              </Col>
              </Row>
              <FormGroup>
                <Label for="selectDepartment">Department</Label>
                <Input id="selectDepartment" name="selectDepartment" type="select">
                  <option hidden value="">Select Department</option>
                  <option>Department 1</option>
                  <option>Department 2</option>
                  <option>Department 3</option>
                  <option>Department 4</option>
                  <option>Department 5</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="selectStaff">Assign Onboarding Staff</Label>
                <Input
                  id="selectStaff"
                  multiple
                  name="selectStaff"
                  type="select"
                >
                  <option>Staff member</option>
                  <option>Staff member</option>
                  <option>Staff member</option>
                  <option>Staff member</option>
                  <option>Staff member</option>
                </Input>
              </FormGroup>
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
              
              <Button>Submit</Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default NewEmployeeForm;
