"user strict";

(function () {
	// ===START of IIFE
	const loadEventListeners = () => {
		const formEl = document.getElementById("comments-form");
		// const formBtn = document.querySelector(".form__button");
		formEl.addEventListener("submit", (e) => {
			// formBtn.addEventListener("mouseover", (e) => {
			e.preventDefault();
			commentIsValid() && handleSubmit(e);
		});
	};

	loadEventListeners();

	//& Display comments
	const displayComments = (dataArr) => {
		console.log(dataArr, "before sort");
		const sortedArray = [...dataArr];
		console.log(sortedArray);
		sortedArray.sort((a, b) => {
			console.log(a.timestamp);
			return a.timestamp - b.timestamp;
		});
		console.log(sortedArray, "after sort");
		sortedArray.forEach((obj) => {
			const commentEl = makeHtmlCommentFromDbObject(obj);
			document.querySelector(".comments__list").prepend(commentEl);
		});
	};

	//& Grab values from input fields
	const makeCommentObjFromDOMData = () => {
		const nameInputEl = select("#form__name");
		const commentInputEl = select("#form__comment");
		const nameVal = nameInputEl.value;
		const commentVal = commentInputEl.value;

		console.log("comment is being converted to obj");

		const commentObj = {
			name: nameVal,
			comment: commentVal,
		};
		//^ clear input fields
		nameInputEl.value = "";
		commentInputEl.value = "";
		return commentObj;
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

	//& Make HTML Comment function
	const makeHtmlCommentFromDbObject = (commentObj, imgSrcVal) => {
		const commentEl = create("div", "comment", null, {
			"data-id": commentObj.id,
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
		commentUserNameEl.innerText = commentObj.name;
		const commentTimeStampEl = create(
			"p",
			"comment__time-stamp",
			commentHeadEl
		);
		commentTimeStampEl.innerText = convertUnixComments(commentObj.timestamp);

		const commentBodyEl = create("p", "comment__body", commentWrapperEl);
		commentBodyEl.innerText = commentObj.comment;

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
			"p",
			["comment__like-button", "fa-solid", "fa-heart"],
			likesWrapper
		);
		commentLikeBtn.addEventListener("click", handleLike);

		const commentLikesCount = create(
			"p",
			"comment__likes-count",
			likesWrapper
		);
		commentLikesCount.innerText = commentObj.likes
			? `${commentObj.likes}`
			: ` 0`;

		const commentDeleteBtn = create(
			"p",
			["comment__delete-button", "fa-solid", "fa-trash-can"],
			commentControlsEl
		);
		// commentDeleteBtn.innerText = "Delete this comment";
		commentDeleteBtn.addEventListener("click", handleDelete);

		return commentEl;
	};

	//! Handle Like
	const handleLike = (e) => {
		const commentId =
			e.target.parentElement.parentElement.parentElement.parentElement
				.dataset.id;
		incrementLike(
			`${baseURL}/comments/${commentId}/like?api_key=${HEROKU_API_KEY}`
		).then((data) => {
			e.target.nextElementSibling.innerText = data.likes;
		});
	};

	//! Handle Delete
	const handleDelete = (e) => {
		const commentId =
			e.target.parentElement.parentElement.parentElement.dataset.id;
		console.log(commentId, "commentID");
		deleteComment(
			`${baseURL}/comments/${commentId}?api_key=${HEROKU_API_KEY}`
		).then((data) => {
			e.target.parentElement.parentElement.parentElement.remove();
		});
	};

	//! Submit Comment
	const handleSubmit = (e) => {
		e.preventDefault();
		const commentsListEl = select(".comments__list");

		const commentObj = makeCommentObjFromDOMData(e);
		console.log(commentObj);

		//& Add comment to server and UI using response
		addComment(
			`${baseURL}/comments?api_key=${HEROKU_API_KEY}`,
			commentObj
		).then((resObj) => {
			console.log(resObj, "POST response OBJ");
			commentsListEl.prepend(makeHtmlCommentFromDbObject(resObj));
		});
	};

	//! get Comments from Server on load
	getComments(`${baseURL}/comments?api_key=${HEROKU_API_KEY}`).then((data) => {
		console.log(data);
		displayComments(data);
	});

	// ===END of IIFE
})();
