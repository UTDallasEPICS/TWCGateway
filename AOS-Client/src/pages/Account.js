import {
  Card,
  Row,
  Col,
  CardTitle,
  CardBody,
  Button
} from "reactstrap";
 
const  Account = () => {
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
            <Col>
              <h6>Employee Name</h6>
              <p>Title:</p>
              <p>Email:</p>
              <p>Phone:</p>
              <p>Department:</p>
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
