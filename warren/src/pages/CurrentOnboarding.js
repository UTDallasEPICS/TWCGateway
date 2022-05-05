import ProjectTables from "../components/dashboard/ProjectTable";
import trash from '../assets/images/logos/trash.svg';
import { Row, Col, Table, Card, CardTitle, CardBody } from "reactstrap";
import TaskForm from "../components/TaskForm";

const CurrentOnboarding = () => {
  return (
    <Row>
     
      <Col lg="12">
        <ProjectTables />
      </Col>
      {/* --------------------------------------------------------------------------------*/}
      {/* table-3*/}
      {/* --------------------------------------------------------------------------------*/}
      <Col lg="12">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-card-text me-2"> </i>
            Employee Name
          </CardTitle>
          <CardBody className="">
            <TaskForm/>
            <Table bordered striped>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Task</th>
                  <th>Manager</th>
                  <th>Deadline</th>
                  <th>Remove</th>
                  
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>This is example task #1</td>
                  <td>Manager Name</td>
                  <td>Date</td>
                  
                  <td><button><img src={trash} alt =""/></button></td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>This is example task #2</td>
                  <td>Manager Name</td>
                  <td>Date</td>
                  <td><button><img src={trash} alt =""/></button></td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>This is example task #3</td>
                  <td>Manager Name</td>
                  <td>Date</td>
                  <td><button><img src={trash} alt =""/></button></td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
      
     
    </Row>
  );
};

export default CurrentOnboarding;
