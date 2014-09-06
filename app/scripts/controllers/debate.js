'use strict';

angular.module('twagoraApp')
	.controller('DebateCtrl', function ($rootScope, $scope, $routeParams, $firebase, $location, FBURL, simpleLogin) {

		var debateRef = new Firebase(FBURL + '/debates/' + $routeParams.debateId);
		var debateSync = $firebase(debateRef);
		$scope.debate = debateSync.$asObject();

		$scope.debate.$loaded().then(function (data) {
			if (!data.title) {
				$location.path('404');
			}
			$rootScope.$broadcast('debateLoaded');
		});

		var msgsSync = $firebase(debateRef.child('/messages'));
		$scope.messages = msgsSync.$asArray();

		$scope.sendMessage = function() {
			if ($scope.newMessage.length == 0) return;

			$scope.messages.$add({
				body: $scope.newMessage,
				displayName: $scope.user.displayName,
				username: $scope.user.username,
				user_id: $scope.user.id,
				date: new Date().getTime()
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

	})
	.controller('CreateDebateCtrl', function ($rootScope, $scope, $routeParams, $firebase, FBURL, simpleLogin) {

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
			debates.$add(obj);

			$scope.title = '';
			$scope.description = '';
			$scope.tweet = '';
		};



	});
