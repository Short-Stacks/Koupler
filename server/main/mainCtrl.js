var jwt = require('jsonwebtoken');

var getUsername = function(token) {
  var decodedToken = jwt.decode(token);
  return decodedToken.username;
}

module.exports = {
  getLoginUser: function(req, res) {
    var token = req.headers['x-access-token'];
    var requestor = getUsername(token); 
    res.end(requestor);

  }
}