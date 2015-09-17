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

  getProfileInfo: function(params, callback) {
    console.log("inget getProfileInfo!");
    var queryString = 'SELECT * FROM couples WHERE couples.username = ?'
    queryDb(queryString, params, callback);
  }

};