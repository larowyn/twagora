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
      .otherwise({
        redirectTo: '/'
      });
  });