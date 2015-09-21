angular.module('koupler.chat', [])

.controller('ChatCtrl', ['$scope','$http','socket',function($scope, $http, socket){
  var vm = this;
  vm.openChatBox = false;
  vm.sender = $scope.$parent.sender;
  vm.chatStart = true;

  vm.closeBox = function() {
    vm.chatStart = false;
  }
  console.log('chatStart', vm.chatStart);

  vm.openClose = function() {
    console.log('chat sender', vm.sender);
    if(!vm.openChatBox) {
      vm.openChatBox = true;
    }
    else {
      vm.openChatBox = false;
    }
    console.log('vm.tempMsgStorage', vm.tempMsgStorage);
    console.log('$scope.parent', $scope.$parent.sender);
  };

  vm.sendMessage = function(){
    var msg =  {
      to: vm.receiverUsername,
      from: vm.sender,
      message: vm.message
    };
    socket.emit('sendMessageToServer', msg);
    console.log('msg post request', msg);
    $http.post('/chat', msg)
      .then(function(response){
        console.log('response',response);
      }),
      function(err){
        console.log(err);
      };
    vm.message = "";
  }

  //get receiver's username from socket
  socket.on('getNameHistfromServer', function(data) {
  //{receiverUsername: "beckhams",
  // couples1: "Victoria Beckham", couples2: "David Beckham"}
    vm.name = data.couples1 + " & " + data.couples2;
    vm.receiverUsername = data.receiverUsername;
    vm.tempMsgStorage = data.chatData;
  });

  //user received message
  socket.on('receivedMessage', function(data) {
    vm.tempMsgStorage.push(data);
  });

}]);
