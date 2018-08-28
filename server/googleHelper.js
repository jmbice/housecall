const request = require('request');
const config = require('./keys/google.js');


const getTravelTime = (queryString, cb) => {
  const options = {
    url: queryString,
    headers: {
      'User-Agent': 'request',
      Authorization: `token ${config.API_KEY}`,
    },
  };

  request(options, (err, response, body) => {
    if (err) {
      cb(err);
    } else {
      cb(null, JSON.parse(body));
    }
  });

  // $.ajax({
  //   url: queryString,
  //   method: 'GET',
  //   dataType: 'json',
  //   success: (data) => {
  //     cb(null, JSON.parse(data));
  //   },
  // });
};

module.exports = {
  getTravelTime,
};
