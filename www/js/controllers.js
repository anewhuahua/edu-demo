angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
  

  $scope.options = [
    { label: '英语', value: 'english' },
    { label: '数学', value: 'math' },
    { label: '音乐', value: 'music' },
  ];
  $scope.optionSelected= { label: '英语', value: 'english' };
  $scope.teachers = [{
    name: '丁老师',
    face: 'http://115.28.11.51:8080/ali-touxiang-030.jpg',
    from: 'math'
  },
  {
    name: '王老师',
    face: 'http://115.28.11.51:8080/ali-touxiang-032.jpg',
    from: 'english'
  },
  {
    name: '邵老师',
    face: 'http://115.28.11.51:8080/ali-touxiang-032.jpg',
    from: 'music'
  },
  {
    name: '沈老师',
    face: 'http://115.28.11.51:8080/ali-touxiang-032.jpg',
    from: 'english'
  },
  {
    name: '俞老师',
    face: 'http://115.28.11.51:8080/ali-touxiang-035.jpg',
    from: 'english'
  }];



})



.controller('ChatsCtrl', function($scope, Chats) {
  /*
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
  */  
})


.controller('FriendsCtrl', function($scope, $interval, Profile, socket) {
  socket.on('query', function (msg) {
    var data = JSON.parse(msg);
    for (var i=0;i<$scope.friends.length;i++){
      if($scope.friends[i].name == data.name){
        if(data.live=="false"){
          $scope.friends[i].offline=false;
          $scope.friends[i].face='http://115.28.11.51:8080/lightgray.jpg';
          //$scope.friends[i].name.replace(/(在线)/,'');
          console.log("not found");
        } else {
          var facenum = $scope.friends[i].time%50+11;
          $scope.friends[i].offline=true;
          $scope.friends[i].face='http://115.28.11.51:8080/ali-touxiang-0' + facenum + '.jpg';
          console.log($scope.friends[i].face);
          //$scope.friends[i].name+='(在线)';
          console.log("found");
        }
      }
    }
    //$scope.apply();
  });

  $interval( function(){ 
    for (var i=0;i<$scope.friends.length;i++){
        socket.emit("query", $scope.friends[i].name)   
        //console.log("hello tyson");
    } 
   }, 1000);

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

.controller('ChatDetailCtrl', function($scope, $timeout, $ionicScrollDelegate, $stateParams, Profile, socket,$http) {

  if($stateParams.friendName){

  $scope.hideTime = true;
  $scope.myName = Profile.getProfile().name;

  var isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

  // send message function
  $scope.sendMessage = function() {
    if ($scope.data.message && $scope.data.message!=""){
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

    var req = {
      method: 'POST',
      url: 'http://115.28.11.51:8080/api/chats/'+$scope.myName+'/'+$stateParams.friendName+'/',
      headers: {
        'Content-Type':'application/json' 
      },
      data: { "chats": [$scope.data.message] }
    }
    $http(req)
     .success(function(){
        console.log("tyson chat insert okay"); 
     })
     .error(function(){
        console.log("tyson chat insert error");
     });
    
    // clear input pane
    delete $scope.data.message;
    $ionicScrollDelegate.scrollBottom(true);
    }
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
    d = new Date(data.time);
    d = d.getTime();
    $scope.messages.push({
      name: data.from,
      text: data.message,
      time: d 
    });
  });

  $timeout(function() {
      $ionicScrollDelegate.scrollBottom(true);
  }, 700);
  }
})

.controller('AccountCtrl', function($scope,$state,Profile,socket) {
  $scope.signIn = function(user) {
    console.log('Sign-In', user.username);
    Profile.askProfile(user.username, function(){
      $state.go('tab.account-info');
      socket.emit('join', user.username);
      socket.emit('login', user.username);
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

