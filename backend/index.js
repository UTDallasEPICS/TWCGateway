// You can look at the wiki in the GitHub repository for explainations
// https://github.com/UTDallasEPICS/Warren-Automated-Onboard/wiki/Backend#welcome-to-the-backend---indexjs

// Look at the What is express? section of the wiki
const express = require('express');
const app = express();

// Look at the What is cors? section of the wiki
const cors = require('cors');
const corsOptions = {
  origin: '*',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Look at the What is a router? section of the wiki
// The defined router in router.js is called here
const router = require('./router.js');
app.use(router);

app.use(function (req, res, next) {
  // Right now it allows any domain to access this server
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from

  // This is the list of headers that are allowed to be sent by the client
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  // Pass to next layer of middleware
  next();
});

// Look at How app.listen() works section of the wiki if you want to know more about this
app.listen(5010, () => console.log('listening on port 5010....'));
