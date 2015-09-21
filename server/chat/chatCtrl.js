var chat = require('./chatModel.js');
// var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var getUsername = function(token) {
  var decodedToken = jwt.decode(token);
  return decodedToken.username;
}

//expects post request to /chat with json 
// { "to": "cindy",
//     "from": "ting",
//     "message": "hello!"
// }

module.exports = {
  postMessage: function(req, res, next) {  
    var unprocessedParams = { 
      to: req.body.to,
      from: req.body.from,
      message: req.body.message
    }

    console.log("unprocessedParams is ", unprocessedParams);

    chat.postMessage(unprocessedParams, function(err, data) {
      // if(err) console.log(err);
      if(err) res.end("database failed to save: ",err)
      if(data) {
        res.end("message sent!");
      }
    })
  },

  getMessages: function(req, res, next) {

    var unprocessedParams = req.query;
    console.log(unprocessedParams);
    // var unprocessedParams = {
    //   to: "cindy",
    //   from: "ting",
    // };

    chat.getMessages(unprocessedParams, function(err, data) {
      if(err) res.end("failed to retrieve messages");
      // if (err) console.log(err);

      console.log("in get messages", data);
      res.end(JSON.stringify(data));
    

    });
  }

}

  