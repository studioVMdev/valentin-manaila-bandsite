class API {
	constructor() {
		this.baseURL = "https://project-1-api.herokuapp.com";
		this.HEROKU_API_KEY = "092536a-5fe5-4586-9acf-ed88b46bc912";
	}

	getShows = () => {
		return axios
			.get(`${this.baseURL}/showdates?api_key=${this.HEROKU_API_KEY}`)
			.then((response) => {
				// loadShows(response.data);
				return response.data;
			});
	};

	getComments = () => {
		return axios
			.get(`${this.baseURL}/comments?api_key=${this.HEROKU_API_KEY}`)
			.then((response) => {
				console.log(response.data);
				return response.data;
			});
	};

	addComment = (newComment) => {
		console.log(newComment, "comment values object");
		return axios({
			method: "post",
			url: `${this.baseURL}/comments?api_key=${this.HEROKU_API_KEY}`,
			headers: {
				"Content-type": "application/json",
			},
			data: newComment,
		}).then((response) => {
			// console.log(response.data, "data from server");
			return response.data;
		});
	};

	incrementLike = (commentId) => {
		return axios
			.put(
				`${this.baseURL}/comments/${commentId}/like?api_key=${this.HEROKU_API_KEY}`
			)
			.then((response) => response.data);
	};

	deleteComment = (commentId) => {
		return axios
			.delete(
				`${this.baseURL}/comments/${commentId}?api_key=${this.HEROKU_API_KEY}`
			)
			.then((response) => response.data);
	};

	convertUnixComments = (timestamp) => {
		const enUSFormatter = new Intl.DateTimeFormat("en-US");
		const options = { year: "numeric", month: "numeric", day: "numeric" };
		let dateFormatted = enUSFormatter.format(timestamp, options);

		return dateFormatted;
	};
	convertUnixShows = (timestamp) => {
		const options = {
			day: "2-digit",
			weekday: "short",
			month: "short",
			year: "numeric",
		};
		options.month.slice(4);
		let dateFormatted = new Date(parseInt(timestamp)).toLocaleDateString(
			"en-UK",
			options
		);
		return dateFormatted.replace(",", "");
	};
}
