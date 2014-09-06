'use strict';

/**
 * @ngdoc overview
 * @name twagoraApp
 * @description
 * # twagoraApp
 *
 * Main module of the application.
 */
angular
  .module('twagoraApp', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'angularfire.login'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/login', {
        authRequired: false, // if true, must log in before viewing this page
        templateUrl: 'views/login.html',
        controller: 'LoginController'
      })
      .when('/debate/:debateId', {
        templateUrl: 'views/debate.html',
        controller: 'DebateCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .service('ParseService', [function() {
    var app_id = "nyxALhhh9KSF7CrbV5GXkllWzCJ2Tzr6qaPNUgDd";
    var js_key = "0FSd3rWYPvjU7IjBoqtybqcOkQd3l9IRIJGLfLvN";
    Parse.initialize(app_id, js_key);
  }]);
