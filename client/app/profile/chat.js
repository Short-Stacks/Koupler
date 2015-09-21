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

  vm.tempMsgStorage = [
    {name: 'Cindy', msg: 'Hello'},
    {name: 'Ting', msg: 'Whats up'},
    {name: 'Cindy', msg: 'How you doing?'},
    {name: 'Ting', msg: 'fsdfdsfkdsfksd jkfjslkfjsklfjdslfjdslkfjdsklfjsdsdkfldflsdjfkljsdfsdkfjslkfjlksdjfklsd'},
    {name: 'Cindy', msg: "Here is a paragraph with a lot of text, but only two visible lines. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dictum purus vitae est accumsan cursus. Donec molestie pretium nulla at blandit. Quisque eget augue et nibh dapibus vulputate. Donec nec fermentum mauris. Vivamus non ipsum sed felis viverra molestie id ac neque. Sed purus orci, egestas pellentesque dapibus id, tempor id turpis. Morbi facilisis massa purus. Donec a urna facilisis odio varius hendrerit. Nulla diam ligula, ultrices ac volutpat nec, molestie sit amet est. Pellentesque imperdiet interdum laoreet. Phasellus tincidunt felis eu urna accumsan luctus. Sed nec nisi leo. Pellentesque luctus porta turpis non sagittis. Phasellus sodales sem nec urna viverra eget porta justo tincidunt. Maecenas iaculis laoreet turpis, eu malesuada est lacinia id. Nunc arcu tellus, ultricies at vestibulum sit amet, malesuada non purus."}
  ];

  vm.openClose = function() {
    console.log('chat sender', vm.sender);
    if(!vm.openChatBox) {
      vm.openChatBox = true;
    }
    else {
      vm.openChatBox = false;
    }
    console.log('$scope.parent', $scope.$parent.sender);
  };

  vm.sendMessage = function(){
    var msg =  {
      to: vm.receiverUsername,
      from: vm.sender,
      message: vm.message
    };
    socket.emit('sendMessageToServer', msg);

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
  socket.on('getNamefromServer', function(name) {
  //{receiverUsername: "beckhams",
  // couples1: "Victoria Beckham", couples2: "David Beckham"}
    vm.name = name.couples1 + " & " + name.couples2;
    vm.receiverUsername = name.receiverUsername;
  });

  //user received message
  socket.on('receivedMessage', function(data) {

  });

}]);
