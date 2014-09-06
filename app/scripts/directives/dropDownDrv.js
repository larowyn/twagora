'use strict';

angular.module('twagoraApp')
	.directive('taDropdown', function () {
		return ({
			restrict: 'A',
			link: function (scope, elem, attrs) {
				var height = elem[0].offsetHeight;
				var box = angular.element(elem.children('.debateDesc')[0]);
				var button = angular.element(elem.children('.debateDescToggle'));

				function showABitElem() {
					elem.css({
						'margin-top': -(height - 35) + 'px',
						'cursor': 'pointer'
					}).click(showElem).mouseleave(hideElem);
					box.css({'box-shadow': '0 2px 6px rgba(0, 0, 0, 0.5)'});
				}

				function showElem() {
					elem.css({
						'margin-top': 0,
						'cursor': 'default'
					}).off('mouseleave', hideElem);
					button.off('mouseenter', showABitElem).click(hideElem).addClass('debateDescToggleHide');
				}

				function hideElem() {
					elem.css({
						'margin-top': -(height - 15) + 'px',
						'cursor': 'default'
					}).off('click', showElem);
					box.css({'box-shadow': 'none'});
					button.off('click', hideElem).mouseenter(showABitElem).removeClass('debateDescToggleHide');
				}

				hideElem();

			}
		});

	});