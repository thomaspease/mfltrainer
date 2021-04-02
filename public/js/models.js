import { AlertView, DataParserView } from './views.js'

// parent class for models. includes some utility methods, and such
// 
// if we wanted to get fancy, we might consider picking up the mongoose model definitions, and making use of that somehow.
// but, that seems like it might take more effort than it's worth, at least until we start needing client-side validation
class Model {
	constructor(data) {
		this.data = data;
	}

	// returns an array of instantiated objects, based on JSON embedded in a specific DOM element
	static getLocal(name) {
		// this is *maybe* not as theoretically clean to have a Model call into a View, but since we're storing global data in certain DOM elements, it works well in practice
		
		var data = DataParserView.get(name)
		if (!(data instanceof Array)) {
			data = [data];
		}
		return data.map(single => new this(single));
	}
}

export class AuthModel extends Model {
	static async login(email, password) {
		try {
			const res = await fetch('api/v1/users/login', {
				method:"POST",
				body:JSON.stringify({email, password}),
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (res.status == 200) {
				AlertView.show('success', 'Logged in successfully!');
				window.setTimeout(() => {
					location.assign('/');
				}, 1500);
			}
		} catch (err) {
			// TODO double-check the Fetch equivalent to Axios's `err.response.data.message`
			AlertView.show('error', err.response.data.message)
		}
	}

}

export class SentenceModel extends Model {
	
}
