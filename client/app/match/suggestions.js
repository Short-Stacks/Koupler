angular.module('koupler.suggestions', [])

.controller('SuggestionsCtrl', function($scope, $http, Activities, AuthTokenFactory) {

  var vm = this;

  vm.isReadOnly = true;
  vm.maxRating = 10;

});