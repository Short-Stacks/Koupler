var dbConnection = require('../db/index.js');

//processParams takes an array of two usernames and returns two sorted userids 
function processParams (unprocessedParams, callback) {
  var queryString = 'SELECT id FROM couples WHERE username = (?) UNION ALL SELECT id FROM couples WHERE username = (?);';
  dbConnection.query(queryString, [unprocessedParams.to, unprocessedParams.from], function(err, data) {
    if (err) {
      callback(err);
    }

    if (data.length > 0) {
      var senderId =data[0].id;
      var receiverId = data[1].id;

      if (senderId < receiverId) {
        console.log("processed data is ", data);
        callback ([ [senderId + ":" + receiverId], [senderId] ]);
      }

      else {
        callback([ [receiverId + ":" + senderId], [senderId] ]);
      }
    }

  });

}

module.exports = {
  //gets last 10 messages, senderusername, and time for chat between two users
  getMessages: function(unprocessedParams, callback) {

    processParams(unprocessedParams, function(param){
        var usersParam = param[0];
        console.log("processed usersParams is ", usersParam);

        var getTotalQuery = 'SELECT total_messages FROM total_messages WHERE identifier = (?);';
        dbConnection.query(getTotalQuery, usersParam, function(err, data) {
          var total = data[0].total_messages;

          if (total <= 10) {
            var messagesParam = [usersParam + ":%"];
            var getAllMessagesQuery = 'SELECT message, created_on, username FROM messages, couples WHERE id = sender && identifier_message_number LIKE (?);';
            dbConnection.query(getAllMessagesQuery, messagesParam, callback);  
          }
          else {
            var messagesParam = [usersParam + ":" + total-10, usersParam + ":" + total ];
            var getRecentMessagesQuery = 'SELECT message, created_on, username FROM messages, couples WHERE id = sender && identifier_message_number BETWEEN (?) AND (?);';
            dbConnection.query(getRecentMessagesQuery, messagesParam, callback);
          }
        })
    })
  },
  //update total_messages table and messages table
  postMessage: function(unprocessedParams, callback) { 
    
    //unprocessedParams is [from, to, msg]. the param being returned is [userParams, senderParams]
    processParams(unprocessedParams, function(param){
      var usersParam = param[0];
      var senderParam = param[1];

      console.log("usersParam", usersParam);
      var updateTotalQuery = 'INSERT INTO total_messages (identifier, total_messages) VALUES (?, 1)ON DUPLICATE KEY UPDATE total_messages = total_messages + 1;';
      dbConnection.query(updateTotalQuery, usersParam, function(err, data) {

        var getTotalQuery = 'SELECT total_messages FROM total_messages WHERE identifier = (?)';
        dbConnection.query(getTotalQuery, usersParam, function(err, data) {
          var total = data[0].total_messages;
          
          var messagesParam = [usersParam + ":" + total, unprocessedParams.message, senderParam];
          console.log("messagesParam is ", messagesParam);
          console.log("got through query2! data got back ", data);
          //after retrieving total_messages, eg. (4), we add new messages with an identifier of user1:user2:4.
          var updateMessagesQuery = 'INSERT INTO messages ( identifier_message_number, message, sender ) VALUES (?,?,?)';
          dbConnection.query(updateMessagesQuery, messagesParam, callback);
        });
      });
    });
  }
};
