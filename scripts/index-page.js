"user strict";

import Comment from "./Comment.mjs";
import UI from "./UI.mjs";
import API from "./API.mjs";

const ui = new UI();
const api = new API();

(function () {
	// ===START of IIFE

	const loadEventListeners = () => {
		const formEl = document.getElementById("comments-form");
		formEl.addEventListener("submit", (e) => {
			e.preventDefault();
			commentIsValid() && ui.handleSubmit(e);
		});
	};

	//& Check if both inputs have values
	const commentIsValid = () => {
		const nameInputEl = select("#form__name");
		const commentInputEl = select("#form__comment");
		const nameVal = nameInputEl.value;
		const commentVal = commentInputEl.value;
		const nameErrorEl = select(".name-error");
		const commentErrorEl = select(".comment-error");

		if (!nameVal) {
			nameInputEl.classList.add("form__input--error");
			nameErrorEl.classList.add("form__error--show");
			console.log("name input is empty");
			// return false;
		} else {
			nameInputEl.classList.remove("form__input--error");
			nameErrorEl.classList.remove("form__error--show");
		}

		if (!commentVal) {
			commentInputEl.classList.add("form__input--error");
			commentErrorEl.classList.add("form__error--show");
			console.log("comment input is empty");
			// return false;
		} else {
			commentInputEl.classList.remove("form__input--error");
			commentErrorEl.classList.remove("form__error--show");
		}

		if (nameVal && commentVal) {
			console.log("comment is valid");
			return true;
		} else {
			console.log("comment is invalid");
			return false;
		}
	};

	loadEventListeners();

	//! get Comments from Server on load

	// api.getComments().then((data) => {
	// 	console.log(data);
	// 	ui.displayComments(data);
	// });

	api.getComments().then((data) => ui.displayComments(data));

	// ===END of IIFE
})();
