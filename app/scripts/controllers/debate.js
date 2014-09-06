'use strict';

angular.module('twagoraApp')
	.controller('DebateCtrl', function ($rootScope, $scope, $routeParams, $firebase, FBURL) {

		/*var roomSync = $firebase(chatRoom);
		console.log(roomSync);
		$scope.roomInfo = roomSync.$asObject();

		console.log($scope.roomInfo);*/

		console.log($firebase(new Firebase("https://twagora.firebaseio.com/debates/test/messages")));

		var chatRoom = new Firebase(FBURL + '/debates/' + $routeParams.roomid);
		//var msgsSync = $firebase(chatRoom.child('messages'));
		console.log(FBURL + '/debates/' + $routeParams.debateId + '/messages');
		var msgsSync = $firebase(new Firebase(FBURL + '/debates/' + $routeParams.debateId));
		msgsSync.$on('loaded', function (data) { console.log(data);$scope.messages = data.messages;})
		console.log(msgsSync);
		//$scope.messages = msgsSync.messages;
		//$scope.chatMessages = msgsSync.$asArray();

		$scope.sendMessage = function() {
			console.log('sendmessage');
			if ($scope.newMessage.length == 0) return;

			msgsSync.$add({
				message: $scope.newMessage,
			});

			$scope.newMessage = '';
		};

	});
