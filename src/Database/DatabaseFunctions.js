/*
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

// connect to database
//connect();
async function connect() {
    try {
        await client.connect();
        console.log(`connected`);
        const res = await client.query('SELECT * FROM public.employee');
        const res2 = await client.query("SELECT * FROM public.employee WHERE email = 'Great@gmail.com'")
        console.log(res.rows[0].name);
        console.log(res.rows);
        console.log(res2.rows[0].password);
        const pword = res2.rows[0].password;
        console.log(typeof(pword));
        
    } catch(e){
        console.error(`connection failed ${e}`);
    }
}

app.get("/signIn", async (req, resSign, email) => {
    try{
        const results = await client.query("select * from public.employee where email = 'Great@gmail.com'");
        resSign.json(results.rows[0].name);
        console.log(results.rows[0].name);
        const userName = results.rows[0].name;
        //const userRole = results.rows[0].role;
        //const accountID = results.rows[0].accountID;
        
        if(userRole == "Admin"){
            // go to admin view
        }
        if(userRole == "Supervisor"){
            // go to supervisor view
        }
        if(userRole == "NewHire"){
            // go to new hire view
        }
        
    }catch(e){
        console.error(`query failed ${e}`);
        console.log(e.stack);
        res.send("there was an error");
    }
});

app.get("/confirmTask", async (req, res, taskID) => {
    try{
        const results = await client.query("UPDATE public.task_list SET confirmed = TRUE WHERE taskID = taskID");
        res.json(results);
    }catch(e){
        console.error(`query failed ${e}`);
        console.log(e.stack);
        res.send("there was an error");
    }
});

app.post("/insertNewTaskGroup", async (req, res, accountID) => {
    try{
        const results = await client.query("INSERT INTO public.task_list ");
        await client.query("INSERT INTO public.task_list (column1, column2) VALUES (value1, value2)")
        res.json(results);
    }catch(e){
        console.error(`query failed ${e}`);
        console.log(e.stack);
        res.send("there was an error");
    }
});

app.get("/displayEmployeeTaskGroup", async (req, res, accountID) => {
    try{
        const results = await client.query("SELECT * FROM public.task_list WHERE accountID = accountID")
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
*/
//app.listen(5001, () => console.log("listening on port 5001...."));


