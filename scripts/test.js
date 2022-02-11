const displayPosts = () => {
	fetch("http://localhost:3000/shows")
		.then((res) => res.json())
		.then((data) => console.log(data));
};

// displayPosts();

// const getPosts = (url) => {
// 	return new Promise((resolve, reject) => {
// 		fetch(url)
// 			.then((res) => res.json())
// 			.then((data) => resolve(data))
// 			.catch((err) => reject(err));
// 	});
// };

// getPosts("http://localhost:3000/shows").then((data) => console.log(data));

const newShow = {
	id: 12,
	date: "Tue Sept 21 2021",
	venue: "Pier 3 East",
	location: "San Francisco, CA",
};

// const addShow = () => {
// 	fetch("http://localhost:3000/shows", {
// 		method: "PUT",
// 		headers: {
// 			"Content-type": "application/json",
// 		},
// 		body: JSON.stringify(newShow),
// 	}).then((res) => console.log(res));
// 	// .then((res) => res.json())
// 	// .then((data) => console.log(data));
// };

const deleteShow = () => {
	fetch("http://localhost:3000/shows/:1", {
		method: "DELETE",
		headers: {
			"Content-type": "application/json",
		},
	});
};

// addShow();
// deleteShow();
displayPosts();
