'use strict';

angular.module('twagoraApp')
	.controller('DebateCtrl', function ($rootScope, $scope, $routeParams, $firebase, FBURL) {

		var msgsSync = $firebase(new Firebase(FBURL + '/debates/' + $routeParams.debateId + '/messages'));
		console.log(msgsSync);
		$scope.messages = msgsSync.$asArray();
		console.log($scope.messages);

		$scope.sendMessage = function() {
			console.log('sendmessage');
			if ($scope.newMessage.length == 0) return;

			$scope.messages.$add({
				body: $scope.newMessage,
				from: "anonymous"
			});

			$scope.newMessage = '';
		};

	});
