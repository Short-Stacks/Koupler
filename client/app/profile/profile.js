angular.module('koupler.profile', [
  'ui.bootstrap'
  ])

.controller('ProfileCtrl', function($scope, $state, $http, Activities, AuthTokenFactory, Upload, socket) {

  var vm = this;
  //placeholder for POST request until routeParam is set up
  vm.username = $state.params.username;
  $scope.sender = $scope.$parent.loginUser;

  vm.goToActivities = function() {
    $state.go('activities');
  };
  vm.profileData = {};

  vm.getProfileInfo = function() {
    var token = AuthTokenFactory.getToken();
    console.log(token);
    //GET request should respond with user's profile picture, interests, about, memories, etc.
    $http.get('/profile/' + vm.username)
      .then(function(response) {
        if (response.data[0].isAuthorizedToEdit) {
          vm.isAuthorizedToEdit = true;
        }
        console.log("getProfileInfo:", response.data);
        vm.profileData = response.data[0];
      });
  };
  vm.getProfileInfo();


  vm.showEditModal = function() {
    var editModal = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'app/profile/modal-editProfile.html',
      controller: 'ProfileCtrl',
    });
  };


  console.log('vm.username', vm.username);
  vm.uploadFiles = function(file) {
    vm.f = file;
    if (file && !file.$error) {
      file.upload = Upload.upload({
        url: '/profile/' + vm.username + '/pic',
        file: file,
        method: 'POST'
      });

      file.upload.then(function(response) {
        //should send back src url for img
      }, function(response) {
        vm.errorMsg = response.status;
      });
    }
  };

  socket.on('senderNameToClient', function(sender){
    vm.sender = sender;
  });

  vm.chatInit = function() {
    $scope.openConversation = true;
// [{message: xxx, created_on: time, username: sender's name}]
    //get chat history
    $http.get('/chat', {params: {to: vm.username, from: $scope.sender}})
      .then(function(response) {
        // if (response.data[0].isAuthorizedToEdit) {
        //   vm.isAuthorizedToEdit = true;
        // };
        vm.chatData = response.data;
        console.log('chat hist.', vm.chatData);
      });
    socket.emit('sendReceiverToServer', {
      receiverUsername: vm.profileData.username,
      couples1: vm.profileData.person_1_first_name + " " + vm.profileData.person_1_last_name,
      couples2: vm.profileData.person_2_first_name + " " + vm.profileData.person_2_last_name,
      chatHist: vm.chatData
    });
  }
})
