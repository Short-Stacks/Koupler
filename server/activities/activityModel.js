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
    var queryString = 'INSERT INTO couples_activities (couples_id, activity_id) VALUES ((SELECT id FROM couples c WHERE c.username = ?), (SELECT id FROM activities a WHERE a.activity_name = ?))';
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
};