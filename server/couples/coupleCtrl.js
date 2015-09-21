var couple = require('./coupleModel.js');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// refactored for couples from shortly angular

module.exports = {
  signup: function(req, res, next) {
    //generating hash of password
    console.log("in coupleCtrl!");
    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        console.error(err);
      }
      bcrypt.hash(req.body.password, salt, function(err, hash) {
        if (err) {
          console.error(err);
        }
        var params = [
          req.body.username,
          hash,
          req.body.lastName1,
          req.body.firstName1,
          req.body.lastName2,
          req.body.firstName2,
          req.body.email,
          req.body.phoneNumber,
          './m1.png',
          req.body.city,
          req.body.zipCode
        ];

        console.log('params', params);
        //inserting data into the DB
        couple.postCouple(params, function(err, data) {
          if (err) {
            console.error(err);
          }
          //creating token with username as payload
          var jwtSecret = 'a;lskdjf;laksdjf';
          var token = jwt.sign({
            username: req.body.username
          }, jwtSecret);
          res.send({
            //sending back token for client processing
            token: token,
            username: req.body.username,
            decoded: jwt.decode(token)
          });
        });
      });
    });
  },

  signin: function(req, res, next) {
    //get the username and password Hash from the DB
    couple.getCouple([req.body.username], function(err, data) {
      if (err) {
        console.error('Error: Model does not return query results');
      }
      //check if the password Hash === typed in password
      if (data) {
        bcrypt.compare(req.body.password, data[0]['hash'], function(err, data) {
          if (err) {
            res.status(401).end('Either username or password is incorrect');
          }

          //if typed in password checks out, create a token
          if (data) {
            //creating token with username as payload
            var jwtSecret = 'a;lskdjf;laksdjf';
            var token = jwt.sign({
              username: req.body.username
            }, jwtSecret);
            res.send({
              //sending back token for client processing
              token: token,
              username: req.body.username
            });
          }
        });
      } else {
        res.status(404).end('User does not exist');
      }
    });
  }
};
