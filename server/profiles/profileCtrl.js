var profile = require('./profileModel.js');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var formidable = require('formidable');

var getUsername = function(token) {
  var decodedToken = jwt.decode(token);
  return decodedToken.username;
};

module.exports = {

  loadProfile: function (req, res, next) {
    var username = req.params.username;
    var token = req.headers['x-access-token'];
    var requestor = getUsername(token); //note strange but working syntax

    var userActivities = [];
    var responseData;

    profile.getProfileInfo([ username ], function(err, data) {
      if(err) console.log(err);

      if(data) {
<<<<<<< HEAD
        responseData = data;
        if (requestor === username) {
          data[0].isAuthorizedToEdit = true;
=======
        if (requestor === username) {
          data[0].isAuthorizedToEdit = true;
          responseData = data;
>>>>>>> (feature) can fully edit and update profile, can view activities in profile, working on adding activities during edit of profile
        };
        profile.getProfileActivities([ username ], function (err, data) {
          for (var i = 0; i < data.length; i++) {
            if (userActivities.indexOf(data[i].activity_name) == -1) {
              userActivities.push(data[i].activity_name);
<<<<<<< HEAD
            }
=======
            })
>>>>>>> (feature) can fully edit and update profile, can view activities in profile, working on adding activities during edit of profile
          }
          responseData.push(userActivities);
          res.send(responseData);
          res.end();
        })
      }
    });
  },

  editProfile: function(req, res, next) {
    var username = req.params.username;
    var token = req.headers['x-access-token'];
    var editor = getUsername(token);
    console.log("edit profile req.body:", req.body);
    var activitiesToAdd = req.body.activitiesToAdd;
    var params = [];

    params[0] = req.body.username;
    params[1] = req.body.person_1_first_name;
    params[2] = req.body.person_1_last_name;
    params[3] = req.body.person_2_first_name;
    params[4] = req.body.person_2_last_name;
    params[5] = req.body.email;
    params[6] = req.body.phone;
    params[7] = req.body.about_us;
    params[8] = req.body.location_city;
    params[9] = req.body.location_zip;
    params[10] = req.body.id;

    console.log("editProfile params:", params)
    if (username === editor) {
      profile.editProfile(params, function(err,data) {
        console.log('Profile Edited');
<<<<<<< HEAD
        res.end();
      });
=======
      });
      for(var i = 0; i < activitiesToAdd.length;) {
        profile.addActivity([ activitiesToAdd[i] ], function(err, data) {
          if (err) {
            res.send(err);
          }
          else {
            res.end();
          }
        })
      }
>>>>>>> (feature) can fully edit and update profile, can view activities in profile, working on adding activities during edit of profile
    }
    else {
      res.status(403).send();
      res.end();
    }
  },

<<<<<<< HEAD
  addActivity: function(req, res, next) {
    var username = req.params.username;
    var activityToAdd = req.body.name;
    profile.addActivity(username, activityToAdd, function(err, data) {
      if (err) {
        console.log(err);
      }
      else {
        res.end();
      }
    })
  },

=======
>>>>>>> (feature) can fully edit and update profile, can view activities in profile, working on adding activities during edit of profile
  loadProfilePic: function(req, res, next) {
    console.log("requesting profile pic from database...");

    // node-mysql expects parameter to be an array
    profile.getProfilePic([req.params.username], function(filePath) {
      if (filePath) {
        res.sendFile(filePath, function(err) {
          if (err) {
            console.log("failed to get profile pic...");
            console.error(err);
            res.status(err.status).end();
          }
          else {
            console.log("sent file: ", filePath);
            res.status(200).end();
          }
        });
      }
    });
  },

  storeProfilePic: function(req, res, next) {
    console.log("attempting to save profile pic to server...");

    // formidable parses data from image upload form front client.
    // files can be accessed using the files variable
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
      var file = files.file;
      profile.setProfilePic([req.params.username, file], function(err) {
        if (err) {
          console.log("Could not save to server");
        }
        else {
          console.log("Saved profile pic to server");
        }
      });
    });
    res.status(201).send("Profile pic saved");
    res.end();
  },

  loadMemories: function(req, res, next) {

  },

  storeToMemories: function(req, res, next) {

  },
};
