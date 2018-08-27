const db = require('./index');

const getServices = (callback) => {
  const queryString = 'SELECT * FROM services';
  db.query(queryString, (err, success) => {
    if (err) {
      callback(err);
    } else {
      callback(null, success);
    }
  });
};

const getFutureAppointments = (callback) => {
  const queryString = 'SELECT * FROM appointments WHERE start_date >= CURDATE()';
  db.query(queryString, (err, success) => {
    if (err) {
      callback(err);
    } else {
      callback(null, success);
    }
  });
};

const addAppointment = (data, callback) => {
  const queryString = 'INSERT INTO appointments (client_id, service_id, duration, start_time, start_date, address, city, state, zip) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(queryString, [data.client_id, data.service_id, data.duration, data.start_time, data.start_date, data.address, data.city, data.state, data.zip], (err, success) => {
    if (err) {
      callback(err);
    } else {
      callback(null, success);
    }
  });
};

const addClient = (data, callback) => {
  const queryString = 'INSERT INTO clients (first_name, last_name, phone, email, address, city, state, zip) VALUES(?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(queryString, [data.first_name, data.last_name, data.phone, data.email, data.address, data.city, data.state, data.zip], (err, success) => {
    if (err) {
      callback(err);
    } else {
      callback(null, success);
    }
  });
};

module.exports = {
  getServices,
  getFutureAppointments,
  addAppointment,
  addClient,
};
