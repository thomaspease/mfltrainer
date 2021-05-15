import * as controllers from './controllers.js';

(function() {
	// load controllers dynamically based on what the server-generated HTML requests
	Array.from(document.querySelectorAll('[data-controller]')).forEach(domElement => {
		const controllerClass = controllers[domElement.dataset['controller']];

		const controller = new controllerClass(domElement);

    domElement.controller = controller;

    if (domElement.dataset.exposeControllerAs) {
      const name = domElement.dataset.exposeControllerAs;
      const containing = domElement.parentNode.closest(`[data-controller][data-accept-child="${name}"]`);
      if (containing) {
        containing.controller.children[name] = controller;
      }
    }
	})
})()
