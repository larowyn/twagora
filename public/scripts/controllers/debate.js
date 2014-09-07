'use strict';

angular.module('twagoraApp')
	.controller('DebateCtrl', function ($rootScope, $scope, $routeParams, $firebase, $location, FBURL, simpleLogin, twitterService, $timeout) {

		var debateRef = new Firebase(FBURL + '/debates/' + $routeParams.debateId);
		var debateSync = $firebase(debateRef);
		$scope.debate = debateSync.$asObject();

		$scope.newMessage = '';

		$scope.actionOpened = false;

		$scope.messages = [];
		$scope.messagesFiltered = [];

		$scope.debate.$loaded().then(function (data) {
			if (!data.title) {
				$location.path('404');
			}
			$rootScope.$broadcast('debateLoaded');
		});

		var msgsSync = $firebase(debateRef.child('/messages'));
		$scope.messages = msgsSync.$asArray();

		function filterMsg() {
			var msgLst = $scope.messages;
			$scope.messagesFiltered = [];
			for (var i = 0; i < msgLst.length; i++) {
				if (msgLst[i].deleted == undefined)
					$scope.messagesFiltered.push(msgLst[i]);
			}
		}

		$scope.messages.$loaded().then(function () {
			filterMsg();
			$scope.messages.$watch(filterMsg);
		});

		$scope.sendMessage = function($event) {
			if ($event && ($event.which != 13 || $event.shiftKey)) return;
			if ($scope.newMessage.length == 0) return;
			if ($event) $event.preventDefault();

			$scope.newMessage = $scope.newMessage.split('\n');
			$scope.newMessage = $scope.newMessage.join('<br>');
			$scope.messages.$add({
				body: $scope.newMessage,
				displayName: $scope.user.displayName,
				username: $scope.user.username,
				user_id: $scope.user.id,
				date: new Date().getTime()
			});

			$scope.newMessage = '';
		};

		$scope.deleteMessage = function (message) {
			if (message.user_id != $rootScope.auth.user.id) return;

			message.deleted = true;
			$scope.messages.$save(message).then(function (ref) {
				// message deleted
			}, function (error) {
				// failed to remove message
			});
		}

		simpleLogin.getCurrentUser().then(function (user) {
			$scope.user = user;
		});

		$scope.login = function () {
			simpleLogin.login('twitter', function(err) {
				$scope.err = err? err + '' : null;
			});
		};

		$scope.intentUser = function (user_id) {
			window.open("https://twitter.com/intent/user?user_id=" + user_id, "_blank", "width=550px,height=420px,menubar=no,status=no");
		};

		$scope.intentTweetDebat = function () {
			window.open("https://twitter.com/intent/tweet?via=twagora&text=" + twitterService.rawURLEncode("Rejoignez le débat !") + "&url=" + encodeURIComponent('http://twagora.parseapp.com/#/debate/') + $scope.debate.$id, "_blank", "width=550px,height=420px,menubar=no,status=no");
		};

	})
	.controller('CreateDebateCtrl', function ($rootScope, $scope, $routeParams, $firebase, $location, FBURL, simpleLogin) {

		var debatesSync = $firebase(new Firebase(FBURL + '/debates'));
		var debates = debatesSync.$asArray();

		$scope.createDebate = function() {
			if ($scope.title.length == 0) return;
			if ($scope.description.length == 0) return;

			var obj = {
				title: $scope.title,
				description: $scope.description,
				username: $rootScope.auth.user.username,
				displayName: $rootScope.auth.user.displayName,
				user_id: $rootScope.auth.user.id,
				date: new Date().getTime()
			}
			if ($scope.tweet) {
				obj.tweet_url = $scope.tweet;
			}
			debates.$add(obj).then(function (ref) {
				$location.path('debate/' + ref.name());
			});
		};

	});
