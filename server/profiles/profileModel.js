var dbConnection = require('../db/index.js');
var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');
var moment = require('moment');

//var queryDb = function(queryString, params, callback) {
  //dbConnection.query(queryString, params, function(err, data) {
    //if (err) {
      //console.error('Database ' + err);
    //}

    //callback(err, data);
  //});
//};

module.exports = {

  getProfileInfo: function(params, callback) {
    var queryString = 'SELECT * FROM couples WHERE couples.username = ?;';
    dbConnection.query(queryString, params, callback);
  },

  getProfileActivities: function(params, callback) {
    var queryString = 'SELECT a.activity_name, c.username FROM activities AS a LEFT JOIN couples_activities AS ca ON a.id = ca.activities_id LEFT JOIN couples AS c ON c.id = ca.couples_id WHERE username = (?);';
    dbConnection.query(queryString, params, callback);  
  },

  editProfile: function(params, callback) {
    var queryString = 'UPDATE couples SET username=?, person_1_first_name=?, person_1_last_name=?, person_2_first_name=?, person_2_last_name=?, email=?, phone=?, about_us=?, location_city=?, location_zip=? WHERE id=?;'
    dbConnection.query(queryString, params, callback);
  },

  addActivity: function(username, activity, callback) {
    var couples_activities = couples_activities || [];
    dbConnection.query('SELECT id FROM couples c WHERE c.username =?', [ username ], function(err, data) {
      var couplesId = data[0].id;
      dbConnection.query('SELECT id FROM activities a WHERE a.activity_name=?', [ activity ], function(err, data) {
        var activityId = data[0].id;
        var couple_activity = couplesId + ',' + activityId;
        if (couples_activities.indexOf(couple_activity) == -1) {
          couples_activities.push(couple_activity);
          dbConnection.query('INSERT into couples_activities (couples_id, activities_id) VALUES (?,?)', [ couplesId, activityId ], callback);
        }
      })
    })
  },

  getProfilePic: function(params, callback) {
    var queryString = 'SELECT photo_filepath FROM couples WHERE username = ?;';

    dbConnection.query(queryString, params, function(err, results) {
      if (err) {
        console.error(err);
      }
      else {
        var filePath = results[0].photo_filepath;
        callback(filePath);
      }
    });
  },

  // input: params expects an array [username, file]
  setProfilePic: function(params, callback) {
    var username = params[0];
    var file = params[1];
    var fileExtension = path.extname(file.name);
    var date = moment().format('MM-DD-YY');
    var fileName = username + date + fileExtension;

    // path to directory where profile-pic is saved
    var targetPath = path.resolve(process.env.PWD + "/server/assets/" +
                                  username + "/profile-pic/");

    // path to profile-pic on server
    var filePathServer = targetPath + "/" + fileName;

    // create directories if it doesn't exist
    mkdirp(targetPath, function(err) {
      if (err) {
        console.error(err);
      }

      // move and rename image from temp location to filePathServer
      fs.rename(file.path, filePathServer, function(err) {
        if (err) {
          console.error(err);
        }
      });
    });

    var queryString = 'UPDATE couples SET photo_filepath = ? WHERE username = ?;';

    // express serves static files in server/assets. Path to pic need to be
    // relative from the asset folder
    var picFilePath = "./" + username + "/profile-pic/" + fileName;
    dbConnection.query(queryString, [picFilePath , username], callback);
  },

  getMemories: function(callback) {

  },

  addToMemories: function(callback) {

  }
};
