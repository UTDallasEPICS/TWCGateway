// const { application }  = require("express");
// const client = require("../../clientConnection.js");
// const bodyParser = require("body-parser");
// application.use(bodyParser.json());
// application.use(bodyParser.urlencoded({extended: true}));
// module.exports = {
//     getDefaultTasks: async (req, res) => {
//         try{
//             const results = await client.query("SELECT * FROM public.default_tasks");
//             res.json(results);
//         }catch(e){
//             console.error(`query failed ${e}`);
//             console.log(e.stack);
//             res.send("there was an error in getting the default tasks");
//         }
//     },

//     addTask: async (req, res) => {
//         try
//         {
//             // let description = req.body.taskName;
//             // let department = req.body.department;
//             // let member_assigned = req.body.member;
//             // let timeVal = req.body.timeVal;
//             // let dayWeekMonth = req.body.time;
//             // let BeforeAfter = req.body.befAfter;
//             // let deadline = String(timeVal + ' ' + dayWeekMonth + ' ' + BeforeAfter);
//             // const results = await client.query("INSERT INTO public.default_tasks (task_description, department, deadline,member_assigned) VALUES  ('"+description+"', '"+department+"', '"+deadline+"', '"+member_assigned+"')");
//             // res.send(results);
//             res.json("task added");
//         }
//         catch(e)
//         {
//             res.send("there was an error in adding the task \n" + e.stack);
//         }
//     }
// }