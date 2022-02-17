const HEROKU_API_KEY = "092536a-5fe5-4586-9acf-ed88b46bc912";
const baseURL = "https://project-1-api.herokuapp.com";

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

const convertUnixComments = (timestamp) => {
	const enUSFormatter = new Intl.DateTimeFormat("en-US");
	const options = { year: "numeric", month: "numeric", day: "numeric" };
	let dateFormatted = enUSFormatter.format(timestamp, options);

	return dateFormatted;
};

const convertUnixShows = (timestamp) => {
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
  return dateFormatted.replace(',', '');
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
