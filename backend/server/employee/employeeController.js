const { application }  = require("express");
const client = require("../../clientConnection.js");
const bodyParser = require("body-parser");
application.use(bodyParser.json());
application.use(bodyParser.urlencoded({extended: true}));
module.exports = {
    addEmployee: async (req, res) => {
        console.log("req.body: " + req.body);
        try{
            //const {name, email, accountRole, accountDepartment, jobTitle, startDate} = req.body;
            
            let name = req.body.name;
            console.log("This is the name: " +name);
            let email = req.body.email;
            let accountRole = req.body.accountRole;
            let accountDepartment = req.body.accountDepartment;
            let jobTitle = req.body.jobTitle;
            let startDate = req.body.startDate;

            const results = await client.query("INSERT INTO public.employee(name, email, account_role,  account_department, job_title, start_date) VALUES($1, $2, $3, $4, $5, $6)", [name, email, accountRole, accountDepartment, jobTitle, startDate]);
            res.json(results);
        }
        catch(e){
            
            console.error(`query failed ${e}`);
            console.log(e.stack);
            res.send("there was an error => " + e.stack);
        }
    },
    getAllEmployees: async (req, res) => {
        
        const results = await client.query("select * from public.employee");
        client.end;
        res.json(results);
    
    },
    getEmployeeByID: async (req, res) => {
            
        const results = await client.query("select * from public.employee where name = $1", [req.params.id]);
        client.end;
        res.json(results.rows[0]);

    },
    //returns empty, but Status is 200 OK
    getEmployeeByEmail: async (req, res) => {
        try{
            const {email} = req.params;
            const results = await client.query("SELECT * FROM public.employee WHERE email = $1", [email]);
            res.json(results); 
        }catch(e){
            console.error(`query failed ${e}`);
            console.log(e.stack);
            res.send("there was an error");
        }
    },
    deleteEmployee: async (req, res) => {
            
        try{
            const {id} = req.params;
            const results = await client.query("DELETE FROM public.employee WHERE accountid = $1", [id]);
            res.json(results);
        }
        catch(e){
            console.error(`query failed ${e}`);
            console.log(e.stack);
            res.send("there was an error => " + e.stack);
        }
    }
}
