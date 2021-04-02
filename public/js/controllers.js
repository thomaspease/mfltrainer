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

		const desiredReaskLength = 3;

		const sentences = SentenceModel.getLocal('sentences').map(sent => sent.subclassAs('translation'));
		const finishedSentences = [];

		const trainTask = new TrainingView();

		console.log(sentences);

		const initialCount = sentences.length;
		var rightCount = 0;
		var wrongCount = 0;

		// TODO DESIGN QUESTION:
		//  should we calculate isCorrect inside the view? That would break separation of concerns, but would involve a smaller amount of back-and-forth data calls
		//  but, on the flip side, the controller needing to know exactly what to update in the view is *also* a bit of a conceptual leak...
		trainTask.on('answer', ({student_answer, isCorrect}) => {
			const sentenceObject = sentences.shift();
			finishedSentences.push({sentenceObject, isCorrect});

			if (isCorrect) {
				rightCount++;
			} else {
				wrongCount++;
				const insertionIndex = Math.min(sentences.length, desiredReaskLength);

				sentences.splice(insertionIndex, 0, sentenceObject);
			}
		});

		trainTask.on('next', doNextSentence);

		function doNextSentence() {
			if (!sentences[0]) {
				trainTask.finish();
				// TODO send an ajax request to the server
				return;
			}

			const sentence = sentences[0];

			trainTask.prompt = sentence.prompt;
			trainTask.answer = sentence.answer;
		}

		doNextSentence();
	}
}
