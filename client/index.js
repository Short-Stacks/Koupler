angular.module('koupler.main', [])

.controller('MainCtrl', ['$rootScope', '$scope', '$state', 'AuthTokenFactory', '$http', function($rootScope, $scope, $state, AuthTokenFactory, $http) {

  vm = this;

  vm.tabs = {
    'Profile': '/profile',
    'Activities': '/activities',
    'Matches': '/match'
  };

  vm.goToLink = function(link) {
    $state.go(link);
  };

  vm.getLoginUser = function() {
    var token = AuthTokenFactory.getToken();
    console.log(token);
    //GET request should respond with username
    $http.get('/main/')
      .then(function(response) {
        console.log("log in user:", response.data);
        $scope.loginUser = response.data;
        console.log('main ctrl res', response);
        console.log('main ctrl loginUser',$scope.loginUser);
      });
  }();
}]);

