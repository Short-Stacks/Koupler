angular.module("koupler").directive("navBar", ['$window', '$state', function($window, $state) {
  return {
    restrict: 'E',
    templateUrl: 'app/navbar/navbar.html',
    link: function(scope, elem, attrs) {
      /*
      The below methods are used to modify the navbar routes available to a
      specific user based on their privilege and current url path
      */

      //**"at" methods return true if the user is currently at that view
      scope.atProfileView = function() {
        var path = $state.current.name;
        if (path.match(/^profile/) !== null) {
          return true;
        }
        return false;
      };

      scope.atActivitiesView = function() {
        var path = $state.current.name;
        if (path.match(/^activities/) !== null) {
          return true;
        }
        return false;
      };

      scope.goToActivities = function() {
        $state.go('activities');
      };

      scope.goToProfile = function() {
        var username = $window.localStorage.getItem('Koup_user');
        $state.go('profile', {username: username});
      };

      //returns true if user is logged in to either profile or dash view
      scope.loggedIn = function() {
        return scope.atProfileView() || scope.atActivitiesView();
      };

    }
  };
}]);


