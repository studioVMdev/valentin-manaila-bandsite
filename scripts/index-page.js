"user strict";

(function () {
	// ===START of IIFE
	const api = new API();
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

	//! Comment class definition
	class Comment {
		constructor(commentObj) {
			this.commentObj = commentObj;
		}

		render = () => {
			const commentEl = create("div", "comment", null, {
				"data-id": this.commentObj.id,
			});
			const imgEl = create("img", ["comment__icon", "avatar"], commentEl);
			//todo Image Source
			imgEl.setAttribute(
				"src",
				`https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
			);
			const commentWrapperEl = create("div", "comment__wrapper", commentEl);
			const commentHeadEl = create("div", "comment__head", commentWrapperEl);
			const commentUserNameEl = create(
				"p",
				"comment__user-name",
				commentHeadEl
			);
			commentUserNameEl.innerText = this.commentObj.name;
			const commentTimeStampEl = create(
				"p",
				"comment__time-stamp",
				commentHeadEl
			);
			commentTimeStampEl.innerText = api.convertUnixComments(
				this.commentObj.timestamp
			);

			const commentBodyEl = create("p", "comment__body", commentWrapperEl);
			commentBodyEl.innerText = this.commentObj.comment;

			const commentControlsEl = create(
				"div",
				"comment__controls",
				commentWrapperEl
			);

			const likesWrapper = create(
				"div",
				"comment__likes-wrapper",
				commentControlsEl
			);

			const commentLikeBtn = create(
				"img",
				["comment__like-button"],
				likesWrapper,
				{ src: "/assets/icons/SVG/icon-like.svg" }
			);
			commentLikeBtn.addEventListener("click", this.handleLike);

			const commentLikesCount = create(
				"p",
				"comment__likes-count",
				likesWrapper
			);
			commentLikesCount.innerText = this.commentObj.likes
				? `${this.commentObj.likes}`
				: ` 0`;

			const commentDeleteBtn = create(
				"img",
				["comment__delete-button", "fa-solid", "fa-trash-can"],
				commentControlsEl,
				{ src: "/assets/icons/SVG/icon-delete.svg" }
			);
			commentDeleteBtn.addEventListener("click", this.handleDelete);

			return commentEl;
		};

		//! Handle Delete
		handleDelete(e) {
			const commentId =
				e.target.parentElement.parentElement.parentElement.dataset.id;
			api.deleteComment(commentId).then((data) => {
				e.target.parentElement.parentElement.parentElement.remove();
			});
		}
		//! Handle Like
		handleLike = (e) => {
			const commentId =
				e.target.parentElement.parentElement.parentElement.parentElement
					.dataset.id;
			api.incrementLike(commentId).then((data) => {
				e.target.nextElementSibling.innerText = data.likes;
			});
		};
	}

	//! UI class definition
	class UI {
		constructor() {
			this.htmlCommentList = document.querySelector(".comments__list");
		}

		//& Display Comments
		displayComments = (dataArr) => {
			const sortedArray = [...dataArr];
			sortedArray.sort((a, b) => {
				return a.timestamp - b.timestamp;
			});

			sortedArray.forEach((obj) => {
				const comment = new Comment(obj);
				this.htmlCommentList.prepend(comment.render());
			});
		};

		//& Grab values from input fields
		getCommentValues = (e) => {
			console.log(e);
			const nameInputEl = select("#form__name");
			const commentInputEl = select("#form__comment");
			const nameVal = nameInputEl.value;
			const commentVal = commentInputEl.value;
			const commentObj = {
				name: nameVal,
				comment: commentVal,
			};

			// //^ clear input fields
			nameInputEl.value = "";
			commentInputEl.value = "";
			return commentObj;
		};
		//& Handle Submit
		handleSubmit = (e) => {
			e.preventDefault();
			const commentsListEl = select(".comments__list");
			const commentObj = ui.getCommentValues(e);

			//^ Add comment to server and UI using response
			api.addComment(commentObj).then((resObj) => {
				console.log(resObj, "response object");
				const comment = new Comment(resObj);
				commentsListEl.prepend(comment.render());
			});
		};
	}

	//! get Comments from Server on load
	api.getComments().then((data) => {
		console.log(data);
		ui.displayComments(data);
	});
	const ui = new UI();
	// ===END of IIFE
})();
