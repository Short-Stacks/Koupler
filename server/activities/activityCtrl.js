var activity = require('./activityModel');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var q = require('q');
var Promise = require('bluebird');
var async = require('async');
var request = Promise.promisifyAll(require('request'));

var getUsername = function(token) {
  var decodedToken = jwt.decode(token);
  return decodedToken.username;
};

module.exports = {
  
  // Insert couple's activity decision in database
  postActivity: function(req, res, next) {
    var activityChosen = req.body.activity.name;
    var activityDate = Date.now();  // Refactor to SQL format type
    var username = getUsername(req.body.token);

    activity.postActivity([username, activityChosen, activityDate], function(err, data) {
      if(err) console.log(err);

      if(data) {
        console.log(data);
        res.send('Couple activity logged successfully');
      }
    });
  },

  getActivities: function(req, res, next) {
    var username = getUsername(req.query.token);
    
    return activity.getActivities([username, username], function(err, data) {
      // var couple = data[Math.floor(Math.random() * (data.length - 1))];
      console.log(data);
      res.send({couple: couple});
    });
  },

  getMatches: function(req, res, next) {
    var username = getUsername(req.body.token);
    var activityChosen = req.body.activity.name;
    var userZipCode = req.body.userZipCode;
    var searchDistance = req.body.searchDistance;
    var responseData = [];

    activity.getMatches([ activityChosen ], function(err, data) {
      var allMatches = data;

      var apiGetCount = 0;
      var getDistance = function(match, collection) {

        //query to Zip Code API to find distances between user's zip/city and matches' zip/city
        //to match search parameters
        var distanceQueryString = 'https://www.zipcodeapi.com/rest/jn6yHpsdgJEIQpLZPmNMX6Ik5xEuZbPjzVRglktB38jUx4UmrH9oNRJTpnoozdI8/distance.json/' + userZipCode + '/' + match.location_zip +'/miles'; 
        request.get(distanceQueryString, function(err, data, body) {
          body = JSON.parse(body);
          //we must keep an API get counter, and only when all matches have been checked can we send a response
          apiGetCount++;
          if (body.distance <= searchDistance) {
            collection.push(match);
          }
          //when all potential matches have been checked against the API's response, we send the response data array
          if (apiGetCount === allMatches.length) {
            res.send(collection);
          }
        })
      }

      for (var i = 0; i < allMatches.length; i++) {
        getDistance(allMatches[i], responseData);
      };
    });   
  } 
};