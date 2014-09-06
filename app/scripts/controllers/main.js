'use strict';

/**
 * @ngdoc function
 * @name twagoraApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the twagoraApp
 */
angular.module('twagoraApp')
	.controller('MainCtrl', function ($scope, $firebase, FBURL, simpleLogin) {

		var debatesSync = $firebase(new Firebase(FBURL + '/debates'));
		$scope.debates = debatesSync.$asArray();
		console.log($scope.debates);

		$scope.login = function(service) {
			simpleLogin.login(service, function(err) {
				$scope.err = err? err + '' : null;
			});
		};

		simpleLogin.getCurrentUser().then(function (user) {
			//console.log(user);
		});

	});
