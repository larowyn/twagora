'use strict';

angular.module('twagoraApp')
	.directive('taDebateMsg', function ($timeout) {
		return ({
			restrict: 'A',
			link: function (scope, elem, attrs) {

				var id = attrs.taDebateMsg;
				var prev = id - 1;
				var prevIsReverse = $($('.msgDebateHandler')[prev]).hasClass('msgDebateHandlerReverse');
				var currentUserId = scope.messagesFiltered[id].user_id;
				if (prev >= 0) {
					var prevUserId = scope.messagesFiltered[prev].user_id;
					if ((prevUserId != currentUserId && !prevIsReverse) || (prevUserId == currentUserId && prevIsReverse))
						elem.addClass('msgDebateHandlerReverse');
				}
			}
		});

	});