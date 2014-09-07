'use strict';

angular.module('twagoraApp')
	.controller('HeaderCtrl', function ($rootScope, $scope, simpleLogin) {

		$scope.login = function() {
			simpleLogin.login('twitter', function(err) {
				$scope.err = err? err + '' : null;
			});
			return (true);
		};

		$scope.logout = function() {
			console.log("logout");
			simpleLogin.logout();
			return (true);
		};

	});
