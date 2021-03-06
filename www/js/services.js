angular.module('starter.services', ['btford.socket-io'])

.factory('Profile', function($http, socket) {
  var room="";
  var url="115.28.11.51";
  //var url="10.0.2.2";
  var name="";
  var seed = function() {
    return Math.floor((Math.random()*(99-10) + 10));
  };
  //var seed = Math.floor((Math.random()*(99-10) + 10));
  //var seed = "12";
  //var face = 'http://localhost:8080/ali-touxiang-0'+ seed + '.jpg'
  var face = "";
  var friends = [];

  return  {
    getRoom: function(){
      return room;
    },
    joinRoom: function(r) {
      room = r;
    },
    askProfile: function(n, cb){
      // ask name
      $http.get("http://"+ url  + ":8080/api/users/"+n)
        .success(function(data) {
          if(data && data.name){
            console.log(data.name);
            name = data.name;
            //face = 'http://' + url +':8080/lightgray.jpg';
            face = 'http://' + url +':8080/ali-touxiang-0'+ seed() + '.jpg'
          } else {
            console.log("can't find user");
          }
        })
        .error(function(data) {
          console.log("ERROR");
        });
      
      if (name!=""){
        cb();
      }
    },
    getFriends: function() {
      friends = [];
      if (name=="")console.log("no name found");
      $http.get("http://" + url + ":8080/api/users/"+name+"/friends")
        .success(function(data) {
          if(data){
            console.log(data.length);
            console.log(data);
            for (var i=0;i<data.length;i++) {
              //console.log(data[i].friend);
              //console.log(name);
              var friendName = data[i].friend;
            
              var fr = {
                name: friendName,  
                face:'http://' +  url + ':8080/lightgray.jpg',
                time: 0
              };
              console.log(friendName);
              $http.get("http://" + url + ":8080/api/chats/"+ name +"/"+ friendName +"/last")
                .success(function(d){
                  console.log(d);
                  if(d) {
                    console.log(d.friend);
                    for (var j=0;j<friends.length;j++){
                      var tfr = friends[j];
                      if(tfr.name == d.friend) {
                        tfr.message = d.message;
                        tfr.time = d.time;
                      }
                    }
                    /* 
                    friends.push({
                      name:d.friend,
                      face:'http://' +  url + ':8080/ali-touxiang-0'+ seed() + '.jpg',
                      message: d.message,
                      time: d.time
                    });*/
                  }
                });
              friends.push(fr);
            }
          } else {
            console.log("can't find friends");
            return [];
          }
        })
        .error(function(data) {
          console.log("ERROR");
          return [];
        });

        //$http.get("http://localhost:8080/api/chats/"+ name + "/" + temp[i] + "/last")
        //friends.push({name:data[i].friend, face:'http://localhost:8080/ali-touxiang-0'+ seed() + '.jpg'});
        return friends;
    },
    getProfile: function() {
      return {name: name, face: face};
    },

    getChats: function(n1, n2, cb) {
      if (name=="")console.log("no name found");
      $http.get("http://" + url + ":8080/api/chats/"+ n1 + "/" + n2)
        .success(function(data) {
          if(data) {
            for (var i=0;i<data.length;i++){
              cb(data[i]);
            }
          }
        })
        .error(function(data) {
          console.log("ERROR");
        });
      $http.get("http://" + url + ":8080/api/chats/"+ n2 + "/" + n1)
        .success(function(data) {
          if(data) {
            for (var i=0;i<data.length;i++){
              cb(data[i]);
            }
          }
        })
        .error(function(data) {
        });
    }

  };
})


.factory('socket', function (socketFactory) {
  var url="115.28.11.51";
  //var url="10.0.2.2";
  //console.log("tyson");
  var myIoSocket = io.connect('http://'+url+':3000');
  console.log(myIoSocket);
  mySocket = socketFactory({
    ioSocket: myIoSocket
  });
  return mySocket;
});
