import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import trash from '../../assets/images/logos/trash.svg';

// const { Client } =  require("pg")

// const client = new Client({
//   user: "postgres",
//   password: "biggums",
//   host: "localhost",
//   port: "5432",
//   database: "postgres"
// })


// // connect to database
// connect();
// async function connect() {
//     try {
//         await client.connect();
//         console.log(`connected`);
//         const res = await client.query('SELECT * FROM public.employee');
//         const resTask = await client.query("SELECT * FROM public.task_list");
//     } catch(e){
//         console.error(`connection failed ${e}`);
//     }
// }
// app.get("/displayEmployeedata/:id", async (req, res) => {
//   try{
//       const {id} = req.params;
//       const results = await client.query("SELECT * FROM public.employee WHERE accountid = $1", [id]);
//       res.json(results); 
//   }catch(e){
//       console.error(`query failed ${e}`);
//       console.log(e.stack);
//       res.send("there was an error");
//   }
// });

const tableData = [
  {
    
    name: "Example Name",
    email: "example@gmail.com",
    department: "Example",
    status: "pending",
    weeks: "35",
    
  },
  {
    
    name: "Example Name",
    email: "example@gmail.com",
    department: "Example",
    status: "done",
    weeks: "35",
    
  },
  {
    
    name: "Example Name",
    email: "example@gmail.com",
    department: "Example",
    status: "holt",
    weeks: "35",
    
  },
  {
  
    name: "Example Name",
    email: "example@gmail.com",
    department: "Example",
    status: "pending",
    weeks: "35",
    
  },
  {
    
    name: "Example Name",
    email: "example@gmail.com",
    department: "Example",
    status: "done",
    weeks: "35",
    
  },
];

const departmentTables = () => {
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Currently Onboarding Employees</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Currently Onboarding 
          </CardSubtitle>

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Employee Name/Email</th>
                <th>Department</th>

                <th>Status</th>

                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((tdata, index) => (
                <tr key={index} className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2">
                      
                      <div className="ms-3">
                        <h6 className="mb-0">{tdata.name}</h6>
                        <span className="text-muted">{tdata.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>{tdata.department}</td>
                  <td>
                    {tdata.status === "pending" ? (
                      <span className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
                    ) : tdata.status === "holt" ? (
                      <span className="p-2 bg-warning rounded-circle d-inline-block ms-3"></span>
                    ) : (
                      <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
                    )}
                  </td>

                  <td>
                  <button><img src={trash}alt =""/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default departmentTables;
