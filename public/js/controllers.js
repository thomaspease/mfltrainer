class Controller {
}

class LoginController extends Controller {
	constructor() {
		super()
		const loginForm = new LoginFormView();
		// DELEGATION
		//Login
		if (loginForm.exists) {
			console.log('hello from index.js');
			loginForm.overrideSubmit((e) => {
				e.preventDefault();
				const email = document.getElementById('email').value;
				const password = document.getElementById('password').value;
				AuthModel.login(email, password);
			});
		}
	}
}

class TrainController extends Controller {
	constructor() {
		super();

		const sentences = SentenceModel.getLocal('sentences');

		console.log(sentences);
	}
}
