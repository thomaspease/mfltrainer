class Model {
	constructor(data) {
		this.data = data;
	}

	static getLocal(name) {
		const data = JSON.parse(document.querySelector(`.js-value[name="${name}"]`).value)
		return new this(data);
	}
}

class AuthModel extends Model {
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
					//location.assign('/');
				}, 1500);
			}
			console.log(res);
			window.last_response = res;
		} catch (err) {
			AlertView.show('error', err.response.data.message)
		}
	}

}

class SentenceModel extends Model {
	
}
