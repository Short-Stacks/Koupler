angular.module('koupler.factories', [])

.factory('Activities', function() {
  var activities = [
                    {'name': 'Hiking'},
                    {'name': 'Dinner'},
                    {'name': 'Opera'},
                    {'name': 'Dancing'}, 
                    {'name': 'Live Music'},
                    {'name': 'Coffee'},
                    {'name': 'Sight-Seeing'},
                    {'name': 'Doggy Date'}
                  ];

  var getActivities = function() {
    return activities;
  };

  return {
    getActivities: getActivities
  };
})

.factory('AuthTokenFactory',['$window', function($window) {
  var key = 'JWT';

  var getToken = function() {
    return $window.localStorage.getItem(key);
  };

  var setToken = function(token) {
    if(token){
      $window.localStorage.setItem(key, token);
    } else {
      $window.localStorage.removeItem(key);
      console.log($window.localStorage.getItem(key));
    }
  };

  var isAuth = function() {
    console.log('in isAuth');
    return !!$window.localStorage.getItem(key);
  };

  return {
    getToken: getToken,
    setToken: setToken,
    isAuth: isAuth
  };



}])

.factory('socket', ['$rootScope', function ($rootScope) {
  var socket = io.connect();
  return {
    on: function (eventName, callback) {
      function wrapper() {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      }

      socket.on(eventName, wrapper);

      return function () {
        socket.removeListener(eventName, wrapper);
      };
    },

    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if(callback) {
            callback.apply(socket, args);
          }
        });
      });
    }
  };

}]);
