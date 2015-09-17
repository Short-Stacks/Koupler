angular.module('koupler.profile', [])

.controller('ProfileCtrl', function($scope, $location, $http, Activities, AuthTokenFactory) {

  var vm = this;

  vm.testUser = {
    username: 'testUser',
    contactInfo: {
      name1: 'Boozer',
      name2: 'Woof',
      email: 'woof@bark.com',
      phone: 7465746374
    },
    profilePic: 'http://www.qykapp.com/article/content/images/2015/06/dog-1-1.jpg',
    activities: ['eating human food', 'playing catch', 'pooping', 'hunting squirrels', 'getting into the trash', 'chasing cats', 'cuddling'],
    profileInfo: {
      'About Us': "We're a fun-loving couple of scruffy pups looking to go on a dog date."
    }
  }

  vm.goToActivities = function() {
    $location.path('/activities');
  };

  vm.profileData = {};

  vm.getProfileInfo = function () {
    var token = AuthTokenFactory.getToken();
    //GET request should respond with user's profile picture, interests, about, memories, etc.
    $http.get('/profile', {params: 
      {token: token}
    })
      .then(function(response) {
        if(response.data.isAuthorized) {
          vm.isAuthorized = true;
        }
        vm.profileData = response.data; //looks like [{about us: "", username: ""}] 
        console.log(vm.profileData);
      })
  };

  vm.getProfileInfo();

});