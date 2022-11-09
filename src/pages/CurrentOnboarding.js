import ProjectTables from "../components/dashboard/ProjectTable";
import trash from '../assets/images/logos/trash.svg';
import { Row, Col, Table, Card, CardTitle, CardBody } from "reactstrap";
import TaskForm from "../components/TaskForm";

const testarray = [10,20,30,40];
let elementArray = [<tr></tr>, <tr></tr>];
var elements = Array(30).fill(<tr>hello</tr>);


function taskFiller(taskList, elements){
  try{
    for(let i = 0; i < elements.length; i++){
      elements[i]=<tr>
                  <th scope="row">{i+1}</th>
                  <td>{taskList[i%4]}</td>
                  <td>{taskList[i%4]}</td>
                  <td>{taskList[i%4]}</td>
                  <td><button><img src={trash} alt =""/></button></td>
                  </tr>;
    }
    console.log(elements);
    return elements;
  }catch(e){
    console.log("there was an error");
    console.log(e);
    return e;
  }
};

taskFiller(testarray);

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
                {taskFiller(testarray,elements)}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
      
     
    </Row>
  );
};

export default CurrentOnboarding;
