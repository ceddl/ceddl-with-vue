
/*global app, Router */

(function (app, Router) {

	'use strict';

	var router = new Router();

	['all', 'active', 'completed', 'about'].forEach(function (visibility) {
		router.on(visibility, function () {
			app.visibility = visibility;
			if(visibility == 'about') {
				// Clean datalayer in re-initialize on page change.
				ceddl.initialize();
			}
		});
	});

	router.configure({
		notfound: function () {
			window.location.hash = '';
			app.visibility = 'all';
			// Clean datalayer in re-initialize on page change.
			ceddl.initialize();
		}
	});

	router.init('/');

})(app, Router);
