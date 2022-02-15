const HEROKU_API_KEY = "092536a-5fe5-4586-9acf-ed88b46bc912";
const baseURL = "https://project-1-api.herokuapp.com";

// https://project-1-api.herokuapp.com/comments/:93dfeafe-28ed-49d3-ab2c-d3dbeeb5e980/like?api_key=f357c1dc-0cc7-4355-a393-9ae4e0f1e121

const getShows = (url) => {
	return new Promise((resolve, reject) => {
		fetch(url)
			.then((res) => res.json())
			.then((data) => resolve(data))
			.catch((err) => reject(err));
	});
};

const getComments = (url) => {
	return new Promise((resolve, reject) => {
		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				resolve(data);
			})
			.catch((err) => reject(err));
	});
};

const addComment = (url, newShow) => {
	return new Promise((resolve, reject) => {
		fetch(url, {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(newShow),
		})
			.then((res) => res.json())
			.then((data) => resolve(data))
			.catch((err) => reject(err));
	});
};

const incrementLike = (url) => {
	return new Promise((resolve, reject) => {
		fetch(url, {
			method: "PUT",
			headers: {
				"Content-type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				resolve(data);
			})
			.catch((err) => reject(err));
	});
};

const convertUnix = (timestamp) => {
	const enUSFormatter = new Intl.DateTimeFormat("en-US");
	const options = { year: "numeric", month: "numeric", day: "numeric" };
	let dateFormatted = enUSFormatter.format(timestamp, options);

	return dateFormatted;
};

const deleteComment = (url) => {
	return new Promise((resolve, reject) => {
		fetch(url, {
			method: "DELETE",
			headers: {
				"Content-type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				resolve(data);
			})
			.catch((err) => reject(err));
	});
};
