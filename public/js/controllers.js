import { LoginFormView, TrainingView } from './views.js';
import { AuthModel, SentenceModel } from './models.js';


// parent class for controllers. Not much needs to be in here, I don't think, so leave it empty.
class Controller {
}

export class LoginController extends Controller {
	constructor() {
		super()
		const loginForm = new LoginFormView();
		// DELEGATION
		//Login
		if (loginForm.exists) {
			console.log('hello from index.js');
			loginForm.overrideSubmit(({email, password}) => {
				AuthModel.login(email, password);
			});
		}
	}
}

export class TrainController extends Controller {
	constructor() {
		super();

		this.sentences = SentenceModel.getLocal('sentences').map(sent => sent.subclassAs('translation'));
		this.finishedSentences = [];

		this.view = new TrainingView();

		this.initialCount = this.sentences.length;

		this.rightCount = 0;
		this.wrongCount = 0;

		this.view.on('answer', this.doAnswer.bind(this))
		this.view.on('next', this.doNextSentence.bind(this));

		this.doNextSentence();
	}

	doAnswer({student_answer, isCorrect}) {
		const desiredReaskLength = 3;

		const sentenceObject = this.sentences.shift();
		this.finishedSentences.push({sentenceObject, isCorrect});

		if (isCorrect) {
			this.rightCount++;
		} else {
			this.wrongCount++;

			const insertionIndex = Math.min(this.sentences.length, desiredReaskLength);
			this.sentences.splice(insertionIndex, 0, sentenceObject);
		}

		console.log(arguments);
	}

	doNextSentence() {
		if (!this.sentences[0]) {
			this.view.finish();
			// TODO send an ajax request to the server
			return;
		}

		const sentence = this.sentences[0];

		this.view.prompt = sentence.prompt;
		this.view.answer = sentence.answer;
	}
}
