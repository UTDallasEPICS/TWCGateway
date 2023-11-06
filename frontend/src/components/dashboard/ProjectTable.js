import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import trash from '../../assets/images/logos/trash.svg';
import { useState, useEffect, useRef } from "react";
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


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



/*const tableData = [
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
*/
async function remove(emp_name, emp_email) {
  try {
    console.log(
      "trying to remove employee " + emp_name + " whos email is " + emp_email
    );

    const url =
      "http://localhost:5010/removeOnboarding/"+emp_name+'/'+emp_email;

    console.log('earl: ', url)
    const fin = await fetch(url, {method: 'DELETE'});

    window.location.reload();

    console.log("I have confirmed remove " + emp_name);
  } catch (e) {
    console.log("there was an error");
    console.log(e);
    return e;
  }
};

const ProjectTable = () => {
  const [employeeNewHireNames, setNewHire] = useState([]);  //have to declare global variable  and the function to change it here
  const [employeeNewHireStatus, setStatusArray] = useState([]);  //have to declare global variable  and the function to change it here
  const isComponentMounted = useRef();

  useEffect(() => {
    isComponentMounted.current = true;
    fetchEmployees().then(result => {
      if(isComponentMounted){
        setNewHire(result)
      }
    }).catch(error => {
      console.error(error)
    })

    fetchStatus().then(result => {
      if(isComponentMounted){
        setStatusArray(result)
      }
    }).catch(error => {
      console.error(error)
    })
    //fetchStatus();
    return () => {
      isComponentMounted.current = false;
    };
  }, [])


const fetchEmployees = async() =>{ 
  const results = await fetch("http://localhost:5010/EmployeeNewHire");
  const data = await results.json();

  console.log("data2", data)
  //fill the array with data gotten from our database call
  const nameArr = data?.rows?.map(item => [item.name, item.email, item.account_department]);
  //This globally sets the array
  return nameArr;
  setNewHire(nameArr)

  // const status = await fetch("http://localhost:5010/CurrentStatus");
  // const statusData = await status.json();
  // const statusArr = statusData?.rows?.map(item => [item.name, item.count, item.max]);
  // setStatusArray(statusArr)
  // console.log('###############',statusData)
    
};


const fetchStatus = async() =>{ 
  const status = await fetch("http://localhost:5010/CurrentStatus",{mode: 'cors'});
  const statusData = await status.json();
  const statusArr = statusData?.rows?.map(item => String(item.count +'/'+ item.max));
  console.log('###############',statusArr)
  return statusArr
  setStatusArray(statusArr)
    
};

const tableData = [];


  for(let i = 0; i < employeeNewHireNames.length; i++){
    // let temp = '';
    // console.log('TEMP1: ',temp)
    //let temp = String(employeeNewHireStatus[i][1] +'/'+ employeeNewHireStatus[i][2])
    let temp = String(employeeNewHireStatus[i])
    console.log('TEMP2: ',temp)
    tableData[i] =  {
      
      name: employeeNewHireNames[i][0],
      email: employeeNewHireNames[i][1],
      department: employeeNewHireNames[i][2],
      status: temp,
      weeks: "35",
      
    }
  }
//employeeNewHireStatus[i][1] +'/'+ employeeNewHireStatus[i][2]
//const [employeeNewHireNames, setNewHire] = useState([]);  //have to declare global variable  and the function to change it here

// //use this to run the function once when the page loads
// useEffect(()=> {

//   fetchEmployees()
//   // set data to the state
// }, [])

// const fetchEmployees = async() =>{
//   const results = await fetch("http://localhost:5010/EmployeeNewHire");
//   const data = await results.json();

//   console.log("data", data)
//   //fill the array with data gotten from our database call
//   const nameArr = data?.rows?.map(item => item.name);
//   //This globally sets the array
//     setNewHire(nameArr)
    
// };

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
                <tr key={index} className="border-top" onClick={() => }>
                  <td>
                    <div className="d-flex align-items-center p-2">
                      
                      <div className="ms-3">
                        <h6 className="mb-0">{tdata.name}</h6>
                        <span className="text-muted">{tdata.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    {tdata.department}
                  </td>
                  <td>
                    {/* {tdata.status === "pending" ? (
                      <span className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
                    ) : tdata.status === "holt" ? (
                      <span className="p-2 bg-warning rounded-circle d-inline-block ms-3"></span>
                    ) : (
                      <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
                    )} */}
                    {
                      <span className="mb-0">{tdata.status}</span>
                    }
                  </td>

                  <td>
                  <button onClick={() => remove(tdata.name,tdata.email)}><img src={trash}alt =""/></button>
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


export default ProjectTable;
