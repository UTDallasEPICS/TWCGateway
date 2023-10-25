const express = require('express')
const bodyParser = require('body-parser')
const { Client } =  require("pg")
const app = express()
const router = require('./router.js');
const cors = require("cors");
//app.use(router);
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration
//TASK
const client = new Client({
    user: "postgres",       //Use this
    password: "postgres",    //pgAdmin password
    host: "localhost",      //Use this
    port: "5005",           //Default only change if you changed the port number on set up
    database: "postgres"    //Try this first, change if not wokring to a database name you have setup in PGAdmin or text me
})

client.connect();
//console.log("Client connected to database" + client.connected);
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({type : ["application/x-www-form-urlencoded", "application/json"]}));
app.use(cors())
app.use(express.json());
app.use(bodyParser.json());


app.get("/signIn", 
async (req, res) => {
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

// Use this as a template to make your own queries
app.get("/EmployeeNewHire", async (req, res) => {
  try {
        const results = await client.query("select * from public.employee WHERE account_role = \'NewHire\'");
        res.json(results);
    }catch(e){
        console.error(`query failed ${e}`);
        console.log(e.stack);
        res.send("there was an error");
    }
});

app.get("/CurrentStatus", async (req, res) => {
    try{
        const results = await client.query("select e.name, Count(confirm_date), MAX(task_num) from public.task_list as t INNER JOIN public.employee as e ON t.assigned_employee_id = e.accountid WHERE account_role = 'NewHire' GROUP BY assigned_employee_id, e.name ORDER BY assigned_employee_id ASC");
        res.json(results);
    }catch(e){
        console.error(`query failed ${e}`);
        console.log(e.stack);
        res.send("there was an error");
    }
});
// Use this as a template to make your own queries
app.get("/DefaultTaskList", async (req, res) => {
    try{
        const results = await client.query("select Distinct(task_description), department_name, deadline, member_assigned  from public.task_list WHERE department_name = \'Basic Onboarding\'");
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
app.put("/confirmTask/:date/:emp_name/:task_num/:emp_num", async (req, res) => {
    try{
        const date = req.params['date'];
        const emp_name = req.params['emp_name'];
        const task_num = req.params['task_num'];
        const emp_num = req.params['emp_num'];
        const results = await client.query("UPDATE public.task_list SET confirm_status = TRUE, confirm_date = '"+date+"', employee_name = '"+emp_name+"' WHERE task_num = "+task_num+" AND assigned_employee_id = "+emp_num);
        res.json(results);
        console.log("update successful");

    }catch(e){
        console.error(`query failed ${e}`);
        console.log(e.stack);
        res.send("there was an error" + e.stack);
    }
});

app.delete("/removeOnboarding/:emp_name/:emp_email", async (req, res) => {
    try{
        const emp_name = req.params['emp_name'];
        const emp_email = req.params['emp_email'];
        console.log('made here with name= ', emp_name)
        console.log('made here with email= ', emp_email)
        const results = await client.query("DELETE FROM public.employee WHERE name = $1 OR email = $2", [emp_name, emp_email]);
        console.log('returning')
        res.json(results);
        console.log("update successful");

    }catch(e){
        console.error(`query failed ${e}`);
        console.log(e.stack);
        res.send("there was an error" + e.stack);
    }
});

app.get("/getAccountIDBasedOnEmail/:email", async (req, res) => {
    try{
        const {id} = req.params;
        const results = await client.query("SELECT accountid FROM public.employee WHERE email = $1", [email]);
        res.json(results); 
    }catch(e){
        console.error(`query failed ${e}`);
        console.log(e.stack);
        res.send("there was an error");
    }
});

app.get("/DefaultTasks", async (req, res) => {
    try{
    const results = await client.query("SELECT * FROM public.default_tasks");
    //console.log(results);
    res.json(results.rows); 
    }catch(e){
        console.error(`query failed ${e}`);
        console.log(e.stack);
        res.send("there was an error");
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

app.get("/getEmployeeEmail/:gmail", async (req, res) => {
    try{
        const {id} = req.params;
        const results = await client.query("SELECT * FROM public.employee WHERE email = $1", [gmail]);
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

app.get("/getEmployeeName/:id", async (req, res) => {
    try{
    const {id} = req.params;
    const results = await client.query("SELECT * FROM public.employee WHERE accountid = $1", [id]);
    console.log(results.rows[0].name);
    res.json(results); 
    }catch(e){
        console.error(`query failed ${e}`);
        console.log(e.stack);
        res.send("there was an error");
    }
});

app.get("/getEmployeeName/", async (req, res) => {
    try{
    const {id} = req.params;
    const results = await client.query("SELECT * FROM public.employee"); //
    console.log(results.rows[0].name);
    res.json(results); 
    }catch(e){
        console.error(`query failed ${e}`);
        console.log(e.stack);
        res.send("there was an error");
    }
});

app.post("/insertTask/:task_description/:department/:member_assigned/:timeVal/:dayWeekMonth/:BeforeAfter/", async (req, res) => {
    console.log("TRYING");
    try
    {
        const description = req.params['task_description'];
        const department = req.params['department'];
        const member_assigned = req.params['member_assigned'];
        const timeVal = req.params['timeVal'];
        const dayWeekMonth = req.params['dayWeekMonth'];
        const BeforeAfter = req.params['BeforeAfter'];
        const deadline = String(timeVal + ' ' +  dayWeekMonth + ' '+ BeforeAfter)
        const results = await client.query("INSERT INTO public.default_tasks (task_description, department, deadline,member_assigned) VALUES  ('"+description+"', '"+department+"', '"+deadline+"', '"+member_assigned+"')"); 
        console.log("insert successful");
    }
    catch(e)
    {
        console.error(`query failed ${e}`);
        console.log(e.stack);
        res.send("there was an error" + e.stack);
    }

}); 

app.post("/insertEmployee/:name/:email/:account_role/:account_department/:job_title/:startDate", async (req, res) => {

    try
    {
        const name = req.params['name'];
        const email = req.params['email'];
        const account_role = req.params['account_role'];
        const account_department = req.params['account_department'];
        const job_title = req.params['job_title'];
        const start_date = req.params['startDate'];
        const results = await client.query("INSERT INTO public.employee (name, email, account_role,account_department, job_title, start_date) VALUES  ('"+name+"', '"+email+"', '"+account_role+"', '"+account_department+"', '"+job_title+"', '"+start_date+"')"); 
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
        const results = await client.query("select * from public.default_tasks ORDER BY task_id ASC");

        const id = req.params['id'];
        const firstCurrentDate = new Date(req.params['date']);
        const currentDate = firstCurrentDate.getUTCFullYear() +"-"+ (firstCurrentDate.getUTCMonth()+1) +"-"+ firstCurrentDate.getUTCDate();
        console.log(currentDate)
        console.log(results)

        for(let i = 0; i < results.rowCount; i++){
            let editDate = new Date(req.params['date']);
            
            let before = false;
            const timeVals = results.rows[i].deadline.split(" ");
            const digit = parseInt(timeVals[0]);
            const timeFrame = timeVals[1];
            const befAft = timeVals[2];
            let frameAmount = 0;
            console.log(timeFrame)
            console.log(timeVals)
            if(befAft == 'Before'){
                before = true;
            }
            switch(timeFrame){
                case 'Days':
                    frameAmount = 1;
                    break;
                case 'Weeks':
                    frameAmount = 7;
                    break;
                case 'Months':
                    frameAmount = 30;
                    break;
                default:
                    frameAmount = -1;
            }
            if(before){
                if(frameAmount == 30)
                    editDate.setMonth(firstCurrentDate.getMonth() - digit);
                else
                    editDate.setDate(firstCurrentDate.getDate() - (digit * frameAmount));
            }
            else{
                if(frameAmount == 30)
                    editDate.setMonth(firstCurrentDate.getMonth() + digit);
                else
                    editDate.setDate(firstCurrentDate.getDate() + (digit * frameAmount));
            }
            editDate = editDate.getUTCFullYear() +"-"+ (editDate.getUTCMonth()+1) +"-"+ editDate.getUTCDate();
            console.log(timeVals);
            console.log(editDate);
            let numHolder = i + 1;
            await client.query("INSERT INTO public.task_list (task_description, department_name, deadline, member_assigned, assigned_employee_id, task_num)"+
                                "VALUES ('"+results.rows[i].task_description+"', '"+results.rows[i].department+"', '"+editDate+"', '"+results.rows[i].member_assigned+"', '"+id+"', '"+numHolder+"')");

        }
        res.json(results);
        console.log("insert successful list")
    }catch(e){
        console.error(`query failed ${e}`);
        console.log(e.stack);
        res.send("there was an error" + e.stack);
    }

});

app.get("/displayEmployeeTaskGroup/:id", async (req, res) => {
    try{
        const {id} = req.params;
        const results = await client.query("SELECT * FROM public.task_list WHERE assigned_employee_id = $1 ORDER BY task_num", [id]);
        res.json(results);
    }catch(e){
        console.error(`query failed ${e}`);
        console.log(e.stack);
        res.send("there was an error");
    }
});

app.get("/getTaskCounts", async (req, res) => {
    try{
        const results = await client.query("SELECT assigned_employee_id, Count(*)  FROM public.task_list GROUP BY assigned_employee_id ORDER BY assigned_employee_id ASC");
        res.json(results);
    }catch(e){
        console.error(`query failed ${e}`);
        console.log(e.stack);
        res.send("there was an error");
    }
});

app.get("/displayDepartmentTaskGroups/:dep", async (req, res) => {
    try{
        const {dep} = req.params;
        const results = await client.query("SELECT * FROM public.task_list WHERE department_name = '"+dep+"' ORDER BY assigned_employee_id, task_num");
        //console.log(results);
        res.json(results);
    }catch(e){
        console.error(`query failed ${e}`);
        console.log(e.stack);
        res.send("there was an error");
    }
});

app.get("/displayemployeeindept/:dep", async (req, res) => {
    try{
        const {dep} = req.params;
        const results = await client.query("SELECT * FROM public.employee WHERE (account_department = '"+dep+"' and account_role = 'NewHire')");
        console.log(results);
        res.json(results);
    }catch(e){
        console.error(`query failed ${e}`);
        console.log(e.stack);
        res.send("there was an error");
    }
});

app.get("/displayFirstDayTaskGroup/:id", async (req, res) => {
    try{
        const id = req.params['id'];
        const results = await client.query("SELECT * FROM public.task_list WHERE assigned_employee_id = "+id+" AND deadline = (SELECT max(deadline) FROM public.task_list WHERE assigned_employee_id = "+id+") ORDER BY task_num;");
        console.log(results);
        res.json(results);
    }catch(e){
        console.error(`query failed ${e}`);
        console.log(e.stack);
        res.send("there was an error");
    }
});

app.listen(5010, () => console.log("listening on port 5010...."));

















// --------------------
