const express = require('express')
const { Client } =  require("pg")
const app = express()
const client = new Client({
    user: "team",
    password: "epic",
    host: "localhost",
    port: "5432",
    database: "postgres"
})

var email = 'bad@yahoo.com';
var accountID = -1;
var userName = '';
var userRole = '';
var taskID = -1;


// connect to database
connect();
async function connect() {
    try {
        await client.connect();
        console.log(`connected`);
        const res = await client.query('SELECT * FROM public.employee');
        const resSign = await client.query("SELECT * FROM public.employee");
        const resTask = await client.query("SELECT * FROM public.task_list");
        //console.log(res.rows[0].name);
        //console.log(res.rows);
        //console.log(resSign.rows[0].password);
        //const pword = resSign.rows[0].password;
        //console.log(typeof(pword));
        
    } catch(e){
        console.error(`connection failed ${e}`);
    }
}

app.get("/signIn", async (req, resSign) => {
    try{
        const results = await client.query("select * from public.employee where email = '"+email+"'");
        resSign.json(results.rows[0].account_role + " " + results.rows[0].name);
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
        resSign.send("there was an error");
    }
});

// respond with "hello world" when a GET request is made to the homepage
app.get("/Employee", async (req, res) => {
    try{
        const results = await client.query("select * from public.employee");
        res.json(results.rows[0].name);
    }catch(e){
        console.error(`query failed ${e}`);
        console.log(e.stack);
        res.send("there was an error");
    }
});

app.put("/confirmTask", async (req, res) => {
    try{
        const results = await client.query("UPDATE public.task_list SET confirmed = TRUE WHERE taskID = "+taskID);
        res.json(results);
    }catch(e){
        console.error(`query failed ${e}`);
        console.log(e.stack);
        res.send("there was an error");
    }
});

app.post("/insertNewTaskGroup", async (req, res) => {
    try{
        const results = await client.query("select * from public.employee");
        /*
        await client.query("INSERT INTO public.task_list (task_description, department_name,"+
        " deadline, member_assigned, assigned_employee_id) VALUES "
        +"('t1', 'b1', 2022-10-26, 'm1', "+accountID+")"
        +"('t2', 'b2', 2022-10-26, 'm2', "+accountID+")"
        +"('t3', 'b3', 2022-10-26, 'm3', "+accountID+")"
        +"('t4', 'b4', 2022-10-26, 'm4', "+accountID+")"
        +"('t5', 'b5', 2022-10-26, 'm5', "+accountID+")");
        */
        res.json(results);
        console.log("insert successful")
    }catch(e){
        console.error(`query failed ${e}`);
        console.log(e.stack);
        res.send("there was an error");
    }
});

app.get("/displayEmployeeTaskGroup", async (req, res) => {
    try{
        const results = await client.query("SELECT * FROM public.task_list WHERE assigned_employee_id = 1")
        for(var i = 0; i < results.rowCount; i++){
            var number = i+1;
            var task = results.rows[i].task;
            var department = results.rows[i].department;
            var deadline = results.rows[i].deadline;
            var confirmationDate = results.rows[i].confirmationDate;
            var employee = results.rows[i].employee;
            var member_assigned = results.rows[i].member_assigned;
            console.log(number, task, department, deadline, confirmationDate, employee, member_assigned);
        }
    }catch(e){
        console.error(`query failed ${e}`);
        console.log(e.stack);
        res.send("there was an error");
    }
});

app.listen(5001, () => console.log("listening on port 5001...."));

