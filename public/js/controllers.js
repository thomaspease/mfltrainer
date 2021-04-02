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

		const sentences = SentenceModel.getLocal('sentences');

		const trainTask = new TrainingView();

		console.log(sentences);
		trainTask.prompt = sentences[0].data.sentence;
	}
}
