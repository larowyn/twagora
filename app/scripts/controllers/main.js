'use strict';

/**
 * @ngdoc function
 * @name twagoraApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the twagoraApp
 */
angular.module('twagoraApp')
	.controller('MainCtrl', function ($scope, simpleLogin) {

		$scope.login = function(service) {
			simpleLogin.login(service, function(err) {
				$scope.err = err? err + '' : null;
			});
		};

		simpleLogin.getCurrentUser().then(function (user) {
			console.log(user);
		});

	});
