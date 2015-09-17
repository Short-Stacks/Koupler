angular.module('koupler', [
  'koupler.main',
  'koupler.factories',
  'koupler.activities',
  'koupler.auth',
  'koupler.match',
  'koupler.profile',
  'ngRoute',
  'ui.router',
  'ui.bootstrap'
])
.config(function($stateProvider, $urlRouterProvider, $routeProvider, $httpProvider) {
  
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      templateUrl: 'app/auth/homepage.html',
      url:'/',
      controller: 'AuthCtrl'
    })
    .state('profile', {
      url:'/profile',
      controller: 'ProfileCtrl',
      views: {
        '': {
          templateUrl:'app/profile/profile.html'
        },
        'profileInfo@profile': {
          templateUrl:'app/profile/partial-profileInfo.html'
        },
        'memories@profile': {
          templateUrl:'app/profile/partial-memories.html'
        }
      },
      authenticate: true,
    })
    .state('activities', {
      url:'/activities',
      views: {
        '': {
          templateUrl: 'app/activityPickerCtrl/activityPicker.html',
        },
        'activities@activities': {
          templateUrl: 'app/activityPickerCtrl/partial-activities.html'
        },
        'match@activities': {
          templateUrl: 'app/match/match.html'
        }
      },
      controller: 'ActivityPickerCtrl',
      authenticate: true,
    })
    // .state('match', {
    //   templateUrl: 'app/match/match.html',
    //   // url: '/match',
    //   controller: 'MatchCtrl',
    //   authenticate: true,
    // })
    // .state('publicProfile', {
    //   templateUrl: 'app/profile/publicProfile',
    //   url: '/profile/public:username',
    //   controller: 'PublicProfileCtrl',
    // })


  // $routeProvider
  //   .when('/', {
  //     templateUrl: 'app/auth/homepage.html',
  //     controller: 'AuthCtrl'
  //   })
  //   .when('/activities', {
  //     templateUrl: 'app/activityPickerCtrl/activityPicker.html',
  //     controller: 'ActivityPickerCtrl',
  //     authenticate: true,
  //   })
  //   .when('/match', {
  //     templateUrl: 'app/activityPickerCtrl/match.html',
  //     controller: 'CouplesCtrl',
  //     authenticate: true,
  //   })
  //   .otherwise({
  //     redirectTo: '/'
  //   });

    // We add our $httpInterceptor into the array
    // of interceptors. Think of it like middleware for your ajax calls
    $httpProvider.interceptors.push('AttachTokens');
})
.factory('AttachTokens', ['$window', function($window) {
  // this is an $httpInterceptor
  // its job is to stop all out going request
  // then look in local storage and find the user's token
  // then add it to the header so the server can validate the request
  var attach = {
    request: function(object) {
      var jwt = $window.localStorage.getItem('com.fudWize');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
}])
.run(function($rootScope, $state, $location, $window, AuthTokenFactory) {
  //since routing is based on state (ui.router), the $rootScope needs to check for
  //a state change rather than a route change in order to check authentication
  $rootScope.$on('$stateChangeStart', function(evt, next, current) {

    if (!AuthTokenFactory.isAuth()) {
      $location.path('/');
    }
  });
});

