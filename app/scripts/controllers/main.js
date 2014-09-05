'use strict';

/**
 * @ngdoc function
 * @name twagoraApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the twagoraApp
 */
angular.module('twagoraApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
