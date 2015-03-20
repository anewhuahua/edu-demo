angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})


.controller('FriendsCtrl', function($scope, Profile) {
  $scope.friends = Profile.getFriends();
  console.log($scope.friends);
  //console.log($scope.friends);
})

/*
.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})
*/

.controller('ChatDetailCtrl', function($scope, $stateParams) {
})

.controller('AccountCtrl', function($scope,$state,Profile) {
  $scope.signIn = function(user) {
    console.log('Sign-In', user);
    Profile.askProfile(user.username, function(){
      $state.go('tab.account-info');
    });
  };
})
.controller('AccountInfoCtrl', function($scope,$ionicViewService, Profile) {
  $scope.user = Profile.getProfile();
  // doesn't work, why?
  $ionicViewService.nextViewOptions({
   disableBack: true
  });
});

