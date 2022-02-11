const getShows = (url) => {
	return new Promise((resolve, reject) => {
		fetch(url)
			.then((res) => res.json())
			.then((data) => resolve(data))
			.catch((err) => reject(err));
	});
};

// getShows("http://localhost:3000/shows").then((data) => console.log(data));

const newShow = {
	date: "Tue Sept 21 2021",
	venue: "Pier 3 East",
	location: "San Francisco, CA",
};

const addShow = (url) => {
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

// setTimeout(() => {

//   // addShow("http://localhost:3000/shows");
// }, 2000);
