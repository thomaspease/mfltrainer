class View {
	constructor(baseElementSelector) {
		this.element = document.querySelector(baseElementSelector);

	}

	get exists() {
		return !!this.element;
	}
}

class FormView extends View {
	overrideSubmit(callback) {
		this.element.addEventListener('submit', (e) => {
			callback(e);
		})
	}
}

class LoginFormView extends FormView {
	constructor() {
		super('.form--login')
	}
}


class AlertView extends View {
	static hide() {
		const el = document.querySelector('.alert');
		if (el) el.parentElement.removeChild(el);
	}

	// type is 'success' or 'error'
	static show(type, msg) {
		this.hide();
		const markup = `<div class="alert alert--${type}">${msg}</div>`;
		document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
		window.setTimeout(() => { this.hideAlert() }, 3000);
	}
}
