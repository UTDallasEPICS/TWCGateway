const express = require('express');
const app = express();

const cors = require('cors');
const corsOptions = {
  origin: '*',
  // credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

const router = require('./router.js');
app.use(router);

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');

  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );

  next();
});

app.listen(7002, () => console.log('listening on port 5001....'));
