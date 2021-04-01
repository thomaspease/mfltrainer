class View {
	constructor(baseElementSelector) {
		this.root = document.querySelector(baseElementSelector);
		this.elements = {};
	}

	get exists() {
		return !!this.root;
	}
}


// FORMS

class FormView extends View {
	overrideSubmit(callback) {
		this.root.addEventListener('submit', (e) => {
			e.preventDefault();

			callback(this.getFormData());
		})
	}

	getFormData() {
		const inputs = Array.from(this.root.querySelectorAll('input'));
		const data = {};

		inputs.forEach(el => {
			// TODO suggestion from Heather: switch this to always use `name`. I'll have to check with Tom first, though (because it breaks existing code)
			const name = el.name ? el.name : el.id;

			// TODO design question: should we handle situations where there's multiple inputs with the same name? (turn it into an array? ignore them?)
			data[name] = el.value;
		})

		return data;
	}
}

class LoginFormView extends FormView {
	constructor() {
		super('.form--login')
	}
}


// GENERIC DOM MANIP

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

class DataParserView extends View {
	static get(input_name) {
		return JSON.parse(document.querySelector(`.js-value[name="${input_name}"]`).value)
	}
}


// SPECIFIC PAGES

class TrainingView extends View {
	constructor() {
		super('.card__exercise');

		this.elements.prompt = this.root.querySelector('.card-title');
	}

	get prompt() {
		return this.elements.prompt.innerText;
	}

	set prompt(value) {
		return this.elements.prompt.innerText = value;
	}
}
