module.exports = function(server){

  var path = require('path'); 
  var io = require('socket.io')(server);
  var users = {};

  io.on('connection', function(socket){
    console.log('socket connected');
    //receiver's username
    socket.on('sendReceiverToServer', function(data){
      console.log('sendReceiverToServer', data);
      users[data.receiverUsername] = socket;
      console.log('receiver', data);
      socket.emit('getNameHistfromServer', data);
    });

    socket.on('sendMessageToServer', function(data){
      console.log('Socket sendMessageToServer', data); 
      //chat hist bewteen users
      // When a message is received, emit the data to the receiver.
      users[data.to].emit('receivedMessage', data);
    });
  });

};