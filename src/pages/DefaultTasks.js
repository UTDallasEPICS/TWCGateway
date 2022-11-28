import ProjectTables from "../components/dashboard/ProjectTable";
import { Row, Col, Table, Card, CardTitle, CardBody } from "reactstrap";
import TaskForm from "../components/TaskForm";
import checkMark from '../assets/images/logos/checkmark.svg';


const DefaultTasks = () => {
  return (
    <Row>
     
      
      {/* --------------------------------------------------------------------------------*/}
      {/* table-3*/}
      {/* --------------------------------------------------------------------------------*/}
      <Col lg="12">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-card-text me-2"> </i>
            Default Tasks
          </CardTitle>
          <CardBody className="">
            <TaskForm/>
            <Table bordered striped>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Task</th>
                  <th>Department</th>
                  <th>Deadline</th>
                  <th>Confirm</th>
                  <th>Confirmation Date</th>
                  <th>Employee</th>
                  <th>Member Assigned</th>
                  
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Generates Written Offer letter for CEO to sign.</td>
                  <td>Basic Onboarding</td>
                  <td>2+ weeks before hire</td>
                  <td><button><img src={checkMark} alt =""/></button></td>
                  <td>NA</td>
                  <td>NA</td>
                  <td>COO</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Sends candidate welcome email (offer letter, I-9 and first day paperwork).</td>
                  <td>Basic Onboarding</td>
                  <td>10 business days before start</td>
                  <td><button><img src={checkMark} alt =""/></button></td>
                  <td>NA</td>
                  <td>NA</td>
                  <td>COO</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Submits New User Creation Form to Mednetworx.</td>
                  <td>Basic Onboarding</td>
                  <td>10 business days before start</td>
                  <td><button><img src={checkMark} alt =""/></button></td>
                  <td>NA</td>
                  <td>NA</td>
                  <td>Office Manager</td>
                </tr>
                <tr>
                  <th scope="row">4</th>
                  <td>Runs VeriFYI background check.</td>
                  <td>Basic Onboarding</td>
                  <td>1+ weeks before start</td>
                  <td><button><img src={checkMark} alt =""/></button></td>
                  <td>NA</td>
                  <td>NA</td>
                  <td>Office Manager</td>
                </tr>
                <tr>
                  <th scope="row">5</th>
                  <td>Verifies License.</td>
                  <td>Basic Onboarding</td>
                  <td>1+ weeks before start</td>
                  <td><button><img src={checkMark} alt =""/></button></td>
                  <td>NA</td>
                  <td>NA</td>
                  <td>Office Manager</td>
                </tr>
                <tr>
                  <th scope="row">6</th>
                  <td>Insider Announcement.</td>
                  <td>Basic Onboarding</td>
                  <td>1+ weeks before start</td>
                  <td><button><img src={checkMark} alt =""/></button></td>
                  <td>NA</td>
                  <td>NA</td>
                  <td>Office Manager</td>
                </tr>
                <tr>
                  <th scope="row">7</th>
                  <td>Request NPI/TPI, SS and DL from new hire</td>
                  <td>Basic Onboarding</td>
                  <td>1+ weeks before start</td>
                  <td><button><img src={checkMark} alt =""/></button></td>
                  <td>NA</td>
                  <td>NA</td>
                  <td>Office Manager/Billing Director</td>
                </tr>
                <tr>
                  <th scope="row">8</th>
                  <td>Receives IT Equipment/Checks for readiness</td>
                  <td>Basic Onboarding</td>
                  <td>1+ days before start</td>
                  <td><button><img src={checkMark} alt =""/></button></td>
                  <td>NA</td>
                  <td>NA</td>
                  <td>Office Manager</td>
                </tr>
                <tr>
                  <th scope="row">9</th>
                  <td>Reviews Fingerprinting Results*</td>
                  <td>Basic Onboarding</td>
                  <td>1+ days before start</td>
                  <td><button><img src={checkMark} alt =""/></button></td>
                  <td>NA</td>
                  <td>NA</td>
                  <td>Office Manager</td>
                </tr>
                <tr>
                  <th scope="row">10</th>
                  <td>Updates Organization Chart.</td>
                  <td>Basic Onboarding</td>
                  <td>1+ days before start</td>
                  <td><button><img src={checkMark} alt =""/></button></td>
                  <td>NA</td>
                  <td>NA</td>
                  <td>Office Manager</td>
                </tr>
                <tr>
                  <th scope="row">11</th>
                  <td>Creates Keycard(s).</td>
                  <td>Basic Onboarding</td>
                  <td>1+ days before start</td>
                  <td><button><img src={checkMark} alt =""/></button></td>
                  <td>NA</td>
                  <td>NA</td>
                  <td>Office Manager</td>
                </tr>
                <tr>
                  <th scope="row">12</th>
                  <td>Sets up Copy/Printer code.</td>
                  <td>Basic Onboarding</td>
                  <td>1+ days before start</td>
                  <td><button><img src={checkMark} alt =""/></button></td>
                  <td>NA</td>
                  <td>NA</td>
                  <td>Office Manager</td>
                </tr>
                <tr>
                  <th scope="row">13</th>
                  <td>Sets up Orientation/Trainings with other departments.</td>
                  <td>Basic Onboarding</td>
                  <td>1+ weeks before start</td>
                  <td><button><img src={checkMark} alt =""/></button></td>
                  <td>NA</td>
                  <td>NA</td>
                  <td>Department Manager</td>
                </tr>
                <tr>
                  <th scope="row">14</th>
                  <td>Welcome Email with first day instructions.</td>
                  <td>Basic Onboarding</td>
                  <td>5 days before start</td>
                  <td><button><img src={checkMark} alt =""/></button></td>
                  <td>NA</td>
                  <td>NA</td>
                  <td>COO</td>
                </tr>
                <tr>
                  <th scope="row">15</th>
                  <td>Identify Desk.</td>
                  <td>Basic Onboarding</td>
                  <td>1+ days before start</td>
                  <td><button><img src={checkMark} alt =""/></button></td>
                  <td>NA</td>
                  <td>NA</td>
                  <td>Department Manager</td>
                </tr>
                <tr>
                  <th scope="row">16</th>
                  <td>Submits New User Creation Form to Mednetworx.</td>
                  <td>Basic Onboarding</td>
                  <td>10 business days before start</td>
                  <td><button><img src={checkMark} alt =""/></button></td>
                  <td>NA</td>
                  <td>NA</td>
                  <td>Department Manager</td>
                </tr>
                <tr>
                  <th scope="row">17</th>
                  <td>Mailboxes.</td>
                  <td>Basic Onboarding</td>
                  <td>1+ days before start</td>
                  <td><button><img src={checkMark} alt =""/></button></td>
                  <td>NA</td>
                  <td>NA</td>
                  <td>Department Manager</td>
                </tr>
                <tr>
                  <th scope="row">18</th>
                  <td>Welcome Sign.</td>
                  <td>Basic Onboarding</td>
                  <td>1+ days before start</td>
                  <td><button><img src={checkMark} alt =""/></button></td>
                  <td>NA</td>
                  <td>NA</td>
                  <td>Department Manager</td>
                </tr>
                <tr>
                  <th scope="row">19</th>
                  <td>TWC T-shirt.</td>
                  <td>Basic Onboarding</td>
                  <td>1+ days before start</td>
                  <td><button><img src={checkMark} alt =""/></button></td>
                  <td>NA</td>
                  <td>NA</td>
                  <td>Department Manager</td>
                </tr>
                <tr>
                  <th scope="row">20</th>
                  <td>Prepares Desk.</td>
                  <td>Basic Onboarding</td>
                  <td>1+ days before start</td>
                  <td><button><img src={checkMark} alt =""/></button></td>
                  <td>NA</td>
                  <td>NA</td>
                  <td>Department Manager</td>
                </tr>
                <tr>
                  <th scope="row">21</th>
                  <td>Collect HR documents: Driver's license and Auto Insurance, license, transcripts, CPR, direct deposit.</td>
                  <td>Basic Onboarding</td>
                  <td>First Day</td>
                  <td><button><img src={checkMark} alt =""/></button></td>
                  <td>NA</td>
                  <td>NA</td>
                  <td>Office Manager</td>
                </tr>
                <tr>
                  <th scope="row">22</th>
                  <td>Schedule 30 minutes for Amy Spawn to meet new staff.</td>
                  <td>Basic Onboarding</td>
                  <td>First Day</td>
                  <td><button><img src={checkMark} alt =""/></button></td>
                  <td>NA</td>
                  <td>NA</td>
                  <td>Office Manager</td>
                </tr>
                <tr>
                  <th scope="row">23</th>
                  <td>Favorites Form.</td>
                  <td>Basic Onboarding</td>
                  <td>First Day</td>
                  <td><button><img src={checkMark} alt =""/></button></td>
                  <td>NA</td>
                  <td>NA</td>
                  <td>Office Manager</td>
                </tr>
                <tr>
                  <th scope="row">24</th>
                  <td>E-Verify.</td>
                  <td>Basic Onboarding</td>
                  <td>First Day</td>
                  <td><button><img src={checkMark} alt =""/></button></td>
                  <td>NA</td>
                  <td>NA</td>
                  <td>Office Manager</td>
                </tr>
                <tr>
                  <th scope="row">25</th>
                  <td>Issues IT equipment and logins.</td>
                  <td>Basic Onboarding</td>
                  <td>First Day</td>
                  <td><button><img src={checkMark} alt =""/></button></td>
                  <td>NA</td>
                  <td>NA</td>
                  <td>Office Manager</td>
                </tr>
                <tr>
                  <th scope="row">26</th>
                  <td>Collects Asset/Equipment Agreement.</td>
                  <td>Basic Onboarding</td>
                  <td>First Day</td>
                  <td><button><img src={checkMark} alt =""/></button></td>
                  <td>NA</td>
                  <td>NA</td>
                  <td>Office Manager</td>
                </tr>
                <tr>
                  <th scope="row">27</th>
                  <td>Order Business Cards.</td>
                  <td>Basic Onboarding</td>
                  <td>First Day</td>
                  <td><button><img src={checkMark} alt =""/></button></td>
                  <td>NA</td>
                  <td>NA</td>
                  <td>Office Manager</td>
                </tr>
                <tr>
                  <th scope="row">28</th>
                  <td>Explains 401k .</td>
                  <td>Basic Onboarding</td>
                  <td>First Day</td>
                  <td><button><img src={checkMark} alt =""/></button></td>
                  <td>NA</td>
                  <td>NA</td>
                  <td>COO</td>
                </tr>
                <tr>
                  <th scope="row">29</th>
                  <td>Issues Keycard.</td>
                  <td>Basic Onboarding</td>
                  <td>First Day</td>
                  <td><button><img src={checkMark} alt =""/></button></td>
                  <td>NA</td>
                  <td>NA</td>
                  <td>Office Manager</td>
                </tr>
                <tr>
                  <th scope="row">30</th>
                  <td>Assign HIPAA and IT Security Courses.</td>
                  <td>Basic Onboarding</td>
                  <td>First Day</td>
                  <td><button><img src={checkMark} alt =""/></button></td>
                  <td>NA</td>
                  <td>NA</td>
                  <td>Office Manager</td>
                </tr>
                <tr>
                  <th scope="row">31</th>
                  <td>Insperity portal introduction.</td>
                  <td>Basic Onboarding</td>
                  <td>First Day</td>
                  <td><button><img src={checkMark} alt =""/></button></td>
                  <td>NA</td>
                  <td>NA</td>
                  <td>Office Manager</td>
                </tr>
                <tr>
                  <th scope="row">32</th>
                  <td>Add picture and information to check-in iPad</td>
                  <td>Basic Onboarding</td>
                  <td>First Day</td>
                  <td><button><img src={checkMark} alt =""/></button></td>
                  <td>NA</td>
                  <td>NA</td>
                  <td>Office Manager</td>
                </tr>
                <tr>
                  <th scope="row">33</th>
                  <td>Add employee information to Employee Information Sheet and Internal Phone List sheet</td>
                  <td>Basic Onboarding</td>
                  <td>First Day</td>
                  <td><button><img src={checkMark} alt =""/></button></td>
                  <td>NA</td>
                  <td>NA</td>
                  <td>Office Manager</td>
                </tr>
                <tr>
                  <th scope="row">34</th>
                  <td>Provide TWC t-shirt</td>
                  <td>Basic Onboarding</td>
                  <td>First Day</td>
                  <td><button><img src={checkMark} alt =""/></button></td>
                  <td>NA</td>
                  <td>NA</td>
                  <td>Office Manager</td>
                </tr>
                <tr>
                  <th scope="row">35</th>
                  <td>Complete Favorites form and save in Common Drive</td>
                  <td>Basic Onboarding</td>
                  <td>First Day</td>
                  <td><button><img src={checkMark} alt =""/></button></td>
                  <td>NA</td>
                  <td>NA</td>
                  <td>Office Manager</td>
                </tr>
                <tr>
                  <th scope="row">36</th>
                  <td>Complete Strengths Finder assessment</td>
                  <td>Basic Onboarding</td>
                  <td>First Day</td>
                  <td><button><img src={checkMark} alt =""/></button></td>
                  <td>NA</td>
                  <td>NA</td>
                  <td>Office Manager</td>
                </tr>
                <tr>
                  <th scope="row">37</th>
                  <td>Take picture in TWC shirt - save in Common Drive, print and put on poster</td>
                  <td>Basic Onboarding</td>
                  <td>First Day</td>
                  <td><button><img src={checkMark} alt =""/></button></td>
                  <td>NA</td>
                  <td>NA</td>
                  <td>Office Manager</td>
                </tr>
                <tr>
                  <th scope="row">38</th>
                  <td>Update Organizational chart</td>
                  <td>Basic Onboarding</td>
                  <td>First Day</td>
                  <td><button><img src={checkMark} alt =""/></button></td>
                  <td>NA</td>
                  <td>NA</td>
                  <td>Office Manager</td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
      
     
    </Row>
  );
};

export default DefaultTasks;