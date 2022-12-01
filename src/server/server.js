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
    user: "gurjotchohan",
    password: "",
    host: "localhost",
    port: "5432",
    database: "gurjotchohan"
})

var email = 'bad@yahoo.com';
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
        const results = await client.query('UPDATE public.task_list SET confirm_status = TRUE WHERE "taskID" = '+taskID);
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
        //const results = 
        await client.query("INSERT INTO public.task_list (task_description, department_name,"+
        " deadline, member_assigned, assigned_employee_id) VALUES "
        +"('t1', 'b1', '2022-10-26', 'm1', "+($1)+")"
        +"('t2', 'b2', '2022-10-26', 'm2', "+($1)+")"
        +"('t3', 'b3', '2022-10-26', 'm3', "+($1)+")"
        +"('t4', 'b4', '2022-10-26', 'm4', "+($1)+")"
        +"('t5', 'b5', '2022-10-26', 'm5', "+($1)+")", [process.env.REACT_APP_ACCOUNTID]);
        
//INSERT INTO task_list (task_description, department_name, deadline, member_assigned, assigned_employee_id) VALUES ('t1', 'b1', '2022-10-26', 'm1', '3')
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
        const results = await client.query("SELECT * FROM public.task_list WHERE assigned_employee_id = $1 ORDER BY confirm_status", [id]);
        res.json(results);
    }catch(e){
        console.error(`query failed ${e}`);
        console.log(e.stack);
        res.send("there was an error");
    }
});

app.get("/displayEmployeedata/:id", async (req, res) => {
    try{
        const {id} = req.params;
        const results = await client.query("SELECT * FROM public.employee WHERE accountid = $1", [id]);
        res.json(results); 
    }catch(e){
        console.error(`query failed ${e}`);
        console.log(e.stack);
        res.send("there was an error");
    }
});

app.get("/getEmployeedata/:email", async (req, res) => {
    try{
        const {email} = req.params;
        const results = await client.query("SELECT * FROM public.employee WHERE email = $1", [email]);
        res.json(results); 
    }catch(e){
        console.error(`query failed ${e}`);
        console.log(e.stack);
        res.send("there was an error");
    }
});

app.post("/insertEmployee/:name/:email/:account_role/:account_department", async (req, res) => {

    try
    {
        const name = req.params['name'];
        const email = req.params['email'];
        const account_role = req.params['account_role'];
        const account_department = req.params['account_department'];
        const results = await client.query("INSERT INTO employee (name, email, account_role,account_department) VALUES  ('"+name+"', '"+email+"', '"+account_role+"', '"+account_department+"')"); 
        console.log("insert successful");
    }
    catch(e)
    {
        console.error(`query failed ${e}`);
        console.log(e.stack);
        res.send("there was an error" + e.stack);
    }

}); 

// works for test database
app.post("/insertNewTaskGroup/:id/:date", async (req, res) => {
    try{
        const results = await client.query("select * from public.employee");
        const id = req.params['id'];
        const firstCurrentDate = new Date(req.params['date']);
        const currentDate = firstCurrentDate.getUTCFullYear() +"-"+ (firstCurrentDate.getUTCMonth()+1) +"-"+ firstCurrentDate.getUTCDate();

        const oneBeforeDate = new Date(req.params['date']);
        oneBeforeDate.setDate(firstCurrentDate.getDate() - 1);
        const oneBefore = oneBeforeDate.getUTCFullYear() +"-"+ (oneBeforeDate.getUTCMonth()+1) +"-"+ oneBeforeDate.getUTCDate();

        const fiveBeforeDate = new Date(req.params['date']);
        fiveBeforeDate.setDate(firstCurrentDate.getDate() - 5);
        const fiveBefore = fiveBeforeDate.getUTCFullYear() +"-"+ (fiveBeforeDate.getUTCMonth()+1) +"-"+ fiveBeforeDate.getUTCDate();

        const sevenBeforeDate = new Date(req.params['date']);
        sevenBeforeDate.setDate(firstCurrentDate.getDate() - 7);
        const sevenBefore = sevenBeforeDate.getUTCFullYear() +"-"+ (sevenBeforeDate.getUTCMonth()+1) +"-"+ sevenBeforeDate.getUTCDate();

        const tenBeforeDate = new Date(req.params['date']);
        tenBeforeDate.setDate(firstCurrentDate.getDate() - 10);
        const tenBefore = tenBeforeDate.getUTCFullYear() +"-"+ (tenBeforeDate.getUTCMonth()+1) +"-"+ tenBeforeDate.getUTCDate();

        const fourteenBeforeDate = new Date(req.params['date']);
        fourteenBeforeDate.setDate(firstCurrentDate.getDate() - 14);
        const fourteenBefore = fourteenBeforeDate.getUTCFullYear() +"-"+ (fourteenBeforeDate.getUTCMonth()+1) +"-"+ fourteenBeforeDate.getUTCDate();
      
    
        await client.query("INSERT INTO public.task_list (task_description, department_name,"+
        " deadline, member_assigned, assigned_employee_id) VALUES "
        +"('Generates Written Offer letter for CEO to sign.', 'Basic Onboarding', '"+fourteenBefore+"', 'COO', "+id+"),"
        +"('Sends candidate welcome email offer letter, (I-9 and first day paperwork).', 'Basic Onboarding', '"+tenBefore+"', 'COO', "+id+"),"
        +"('Submits New User Creation Form to Mednetworx.', 'Basic Onboarding', '"+tenBefore+"', 'Office Manager', "+id+"),"
        +"('Runs VeriFYI background check.', 'Basic Onboarding', '"+sevenBefore+"', 'Office Manager', "+id+"),"
        +"('Verifies License.', 'Basic Onboarding', '"+sevenBefore+"', 'Office Manager', "+id+"),"
        +"('Insider Announcement.', 'Basic Onboarding', '"+sevenBefore+"', 'Office Manager', "+id+"),"
        +"('Request NPI/TPI, SS and DL from new hire', 'Basic Onboarding', '"+sevenBefore+"', 'Office Manager/Billing Director', "+id+"),"
        +"('Receives IT Equipment/Checks for readiness', 'Basic Onboarding', '"+oneBefore+"', 'Office Manager', "+id+"),"
        +"('Reviews Fingerprinting Results*', 'Basic Onboarding', '"+oneBefore+"', 'Office Manager', "+id+"),"
        +"('Updates Organization Chart.', 'Basic Onboarding', '"+oneBefore+"', 'Office Manager', "+id+"),"
        +"('Creates Keycard(s).', 'Basic Onboarding', '"+oneBefore+"', 'Office Manager', "+id+"),"
        +"('Sets up Copy/Printer code.', 'Basic Onboarding', '"+oneBefore+"', 'Office Manager', "+id+"),"
        +"('Sets up Orientation/Trainings with other departments.', 'Basic Onboarding', '"+sevenBefore+"', 'Department Manager', "+id+"),"
        +"('Welcome Email with first day instructions.', 'Basic Onboarding', '"+fiveBefore+"', 'COO', "+id+"),"
        +"('Identify Desk.', 'Basic Onboarding', '"+oneBefore+"', 'Department Manager', "+id+"),"
        +"('Submits New User Creation Form to Mednetworx.', 'Basic Onboarding', '"+tenBefore+"', 'Department Manager', "+id+"),"
        +"('Mailboxes.', 'Basic Onboarding', '"+oneBefore+"', 'Department Manager', "+id+"),"
        +"('Welcome Sign.', 'Basic Onboarding', '"+oneBefore+"', 'Department Manager', "+id+"),"
        +"('TWC T-shirt.', 'Basic Onboarding', '"+oneBefore+"', 'Department Manager', "+id+"),"
        +"('Prepares Desk.', 'Basic Onboarding', '"+oneBefore+"', 'Department Manager', "+id+"),"
        +"('Collect HR documents: Drivers license and Auto Insurance, license, transcripts, CPR, direct deposit.', 'Basic Onboarding', '"+currentDate+"', 'Office Manager', "+id+"),"
        +"('Schedule 30 minutes for Amy Spawn to meet new staff.', 'Basic Onboarding', '"+currentDate+"', 'Office Manager', "+id+"),"
        +"('Favorites Form.', 'Basic Onboarding', '"+currentDate+"', 'Office Manager', "+id+"),"
        +"('E-Verify.', 'Basic Onboarding', '"+currentDate+"', 'Office Manager', "+id+"),"
        +"('Issues IT equipment and logins.', 'Basic Onboarding', '"+currentDate+"', 'Office Manager', "+id+"),"
        +"('Collects Asset/Equipment Agreement.', 'Basic Onboarding', '"+currentDate+"', 'Office Manager', "+id+"),"
        +"('Order Business Cards.', 'Basic Onboarding', '"+currentDate+"', 'Office Manager', "+id+"),"
        +"('Explains 401k.', 'Basic Onboarding', '"+currentDate+"', 'COO', "+id+"),"
        +"('Issues Keycard.', 'Basic Onboarding', '"+currentDate+"', 'Office Manager', "+id+"),"
        +"('Assign HIPAA and IT Security Courses.', 'Basic Onboarding', '"+currentDate+"', 'Office Manager', "+id+"),"
        +"('Insperity portal introduction.', 'Basic Onboarding', '"+currentDate+"', 'Office Manager', "+id+"),"
        +"('Add picture and information to check-in iPad', 'Basic Onboarding', '"+currentDate+"', 'Office Manager', "+id+"),"
        +"('Add employee information to Employee Information Sheet and Internal Phone List sheet', 'Basic Onboarding', '"+currentDate+"', 'Office Manager', "+id+"),"
        +"('Provide TWC t-shirt', 'Basic Onboarding', '"+currentDate+"', 'Office Manager', "+id+"),"
        +"('Complete Favorites form and save in Common Drive', 'Basic Onboarding', '"+currentDate+"', 'Office Manager', "+id+"),"
        +"('Complete Strengths Finder assessment', 'Basic Onboarding', '"+currentDate+"', 'Office Manager', "+id+"),"
        +"('Take picture in TWC shirt - save in Common Drive, print and put on poster', 'Basic Onboarding', '"+currentDate+"', 'Office Manager', "+id+"),"
        +"('Update Organizational chart', 'Basic Onboarding', '"+currentDate+"', 'Office Manager', "+id+")");
        
        res.json(results);
        console.log("insert successful list")
    }catch(e){
        console.error(`query failed ${e}`);
        console.log(e.stack);
        res.send("there was an error" + e.stack);
    }
});


app.listen(5001, () => console.log("listening on port 5001...."));

