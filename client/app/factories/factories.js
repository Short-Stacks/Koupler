angular.module('koupler.factories', [])

.factory('Activities', function() {
  var activities = [
                    {'name': 'Hiking'},
                    {'name': 'Dinner'},
                    {'name': 'Opera'},
                    {'name': 'Dancing'}, 
                    {'name': 'Music Show'},
                    {'name': 'Coffee'},
                    {'name': 'Swinging'},
                    {'name': 'Sight-Seeing'}
                  ];

  var getActivities = function() {
    return activities;
  };

  return {
    getActivities: getActivities
  };
})

.factory('AuthTokenFactory', function($window) {
  var key = 'JWT';

  var getToken = function() {
    return $window.localStorage.getItem(key);
  };

  var setToken = function(token) {
    if(token){
      $window.localStorage.setItem(key, token)
    } else {
      $window.localStorage.removeItem(key);
      console.log($window.localStorage.getItem(key));
    }
  };

  var isAuth = function() {
    console.log('in isAuth')
    return !!$window.localStorage.getItem(key);
  };

  return {
    getToken: getToken,
    setToken: setToken,
    isAuth: isAuth
  };
});
