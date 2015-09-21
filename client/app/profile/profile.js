angular.module('koupler.profile', [
  'ui.bootstrap'
  ])

.controller('ProfileCtrl', ['$scope', '$state', '$modal', '$http', 'Activities', 'AuthTokenFactory', 'Upload', '$window', function($scope, $state, $modal, $http, Activities, AuthTokenFactory, Upload, $window) {

  var vm = this;
  //placeholder for POST request until routeParam is set up
  vm.username = $state.params.username;

  $window.localStorage.setItem('Koup_user', vm.username);
  vm.activities = Activities.getActivities();
  
  vm.goToActivities = function() {
    $state.go('activities');
  };


  vm.profileData = {};

  // when true, hides the profile pic and replaced with uploaded pic
  vm.hideProfilePic = false;

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
        vm.userActivities = response.data[1];
      });

  };

  vm.addActivity = function(activity) {
    $http.post('/profile/' + vm.username + '/addActivity', activity);
  };

  vm.getProfileInfo();

  vm.showEditModal = function() {
    vm.activitiesToAdd = [];
    var editModal = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'app/profile/modal-editProfile.html',
      controller: 'ProfileCtrl',
    });
  };


  vm.submitProfileEdit = function(data) {
    $http.post('/profile/' + vm.username + '/edit', data)
      .then(function(response) {
        $state.reload();
      });
  };

  vm.uploadFiles = function(file) {
    vm.f = file;

    if (file && !file.$error) {
      vm.hideProfilePic = true;

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

  vm.chatInit = function(receiver) {
    if(!$scope.openConversation) {
      $scope.openConversation = true;
    }
    console.log($scope.openConversation);

  };

}]);

