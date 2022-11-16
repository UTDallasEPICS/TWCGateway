//import {taskFiller} from './Database/DatabaseFunctions.js';
//import { Row, Col, Table, Card, CardTitle, CardBody } from "reactstrap";


const express = require('express')
const { Client } =  require("pg")
const app = express()

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

const client = new Client({
    user: "team",
    password: "epic",
    host: "localhost",
    port: "5432",
    database: "postgres"
})

var email = 'bad@yahoo.com';
var accountID = 2;
var userName = '';
var userRole = '';
var taskID = 2;

var account = {
    email: 'bad@yahoo.com',
    accountID: -1,
    userName: '',
    userRole: '',
    department: '',
    password: ''
};

var task ={
    number: 0,
    description: '',
    department: '',
    deadline: '',
    confirmationDate: '',
    employee: '',
    member_assigned: ''
};

async function signIn(req, res, account, email){
    try{
        const results = await client.query("select * from public.employee where email = '"+email+"'")
        if(results.rowCount == 1){
            account.email = results.rows[0].email;
            account.accountID = results.rows[0].accountid;
            account.userRole = results.rows[0].account_role;
            account.department = results.rows[0].account_department;
            account.userName = results.rows[0].name;
            account.password = results.rows[0].password;
        }
        else{
            console.log("no matching account was found");
        }

        if(userRole == "Admin"){
            console.log("go to admin");
            //resSign.json("go to admin");
        }
        if(userRole == "Supervisor"){
            console.log("go to supervisor");
            //resSign.json("go to supervisor");

        }
        if(userRole == "NewHire"){
            console.log("go to new hire");
            //resSign.json("go to new hire");
        }

        res.json(results.rows[0].name);
    } catch(e){
        console.error(`query failed ${e}`);
        console.log(e.stack);
        res.send("there was an error");
    }
};

// connect to database
connect();
async function connect() {
    try {
        await client.connect();
        console.log(`connected`);
        const res = await client.query('SELECT * FROM public.employee');
        const resTask = await client.query("SELECT * FROM public.task_list");
    } catch(e){
        console.error(`connection failed ${e}`);
    }
}

// works with test database
app.get("/signIn", async (req, res) => {
    try{
        const results = await client.query("select * from public.employee where email = '"+email+"'");
        res.json(results.rows[0].account_role + " " + results.rows[0].name);
        console.log(results.rows[0].name);
        userName = results.rows[0].name;
        userRole = results.rows[0].account_role;
        accountID = results.rows[0].accountid;
        
        if(userRole == "Admin"){
            console.log("go to admin");
            //resSign.json("go to admin");
        }
        if(userRole == "Supervisor"){
            console.log("go to supervisor");
            //resSign.json("go to supervisor");

        }
        if(userRole == "NewHire"){
            console.log("go to new hire");
            //resSign.json("go to new hire");
        }
        
    }catch(e){
        console.error(`query failed ${e}`);
        console.log(e.stack);
        res.send("there was an error");
    }
});

// respond with "hello world" when a GET request is made to the homepage
app.get("/Employee", async (req, res) => {
    try{
        const results = await client.query("select * from public.employee");
        res.json(results);
    }catch(e){
        console.error(`query failed ${e}`);
        console.log(e.stack);
        res.send("there was an error");
    }
});



app.get("/EmployeeSignTest", async function signIn(req, res, account, email){
    try{
        const results = await client.query("select * from public.employee where email = '"+email+"'")
        if(results.rowCount == 1){
            account.email = results.rows[0].email;
            account.accountID = results.rows[0].accountid;
            account.userRole = results.rows[0].account_role;
            account.department = results.rows[0].account_department;
            account.userName = results.rows[0].name;
            account.password = results.rows[0].password;
        }
        else{
            console.log("no matching account was found");
        }

        if(userRole == "Admin"){
            console.log("go to admin");
            //resSign.json("go to admin");
        }
        if(userRole == "Supervisor"){
            console.log("go to supervisor");
            //resSign.json("go to supervisor");

        }
        if(userRole == "NewHire"){
            console.log("go to new hire");
            //resSign.json("go to new hire");
        }

        res.json(results.rows[0].name);
    } catch(e){
        console.error(`query failed ${e}`);
        console.log(e.stack);
        res.send("there was an error");
    }
});

// works with test database
app.put("/confirmTask", async (req, res) => {
    try{
        const date = new Date();
        const results = await client.query('UPDATE public.task_list SET confrim_status = TRUE WHERE "taskID" = '+taskID);
        res.json(results);
        console.log("update successful");

    }catch(e){
        console.error(`query failed ${e}`);
        console.log(e.stack);
        res.send("there was an error" + e.stack);
    }
});

// works for test database
app.post("/insertNewTaskGroup", async (req, res) => {
    try{
        const results = await client.query("select * from public.employee");
        
        await client.query("INSERT INTO public.task_list (task_description, department_name,"+
        " deadline, member_assigned, assigned_employee_id) VALUES "
        +"('t1', 'b1', '2022-10-26', 'm1', "+accountID+")"
        +"('t2', 'b2', '2022-10-26', 'm2', "+accountID+")"
        +"('t3', 'b3', '2022-10-26', 'm3', "+accountID+")"
        +"('t4', 'b4', '2022-10-26', 'm4', "+accountID+")"
        +"('t5', 'b5', '2022-10-26', 'm5', "+accountID+")");
        

        res.json(results);
        console.log("insert successful")
    }catch(e){
        console.error(`query failed ${e}`);
        console.log(e.stack);
        res.send("there was an error" + e.stack);
    }
});

// works with test database will put the values of a task into different variables
// able to get all tasks based off the employee id for that task
app.get("/displayEmployeeTaskGroup/:id", async (req, res) => {
    try{
        const {id} = req.params;
        const results = await client.query("SELECT * FROM public.task_list WHERE assigned_employee_id = $1", [id]);
        res.json(results);
    }catch(e){
        console.error(`query failed ${e}`);
        console.log(e.stack);
        res.send("there was an error");
    }
});

app.listen(5001, () => console.log("listening on port 5001...."));

