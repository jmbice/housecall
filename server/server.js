const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const helper = require('../mysql/helpers.js');

const PORT = 3000;
const app = express();

app.use(express.static(path.join(__dirname, '../public')));
// app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


app.get('/provider/appointments', (req, res) => {
  helper.getFutureAppointments((err, success) => {
    if (err) {
      res.status(404).send();
    } else {
      res.status(200).send(success);
    }
  });
});

app.get('/provider/services', (req, res) => {
  helper.getServices((err, success) => {
    if (err) {
      res.status(404).send();
    } else {
      res.status(200).send(success);
    }
  });
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
