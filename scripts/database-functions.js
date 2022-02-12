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

// const deleteComment = (url, id) => {
// 	return new Promise((resolve, reject) => {
// 		fetch(`${url}/${id}`, {
// 			method: "DELETE",
// 			headers: {
// 				"Content-type": "application/json",
// 			},
// 		})
// 			.then((res) => res.json())
// 			.then((data) => {
// 				resolve(data);
// 			})
// 			.catch((err) => reject(err));
// 	});
// };
