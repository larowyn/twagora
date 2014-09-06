'use strict';

angular.module('twagoraApp')
	.directive('taDropdown', function () {
		return ({
			restrict: 'A',
			link: function (scope, elem, attrs) {
				var height = elem[0].offsetHeight;
				console.log(elem);
				angular.element(elem[0].children[0]).css({'box-shadow': 'none'});
				elem.css({
					'margin-top': -(height - 15) + 'px)'
				});
			}
		});

	});