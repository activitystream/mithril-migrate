'use strict';

// takes a component written for mithril@1.0 and a mithril@0.2.x instance
function migrate(m1component, m, m1) {
	if (migrate.m) m = migrate.m;
	if (migrate.m1) m1 = migrate.m1;

	function unmount(ctrl) {
		if (ctrl.el) {
			m1.mount(ctrl.el, null);
			ctrl.el = undefined;
		}
	}

	return {
		controller: function() {

			var ctrl = {
				el: undefined
			};
			ctrl.onunload = function () {
				unmount(ctrl);
			};
			ctrl.component = undefined;
			return ctrl;
		},

		view: function(ctrl) {
			var args = [].slice.call(arguments, 1);
			if (!ctrl.component) {
				ctrl.component = {
					view: function view() {
						return m1.apply(undefined, [m1component].concat(args));
					}
				};
			}
			return m('', {
				config: function(el, is_init, ctx) {
					if (!is_init) {
						ctrl.el = el;
						ctx.onunload = function () {
							unmount(ctrl);
						};
					}
					m1.mount(el, ctrl.component);
				}
			});
		}
	};
};

module.exports = migrate;