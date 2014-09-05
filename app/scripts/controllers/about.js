'use strict';

/**
 * @ngdoc function
 * @name twagoraApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the twagoraApp
 */
angular.module('twagoraApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
