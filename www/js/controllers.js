angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  /*
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
  */  
})


.controller('FriendsCtrl', function($scope, Profile) {
  $scope.friends = Profile.getFriends();
  console.log($scope.friends);
  
})

/*
.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})
*/

/*
// All this does is allow the message
// to be sent when you tap return
.directive('input', function($timeout) {
  return {
    restrict: 'E',
    scope: {
      'returnClose': '=',
      'onReturn': '&',
      'onFocus': '&',
      'onBlur': '&'
    },
    link: function(scope, element, attr) {
      element.bind('focus', function(e) {
        if (scope.onFocus) {
          $timeout(function() {
            scope.onFocus();
          });
        }
      });
      element.bind('blur', function(e) {
        if (scope.onBlur) {
          $timeout(function() {
            scope.onBlur();
          });
        }
      });
      element.bind('keydown', function(e) {
        if (e.which == 13) {
          if (scope.returnClose) element[0].blur();
          if (scope.onReturn) {
            $timeout(function() {
              scope.onReturn();
            });
          }
        }
      });
    }
  }
})
*/

.controller('ChatDetailCtrl', function($scope, $timeout, $ionicScrollDelegate, $stateParams, Profile, socket) {
  $scope.hideTime = true;
  $scope.myName = Profile.getProfile().name;

  var isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

  // send message function
  $scope.sendMessage = function() {
    var d = new Date();
    //d = d.toLocaleTimeString().replace(/:\d+ /, ' ');
    d = d.getTime();

    $scope.messages.push({
      name: $scope.myName,
      text: $scope.data.message,
      time: d
    });

    var data ={
      from: $scope.myName,
      to: $stateParams.friendName,
      message: $scope.data.message
    };
    socket.emit("chat", JSON.stringify(data));

    // clear input pane
    delete $scope.data.message;
    $ionicScrollDelegate.scrollBottom(true);
  };

  $scope.inputUp = function() {
    if (isIOS) $scope.data.keyboardHeight = 216;
    $timeout(function() {
      $ionicScrollDelegate.scrollBottom(true);
    }, 300);
  };

  $scope.inputDown = function() {
    if (isIOS) $scope.data.keyboardHeight = 0;
    $ionicScrollDelegate.resize();
  };

  $scope.closeKeyboard = function() {
    // cordova.plugins.Keyboard.close();
  };

  socket.on('chat', function (msg) {
    var d = new Date();
    d = d.getTime();
    var data = JSON.parse(msg);
    
    if (data.to === $scope.myName) {
      if(data.from === $stateParams.friendName){
      $scope.messages.push({
        name: data.from,
        text: data.message,
        time: d
      });
      $ionicScrollDelegate.scrollBottom(true);
    }
    }
  });

  
  $scope.data = {};
  $scope.messages = [];

  var fname = $stateParams.friendName;

     
  
  //Profile.socket.emit("join", fname);
  var room = Profile.getRoom();
  if (room!=""){
    socket.emit("leave", room);
  }
  socket.emit("join", fname);
  Profile.joinRoom(fname);
  
  Profile.getChats($scope.myName, fname, function(data){
    var d = new Date();
    d = d.getTime();
    $scope.messages.push({
      name: data.from,
      text: data.message,
      time: d 
    });
  });

})


.controller('AccountCtrl', function($scope,$state,Profile,socket) {
  $scope.signIn = function(user) {
    console.log('Sign-In', user);
    Profile.askProfile(user.username, function(){
      $state.go('tab.account-info');
      socket.emit('join',user.username);
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

