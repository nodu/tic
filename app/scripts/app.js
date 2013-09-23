'use strict';

window.app = angular.module('TicketyApp', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/splash.html',
        controller: 'SplashCtrl'
      })
       .when('/play', {
        templateUrl: 'views/play.html',
        controller: 'MainCtrl'
      })
      .when('/howTo', {
        templateUrl: 'views/howTo.html',
        controller: 'HowToCtrl'
      })
      .when('/waiting', {
        templateUrl: 'views/waiting.html',
        controller: 'WaitingCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });


