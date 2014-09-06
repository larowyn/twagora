'use strict';

angular.module('twagoraApp')
	.controller('DebateCtrl', function ($rootScope, $scope, $routeParams, $firebase, FBURL, simpleLogin) {

		var msgsSync = $firebase(new Firebase(FBURL + '/debates/' + $routeParams.debateId + '/messages'));
		console.log(msgsSync);
		$scope.messages = msgsSync.$asArray();
		console.log($scope.messages);

		$scope.sendMessage = function() {
			console.log('sendmessage');
			if ($scope.newMessage.length == 0) return;

			$scope.messages.$add({
				body: $scope.newMessage,
				from: $scope.user.username,
				user_id: $scope.user.id
			});

			$scope.newMessage = '';
		};

		simpleLogin.getCurrentUser().then(function (user) {
			console.log(user);
			$scope.user = user;
		});

		$scope.login = function () {
			simpleLogin.login('twitter', function(err) {
				$scope.err = err? err + '' : null;
			});
		};

	});
