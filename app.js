
const repository = require('./services/repository.js');
const express = require('express')
const app = express();
var bodyParser = require('body-parser');
const port = 9000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var cors = require('cors');
app.use(cors({
    origin: '*'
}));


app.get('/entry', (req, res) => {
  res.send('Hey, this is ExpressJS')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});

app.get('/GT/:id', (req, res) => { //retrieves data from the database
    console.log("Task Retrieved: " + req.url);
    console.log("TaskID = " + req.params.id);
    var data = repository.retrieveTask(req.params.id);
    res.writeHead(200, {"Content-Type": "application/json"});
    res.write(JSON.stringify(data));
    res.end();
});

app.post('/CT', function (req, res) {
    console.log("Task Created: " + req.url);
    console.log(req.body);
    res.send('Recieved Task Creation Request for T-ID: ' + req.body.TaskID);
    res.end();
});

app.post('/UT', (req, res) => {
    console.log("Take Update Request Received: " + req.url);
    console.log(req.body);
    res.send('Recieved Task Update Request for T-ID: ' + req.body.TaskID);
    res.end();
});

app.post('/DT', (req, res) => {
    console.log("Take Delete Request Received: " + req.url);
    console.log(req.body);
    res.send('Recieved Task Delete Request for T-ID: ' + req.body.TaskID);
    res.end();
});