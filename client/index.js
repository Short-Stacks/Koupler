angular.module('koupler.main', [])

.controller('MainCtrl', function($rootScope, $scope, $state) {
   
  vm = this;

  vm.tabs = {
    'Profile': '/profile',
    'Activities': '/activities',
    'Matches': '/match'
  }

  vm.goToLink = function(link) {
    $location.path(link);
  } 
  
});