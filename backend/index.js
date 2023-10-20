const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const router = require('./router.js');
const cors = require("cors");
app.use(router); //calling router.js 
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({type : ["application/x-www-form-urlencoded", "application/json"]}));
app.use(cors())
app.use(express.json());
//app.use(bodyParser.json());


app.listen(5010, () => console.log("listening on port 5010...."));



