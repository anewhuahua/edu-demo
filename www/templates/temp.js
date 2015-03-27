angular.module('ionicApp', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('eventmenu', {
      url: "/event",
      abstract: true,
      templateUrl: "event-menu.html"
    })
    .state('eventmenu.home', {
      url: "/home",
      views: {
        'menuContent' :{
          templateUrl: "home.html"
        }
      }
    })
  
  $urlRouterProvider.otherwise("/event/home");
})

.controller('MainCtrl', function($scope, $ionicSideMenuDelegate) {
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.$getByHandle('mainMenu').toggleLeft();
  };
  $scope.toggleMySecondMenuLeft = function() {
    $ionicSideMenuDelegate.$getByHandle('mySecondMenu').toggleLeft();
  };
  
});



<html ng-app="ionicApp">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width">
    
    <title>Ionic Side Menu Delegation</title>

    <link href="http://code.ionicframework.com/1.0.0-beta.4/css/ionic.css" rel="stylesheet">
    <script src="http://code.ionicframework.com/1.0.0-beta.4/js/ionic.bundle.js"></script>
  </head>
 
  <body>
    
    <div ng-controller="MainCtrl">       
      <ion-nav-view></ion-nav-view>
    </div>
    
    <script id="event-menu.html" type="text/ng-template">
      <ion-side-menus  delegate-handle="mainMenu">
        
        <ion-side-menu-content>
          <ion-nav-bar class="bar-positive">
            <ion-nav-back-button class="button-icon ion-arrow-left-c">
            </ion-nav-back-button>
          </ion-nav-bar>
          <ion-nav-buttons side="left">
            <button class="button button-icon button-clear ion-navicon" ng-click="toggleLeft()"> Toggle my first menu
            </button>
          </ion-nav-buttons>
          <ion-nav-view name="menuContent"></ion-nav-view>
        </ion-side-menu-content> 
        
        <ion-side-menu side="left">
          <ion-header-bar class="bar-assertive">
            <h1 class="title">Left Menu</h1>
          </ion-header-bar>
          <ion-content>
            <ul class="list">
              <a href="#/event/check-in" class="item">Check-in</a>
              <a href="#/event/attendees" class="item">Attendees</a>
            </ul>
          </ion-content>
        </ion-side-menu>
        
      </ion-side-menus>
    </script>
    
    <script id="home.html" type="text/ng-template">
      <ion-view title="Welcome">
        <ion-content padding="true" class="padding">
          <ion-side-menus delegate-handle="mySecondMenu">
            <ion-side-menu-content>
              <button class="button ion-navicon button-positive" ng-click="toggleMySecondMenuLeft()">
                Toggle My second Left Side Menu
              </button>
              <p>Swipe to the right to reveal the left menu.</p>
              <p>(On desktop click and drag from left to right)</p>
            </ion-side-menu-content>
            <ion-side-menu side="left">
              My second Left Menu!
          <ion-side-menu>
        </ion-content>
      </ion-view>
    </script>    
  </body>
</html>
