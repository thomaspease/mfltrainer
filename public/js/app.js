import * as controllers from './controllers.js';

(function() {
	// load controllers dynamically based on what the server-generated HTML requests
	Array.from(document.querySelectorAll('[data-controller]')).forEach(domElement => {
		const controllerClass = controllers[domElement.dataset['controller']];

		new controllerClass(domElement);
	})
})()
