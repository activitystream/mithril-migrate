'use strict';

var m1 = require('mithril');


var unmount = function unmount(ctrl) {
	if (ctrl.el) {
		m.mount(ctrl.el, null);
		ctrl.el = undefined;
	}
};

// takes a component written for mithril@1.0 and a mithril@0.2.x instance
function wrapComponent(m1component, m) {
	return {
		controller: function controller() {
			var ctrl = {
				el: undefined
			};
			ctrl.onunload = function () {
				unmount(ctrl);
			};

            ctrl.margs = [m1component].concat([].slice.call(arguments));
			ctrl.component = undefined;
			return ctrl;
		},

		view: function view(ctrl) {
			if (!ctrl.component) {
				ctrl.component = {
					view: function view() {
						return m.apply(undefined, ctrl.margs);
					}
				};
			}
			return m('', {
				config: function config(el, is_init, ctx) {
					if (is_init) {
						ctrl.el = el;
						ctx.onunload = function () {
							return unmount(ctrl);
						};
					}
					m.mount(el, ctrl.component);
				}
			});
		}
	};
};

module.exports = wrapComponent;