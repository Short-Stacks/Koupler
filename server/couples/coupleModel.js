var dbConnection = require('../db/index.js');

var queryDb = function(queryString, params, callback) {
  dbConnection.query(queryString, params, function(err, data) {
    if(err) {
      console.error('Database ' + err);
    }

    callback(err, data);
  });
};

module.exports = {

  postCouple: function(params, callback) {
    var queryString = 'INSERT INTO couples (username, hash, person_1_last_name, person_1_first_name, person_2_last_name, person_2_first_name, email, phone, photo_filepath, location_city, location_zip ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
    queryDb(queryString, params, callback);
  },

  getCouple: function(params, callback) {
    var queryString = 'SELECT username, hash FROM couples WHERE username = ?;';
    queryDb(queryString, params, callback);
  }
};
