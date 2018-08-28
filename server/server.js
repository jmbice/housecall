const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const helper = require('../mysql/helpers.js');
const google = require('./googleHelper.js');

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
// app.use((req, res, next) => {
//   console.log(req.method, req.body);
//   next();
// });


app.get('/api/provider/appointments', (req, res) => {
  helper.getFutureAppointments((err, success) => {
    if (err) {
      res.status(404).send();
    } else {
      res.status(200).send(success);
    }
  });
});

app.get('/api/provider/services', (req, res) => {
  helper.getServices((err, success) => {
    if (err) {
      res.status(404).send();
    } else {
      res.status(200).send(success);
    }
  });
});

app.post('/api/provider/appointments', (req, res) => {
  helper.addAppointment(req.body, (err, success) => {
    if (err) {
      console.log('Could not post to DB');
      res.status(500).send(err);
    } else {
      res.status(200).send(success);
    }
  });
});

app.post('/api/provider/travelTimes', (req, res) => {
  google.getTravelTime(req.body.googleQuery, (err, success) => {
    if (err) {
      console.log('Could not get Data from Google, failed at server level');
      res.status(500).send(err);
    } else {
      console.log('Could get the data from Google:', success.rows.elements);
      res.status(200).send(success);
    }
  });
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
