angular.module('koupler.activities', [])

.controller('ActivityPickerCtrl', function($scope, $location, $http, Activities, AuthTokenFactory) {
  
  vm = this;

  vm.activities = Activities.getActivities();

  vm.postActivity = function (activity) {
    var token = AuthTokenFactory.getToken();

    $http.post('/activities/match', {activity: activity, token: token})
      .then(function(response) {
        console.log('clicked');
        vm.matched = true;
      });
  };

  vm.matches = [{
    username: 'narf',
    firstName1: 'pinky',
    firstName2: 'the brain',
    profilePic: 'http://vignette2.wikia.nocookie.net/looneytunes/images/8/86/Pinky_%26_The_Brain_Wallpaper.jpg/revision/latest?cb=20121124222722',
    activities: ['taking over the world', 'narf!'],
    profileInfo: {
      'About Us': 'We like to do the same thing we do every night ... try to take over the world!'
    }
  }]
});
