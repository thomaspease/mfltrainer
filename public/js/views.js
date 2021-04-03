import { diffWords} from 'diff'

class View {
	constructor(baseElementSelector) {
		this.root = document.querySelector(baseElementSelector);
		this.elements = {};
		this.listeners = {};
	}

	hideElement(name) {
		this.elements[name].style.display = 'none';
	}

	showElement(name) {
		this.elements[name].style.display = '';
	}

	get exists() {
		return !!this.root;
	}

	on(event, callback) {
		if (!this.listeners[event]) {
			this.listeners[event] = [];
		}

		this.listeners[event].push(callback);
	}

	trigger(event, data) {
		const listeners = this.listeners[event];
		if (listeners) {
			listeners.forEach(callback => callback(data));
		}
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

export class LoginFormView extends FormView {
	constructor() {
		super('.form--login')
	}
}


// GENERIC DOM MANIP

export class AlertView extends View {
	static hide() {
		const el = document.querySelector('.alert');
		if (el) el.parentElement.removeChild(el);
	}

	// type is 'success' or 'error'
	static show(type, msg) {
		this.hide();
		const markup = `<div class="alert alert--${type}">${msg}</div>`;
		document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
		window.setTimeout(() => { this.hide() }, 3000);
	}
}

window.onerror = (err) => AlertView.show('error', err)

export class DataParserView extends View {
	static get(input_name) {
		return JSON.parse(document.querySelector(`.js-value[name="${input_name}"]`).value)
	}
}


// SPECIFIC PAGES

export class TrainingView extends FormView {
	constructor() {
		super('form.card');

		this.elements.prompt = this.root.querySelector('.card-title');
		this.elements.input = this.root.querySelector('[name=student_answer]');
		this.elements.answer_feedback = this.root.querySelector('.answer-feedback');
		this.elements.correct_answer = this.root.querySelector('.correct-answer');

		this.overrideSubmit(({student_answer}) => {
			function normalize(str) {
				return str.toLowerCase().trim().replace(/\s+/g, ' ')
			}
			// TODO DESIGN QUESTION: where should isCorrect be calculated? what code owns that logic?
			const isCorrect = normalize(student_answer) == normalize(this.answer)

			const diffs = diffWords(this.answer, student_answer, { ignoreCase: true })

			// NOTE from Heather to Tom:
			//   this method call looks a little over-fancy. feel free to refactor into something easier to read. hopefully I've added enough comments to make it understandable?
			this.setAsHighlightedSpan(
				// element name
				'answer_feedback',
				// pass only the diff entries that we want to display
				diffs.filter(diff => !diff.removed),
				// CSS class name callback
				diff => diff.added ? 'highlight-wrong' : 'highlight-right',
			)

			this.elements.correct_answer.innerText = this.answer;

			this.elements.input.disabled = 'disabled';
			this.hideElement('input');
			this.showElement('answer_feedback');

			try {
				this.trigger('answer', {student_answer, isCorrect});
			} catch(err) {
				alert(err);
			} finally {
				setTimeout(() => {
					this.elements.input.disabled = undefined;
					this.showElement('input');
					this.hideElement('answer_feedback');
					this.elements.input.value = '';
					this.trigger('next');
				}, 1000)
			}
		})
	}

	// this method replaces the content of an element with a set of highlighted/styled spans, such as you might want if you're presenting diff output
	//
	// `elementName` is the string name of some element that this view tracks
	// `array` is expected to be an array of items with at least a `value` property
	// `classNameCallback` is a callback that spits out the CSS classes, space-separated, that go with each entry of the array
	setAsHighlightedSpan(elementName, array, classNameCallback) {
		const baseEl = this.elements[elementName];
		
		// keep track of the index so that we can do a .innerText later (thus bypassing issues with HTML injection / XSS)
		const spans = array.map((entry, index) => {
			const elClass = classNameCallback(entry);
			// using some index-juggling in order to avoid having to worry about HTML injection
			return `<span class="${elClass}">${index}</span>`;
		})

		baseEl.innerHTML = spans.join('');

		// now we can safely assign user-defined text, via `.innerText` (which doesn't get parsed as HTML)
		Array.from(baseEl.querySelectorAll('span')).forEach(span => {
			span.innerText = array[span.innerText].value;
		})
	}

	finish() {
		this.prompt = 'done';
		this.elements.input.disabled = 'disabled';
	}

	get prompt() {
		return this.elements.prompt.innerText;
	}

	set prompt(value) {
		return this.elements.prompt.innerText = value;
	}
}
