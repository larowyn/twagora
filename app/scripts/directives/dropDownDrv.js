'use strict';

angular.module('twagoraApp')
	.directive('taDropdown', function () {
		return ({
			restrict: 'A',
			link: function (scope, elem, attrs) {
				var open = false;
				var height = elem[0].offsetHeight;
				var box = angular.element(elem[0].children[0]);
				var button = angular.element(elem[0].children[1]);

				function showABitElem() {
					elem.css({
						'margin-top': -(height - 35) + 'px'
					});
					elem.click(showElem);
					elem.mouseleave(hideElem);
					box.css({'box-shadow': '0 2px 6px rgba(0, 0, 0, 0.5)'});
				}

				function showElem() {
					elem.css({'margin-top': 0});
					button.off('mouseenter', showABitElem).click(hideElem);
					elem.off('mouseleave', hideElem);
					button.addClass('debateDescToggleHide');
				}

				function hideElem() {
					elem.css({
						'margin-top': -(height - 15) + 'px'
					});
					elem.off('click', showElem);
					button.off('click', hideElem).mouseenter(showABitElem);
					box.css({'box-shadow': 'none'});
					button.removeClass('debateDescToggleHide');
				}

				hideElem();

			}
		});

	});