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
  
  postActivity: function(params, callback) {
    var queryString = 'INSERT INTO activities (username, activity, activity_date) VALUES (?, ?, ?)';
    queryDb(queryString, params, callback);
  }

  , getActivities: function(params, callback) {
    var queryString = 'SELECT c.username, c.person_1_first_name, c.person_2_first_name, c.email, c.phone, c.photo_filepath, a.activity FROM couples c JOIN activities a ON c.username = a.username WHERE c.username <> ? AND a.activity IN (SELECT activity FROM activities WHERE username = ?);';
    queryDb(queryString, params, callback);
  }

  , getMatches: function(params, callback) {
    var matchesId;
    var activityIdQueryString = 'SELECT id FROM activities WHERE activity_name = (?)';
    //define activity Id to simplify query process and make queries more readable
    queryDb(activityIdQueryString, params, function(err, data) {
      activityId = data[0].id;
      
      var queryString = 'SELECT * FROM couples c, couples_activities j WHERE j.couples_id = c.id AND j.activities_id = (?)';
      queryDb(queryString, [ activityId ], callback);
    });
  }

  , getZipCoords: function(params, callback) {
    var queryString = 'SELECT * FROM zip_codes z WHERE z.zip = (?)';
    queryDb(queryString, params, callback);
  }
};