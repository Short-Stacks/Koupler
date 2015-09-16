// This controller is responsible for client side authentication in the 
//signup/signin form using the injected AuthTokenFactory service. 
angular.module('koupler.auth', [])

.controller('AuthCtrl', function ($scope, $http, $window, $location, AuthTokenFactory){
      
  var user = {};
  //To Do add post request handlers to factories.js 
  $scope.signin = function() {
    $http.post('/couples/signin', {
        username: $scope.usernameSignin, 
        password: $scope.passwordSignin
      })
      .then(function (response) {
        AuthTokenFactory.setToken(response.data.token);
        $location.path('/profile');
      }, 
      function(err){
        console.log(err);
      });
  };

  $scope.signup = function() {
    $http.post('/couples/signup', {
        username: $scope.usernameSignup, 
        password: $scope.passwordSignup,
        firstName1: $scope.firstName1Signup,
        lastName1: $scope.lastName1Signup,
        firstName2: $scope.firstName2Signup,
        lastName2: $scope.lastName2Signup,
        email: $scope.emailSignup,
        phoneNumber: $scope.phoneNumberSignup
      })
      .then(function(response) {
        AuthTokenFactory.setToken(response.data.token);
        $location.path('/profile');
      }, 
      function(err){
        console.log(err);
      });
  };

  $scope.signout = function() {
    AuthTokenFactory.setToken();
    $location.path('/');
  };

});