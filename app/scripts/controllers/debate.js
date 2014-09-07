'use strict';

angular.module('twagoraApp')
	.controller('DebateCtrl', function ($rootScope, $scope, $routeParams, $firebase, $location, FBURL, simpleLogin) {

		var debateRef = new Firebase(FBURL + '/debates/' + $routeParams.debateId);
		var debateSync = $firebase(debateRef);
		$scope.debate = debateSync.$asObject();

		$scope.newMessage = '';

		$scope.debate.$loaded().then(function (data) {
			if (!data.title) {
				$location.path('404');
			}
			$rootScope.$broadcast('debateLoaded');
		});

		var msgsSync = $firebase(debateRef.child('/messages'));
		$scope.messages = msgsSync.$asArray();

		$scope.sendMessage = function($event) {
			if ($event && ($event.which != 13 || $event.shiftKey)) return;
			if ($scope.newMessage.length == 0) return;
			$event.preventDefault();

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
			//if (message.user_id != $rootScope.auth.user.id) return;

			console.log(message);
			var msgSync = $firebase(debateRef.child('/messages/' + message.$id));
			msgSync.$remove();
			/*$scope.messages.$remove(message).then(function () {
				// message deleted
			}, function () {
				// failed to remove message
			});*/
		}

		var cla = '';
		$scope.computeClass = function (prev, curr) {
			if (prev && prev.user_id != curr.user_id)
				cla = (cla == 'msgDebateHandlerReverse') ? '' : 'msgDebateHandlerReverse';
			return (cla);
		}

		simpleLogin.getCurrentUser().then(function (user) {
			$scope.user = user;
		});

		$scope.login = function () {
			simpleLogin.login('twitter', function(err) {
				$scope.err = err? err + '' : null;
			});
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
