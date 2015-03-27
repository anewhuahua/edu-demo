<html ng-app="ionicApp">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width">
    
    <title>Tabs Example</title>

    <link href="http://code.ionicframework.com/1.0.0-beta.14/css/ionic.min.css" rel="stylesheet">
    <script src="http://code.ionicframework.com/1.0.0-beta.14/js/ionic.bundle.min.js"></script>
  </head>

  <body>
    
    <ion-side-menus>
        
        <ion-side-menu-content ng-controller="NavCtrl">
          <ion-nav-bar class="bar-positive">
            <ion-nav-back-button class="button-icon ion-arrow-left-c">
            </ion-nav-back-button>
          
            <ion-nav-buttons side="left">
              <button class="button button-icon button-clear ion-navicon" ng-click="showMenu()">
              </button>
            </ion-nav-buttons>

            <ion-nav-buttons side="right">
              <button class="button button-icon button-clear ion-ios7-gear" ng-click="showRightMenu()">
              </button>
            </ion-nav-buttons>
          </ion-nav-bar>
          <ion-nav-view animation="slide-left-right"></ion-nav-view>
        </ion-side-menu-content> 
        
        <ion-side-menu side="left">
          <ion-header-bar class="bar bar-header bar-assertive">
            <h1 class="title">Left Menu</h1>
          </ion-header-bar>
          <ion-content has-header="true">
            <ul class="list">
              <li>
                <a class="item" menu-close nav-clear href="#/tab/home">Home</a>
              </li>
              <li>
                <a class="item" menu-close href="#/tab/facts">Facts</a>
              </li>
              <li>
                <a class="item" menu-close href="#/tab/facts2">More Facts</a>
              </li>
            </ul>
          </ion-content>
        </ion-side-menu>
      
        <ion-side-menu side="right">
          <ion-header-bar class="bar bar-header bar-dark">
            <h1 class="title">Right Menu</h1>
          </ion-header-bar>
          <ion-content>
            <ul class="list">
              <li>
                <a class="item" menu-close nav-clear href="#/search">Search</a>
              </li>
              <li>
                <a class="item" menu-close nav-clear href="#/settings">Settings</a>
              </li>
            </ul>
          </ion-content>
        </ion-side-menu>
        
      </ion-side-menus>



    <script id="tabs.html" type="text/ng-template">
      <ion-tabs class="tabs-icon-top tabs-positive">

        <ion-tab title="Home" icon="ion-home" href="#/tab/home">
          <ion-nav-view name="home-tab"></ion-nav-view>
        </ion-tab>

        <ion-tab title="About" icon="ion-ios7-information" href="#/tab/about">
          <ion-nav-view name="about-tab"></ion-nav-view>
        </ion-tab>

        <ion-tab title="Contact" icon="ion-ios7-world" ui-sref="tabs.contact">
          <ion-nav-view name="contact-tab"></ion-nav-view>
        </ion-tab>

      </ion-tabs>
    </script>

    <script id="home.html" type="text/ng-template">
      <ion-view title="Home">
        <ion-content>
          <p>Example of Ionic tabs. Navigate to each tab, and
          navigate to child views of each tab and notice how
          each tab has its own navigation history.</p>
          <p>
            <a class="button icon icon-right ion-chevron-right" href="#/tab/facts">Scientific Facts</a>
          </p>
        </ion-content>
      </ion-view>
    </script>

    <script id="facts.html" type="text/ng-template">
      
      <ion-view title="Facts">
        <ion-content>
          <p>Banging your head against a wall uses 150 calories an hour.</p>
          <p>Dogs have four toes on their hind feet, and five on their front feet.</p>
          <p>The ant can lift 50 times its own weight, can pull 30 times its own weight and always falls over on its right side when intoxicated.</p>
          <p>A cockroach will live nine days without it's head, before it starves to death.</p>
          <p>Polar bears are left handed.</p>
          <p>
            <a class="button icon ion-home" href="#/tab/home"> Home</a>
            <a class="button icon icon-right ion-chevron-right" href="#/tab/facts2">More Facts</a>
          </p>
            
        </ion-content>
      </ion-view>
    </script>

    <script id="facts2.html" type="text/ng-template">
      <ion-view title="Also Factual">
        <ion-content>
          <p>111,111,111 x 111,111,111 = 12,345,678,987,654,321</p>
          <p>1 in every 4 Americans has appeared on T.V.</p>
          <p>11% of the world is left-handed.</p>
          <p>1 in 8 Americans has worked at a McDonalds restaurant.</p>
          <p>$283,200 is the absolute highest amount of money you can win on Jeopardy.</p>
          <p>101 Dalmatians, Peter Pan, Lady and the Tramp, and Mulan are the only Disney cartoons where both parents are present and don't die throughout the movie.</p>
          <p>
            <a class="button icon ion-home" href="#/tab/home"> Home</a>
            <a class="button icon ion-chevron-left" href="#/tab/facts"> Scientific Facts</a>
          </p>
        </ion-content>
      </ion-view>
    </script>

    <script id="about.html" type="text/ng-template">
      <ion-view title="About">
        <ion-content>
          <h3>Create hybrid mobile apps with the web technologies you love.</h3>
          <p>Free and open source, Ionic offers a library of mobile-optimized HTML, CSS and JS components for building highly interactive apps.</p>
          <p>Built with Sass and optimized for AngularJS.</p>
          <p>
            <a class="button icon icon-right ion-chevron-right" href="#/tab/navstack">Tabs Nav Stack</a>
          </p>
        </ion-content>
      </ion-view>
    </script>

    <script id="nav-stack.html" type="text/ng-template">
      <ion-view title="Tab Nav Stack">
        <ion-content>
          <p><img src="http://ionicframework.com/img/diagrams/tabs-nav-stack.png" style="width:100%"></p>
        </ion-content>
      </ion-view>
    </script>

    <script id="contact.html" type="text/ng-template">
      <ion-view title="Contact">
        <ion-content>
          <p>@IonicFramework</p>
          <p>@DriftyCo</p>
        </ion-content>
      </ion-view>
    </script>
    
    <script id="settings.html" type="text/ng-template">
      <ion-view title="Settings">
        <ion-content>
          Settings page
        </ion-content>
      </ion-view>
    </script>
    
    <script id="search.html" type="text/ng-template">
      <ion-view title="Search">
        <ion-content>
          Search page
        </ion-content>
      </ion-view>
    </script>

  </body>
</html>



angular.module('ionicApp', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('search', {
      url: '/search',
      templateUrl: 'search.html'
    })
    .state('settings', {
      url: '/settings',
      templateUrl: 'settings.html'
    })
    .state('tabs', {
      url: "/tab",
      abstract: true,
      templateUrl: "tabs.html"
    })
    .state('tabs.home', {
      url: "/home",
      views: {
        'home-tab': {
          templateUrl: "home.html",
          controller: 'HomeTabCtrl'
        }
      }
    })
    .state('tabs.facts', {
      url: "/facts",
      views: {
        'home-tab': {
          templateUrl: "facts.html"
        }
      }
    })
    .state('tabs.facts2', {
      url: "/facts2",
      views: {
        'home-tab': {
          templateUrl: "facts2.html"
        }
      }
    })
    .state('tabs.about', {
      url: "/about",
      views: {
        'about-tab': {
          templateUrl: "about.html"
        }
      }
    })
    .state('tabs.navstack', {
      url: "/navstack",
      views: {
        'about-tab': {
          templateUrl: "nav-stack.html"
        }
      }
    })
    .state('tabs.contact', {
      url: "/contact",
      views: {
        'contact-tab': {
          templateUrl: "contact.html"
        }
      }
    });


   $urlRouterProvider.otherwise("/tab/home");

})
.controller('NavCtrl', function($scope, $ionicSideMenuDelegate) {
  $scope.showMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
  $scope.showRightMenu = function () {
    $ionicSideMenuDelegate.toggleRight();
  };
})
.controller('HomeTabCtrl', function($scope) {
});
